import { OrthographicCamera} from 'three';

const frust = 25;


function createCamera(container) {
  const aspect = container.clientWidth / container.clientHeight;
  const camera = new OrthographicCamera(frust * aspect / -2, frust * aspect /2 ,frust / 2, frust /-2, 0.1, 1000);
  camera.position.set(40, 25, 50);
  
  return camera;
}

export { createCamera , frust};