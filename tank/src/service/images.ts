import config from "../config";


type mapKey = keyof typeof config.images;

export const imgs = new Map<mapKey,HTMLImageElement>();

export const promise = Object.entries(config.images).map(([key,value])=>{
    return new Promise(resolve=>{
        const img = document.createElement("img")!;
        img.src = value;
        img.onload = ()=>{
            imgs.set(key as mapKey,img);
            resolve(img);
        }
    })
});