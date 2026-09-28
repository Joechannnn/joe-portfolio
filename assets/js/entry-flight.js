import * as THREE from '../vendor/three/three.module.min.js';
import { createEntranceDevice, entranceDevices } from './entry-devices.js';
import { createCircuitLights } from './entry-circuits.js';

export async function playEntrance(standby) {
  const host=document.querySelector('.crate-scene');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!host||reduced.matches||document.hidden){standby?.remove();return;}
  if(standby&&!standby.isConnected)return;
  const force=new URLSearchParams(location.search).get('entrance')==='full';
  let seen=false;
  try{seen=sessionStorage.getItem('portfolio-entrance')==='seen';}catch{}
  if(seen&&!force){
    standby?.remove();
    const animation=host.animate([{opacity:.6},{opacity:1}],{duration:550,easing:'ease-out'});
    const stop=()=>animation.cancel();
    reduced.addEventListener('change',stop,{once:true});
    animation.finished.finally(()=>reduced.removeEventListener('change',stop)).catch(()=>{});
    return;
  }
  // Assets load behind a cover in the scene's own colour; playback continues straight from it.
  const overlay=standby||document.createElement('div');
  if(!standby){
    overlay.className='entry-flight-standby';
    const button=document.createElement('button');button.className='entry-flight-skip';button.type='button';button.textContent='Skip intro';
    overlay.append(button);document.body.append(overlay);
  }
  const skip=overlay.querySelector('.entry-flight-skip');
  const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');
  function leave(){
    if(document.activeElement===skip)document.getElementById('next')?.focus({preventScroll:true});
    skip.hidden=true;overlay.classList.add('is-leaving');setTimeout(()=>overlay.remove(),450);
  }
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{leave();return;}
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
  const fail=()=>finish(true);
  function finish(fade){
    if(!alive)return;alive=false;
    clearTimeout(timer);cancelAnimationFrame(frame);
    animations.forEach(a=>a.cancel());
    const hadFocus=document.activeElement===skip;
    if(fade===true&&!started)leave();else overlay.remove();
    host.classList.remove('entry-flight-active');
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
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fail();},{once:true});
  // Slow asset preparation gives the page back instead of holding the cover.
  timer=setTimeout(fail,5000);
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
    const sizes=panels.map(mesh=>new THREE.Box3().setFromObject(mesh).getSize(new THREE.Vector3()));
    // Every device is filed into the Collection sleeve, measured at settle time once the sleeves have come to rest.
    // Without that sleeve on screen the devices carry on past the edge instead.
    function aim(){
      const sleeve=document.getElementById('sleeve-0'),rect=sleeve?.getBoundingClientRect();
      const shown=rect&&rect.width>0&&rect.left>=0&&rect.top>=0&&rect.right<=viewport.w&&rect.bottom<=viewport.h&&+getComputedStyle(sleeve).opacity>=.5;
      const w=shown&&rect.width/viewport.w*viewWidth,h=shown&&rect.height/viewport.h*viewHeight,x=shown&&((rect.left+rect.width/2)/viewport.w-.5)*viewWidth,y=shown&&(.5-(rect.top+rect.height/2)/viewport.h)*viewHeight;
      panels.forEach((mesh,i)=>targets.push(shown?{x,y,fan:i-(panels.length-1)/2,dx:w*.07,dy:h*.035,scale:Math.min(w/sizes[i].x,h/sizes[i].y)}:null));
      canvas.dataset.landing=shown?'sleeve-0':'out';
    }
    canvas.dataset.devices=choices.map(x=>x.type).join(',');
    canvas.dataset.screens=choices.map(x=>x.screen).join(',');
    // Compile and draw once offscreen so shader startup cannot consume the flight.
    panels.forEach((mesh,i)=>{mesh.position.set(mesh.userData.side*(innerWidth<768?2.6:4),i%2?.72:-.55,mesh.userData.depth);mesh.rotation.y=-mesh.userData.side*.32;});
    await renderer.compileAsync(scene,camera);
    if(!alive)return;
    renderer.render(scene,camera);renderer.getContext().finish();
    if(!alive||interrupted||document.hidden)return;
    clearTimeout(timer);
    overlay.classList.replace('entry-flight-standby','entry-flight');overlay.prepend(canvas);host.classList.add('entry-flight-active');
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
      if(t>=1.55&&!targets.length)aim();
      panels.forEach((mesh,i)=>{
        const {side,depth}=mesh.userData;
        if(t<1.55){
          mesh.position.set(side*(innerWidth<768?2.6:4.0),i%2?.72:-.55,depth);
          mesh.rotation.set(.035,-side*(.32+travel*.18),-side*.035);mesh.scale.setScalar(1);
          mesh.visible=t>.16+i*.02;
        }else if(!targets[i]){
          // No sleeve on screen for this device: it carries on past the edge.
          mesh.position.set(side*viewWidth*THREE.MathUtils.lerp(.8,1.6,eased),THREE.MathUtils.lerp((i%2?.22:-.18)*viewHeight,0,eased),camera.position.z-distance-i*.025);
          mesh.scale.setScalar(1.2);mesh.rotation.set(.035,-side*.50,-side*.035);
          mesh.visible=eased<1;
        }else{
          // Staggered arrival fans the devices over the sleeve, then each tucks in behind the last one down.
          const {x,y,fan,dx,dy,scale}=targets[i],last=i===panels.length-1;
          const arrive=1-Math.pow(1-THREE.MathUtils.clamp((t-1.55-i*.05)/.55,0,1),3);
          const tuck=smooth(THREE.MathUtils.clamp((t-2.05-i*.05)/.25,0,1)),spread=(1-arrive*.35)*(1-tuck);
          mesh.position.set(THREE.MathUtils.lerp(side*viewWidth*.8,x+fan*dx*spread,arrive),THREE.MathUtils.lerp((i%2?.22:-.18)*viewHeight,y+fan*dy*spread,arrive),camera.position.z-distance+i*.02);
          mesh.scale.setScalar(THREE.MathUtils.lerp(1.2,scale*(last?1:.9+.02*i),arrive)*(last?1:1-tuck));
          mesh.rotation.set(.035*(1-arrive),-side*.50*(1-arrive),-side*.035*(1-arrive)-fan*.05*spread);
          mesh.visible=last||tuck<1;
        }
      });
      circuits.update(t,camera.position.z);
      // The skip control goes before the cover thins, so it never sits over the nav.
      if(t>=1.6&&!skip.hidden){if(document.activeElement===skip)document.getElementById('next')?.focus({preventScroll:true});skip.hidden=true;}
      overlay.style.opacity=String(1-smooth(THREE.MathUtils.clamp((t-1.60)/.90,0,1)));
      renderer.render(scene,camera);
      if(t>=2.5){finish();return;}
      frame=requestAnimationFrame(render);
    }
    frame=requestAnimationFrame(render);
  }catch{fail();}
}
