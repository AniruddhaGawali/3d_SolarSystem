import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createPlanet } from './planet';

const loader = new GLTFLoader();

import starsTexture from './public/stars.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000000
);

const backgroundTexture = new THREE.CubeTextureLoader();
scene.background = backgroundTexture.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

let sun;

let solarSys = {
  mercury: undefined,
  venus: undefined,
  earth: undefined,
  earthMoon: undefined,
  mars: undefined,
  jupiter: undefined,
  saturn: undefined,
  uranus: undefined,
  neptune: undefined,
};

loader.load('./public/model/Sun.glb', (gltf) => {
  sun = gltf.scene;
  gltf.scene.scale.set(1, 1, 1);
  // gltf.scene.position.x = 100;
  scene.add(gltf.scene);

  loader.load('./public/model/Mercury.glb', (gltf) => {
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.position.x = 1000;

    const obj = new THREE.Object3D();
    solarSys.mercury = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });

  loader.load('./public/model/Venus.glb', (gltf) => {
    gltf.scene.scale.set(0.25, 0.25, 0.25);
    gltf.scene.position.x = 1500;

    const obj = new THREE.Object3D();
    solarSys.venus = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });

  loader.load('./public/model/EarthClouds.glb', (gltf) => {
    gltf.scene.scale.set(0.35, 0.35, 0.35);
    gltf.scene.position.x = 2500;

    const obj = new THREE.Object3D();
    solarSys.earth = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);

    loader.load('./public/model/Moon.glb', (gltf) => {
      gltf.scene.scale.set(0.4, 0.4, 0.4);
      gltf.scene.position.x = 1000;

      const obj = new THREE.Object3D();
      solarSys.earthMoon = { mesh: gltf.scene, obj: obj };

      obj.add(gltf.scene);
      solarSys.earth.mesh.add(obj);
    });
  });

  loader.load('./public/model/Mars.glb', (gltf) => {
    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.position.x = 3500;

    const obj = new THREE.Object3D();
    solarSys.mars = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });

  loader.load('./public/model/Jupiter.glb', (gltf) => {
    gltf.scene.scale.set(0.8, 0.8, 0.8);
    gltf.scene.position.x = 5000;

    const obj = new THREE.Object3D();
    solarSys.jupiter = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });

  loader.load('./public/model/Saturn.glb', (gltf) => {
    gltf.scene.scale.set(0.7, 0.7, 0.7);
    gltf.scene.position.x = 6500;

    const obj = new THREE.Object3D();
    solarSys.saturn = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });

  loader.load('./public/model/Uranus.glb', (gltf) => {
    gltf.scene.scale.set(0.6, 0.6, 0.6);
    gltf.scene.position.x = 7500;

    const obj = new THREE.Object3D();
    solarSys.uranus = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });

  loader.load('./public/model/Neptune.glb', (gltf) => {
    gltf.scene.scale.set(0.55, 0.55, 0.55);
    gltf.scene.position.x = 8300;

    const obj = new THREE.Object3D();
    solarSys.neptune = { mesh: gltf.scene, obj: obj };

    obj.add(gltf.scene);
    sun.add(obj);
  });
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const pointLight = new THREE.PointLight(0xffffff, 100000000, 10000000000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);
  // sun.rotation.y += 0.01;
  solarSys.mercury.mesh.rotation.y += 0.09;
  solarSys.mercury.obj.rotation.y += 0.07;

  solarSys.venus.mesh.rotation.y += 0.07;
  solarSys.venus.obj.rotation.y += 0.05;

  solarSys.earth.mesh.rotation.y += 0.05;
  solarSys.earth.obj.rotation.y += 0.015;

  solarSys.earthMoon.mesh.rotation.y += 0.07;
  solarSys.earthMoon.obj.rotation.y += 0.05;

  solarSys.mars.mesh.rotation.y += 0.03;
  solarSys.mars.obj.rotation.y += 0.008;

  solarSys.jupiter.mesh.rotation.y += 0.01;
  solarSys.jupiter.obj.rotation.y += 0.005;

  solarSys.saturn.mesh.rotation.y += 0.008;
  solarSys.saturn.obj.rotation.y += 0.0015;

  solarSys.uranus.mesh.rotation.y += 0.005;
  solarSys.uranus.obj.rotation.y += 0.0007;

  solarSys.neptune.mesh.rotation.y += 0.002;
  solarSys.neptune.obj.rotation.y += 0.0005;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
