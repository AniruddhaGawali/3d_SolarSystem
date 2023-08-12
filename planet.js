import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const loader = new GLTFLoader();

export function createPlanet(path, size, position, parent) {
  let obj, mesh;
  loader.load(path, (gltf) => {
    gltf.scene.scale.set(size, size, size);
    gltf.scene.position.x = position;

    obj = new THREE.Object3D();
    mesh = gltf.scene;

    obj.add(gltf.scene);
    parent.add(obj);
  });
}
