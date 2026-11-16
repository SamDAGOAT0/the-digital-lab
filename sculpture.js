
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// =====================================================
// THE DIGITAL LAB — LIQUID SCULPTURE
// VISUAL IDENTITY 2.0
// =====================================================

const canvas = document.querySelector("#liquid-canvas");

if (!canvas) {
    throw new Error("Liquid sculpture canvas not found.");
}


// =====================================================
// 01 — SCENE
// =====================================================

const scene = new THREE.Scene();


// =====================================================
// 02 — CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
    38,
    1,
    0.1,
    100
);

camera.position.set(0, 0, 6.2);


// =====================================================
// 03 — RENDERER
// =====================================================

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;


// =====================================================
// 04 — LIGHTING
// =====================================================

// Soft ambient violet illumination
const ambientLight = new THREE.AmbientLight(
    0xaaa0ff,
    1.5
);

scene.add(ambientLight);


// Main electric violet light
const violetLight = new THREE.PointLight(
    0x8955ff,
    38
);

violetLight.position.set(2, 2, 3);
scene.add(violetLight);


// Cool blue side illumination
const blueLight = new THREE.PointLight(
    0x477dff,
    34
);

blueLight.position.set(-3, -1, 2);
scene.add(blueLight);


// Cyan rim illumination
const cyanLight = new THREE.PointLight(
    0x55eaff,
    27
);

cyanLight.position.set(0, -2, -3);
scene.add(cyanLight);


// Soft pink backlight
const pinkLight = new THREE.PointLight(
    0xe58bff,
    35
);

pinkLight.position.set(0, 3, -3);
scene.add(pinkLight);


// =====================================================
// 05 — SCULPTURE GEOMETRY
// =====================================================

const sculpture = new THREE.Group();

scene.add(sculpture);

const geometry = new THREE.TorusKnotGeometry(
    1.05,
    0.34,
    320,
    48,
    2,
    3
);


// =====================================================
// 06 — LIQUID GLASS MATERIAL
// =====================================================

const material = new THREE.MeshPhysicalMaterial({

    color: 0x9270ff,

    metalness: 0.08,
    roughness: 0.10,

    transmission: 0.65,
    thickness: 1.8,
    ior: 1.3,

    clearcoat: 1,
    clearcoatRoughness: 0.06,

    iridescence: 0.9,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 700],

    side: THREE.DoubleSide

});


// =====================================================
// 07 — CUSTOM VERTEX DISPLACEMENT
// =====================================================

material.onBeforeCompile = (shader) => {

    shader.uniforms.uTime = {
        value: 0
    };

    shader.uniforms.uMouse = {
        value: new THREE.Vector2(0, 0)
    };


    shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
        uniform float uTime;
        uniform vec2 uMouse;`
    );


    shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>

        float wave1 = sin(position.x * 3.0 + uTime * 1.2);

        float wave2 = cos(position.y * 4.0 - uTime * 0.9);

        float wave3 = sin(position.z * 3.5 + uTime);

        float mouseInfluence =
            sin(position.x * 2.0 + uMouse.x * 3.0) *
            cos(position.y * 2.0 + uMouse.y * 3.0);

        float displacement =
            (wave1 + wave2 + wave3) * 0.035 +
            mouseInfluence * 0.045;

        transformed += objectNormal * displacement;`
    );


    material.userData.shader = shader;

};

material.customProgramCacheKey = () => "tdl-liquid-glass-v2";


// =====================================================
// 08 — CREATE SCULPTURE
// =====================================================

const liquidMesh = new THREE.Mesh(
    geometry,
    material
);

liquidMesh.scale.set(1.05, 1.05, 1.05);

sculpture.add(liquidMesh);


// =====================================================
// 09 — POINTER INTERACTION
// =====================================================

let targetMouseX = 0;
let targetMouseY = 0;

let isDragging = false;

let previousX = 0;
let previousY = 0;

let velocityX = 0;
let velocityY = 0;


canvas.addEventListener("pointermove", (event) => {

    const bounds = canvas.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    targetMouseX = (x - 0.5) * 2;
    targetMouseY = (0.5 - y) * 2;


    if (isDragging) {

        const deltaX = event.clientX - previousX;
        const deltaY = event.clientY - previousY;

        velocityY = deltaX * 0.008;
        velocityX = deltaY * 0.008;

        previousX = event.clientX;
        previousY = event.clientY;

    }

});


canvas.addEventListener("pointerdown", (event) => {

    isDragging = true;

    previousX = event.clientX;
    previousY = event.clientY;

    canvas.setPointerCapture(event.pointerId);

});


function stopDragging() {

    isDragging = false;

}


canvas.addEventListener("pointerup", stopDragging);
canvas.addEventListener("pointercancel", stopDragging);
canvas.addEventListener("lostpointercapture", stopDragging);


// =====================================================
// 10 — RESPONSIVE CANVAS
// =====================================================

function resize() {

    const bounds = canvas.getBoundingClientRect();

    if (!bounds.width || !bounds.height) return;

    camera.aspect = bounds.width / bounds.height;

    camera.updateProjectionMatrix();

    renderer.setSize(
        bounds.width,
        bounds.height,
        false
    );

}


const resizeObserver = new ResizeObserver(resize);

resizeObserver.observe(canvas);

resize();


// =====================================================
// 11 — ANIMATION LOOP
// =====================================================

const clock = new THREE.Clock();


function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();


    // Shader animation
    if (material.userData.shader) {

        material.userData.shader.uniforms.uTime.value = time;

        material.userData.shader.uniforms.uMouse.value.set(
            targetMouseX,
            targetMouseY
        );

    }


    // Natural idle rotation
    if (!isDragging) {

        sculpture.rotation.y += 0.002;
        sculpture.rotation.x += 0.001;

    }


    // Drag momentum
    sculpture.rotation.y += velocityY;
    sculpture.rotation.x += velocityX;

    velocityX *= 0.94;
    velocityY *= 0.94;


    // Gentle breathing
    const breathing = 1 + Math.sin(time * 1.3) * 0.018;

    liquidMesh.scale.setScalar(
        1.05 * breathing
    );


    renderer.render(scene, camera);

}


animate();

console.log("TDL Liquid Sculpture 2.0 initialized.");
