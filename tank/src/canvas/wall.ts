import config from "../config";
import wallModel from "../models/wall";
import canvasAbstract from "./canvasAbstract";

export default new(class wallCanvas extends canvasAbstract implements ICanvas{
    render(): void {
        super.createModel();
        this.createBossWall();
        super.renderModels();
    }
    model(): ModelConstructor{
        return wallModel;
    };
    num(): number {
        return config.wall.num;
    }
    
    //创建boss围墙模型
    createBossWall(){
        const cw = config.canvas.width;
        const ch = config.canvas.height;
        const mw = config.model.width;
        const mh = config.model.height;
        const pos = [
            { x: cw / 2 - mw * 2, y: ch - mh },
            { x: cw / 2 - mw * 2, y: ch - mh * 2 },
            { x: cw / 2 - mw * 2, y: ch - mh * 3 },
            { x: cw / 2 - mw, y: ch - mh * 3 },
            { x: cw / 2, y: ch - mh * 3 },
            { x: cw / 2 + mw, y: ch - mh * 3 },
            { x: cw / 2 + mw * 2, y: ch - mh * 3 },
            { x: cw / 2 + mw * 2, y: ch - mh * 3 },
            { x: cw / 2 + mw * 2, y: ch - mh * 2 },
            { x: cw / 2 + mw * 2, y: ch - mh },
        ];
        pos.forEach(position=>{
            const model = this.model() as ModelConstructor;
            const instance = new model(position.x,position.y);
            this.models.push(instance);
        })
    }

})("wall");