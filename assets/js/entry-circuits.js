import * as THREE from '../vendor/three/three.module.min.js';

export function createCircuitLights(scene,resources,mobile=false){
  const positions=[],conductors=[];
  const circuit=(project,side,row,lane,track=0,floor=false)=>{
    const seed=row*11+lane*7+track*13+(side===1?3:0);
    const x=.7+lane*1.35,z=14-row*9-lane*.65;
    const family=(row*3+lane+(side===1?2:0))%5;
    const length=3.5+((row+lane)%4)*.65-track*.17;
    const turn=z-length*(.28+family*.07);
    let points;
    if(family===0)points=[[x+.15,z],[x+.15,turn],[x+1.1,turn],[x+1.1,z-length]];
    else if(family===1)points=[[x+.95,z],[x+.95,turn],[x+.1,turn],[x+.1,z-length]];
    else if(family===2)points=[[x+.1,z],[x+.1,turn],[x+1.1,turn],[x+1.1,z-length+.55],[x+.65,z-length+.55],[x+.65,z-length]];
    else if(family===3)points=[[x+.25,z],[x+.25,z-length]];
    else points=[[x+.1,z],[x+.1,turn],[x+.85,turn],[x+.85,z-length]];
    // Chamfer in world space so bends retain their 45-degree circuit-board geometry.
    const world=points.map(p=>new THREE.Vector3(...project(...p))),route=[world[0]];
    for(let i=1;i<world.length-1;i++){
      const corner=world[i],before=world[i-1],after=world[i+1];
      const radius=Math.min(.16,corner.distanceTo(before)*.35,corner.distanceTo(after)*.35);
      const entry=corner.clone().add(before.clone().sub(corner).normalize().multiplyScalar(radius));
      const exit=corner.clone().add(after.clone().sub(corner).normalize().multiplyScalar(radius));
      route.push(entry);
      if(family===4){
        const bend=new THREE.QuadraticBezierCurve3(entry,corner,exit);
        route.push(...bend.getPoints(5).slice(1));
      }else route.push(exit);
    }
    route.push(world.at(-1));
    const speed=[.48,.82,1.15,.61,.96][seed%5];
    const width=[.26,.44,.62,.35][seed%4];
    const phase=(seed%9)*.16,strength=.70+(seed%3)*.12;
    const segment=(start,end,along)=>{
      positions.push(...start.toArray(),...end.toArray());
      conductors.push({floor,z:(start.z+end.z)/2,along,speed,width,phase,strength});
    };
    let total=0;
    for(let i=1;i<route.length;i++)total+=route[i].distanceTo(route[i-1]);
    let distance=0;
    for(let i=1;i<route.length;i++){
      const a=route[i-1],b=route[i],span=a.distanceTo(b),steps=Math.max(1,Math.ceil(span/.22));
      for(let j=0;j<steps;j++)segment(a.clone().lerp(b,j/steps),a.clone().lerp(b,(j+1)/steps),(distance+span*(j+.5)/steps)/total);
      distance+=span;
    }
    // Solder pads are fixed to route endpoints; they light with their conductor.
    const axis=new THREE.Vector3(...project(x+1,z)).sub(new THREE.Vector3(...project(x,z))).normalize();
    const forward=new THREE.Vector3(0,0,1);
    for(const [centre,along] of [[route[0],0],[route.at(-1),1]]){
      const r=seed%3===0?.065:.043;
      for(let i=0;i<16;i++){
        const point=angle=>centre.clone().addScaledVector(axis,Math.cos(angle)*r).addScaledVector(forward,Math.sin(angle)*r);
        segment(point(i*Math.PI/8),point((i+1)*Math.PI/8),along);
      }
    }
    // A few small packages and pins give the routes an identifiable destination.
    if(track===0&&row%3===1&&lane>0){
      const centre=route.at(-1).clone().addScaledVector(forward,-.28);
      const point=(u,v)=>centre.clone().addScaledVector(axis,u).addScaledVector(forward,v);
      const corners=[[-.12,-.16],[.12,-.16],[.12,.16],[-.12,.16]];
      for(let i=0;i<4;i++)segment(point(...corners[i]),point(...corners[(i+1)%4]),1);
      segment(route.at(-1),point(0,.16),1);
      for(const side of [-1,1])for(const v of [-.1,0,.1])segment(point(side*.12,v),point(side*.21,v),1);
    }
  };
  const lanes=mobile?2:3;
  const boardGeometry=new THREE.BoxGeometry(1,1,1);
  const boardMaterial=new THREE.MeshBasicMaterial({color:0x0c1210,transparent:true});
  const boards=new THREE.InstancedMesh(boardGeometry,boardMaterial,2*7*lanes);
  const transform=new THREE.Object3D();let boardIndex=0;
  for(const side of [-1,1])for(let row=0;row<7;row++){
    for(let lane=0;lane<lanes;lane++){
      const level=-2.85-lane*.48,thickness=.12+lane*.06;
      const count=lane===0?2:(mobile?3:3+(row+lane+(side===1?1:0))%2);
      const offsets=lane===0?[.16,.82]:[.05,.39,.78,1.04];
      for(let track=0;track<count;track++){
        const origin=.7+lane*1.35;
        const shift=(((row*3+lane+(side===1?2:0))%5)/4-.5)*.1;
        const start=14-row*9-lane*.65;
        const lengthScale=.78+((row+lane)%3)*.07;
        const stagger=((row*3+lane)%4)*.32+track*.27;
        circuit((x,z)=>[side*(origin+(x-origin)*.48+offsets[track]+shift),level,start+(z-start)*lengthScale-stagger],side,row,lane,track,true);
      }
      transform.position.set(side*(1.275+lane*1.35),level-thickness/2-.018,14-row*9-lane*.65-3.2);
      transform.scale.set(1.3,thickness,6.85);transform.updateMatrix();
      boards.setMatrixAt(boardIndex++,transform.matrix);
    }
    // Occasional inner traces leave an open, irregular centre instead of a dense grid.
    if(row%3===(side===1?1:0)){
      const start=14-row*9;
      circuit((x,z)=>[side*(.28+(x-.7)*.2),-2.98,start+(z-start)*.65-1.1],side,row,0,5,true);
    }
    for(let lane=0;lane<2;lane++)for(let track=0;track<2;track++){
      const origin=.7+lane*1.35;
      circuit((x,z)=>[side*((mobile?4.1:6.5)+lane*.75),origin+(x-origin)*.45+track*.52-2.2,z-2.5*lane-track*.3],side,row,lane,track);
    }
  }
  boards.renderOrder=-1;
  scene.add(boards);resources.push(boardGeometry,boardMaterial);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  const colors=new THREE.Float32BufferAttribute(new Float32Array(positions.length),3);
  colors.setUsage(THREE.DynamicDrawUsage);geometry.setAttribute('color',colors);
  const material=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:1,depthWrite:false});
  scene.add(new THREE.LineSegments(geometry,material));resources.push(geometry,material);
  const idle=new THREE.Color(0x52685e),powered=new THREE.Color(0xffaf32),color=new THREE.Color();
  function update(time,cameraZ=18){
    const fade=1-THREE.MathUtils.smoothstep(time,1.5,2.2);
    material.opacity=fade*.9;boardMaterial.opacity=fade*.4;
    const power=THREE.MathUtils.smoothstep(time,0,.22);
    conductors.forEach(({floor,z,along,speed,width,phase,strength},i)=>{
      // Camera position sets the active region; each route conducts at its own pace.
      const ahead=cameraZ-z;
      const proximity=THREE.MathUtils.smoothstep(ahead,1.5,5)*(1-THREE.MathUtils.smoothstep(ahead,14,25));
      const wave=(time*speed+phase)%1.8-.4;
      const spread=width*(floor?1.22:1);
      const flow=1-THREE.MathUtils.smoothstep(Math.abs(along-wave),spread*.2,spread);
      const charge=Math.min(1,proximity*(floor?.14+.86*flow:flow)*power*strength*(floor?1.28:1));
      const depth=1-THREE.MathUtils.smoothstep(ahead,15,40);
      color.copy(idle).multiplyScalar(floor?.10+.14*depth:.045+.075*depth).lerp(powered,charge);
      colors.setXYZ(i*2,color.r,color.g,color.b);
      colors.setXYZ(i*2+1,color.r,color.g,color.b);
    });
    colors.needsUpdate=true;
  }
  update(0);
  return {update};
}
