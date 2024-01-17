import config from "../config";

type positionType = {
    x:number,y:number
}

export default new(class Position{
    collection:positionType[] = []
    public positionCollection(num:number):positionType[]{
        const collection = [] as positionType[];
        for(let i = 0; i < num; i++){
            while(true){
                const position = this.position();
                const exist = this.collection.some(p=> p.x == position.x && p.y == position.y);
                if(!exist){
                    collection.push(position);//这个是类中定义的数组
                    this.collection.push(position);
                    break;
                }
            }
        }
        return collection;
    }

    //用于创建随机的坐标
    position(){
        return {
            x:Math.floor(Math.random() * (config.canvas.width / config.model.width)) * config.model.width,
            y:Math.floor(Math.random() * ((config.canvas.height / config.model.height) - 5)) * config.model.height + config.model.height * 2
        }
    }
})();

