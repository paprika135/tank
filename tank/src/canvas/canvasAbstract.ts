import config from "../config";
import position from "../service/position";

export default abstract class canvasAbstract {
    abstract num():number;//用于返回从配置项文件中获取元素的个数。
    abstract model():ModelConstructor;//用于获取model类
    abstract render():void;//在main.ts入口文件中，就是调用这个方法真正开始在画布上渲染模型图片的。
    public models:IModel[] = [];//用于存储模型，在后期我们可以用它来保证元素
    constructor(public name:string,protected app:HTMLDivElement = document.querySelector('#app') as HTMLDivElement,
    protected el:HTMLCanvasElement = document.createElement('canvas'),
    public ctx:CanvasRenderingContext2D = el.getContext('2d')!
    ) {
        this.createCanvas();//创建画布
    }

    protected createCanvas(){
        this.el.width = config.canvas.width;
        this.el.height = config.canvas.height;
        this.el.setAttribute("name",this.name);
        this.app.insertAdjacentElement('afterbegin',this.el);
    }

    protected createModel(){
        position.positionCollection(this.num()).forEach(position => {
            const instance = this.model() as ModelConstructor;
            const model = new instance(position.x,position.y);
            this.models.push(model);
        });
    }

    public renderModels(){
        this.models.forEach(model=>{
            model.render();
        })
    }
}