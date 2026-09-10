import * as THREE from '../vendor/three/three.module.min.js';
import { createEntranceDevice, entranceDevices } from './entry-devices.js';
import { createCircuitLights } from './entry-circuits.js';

export async function playEntrance() {
  const host=document.querySelector('.crate-scene');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!host||reduced.matches||document.hidden)return;
  const force=new URLSearchParams(location.search).get('entrance')==='full';
  let seen=false;
  try{seen=sessionStorage.getItem('portfolio-entrance')==='seen';}catch{}
  if(seen&&!force){
    const animation=host.animate([{opacity:.6},{opacity:1}],{duration:550,easing:'ease-out'});
    const stop=()=>animation.cancel();
    reduced.addEventListener('change',stop,{once:true});
    animation.finished.finally(()=>reduced.removeEventListener('change',stop)).catch(()=>{});
    return;
  }
  const overlay=document.createElement('div');overlay.className='entry-flight';
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
  const skip=document.createElement('button');skip.className='entry-flight-skip';skip.type='button';skip.textContent='Skip intro';
  overlay.append(canvas,skip);
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<768?1.25:1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();scene.background=new THREE.Color('#0a0e0e');
  scene.fog=new THREE.Fog('#0a0e0e',18,55);
  const camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,100);
  camera.position.z=18;
  const dispose=[];
  const panels=[];
  let alive=true,frame=0,timer,started=0;
  const animations=[];
  const choices=entranceDevices;
  const targets=[];
  let interrupted=false;
  const interrupt=()=>{interrupted=true;finish();};
  function finish(){
    if(!alive)return;alive=false;
    clearTimeout(timer);cancelAnimationFrame(frame);
    animations.forEach(a=>a.cancel());
    const hadFocus=document.activeElement===skip;
    overlay.remove();host.classList.remove('entry-flight-active');
    document.removeEventListener('pointerdown',interrupt,true);
    document.removeEventListener('keydown',interrupt,true);
    document.removeEventListener('wheel',interrupt);
    document.removeEventListener('visibilitychange',hide);
    window.removeEventListener('resize',resize);
    reduced.removeEventListener('change',interrupt);
    new Set(dispose).forEach(x=>x.dispose());renderer.dispose();
    if(hadFocus)document.getElementById('next')?.focus({preventScroll:true});
  }
  function hide(){if(document.hidden)finish();}
  function resize(){
    if(started){finish();return;}
    renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  }
  resize();
  document.addEventListener('pointerdown',interrupt,true);
  document.addEventListener('keydown',interrupt,true);
  document.addEventListener('wheel',interrupt,{passive:true});
  document.addEventListener('visibilitychange',hide);
  window.addEventListener('resize',resize);
  reduced.addEventListener('change',interrupt);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();finish();},{once:true});
  // Asset preparation never blocks the existing page or its controls.
  timer=setTimeout(finish,5000);
  try{
    scene.add(new THREE.HemisphereLight(0xe4eef1,0x24201a,2.2));
    const key=new THREE.DirectionalLight(0xffffff,4.5);key.position.set(-6,8,15);scene.add(key);
    const rim=new THREE.DirectionalLight(0xffd2a0,3);rim.position.set(6,2,-12);scene.add(rim);
    const studio=new THREE.Scene();studio.background=new THREE.Color(0x343c40);
    for(const [position,size,color] of [[[-5,3,2],[2,8,3],0xffffff],[[5,1,-2],[2,6,3],0xdbe8ef],[[0,5,0],[7,1,7],0xffffff]]){
      const g=new THREE.BoxGeometry(...size),m=new THREE.MeshBasicMaterial({color}),light=new THREE.Mesh(g,m);light.position.set(...position);studio.add(light);dispose.push(g,m);
    }
    const pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.05);scene.environment=environment.texture;dispose.push(environment,pmrem);
    await Promise.all(choices.map(async(spec,i)=>{
      const mesh=await createEntranceDevice(spec);
      if(!alive){new Set(mesh.userData.resources).forEach(x=>x.dispose());return;}
      dispose.push(...mesh.userData.resources);
      Object.assign(mesh.userData,{index:spec.index,side:i%2?1:-1,depth:4-Math.floor(i/2)*10});
      panels[i]=mesh;scene.add(mesh);
    }));
    if(!alive||interrupted||document.hidden)return;
    const circuits=createCircuitLights(scene,dispose,innerWidth<768);
    const signalGeometry=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10,0,-8),new THREE.Vector3(10,0,-8)]);
    const signalMaterial=new THREE.LineBasicMaterial({color:0xffb03a,transparent:true});
    const signal=new THREE.Line(signalGeometry,signalMaterial);scene.add(signal);dispose.push(signalGeometry,signalMaterial);
    const viewport={w:innerWidth,h:innerHeight};
    const distance=8,viewHeight=2*distance*Math.tan(THREE.MathUtils.degToRad(58/2)),viewWidth=viewHeight*camera.aspect;
    panels.forEach(mesh=>{
      const rect=document.getElementById('sleeve-'+(mesh.userData.index+1)).getBoundingClientRect();
      const cx=THREE.MathUtils.clamp(rect.left+rect.width/2,viewport.w*.25,viewport.w*.78);
      const cy=THREE.MathUtils.clamp(rect.top+rect.height/2,viewport.h*.65,viewport.h*.9);
      targets.push({x:(cx/viewport.w-.5)*viewWidth,y:(.5-cy/viewport.h)*viewHeight,scale:Math.max(.12,rect.width/viewport.w*viewWidth/mesh.userData.width)});
    });
    canvas.dataset.devices=choices.map(x=>x.type).join(',');
    canvas.dataset.screens=choices.map(x=>x.screen).join(',');
    // Compile and draw once offscreen so shader startup cannot consume the flight.
    panels.forEach((mesh,i)=>{mesh.position.set(mesh.userData.side*(innerWidth<768?2.6:4),i%2?.72:-.55,mesh.userData.depth);mesh.rotation.y=-mesh.userData.side*.32;});
    await renderer.compileAsync(scene,camera);
    if(!alive)return;
    renderer.render(scene,camera);renderer.getContext().finish();
    if(!alive||interrupted||document.hidden)return;
    clearTimeout(timer);
    document.body.append(overlay);host.classList.add('entry-flight-active');
    try{sessionStorage.setItem('portfolio-entrance','seen');}catch{}
    host.querySelectorAll('.intro-title .line').forEach((line,i)=>animations.push(line.animate([
      {opacity:0,transform:'perspective(900px) translateY(65px) rotateX(-45deg)'},
      {opacity:1,transform:'perspective(900px) translateY(0) rotateX(0deg)'}
    ],{duration:720,delay:1550+i*90,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})));
    const rail=host.querySelector('.crate-rail');
    if(rail)animations.push(rail.animate([{opacity:0},{opacity:1}],{duration:400,delay:2100,fill:'backwards',easing:'ease-out'}));
    started=performance.now();timer=setTimeout(finish,2900);
    const smooth=t=>t*t*(3-2*t);
    function render(now){
      if(!alive)return;
      const t=(now-started)/1000;
      canvas.dataset.phase=t<.35?'power':t<1.55?'flight':t<2.3?'settle':'reveal';
      const travel=THREE.MathUtils.clamp((t-.25)/1.30,0,1);
      camera.position.z=18-32*Math.pow(travel,1.65);
      camera.position.x=Math.sin(travel*Math.PI*2)*.16;
      camera.rotation.z=Math.sin(travel*Math.PI)*.018;
      signal.scale.x=THREE.MathUtils.clamp(t/.28,0,1);signalMaterial.opacity=Math.max(0,1-t/.55);
      const settle=THREE.MathUtils.clamp((t-1.55)/.75,0,1),eased=1-Math.pow(1-settle,3);
      panels.forEach((mesh,i)=>{
        const {side,depth}=mesh.userData;
        if(t<1.55){
          mesh.position.set(side*(innerWidth<768?2.6:4.0),i%2?.72:-.55,depth);
          mesh.rotation.set(.035,-side*(.32+travel*.18),-side*.035);mesh.scale.setScalar(1);
          mesh.visible=t>.16+i*.02;
        }else{
          const target=targets[i];
          mesh.position.set(THREE.MathUtils.lerp(side*viewWidth*.8,target.x,eased),THREE.MathUtils.lerp((i%2?.22:-.18)*viewHeight,target.y,eased),camera.position.z-distance-i*.025);
          mesh.scale.setScalar(THREE.MathUtils.lerp(1.2,target.scale,eased));
          mesh.rotation.set(.035*(1-eased),-side*.50*(1-eased),-side*.035*(1-eased));
          mesh.visible=true;
        }
      });
      circuits.update(t,camera.position.z);
      overlay.style.opacity=String(1-smooth(THREE.MathUtils.clamp((t-1.60)/.90,0,1)));
      renderer.render(scene,camera);
      if(t>=2.5){finish();return;}
      frame=requestAnimationFrame(render);
    }
    frame=requestAnimationFrame(render);
  }catch{finish();}
}
