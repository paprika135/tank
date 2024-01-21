export default {
    //直接获取body中设置的用于播放音乐audio元素
    el(id:string){
        return document.querySelector<HTMLAudioElement>(id)!;
    },
    start(){
        this.el('#aStart').play();
    },
    fire(){
        this.el('#aFire').play();
    },
    blast(){
        this.el('#aBlast').play();
    }
}