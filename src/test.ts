import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nian_bean") as HTMLCanvasElement });
const canvas = renderer.domElement;

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
scene.background = new THREE.Color().setRGB(1, 1, 1);

const loader = new THREE.TextureLoader();
const texture = loader.load("/assets/Nian2_diff.png");
const geometry = new THREE.BoxGeometry(1, 0.1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 2;

const dragOffset = new THREE.Vector2();
const targetPos = new THREE.Vector3();
const rotationOffset = new THREE.Euler();
const rotationBase = new THREE.Euler(Math.PI / 2, -5 * Math.PI / 180, 0, 'XYZ');

cube.setRotationFromEuler(rotationBase);
const dampening = 10;

let isDragging = false;
let dragStart = { x: 0, y: 0 };
let cubeStartPos = { x: 0, y: 0 };
let idleSpinZ = 0;


const pixelToWorld = (px: number, py: number) => {
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const halfW = halfH * camera.aspect;
    return {
        x: (px / canvas.width) * halfW * 2,
        y: -(py / canvas.height) * halfH * 2,
    };
};


canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart = { x: e.clientX, y: e.clientY };
    cubeStartPos = { x: cube.position.x, y: cube.position.y };
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const w = pixelToWorld(dx, dy);
    targetPos.set((cubeStartPos.x + w.x) / dampening, (cubeStartPos.y + w.y) / dampening, 0);
    dragOffset.set(dx, dy);

    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    const angle2 = Math.min(magnitude / dampening, Math.PI / 3);  

    rotationOffset.set(1 * (rotationBase.x + Math.sin(angle) * angle2), rotationBase.y, -1 * (Math.cos(angle) * angle2));
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    targetPos.set(0, 0, 0);
    rotationOffset.set(rotationBase.x, rotationBase.y, rotationBase.z);
    idleSpinZ = cube.rotation.z;
});

canvas.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        targetPos.set(0, 0, 0);
        rotationOffset.set(rotationBase.x, rotationBase.y, rotationBase.z);
        idleSpinZ = cube.rotation.z;
    }
});


const clock = new THREE.Timer();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsed();

    if (isDragging) {
        cube.position.lerp(targetPos, 0.1);

        cube.rotation.x += (rotationOffset.x - cube.rotation.x) * 0.1;
        cube.rotation.y += (rotationOffset.y - cube.rotation.y) * 0.1;
        cube.rotation.z += (rotationOffset.z - cube.rotation.z) * 0.1;
    } else {
        cube.position.lerp(new THREE.Vector3(0, Math.sin(time) * 0.08, 0), 0.05);

        cube.rotation.x += (rotationBase.x - cube.rotation.x) * 0.05;
        cube.rotation.y += 0;
        idleSpinZ = Math.sin(time * 0.5) * 0.5;
        cube.rotation.z += (idleSpinZ - cube.rotation.z) * 0.05;
    }
    renderer.render(scene, camera);
    clock.update();
}
animate();


export {};


const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
    <h1></h1>
  `;
}
