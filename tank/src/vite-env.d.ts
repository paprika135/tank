/// <reference types="vite/client" />


interface ModelConstructor{
    //这个东西是构造器签名
    new (x:number,y:number):IModel
}


interface IModel{
    x:number
    y:number
    width:number
    height:number
    render():void
}

interface ICanvas{
    model():ModelConstructor
    num():number
    ctx:CanvasRenderingContext2D
    renderModels:viod
    models:IModel[]
}