import { WebGLRenderer } from 'three';

function createRenderer(container) {
  
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth,container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
