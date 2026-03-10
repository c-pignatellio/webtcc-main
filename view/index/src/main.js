import { World } from './World/World.js';

async function main() {
 
  const container = document.querySelector('div.treJs');
  console.log(container);

  const world = new World(container);
  console.log(world);
  await world.init();
  
  world.start();
}

main().catch((err) => {
  console.error(err);
});