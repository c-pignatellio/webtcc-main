import { DirectionalLight, HemisphereLight } from 'three';

function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
    5,
  );

  const mainLight = new DirectionalLight('white', 3);
  mainLight.position.set(0, 5, 20);

  return { ambientLight, mainLight };
}

export { createLights };
