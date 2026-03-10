import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color().setHex(0xE2E9E3);

  return scene;
}

export { createScene };
