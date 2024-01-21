/// <reference types="vite/client" />


interface ModelConstructor{
    //这个东西是构造器签名
    new (x:number,y:number):IModel
}

interface bulletModelConstructor{
    new (tank:IModel):IModel
}


interface IModel{
    x:number
    y:number
    width:number
    height:number
    render():void
    tank?:Imodel
    direction:string
    name:string
    destroyModel():void
}

interface ICanvas{
    removeModel(model:IModel):void
    model():bulletModelConstructor | ModelConstructor
    num():number
    ctx:CanvasRenderingContext2D
    renderModels:viod
    models:IModel[]
}