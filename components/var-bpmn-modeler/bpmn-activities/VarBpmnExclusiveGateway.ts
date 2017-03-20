/**
 * Created by halil on 12/02/2017.
 */


import {
    Component, EventEmitter, ComponentFactoryResolver, Renderer, ViewChild, ElementRef,
    ViewContainerRef, Output, HostListener
} from '@angular/core';
import {VarBpmnActivitiObject} from "./VarBpmnActivitiObject";
import {VarBpmnActivitiable} from "./VarBpmnActivitiable";
import {UUID} from "angular2-uuid";
import {DDDropEvent} from "../../directives/DragDrop";
import {BpmnDragData, ConnectEvent} from "../core";
import {Point, Line} from "../VarBpmnShapes";
import {VarBpmnArrow} from "./VarBpmnArrow";
import {HtmlHelper} from "../../helpers/HtmlHelper";
import {varConsole} from "../../util/VarConsole";
import {BpmnActivitiType} from "../VarBpmnService";

//see: http://stackoverflow.com/questions/17217766/two-divs-side-by-side-fluid-display
//see: http://codepen.io/daveboling/pen/jWOorz
//see: http://www.monkeyandcrow.com/blog/drawing_lines_with_css3/
@Component({
    selector: 'div[VarBpmnExclusiveGateway]',
    styleUrls: ['resources/fonts/bpmn-font/css/bpmn.css'],

    template: `


    <div  #container class="container" droppable draggable   (onDrop)="onSomethingDropped($event)">
        <div  class="component entry bpmn-icon-gateway-xor" draggable title="Create Xor Gateway" [dragData]="'create.exclusive-gateway'" (click)="showContextMenu($event)"></div>
        <div class="menu">
        
                        <div class="entry bpmn-icon-connection-multi" draggable 
                             [dragData]="dragDataConnect"
                             title="Activate the global connect tool" style="width:20px;"  [style.display]="menuDisplay" (onDragStart)="dragStarted($event)" ></div>
                        <hr class="separator">
                    </div>
            <!--<div class="entry bpmn-icon-connection-multi"  draggable (onDragStart)="dragStarted($event)" 
			[dragData]="dragDataConnect"
			title="Connect using Sequence/MessageFlow or Association"></div>
            -->
                  
    </div>

`,
    styles: [`

      :host{
        position: absolute;
    }
    
    
    .container {
        width: 80px;
        margin: 0;
        padding: 2px;
        position: relative;
        clear: both;
    }
    .component {
        border-radius: 10px;
        font-size:24px !important;
        height: 100%;
        float: left;
    }
    .menu {
        margin-left: 50px;
        height: 100%;
        position: relative;
    }

     
    `],
    host: {
        '[style.left]': 'getX()',
        '[style.top]': 'getY()',
        '[style.width]': 'getWidth()',
        '[style.height]': 'getHeight()'

    }
})
export class VarBpmnExclusiveGateway implements VarBpmnActivitiable {
    arrowCondition:string;

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
    assignee: string;

    type: number = BpmnActivitiType.ExclusiveGateway;
    fromId: string[];
    toId: string[];
    active:boolean=false;
    fromArrow:VarBpmnArrow[];
    toArrow:VarBpmnArrow[];

    id: string;
    title: string;
    x: number = 0;
    y: number = 0;
    width:number=90;
    height:number=50;
    metric:string="px";
    connectionPoints:Point[]=[];

    dragDataConnect:BpmnDragData={type:'connect',  fromConnectionPoints:this.connectionPoints, source:null};
    dragDataEdit:BpmnDragData={type:'edit',  fromConnectionPoints:this.connectionPoints, source:null};

    isContentMenuVisible:boolean=false;
    @Output() onConnect:EventEmitter<ConnectEvent> = new EventEmitter<ConnectEvent>();
    //private resolver: ComponentFactoryResolver = ComponentFactoryResolver.NULL;
    //private renderer: Renderer= new Renderer();
    //private htmlHelper: HtmlHelper = new HtmlHelper();
    @ViewChild("container") containerEl:ElementRef;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    menuDisplay:string="none";

    constructor(private resolver: ComponentFactoryResolver) {
        this.id = UUID.UUID();
    }

    getConnectionPoints(){
        return [];
    }
    getXM(){
        return this.x+this.metric;
    }
    getYM(){
        return this.y+this.metric;
    }

    getWidthM(){
        return this.width+this.metric;
    }

    getHeightM(){
        return this.height+this.metric;
    }


    getWidth(): number {
        return undefined;
    }

    getHeight(): number {
        return undefined;
    }

    getX(): number {
        return undefined;
    }

    getY(): number {
        return undefined;
    }

    setX(x: number): void {
    }

    setY(y: number): void {
    }

    onSomethingDropped(e:DDDropEvent){
        if (e.dragData.type=="connect"){
            varConsole.info("connect started");
            this.onConnect.emit(
                {
                    line:new Line(e.dragData.sourcePosition, this.position()),
                    fromConnectionPoints:e.dragData.fromConnectionPoints,
                    toConnectionPoints:this.connectionPoints,
                });
            //this.connect(e.dragData.sourcePosition, this.position());
        }
    }


    @HostListener("onConnect",['$event'])
    connected(e:ConnectEvent){
        varConsole.info("connected inside start event");
        this.cbConnectHandler(e);
    }



    cbConnectHandler:(event:ConnectEvent)=>any;

    init(pos:Point, cbConnectHandler:(event:ConnectEvent)=>any){
        this.x = pos.x;
        this.y = pos.y;
        this.setConnectionPoints();
        this.cbConnectHandler = cbConnectHandler;
    }

    dragStarted(e:DragEvent){

        this.dragDataConnect.fromConnectionPoints = this.connectionPoints;
        e.dataTransfer.setData('application/json', JSON.stringify(this.dragDataConnect));
    }

    public position(): Point {
        return new Point(this.x, this.y);
    }

    public setConnectionPoints() {
        let leftTop:Point=new Point(this.x, this.y);
        //let centerTop:Point=new Point(this.x+this.width/2, this.y);
        let centerRight:Point=new Point(this.x+this.width-62, this.y+this.height/2-6);
        //let centerBottom:Point=new Point(this.x+this.width/2-17, this.y+this.height);
        let centerLeft:Point=new Point(this.x-80, this.y+this.height/2);

        //this.connectionPoints = [centerTop, centerRight, centerBottom, centerLeft];
        this.connectionPoints = [centerRight, centerLeft];
    }

    showContextMenu(e){
        this.isContentMenuVisible=!this.isContentMenuVisible;
        this.menuDisplay = this.isContentMenuVisible?"block":"none";
    }

    setPosition(clientX: number, clientY: number): void {
        this.x = clientX;
        this.y = clientY;
    }

    getBpmnDefinition(): string {
        return undefined;
    }

    getDiagramDefinition(): string {
        return undefined;
    }
}