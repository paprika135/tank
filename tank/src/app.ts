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
import bullet from './canvas/bullet';
import audio from './service/audio';
const app = document.querySelector<HTMLDivElement>("#app")!;
app.style.width = config.canvas.width + "px";
app.style.height = config.canvas.height + "px";

export default {
    isStart:false,//不允许用户每点击一次appdiv标签我们就开始一次游戏。
    interval:0,//定时器id
    state:9, //这个9是我们随便设置的
    async bootstrap() {
        app.addEventListener('click',async () => {
            await this.start();
            this.interval = setInterval(()=>{
                if(tank.models.length == 0) this.state = 1;//等于1说明输了
                if(play.models.length == 0 || boss.models.length == 0){
                    //敌方tank和boss都没了说明游戏结束了。
                    this.state = 0;//等于0说明赢了
                }
                if(this.state != 9) this.stop();
            },100)
        })
    },
    async start(){
        if(this.isStart === true)  return;//如果游戏已经开始了，此时用户再次点击鼠标我们就直接return就好了。
        audio.start();//播放游戏音效
        this.isStart = true;
        app.style.backgroundImage = 'none';//在游戏开始时我们直接让app的背景图片为空就可以了
        await Promise.all(promise);//加载模型图片
        straw.render();
        steel.render();
        wall.render();
        water.render();
        tank.render();
        boss.render();
        play.render();
        bullet.render();
    },
    stop(){
        clearInterval(this.interval);//清理掉定时器函数
        tank.stop();//清理掉敌方tank画布中的定时器函数
        bullet.stop();//清理掉子弹画布中的定时器函数
        this.text();//游戏的结束画面
    },
    text(){
        const el = document.createElement('canvas');//此时我们需要在app容器的最上方绘制一个画布
        el.width = config.canvas.width;
        el.height = config.canvas.height;
        const ctx = el.getContext('2d')!;
        ctx.fillStyle = 'red';
        ctx.font = '80px CascadiaMono';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(
            this.state == 1 ? '恭喜你，赢得胜利' : '游戏结束',
            config.canvas.width / 2,
            config.canvas.height / 2
        );
        app.appendChild(el);//在游戏结束后将文字追加到画布的中央
    }
}