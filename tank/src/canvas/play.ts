import config from "../config";
import palyModel from "../models/play";
import canvasAbstract from "./canvasAbstract";

export default new(class playCanvas extends canvasAbstract implements ICanvas{
    render(): void {
        this.createModel();
        super.renderModels();
    }
    model(): ModelConstructor{
        return palyModel;
};
    num(): number {
        return 0;
    }
    
    protected createModel(): void {
        const cw = config.canvas.width;
        const ch = config.canvas.height;
        const mw = config.model.width;
        const mh = config.model.height;
        [{ x: cw / 2 + mw * 4, y: ch - mh }].forEach(position=>{
            const model = this.model() as ModelConstructor;
            const instance = new model(position.x,position.y);
            this.models.push(instance);
        });
    }

    /**
     * 重写父类renderModels方法
     */
    public renderModels() {
        this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height);//tank移动后应重新绘制画布。
        super.renderModels()
    }

})("play")