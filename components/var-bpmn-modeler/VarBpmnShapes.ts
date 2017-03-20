/**
 * Created by halil on 11/02/2017.
 */


export class Point{
    public x:number;
    public y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    getX(){

    }
    getY(){

    }
}


export class VarBpmnShape {
    public p:Point;
    constructor(){

    }
}

export class Color {
    value:string
    constructor(value:string) {
        this.value = value;
    }
}


export class Line extends VarBpmnShape {
    public from:Point;
    public to:Point;
    public color:Color;
    public width:number;
    public metric:string;


    constructor(from:Point, to:Point){
        super();
        this.from = from;
        this.to = to;
    }
}



export class Rectangle extends VarBpmnShape {
    public w:number;
    public h:number;
    public color:Color;
    constructor(p:Point, w:number,h:number){
        super();
        this.p = p;
        this.h = h;
        this.w = w;
    }
}

export class Square extends Rectangle {
    constructor(p:Point, x:number) {
        super(p, x, x);
    }
}


export class Circle  extends VarBpmnShape{
    r:number;
    constructor(p:Point, r:number) {
        super();
        this.p = p;
        this.r = r;
    }
}


export class Pentagon  extends VarBpmnShape{
    p1:Point;
    p2:Point;
    p3:Point;
    p4:Point;
    p5:Point;

    constructor(p1:Point, p2:Point, p3:Point, p4:Point, p5:Point ) {
        super();
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.p5 = p5;
    }
}

export class VarBpmnUserTaskShape extends VarBpmnShape {
    public rect:Rectangle = new Rectangle(new Point(0,0),0,0);
    public color:Color = new Color("#fefe55");
    constructor(){
        super();
    }
}

export class VarBpmnManualTaskShape extends VarBpmnShape {
    public rect:Rectangle = new Rectangle(new Point(0,0),0,0);
    public color:Color = new Color("#fefe55");
    constructor(){
        super();
    }
}



export class VarBpmnArrowShape extends VarBpmnShape {
    public from:Point = new Point(0,0);
    public to:Point = new Point(0,0);
    public color:Color = new Color("#111144");
    constructor(){
        super();
    }
}