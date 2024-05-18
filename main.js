import "./style.css";
import * as THREE from "three";

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x2070e0 })
);
scene.add(box);

const camera = new THREE.PerspectiveCamera(45, 4 / 3);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas,
});

const updateViewport = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};

updateViewport();

window.addEventListener("resize", () => {
  updateViewport();
});

window.addEventListener("dblclick", () => {
  const el = document.fullscreenElement || document.webkitFullscreenElement;

  if (el) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen()) {
      document.webkitExitFullscreen();
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  }
});

const tick = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
