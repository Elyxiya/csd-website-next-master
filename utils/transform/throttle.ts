export function throttle(fn:any, interval:number,str?:string) {

  let lastTime = 0;

 
  return function (...args: any[]) {
   
    const nowTime = Date.now();
    
    if (nowTime - lastTime >= interval) {
     
      fn.apply(this, args);
      
      lastTime = nowTime;
    }
    else if(str){
     const remainingTime = interval - (nowTime - lastTime);
      console.log(`${str}请${Math.ceil(remainingTime/1000)}秒后再试`);
    }
  };
}