import config from "../config";
import tankModel from "../models/tank";
import position from "../service/position";
import canvasAbstract from "./canvasAbstract";

export default new(class waterCanvas extends canvasAbstract implements ICanvas{
    intervalId:number = 0;//保存定期函数的Id用于清理定时器函数。
    render(): void {
        this.createModel();
        this.renderModels();
        this.intervalId = setInterval(()=>this.renderModels(),config.timeout);
    }
    model(): ModelConstructor{
        return tankModel;
    };
    num(): number {
        return config.tank.num;
    }
    

    //为了保证地方tank在画布的最上方生成，这里我们需要重写canvas抽象类的createModel方法。
    protected  createModel(): void {
        for(let i = 0; i <= this.num(); i++){
            const pos = position.position();
            const instance = this.model();
            const model = new instance(pos.x,0);
            this.models.push(model);//仍旧是用抽象类的数组保存地方tank模型
        }
    }

    public renderModels(): void {
        this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height);//擦除画布上的所有元素然后再调用renderModels方法重新绘制。
        super.renderModels();
    }

})("tank")