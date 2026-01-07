// 3d-creature-creator.js
// Simple 3D creature creator using Three.js (premium feature)
let isPremiumUser = false; // Toggle for demo; in real app, check user status
function show3DCreatureCreator() {
  const section = document.getElementById('creature3DSection');
  if (!isPremiumUser) {
    section.innerHTML = '<div style="color:#D32F2F;font-size:1.2em;font-weight:600;margin:32px 0;">🔒 This is a premium feature. <button style="background:#FFD700;color:#D32F2F;border:none;border-radius:8px;padding:8px 18px;font-size:1em;font-weight:600;cursor:pointer;">Upgrade</button></div>';
    return;
  }
  section.innerHTML = '<div id="threeContainer" style="width:100%;height:320px;background:#222;border-radius:16px;margin-bottom:18px;"></div><button id="saveCreature3DBtn" style="background:#FFD700;color:#222;border:none;border-radius:8px;padding:10px 24px;font-size:1.1em;font-weight:600;cursor:pointer;">Save Creature</button>';
  // Load Three.js and basic 3D creature
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js';
  script.onload = () => {
    const container = document.getElementById('threeContainer');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth/container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    // Simple creature: body (sphere), head (smaller sphere), legs (cylinders)
    const body = new THREE.Mesh(new THREE.SphereGeometry(1,32,32), new THREE.MeshStandardMaterial({color:0xFFD700}));
    body.position.y = 0;
    scene.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.6,32,32), new THREE.MeshStandardMaterial({color:0xFF69B4}));
    head.position.y = 1.2;
    scene.add(head);
    for(let i=-1;i<=1;i+=2){
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,1,16), new THREE.MeshStandardMaterial({color:0x9370DB}));
      leg.position.set(i*0.5,-1,0);
      scene.add(leg);
    }
    const light = new THREE.PointLight(0xffffff,1,100);
    light.position.set(5,5,5);
    scene.add(light);
    camera.position.z = 4;
    function animate(){requestAnimationFrame(animate);body.rotation.y+=0.01;head.rotation.y+=0.01;renderer.render(scene,camera);}
    animate();
  };
  document.body.appendChild(script);
}
document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('creature3DSection'))show3DCreatureCreator();
});
