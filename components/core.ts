

export enum VarangInterceptor {Before=0, After=1}

export class VarangEvent {
    source:any;
    target:any;
    value:any;    
    intercept:VarangInterceptor=VarangInterceptor.Before; //before, after

    constructor(s:any,t:any,v:any,i:VarangInterceptor){
      this.source = s;
      this.target = t;
      this.value = v;
      this.intercept = i;
   }   

}



export class VarTabHeaderModel {
    name:string;
    order:number;
}

export class VarTabContentModel {
    name:string;
}

export class TabEvent {
  success:boolean = false;
}
