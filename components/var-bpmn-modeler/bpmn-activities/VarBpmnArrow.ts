import {VarBpmnActivitiable} from "./VarBpmnActivitiable";
import {Component} from '@angular/core';
import {Point} from "../VarBpmnShapes";
import {UUID} from "angular2-uuid";
import {BpmnActivitiType} from "../VarBpmnService";


//see: http://stackoverflow.com/questions/19382872/how-to-connect-html-divs-with-lines
/**
 * Created by halil on 11/02/2017.
 */
@Component({
    selector: 'div[VarBpmnArrow]',
    styles:[`
.i_ {
    position: absolute;
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
}

.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
`],
    host:{
        '[style.position]': "'absolute'",
        '[style.transform]': "transform",
        '[style.height]': "width",
        '[style.width]': "length",
        '[style.background]': "color",
        '[style.transform-origin]': "'0 100%'",
        '[style.left]': "left",
        '[style.top]': "top"
    },
    template:`
<div class="i_ right" [ngStyle]="triangleCss"></div>
    `


})

export class VarBpmnArrow implements VarBpmnActivitiable {
    class: string;
    delegateExp: string;
    resultVarName: string;
    expression: string;
    classField: string;
    isForCompensation: string;
    element: string;
    cardinality: string;
    asynchronous: string;
    multiInstanse: number;
    collection: string;
    completionCondition: string;
    formKey: string;
    priority;
    exclusice: boolean;
    documentation: string;
    serviceClass: string;
    type:number=BpmnActivitiType.Arrow;
    fromId: string[]=[];
    toId: string[]=[];
    id: string;
    title: string;
    from:Point;
    to:Point;
    fromArrow:VarBpmnActivitiable[];
    toArrow:VarBpmnActivitiable[];
    width:string="1px";
    length:string="0px";
    left:string;
    top:string;
    color:string="#000000";
    transform: string="";
    active:boolean=false;
    assignee:string;
    triangleCss;
    arrowCondition: string;



    constructor() {
        this.id = UUID.UUID();

    }

    getTriangleX(){
        return this.to.x+"px";
    }
    getTriangleY(){
        return this.to.y+"px";
    }
    getWidth(): number {
        return this.distance(this.from, this.to);
    }

    getHeight(): number {
        return 2;
    }

    getX(): number {
        return this.from.x;
    }

    getY(): number {
        return this.from.y;
    }

    setX(x: number): void {
    }

    setY(y: number): void {
    }

    getConnectionPoints(){
        return [];
    }

    init (from:VarBpmnActivitiable, to:VarBpmnActivitiable, width:string="1px", color:string="#000000"){
            if (from==undefined || from==null || to==undefined || to==null)
                return;
            this.id = "ar" + UUID.UUID().substr(0, 4);
            let line: {from: Point, to: Point} = this.findShortestLine(from.getConnectionPoints(), to.getConnectionPoints());
            this.from = line.from;
            this.to = line.to;
            this.width = width;
            this.color = color;
            this.enPosition(this.from, this.to);

    }

    public angle():number{
        return Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x) * 180 / Math.PI;
    }

    public angleTarget(targetX:number, targetY:number):number{
        return Math.atan2(targetY - this.from.y, targetX - this.from.x) * 180 / Math.PI;
    }

    public enPosition(from: Point, to: Point) {


            if (this.possibleDrawing(from, to)==false)
                return;
            var length = this.distance(from, to)-5;//for arrow triange -5
            this.length = length+"px";
            var angle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
            this.transform = 'rotate(' + angle + 'deg)';
            this.left = from.x+"px";
            this.top = from.y+"px";
            this.triangleCss = {marginLeft:length+"px",marginTop:"-2.5px", width:"5px", height:"5px"};


    }

       possibleDrawing(from: Point, to: Point):boolean{ 
        if (from===undefined || to===undefined || from===null || to===undefined) 
            return false; 
        if (from.x===undefined || from.y===undefined || to.x===undefined || to.y===undefined) 
            return false; 
        if (from.x===null || from.y===null || to.x===null || to.y===null) 
            return false; 
        return true;
     }   
    private distance(from: Point, to: Point):number {
        if (this.possibleDrawing(from, to)==false)
            return 0;
        var length = Math.sqrt((from.x - to.x) * (from.x - to.x) + (from.y - to.y) * (from.y - to.y)); 
        return length;
     }



    position(): Point {
        return this.from;
    }

    private findShortestLine(froms: Point[], tos: Point[]) {
        let length=-1;
        let from:Point;
        let to:Point;

        froms.forEach((f, findex)=>{
            tos.forEach((t,tindex)=>{
                let length_ = this.distance(f,t);
                if (length==-1){
                    length=length_;
                } else {
                    if (length_<length){
                        from=f;
                        to=t;
                        length=length_;
                    }
                }
            })
        });

        return {
            from:from,
            to:to
        };
    }


    setPosition(clientX: number, clientY: number): void {
        this.left = clientX+"px";
        this.top = clientY+"px";
    }


    getBpmnDefinition():string{
        if (this.arrowCondition!=undefined && this.arrowCondition!=null && this.arrowCondition.trim().length>0 )
            return `<sequenceFlow id="${this.id}" sourceRef="${this.fromId}" targetRef="${this.toId}">
                <conditionExpression xsi:type="tFormalExpression"><![CDATA[${this.arrowCondition}]]></conditionExpression>
            </sequenceFlow>`;
        return `<sequenceFlow id="${this.id}" sourceRef="${this.fromId}" targetRef="${this.toId}"></sequenceFlow>`;
    }


    getDiagramDefinition():string {
        return `<bpmndi:BPMNEdge bpmnElement="${this.id}" id="BPMNEdge_${this.id}">
        <omgdi:waypoint x="${this.from.x}" y="${this.from.y}"></omgdi:waypoint>
        <omgdi:waypoint x="${this.to.x}" y="${this.to.y}"></omgdi:waypoint>
      </bpmndi:BPMNEdge>`;
    }






     arcondKeyup(text:string){
         this.arrowCondition = text;
     }
}