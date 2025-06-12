export const textConstant = (str:string):string=>{
    if(str.length > 20){
        str = str.slice(0,20);
        str+=' ...';
    }
    return  str;
}