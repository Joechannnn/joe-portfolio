import * as THREE from '../vendor/three/three.module.min.js';

export const entranceDevices=[
  {type:'computer',index:0,screen:'assets/img/crm/dashboard-overview.png'},
  {type:'phone',index:4,screen:'assets/img/vfit-home.png'},
  {type:'tablet',index:6,screen:'assets/img/bba-report-green.jpg'},
  {type:'phone',index:5,screen:'assets/img/readtongue-welcome.jpg'},
  {type:'computer',index:0,screen:'assets/img/crm/campaign-builder.png'},
  {type:'tablet',index:6,screen:'assets/img/bba-aura-concept.webp'}
];

function outline(w,h,r){
  const s=new THREE.Shape(),x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}

export async function createEntranceDevice(spec){
  const image=new Image();image.src=spec.screen;await image.decode();
  const root=new THREE.Group();root.name=spec.type;root.userData.spec=spec;
  const metal=new THREE.MeshStandardMaterial({color:0x687477,metalness:.88,roughness:.26});
  const casing=new THREE.MeshStandardMaterial({color:0x20292d,metalness:.65,roughness:.29});
  const glass=new THREE.MeshStandardMaterial({color:0x080d10,metalness:.2,roughness:.17});
  const lens=new THREE.MeshStandardMaterial({color:0x122b3a,metalness:.65,roughness:.1});
  function plate(name,w,h,d,r,material,x=0,y=0,z=0){
    const geometry=new THREE.ExtrudeGeometry(outline(w,h,r),{depth:d,steps:1,bevelEnabled:true,bevelSize:.014,bevelThickness:.014,bevelSegments:3,curveSegments:16});
    geometry.translate(0,0,-d/2);
    const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.position.set(x,y,z);root.add(mesh);return mesh;
  }
  const phone=spec.type==='phone',tablet=spec.type==='tablet';
  const w=phone?2.12:4.8,h=phone?4.5:tablet?3.52:3.05,d=phone?.21:tablet?.17:.23,r=phone?.26:tablet?.20:.12;
  plate('Aluminium chassis',w,h,d,r,metal);
  plate('Solid rear shell',w-.04,h-.04,.036,r-.02,casing,0,0,-d/2-.015);
  plate('Front bezel',w-.035,h-.035,.024,r-.02,glass,0,0,d/2+.015);
  const sw=w-(phone?.16:tablet?.23:.22),sh=h-(phone?.26:tablet?.23:.24);
  const canvas=document.createElement('canvas');canvas.width=phone?800:1440;canvas.height=Math.round(canvas.width*sh/sw);
  const c=canvas.getContext('2d');
  // Screen artwork is applied separately from the device geometry.
  const scale=Math.max(canvas.width/image.width,canvas.height/image.height);
  c.drawImage(image,(canvas.width-image.width*scale)/2,0,image.width*scale,image.height*scale);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
  const geometry=new THREE.ShapeGeometry(outline(sw,sh,phone?.19:tablet?.1:.035),24);
  const pos=geometry.attributes.position,uv=geometry.attributes.uv;
  for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+sw/2)/sw,(pos.getY(i)+sh/2)/sh);
  const display=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));
  display.name='Screen — '+spec.screen;display.position.z=d/2+.043;root.add(display);
  if(phone||tablet){
    plate('Power button',.035,phone?.42:.3,.09,.015,metal,w/2+.017,.64,0);
    plate('Volume button',.035,.42,.075,.015,metal,-w/2-.017,.55,0);
    // Rear camera housing and lenses are geometry, visible when the camera passes.
    const size=phone?.47:.26;
    plate('Rear camera housing',size,size,.05,.08,casing,-w/2+.36,h/2-.36,-d/2-.052);
    const count=phone?2:1;
    for(let i=0;i<count;i++){
      const ring=new THREE.Mesh(new THREE.CylinderGeometry(.071,.071,.035,24),metal);
      ring.rotation.x=Math.PI/2;ring.position.set(-w/2+.36,h/2-.27-i*.17,-d/2-.1);root.add(ring);
      const eye=new THREE.Mesh(new THREE.CircleGeometry(.053,24),lens);eye.rotation.y=Math.PI;
      eye.position.copy(ring.position);eye.position.z-=.020;root.add(eye);
    }
    if(phone)plate('Earpiece',.31,.016,.013,.007,casing,0,h/2-.063,d/2+.035);
    else {
      const eye=new THREE.Mesh(new THREE.CircleGeometry(.027,16),lens);eye.position.set(0,h/2-.06,d/2+.043);root.add(eye);
    }
  }else{
    plate('Stand neck',.34,.76,.19,.035,metal,0,-h/2-.30,-.07);
    const foot=plate('Stand foot',1.78,.95,.075,.13,metal,0,-h/2-.68,.12);foot.rotation.x=-Math.PI/2;
    const eye=new THREE.Mesh(new THREE.CircleGeometry(.023,16),lens);eye.position.set(0,h/2-.055,d/2+.044);root.add(eye);
    // The stand neck meets both the case back and foot without a visible gap.
  }
  root.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(root),center=bounds.getCenter(new THREE.Vector3());
  root.children.forEach(child=>child.position.sub(center));
  root.userData.width=w;root.userData.screen=spec.screen;
  // Give the animation an explicit release path, including unused shared materials.
  root.userData.resources=[metal,casing,glass,lens,texture];
  root.traverse(o=>{if(o.isMesh){root.userData.resources.push(o.geometry,...(Array.isArray(o.material)?o.material:[o.material]));}});
  return root;
}
