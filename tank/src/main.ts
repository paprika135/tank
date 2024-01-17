import './style.scss'
import straw from "./canvas/straw";
import { promise } from "./service/images";
import config from './config';
import steel from './canvas/steel';
import wall from './canvas/wall';
import water from './canvas/water';
import tank from './canvas/tank';
import boss from './canvas/boss';
import play from './canvas/play';
const app = document.querySelector<HTMLDivElement>("#app")!;
app.style.width = config.canvas.width + "px";
app.style.height = config.canvas.height + "px";


async function bootstrap() {
    await Promise.all(promise);
    straw.render();
    steel.render();
    wall.render();
    water.render();
    tank.render();
    boss.render();
    play.render();
}

bootstrap()
