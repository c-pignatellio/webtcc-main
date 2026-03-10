import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {setupModel} from './setup.js';



async function loadStuff() {
const loader = new GLTFLoader();

const stuffData = await loader.loadAsync('/assets/ecostuff/EcoStuff.glb');

console.log("Esnupi", stuffData);
const stuff = setupModel(stuffData);
console.log(stuff);
return {stuff};
}

export { loadStuff };