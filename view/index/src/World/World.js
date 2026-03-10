import { loadStuff } from './components/stuff/Stuff.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { AxesHelper, Frustum } from 'three';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
//import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';

let camera;
let renderer;
let scene;
let loop;


class World {
  constructor(container) {
    
    console.log("1");
    camera = createCamera(container);

    renderer = createRenderer(container);
    
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    
    /*
    const axesHelper = new AxesHelper( 5 );
    scene.add( axesHelper );
    */
    const controls = createControls(camera, renderer.domElement);
    const { ambientLight, mainLight } = createLights();
    
    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);
    //const resizer = new Resizer(container, camera, renderer);
    
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
    
  }

  stop() {
    loop.stop();
  }

  async init()
  {
    var {stuff} = await loadStuff();
    scene.add(stuff);
    console.log(stuff.position);
    stuff.position.y -= 5
    stuff.position.x -= 3
    stuff.position.z += 3
    window.addEventListener('resize',this.onResize)
  };

  onResize() {

    const aspect = container.clientWidth / container.clientHeight;

    camera.left = - 20 * aspect/2;
    camera.right = 20 * aspect/2;
    camera.top =  20 /2;
    camera.bottom = 20/2;
    console.log("works");
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth,container.clientHeight);
  }

}

export { World };
