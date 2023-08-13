import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { addPlanet } from './info.js';

const loader = new GLTFLoader();

import starsTexture from '/stars.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000000
);

scene.add(camera);

const planets = new THREE.Group();
const mouse = new THREE.Vector2();
const mouse3D = new THREE.Vector3();
const raycaster = new THREE.Raycaster();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ---------------------------------------------------------------

const backgroundTexture = new THREE.CubeTextureLoader();
scene.background = backgroundTexture.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

let activePlanet = undefined;
let sun;
let solarSys = {
  sun: undefined,
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

loader.load('/model/Sun.glb', (gltf) => {
  sun = gltf.scene;
  gltf.scene.scale.set(1, 1, 1);
  gltf.scene.name = 'sun';

  solarSys.sun = {
    mesh: gltf.scene,
    name: 'sun',
    distance: 0,
    rotationSpeed: 0.01,
    revolutionSpeed: 0,
    size: 1,
  };

  addPlanet(solarSys.sun);
  const obj = new THREE.Object3D();
  obj.name = 'sun';
  obj.add(gltf.scene);
  planets.add(obj);
});

//Mercury
loader.load('/model/Mercury.glb', (gltf) => {
  gltf.scene.scale.set(0.2, 0.2, 0.2);
  gltf.scene.position.x = 1000;

  const obj = new THREE.Object3D();
  solarSys.mercury = {
    mesh: gltf.scene,
    obj: obj,
    name: 'mercury',
    distance: 1000,
    rotationSpeed: 0.09,
    revolutionSpeed: 0.007,
    size: 0.2,
  };
  obj.name = 'mercury';

  obj.add(gltf.scene);
  planets.add(obj);
});

//Venus
loader.load('/model/Venus.glb', (gltf) => {
  gltf.scene.scale.set(0.25, 0.25, 0.25);
  gltf.scene.position.x = 1500;

  const obj = new THREE.Object3D();
  solarSys.venus = {
    mesh: gltf.scene,
    obj: obj,
    name: 'venus',
    distance: 1500,
    rotationSpeed: 0.07,
    revolutionSpeed: 0.005,
    size: 0.25,
  };
  obj.name = 'venus';

  obj.add(gltf.scene);
  planets.add(obj);
});

//Earth
loader.load('/model/EarthClouds.glb', (gltf) => {
  gltf.scene.scale.set(0.35, 0.35, 0.35);
  gltf.scene.position.x = 2500;

  const obj = new THREE.Object3D();
  solarSys.earth = {
    mesh: gltf.scene,
    obj: obj,
    name: 'earth',
    distance: 2500,
    rotationSpeed: 0.05,
    revolutionSpeed: 0.0015,
    size: 0.35,
  };
  obj.name = 'earth';

  obj.add(gltf.scene);
  planets.add(obj);

  //Earth Moon
  loader.load('/model/Moon.glb', (gltf) => {
    gltf.scene.scale.set(0.4, 0.4, 0.4);
    gltf.scene.position.x = 2000;

    const obj = new THREE.Object3D();
    solarSys.earthMoon = {
      mesh: gltf.scene,
      obj: obj,
      name: 'earthMoon',
      distance: 1000,
      rotationSpeed: 0.07,
      revolutionSpeed: 0.007,
      size: 0.4,
    };
    obj.name = 'earthMoon';

    obj.add(gltf.scene);
    solarSys.earth.mesh.add(obj);
  });
});

//Mars
loader.load('/model/Mars.glb', (gltf) => {
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.x = 3500;

  const obj = new THREE.Object3D();
  solarSys.mars = {
    mesh: gltf.scene,
    obj: obj,
    name: 'mars',
    distance: 3500,
    rotationSpeed: 0.03,
    revolutionSpeed: 0.0008,
    size: 0.4,
  };
  obj.name = 'mars';

  obj.add(gltf.scene);
  planets.add(obj);
});

//Jupiter
loader.load('/model/Jupiter.glb', (gltf) => {
  gltf.scene.scale.set(0.85, 0.85, 0.85);
  gltf.scene.position.x = 5000;

  const obj = new THREE.Object3D();
  solarSys.jupiter = {
    mesh: gltf.scene,
    obj: obj,
    name: 'jupiter',
    distance: 5000,
    rotationSpeed: 0.01,
    revolutionSpeed: 0.0005,
    size: 0.85,
  };
  obj.name = 'jupiter';

  obj.add(gltf.scene);
  planets.add(obj);
});

//Saturn
loader.load('/model/Saturn.glb', (gltf) => {
  gltf.scene.scale.set(0.7, 0.7, 0.7);
  gltf.scene.position.x = 6500;

  const obj = new THREE.Object3D();
  solarSys.saturn = {
    mesh: gltf.scene,
    obj: obj,
    name: 'saturn',
    distance: 6500,
    rotationSpeed: 0.008,
    revolutionSpeed: 0.00015,
    size: 0.7,
  };
  obj.name = 'saturn';

  obj.add(gltf.scene);
  planets.add(obj);
});

//Uranus
loader.load('/model/Uranus.glb', (gltf) => {
  gltf.scene.scale.set(0.6, 0.6, 0.6);
  gltf.scene.position.x = 7500;

  const obj = new THREE.Object3D();
  solarSys.uranus = {
    mesh: gltf.scene,
    obj: obj,
    name: 'uranus',
    distance: 7500,
    rotationSpeed: 0.005,
    revolutionSpeed: 0.00007,
    size: 0.6,
  };
  obj.name = 'uranus';

  obj.add(gltf.scene);
  planets.add(obj);
});

//Neptune
loader.load('/model/Neptune.glb', (gltf) => {
  gltf.scene.scale.set(0.55, 0.55, 0.55);
  gltf.scene.position.x = 8300;

  const obj = new THREE.Object3D();
  solarSys.neptune = {
    mesh: gltf.scene,
    obj: obj,
    name: 'neptune',
    distance: 8300,
    rotationSpeed: 0.002,
    revolutionSpeed: 0.00002,
    size: 0.55,
  };
  obj.name = 'neptune';

  obj.add(gltf.scene);
  planets.add(obj);
});

scene.add(planets);

// ---------------------------------------------------------------

function onPointerMove(event) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  mouse3D.x = mouse.x;
  mouse3D.y = mouse.y;
  mouse3D.z = 0.5;
}

function resetHoverPlanet() {
  document.body.style.cursor = 'default';
}

function onHoverPlanet() {
  try {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.children);
    if (intersects.length > 0) {
      const name = intersects[0].object.parent.parent.name;
      for (const key in solarSys) {
        if (solarSys[key].name === name) {
          document.body.style.cursor = 'pointer';
        }
      }
    }
  } catch (err) {}
}

function onClickPlanet() {
  try {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.children);
    if (intersects.length > 0) {
      const name = intersects[0].object.parent.parent.name;
      for (const key in solarSys) {
        if (solarSys[key].name === name) {
          activePlanet = solarSys[key];
          addPlanet(activePlanet);
          document.getElementById('info').style.display = 'flex';
          if (name === 'sun') {
            scene.add(camera);
          } else {
            solarSys[key].obj.add(camera);
            camera.position.set(0, 0, 0);
            camera.position.x = solarSys[key].distance;
          }
        }
      }
    }
  } catch (err) {}
}

function animate() {
  requestAnimationFrame(animate);
  resetHoverPlanet();
  onHoverPlanet();

  if (sun) {
    sun.rotation.y += 0.01;
  }

  if (solarSys.mercury) {
    solarSys.mercury.mesh.rotation.y += 0.09;
    solarSys.mercury.obj.rotation.y += 0.007;
  }

  if (solarSys.venus) {
    solarSys.venus.mesh.rotation.y += 0.07;
    solarSys.venus.obj.rotation.y += 0.005;
  }

  if (solarSys.earth) {
    solarSys.earth.mesh.rotation.y += 0.05;
    solarSys.earth.obj.rotation.y += 0.0015;
  }

  if (solarSys.earthMoon) {
    solarSys.earthMoon.mesh.rotation.y += 0.007;
    solarSys.earthMoon.obj.rotation.y += 0.005;
  }

  if (solarSys.mars) {
    solarSys.mars.mesh.rotation.y += 0.03;
    solarSys.mars.obj.rotation.y += 0.0008;
  }

  if (solarSys.jupiter) {
    solarSys.jupiter.mesh.rotation.y += 0.01;
    solarSys.jupiter.obj.rotation.y += 0.0005;
  }

  if (solarSys.saturn) {
    solarSys.saturn.mesh.rotation.y += 0.008;
    solarSys.saturn.obj.rotation.y += 0.00015;
  }

  if (solarSys.uranus) {
    solarSys.uranus.mesh.rotation.y += 0.005;
    solarSys.uranus.obj.rotation.y += 0.00007;
  }

  if (solarSys.neptune) {
    solarSys.neptune.mesh.rotation.y += 0.002;
    solarSys.neptune.obj.rotation.y += 0.00002;
  }
  renderer.render(scene, camera);
}

animate();

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const pointLight = new THREE.PointLight(0xffffff, 100000000, 10000000000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClickPlanet);

export { activePlanet };
