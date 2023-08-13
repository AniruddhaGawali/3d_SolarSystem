import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import config from './config.json';

const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 10000000);
camera.position.z = 100;

import starsTexture from '/stars.jpg';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(300, 300);
document.getElementById('planetImage').appendChild(renderer.domElement);

const backgroundTexture = new THREE.CubeTextureLoader();
scene.background = backgroundTexture.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

let currentPlanet;

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
// orbit.enableZoom = false;

export function addPlanet(activePlanet) {
  if (activePlanet) {
    scene.remove(currentPlanet);
    for (const planet in config) {
      if (planet === activePlanet.name) {
        try {
          loader.load(config[planet].path, (gltf) => {
            gltf.scene.scale.set(0.1, 0.1, 0.1);
            gltf.scene.name = planet;
            currentPlanet = gltf.scene;
            scene.add(currentPlanet);
            setPlanetInfo(config[planet]);
          });
        } catch (e) {}
      }
    }
  }
}

function setPlanetInfo(planet) {
  document.getElementById('planetInfo').innerHTML = `<h2>${planet.name}</h1>
  <p> ${planet.description} </p>
  `;
}

addPlanet();

function animate() {
  requestAnimationFrame(animate);

  if (currentPlanet) {
    currentPlanet.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

const light = new THREE.AmbientLight(0xffffff, 5); // soft white light
scene.add(light);
animate();
