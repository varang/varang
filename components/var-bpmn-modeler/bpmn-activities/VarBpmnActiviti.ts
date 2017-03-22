/**
 * Created by halil on 12/02/2017.
 */


import {
    Component, EventEmitter, ComponentFactoryResolver, Renderer, ViewChild, ElementRef,
    ViewContainerRef, Output, HostListener, Input
} from '@angular/core';
import {VarBpmnActivitiObject} from "./VarBpmnActivitiObject";
import {VarBpmnActivitiable} from "./VarBpmnActivitiable";
import {UUID} from "angular2-uuid";
import {DDDropEvent, DDDragEvent} from "../../directives/DragDrop";
import {BpmnDragData, ConnectEvent} from "../core";
import {Point, Line} from "../VarBpmnShapes";
import {VarBpmnArrow} from "./VarBpmnArrow";
import {HtmlHelper} from "../../helpers/HtmlHelper";
import {varConsole} from "../../util/VarConsole";
import {VarBpmnService, BpmnActivitiType} from "../VarBpmnService";
import {VarBpmnModelerContainer} from "../VarBpmnModelerContainer";

//see: http://stackoverflow.com/questions/17217766/two-divs-side-by-side-fluid-display
//see: http://codepen.io/daveboling/pen/jWOorz
//see: http://www.monkeyandcrow.com/blog/drawing_lines_with_css3/
@Component({
    selector: 'div[VarBpmnActiviti]',
    styleUrls: ['resources/fonts/bpmn-font/css/bpmn.css'],

    template: `
        <template [ngIf]="id">
            <div *ngIf="type===BpmnActivitiType_.UserTask" [ngClass]="cssClass_">[UT]<span>{{assignee}}</span></div>
            <div *ngIf="type===BpmnActivitiType_.ServiceTask" [ngClass]="cssClass_"><span class="entry bpmn-icon-service"></span><span style="font-size:12px;">{{title}}</span></div>
            <div *ngIf="type===BpmnActivitiType_.ScriptTask" [ngClass]="cssClass_"><span class="entry bpmn-icon-script"></span><span style="font-size:12px;">{{title}}</span></div>
            <div *ngIf="type===BpmnActivitiType_.StartEvent" [ngClass]="cssClass_" title="Create StartEvent"></div>
            <div *ngIf="type===BpmnActivitiType_.EndEvent" [ngClass]="cssClass_" title="Create EndEvent"></div>
            <div *ngIf="type===BpmnActivitiType_.ExclusiveGateway" [ngClass]="cssClass_" title="Create ExclusiveGateway"></div>
        </template>
    `,
    styles: [`

      :host{
        position: absolute;
    }
    
    
    
    .bpmnusertask {
        height:100%;
        width:100%;
        border-radius: 7px;
        background: #fefefe;
        margin: 0;
        padding: 2px;
        position: relative;
        clear:both;
        
    }
    
    .bpmnservicetask {
        height:100%;
        width:100%;
        border-radius: 7px;
        background: #fefefe;
        margin: 0;
        padding: 2px;
        position: relative;
        font-size:24px;
        clear:both;
        
    }
    
    .bpmnevent {
        font-size:24px !important;
    }
   


     
    `],
    host: {
        '[style.left]': 'getXM()',
        '[style.top]': 'getYM()',
        '[style.width]': 'getWidthM()',
        '[style.height]': 'getHeightM()',
        '[style.margin]': '0',
        '[style.padding]': '0',
        ['draggable']:'true'



    }
})
export class VarBpmnActiviti implements VarBpmnActivitiable {
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
    BpmnActivitiType_: typeof BpmnActivitiType = BpmnActivitiType;

    type:BpmnActivitiType=null;
    id: string=null;
    fromId: string[];
    toId: string[];
    fromArrow:VarBpmnActivitiable[];
    toArrow:VarBpmnActivitiable[];
    from:Point;
    to:Point;
    title: string="t143";
    x: number = 0;
    y: number = 0;


    metric:string="px";
    cssClass_:string="";

    assignee:string="";
    serviceClass:string="fer";

    active:boolean=false;
    @Input() dropScope: string = 'ModelerEntities';
    @Output() onDrop: EventEmitter<DDDropEvent> = new EventEmitter();
    @Input() dragOverClass: string;
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();



    //private resolver: ComponentFactoryResolver = ComponentFactoryResolver.NULL;
    //private renderer: Renderer= new Renderer();
    //private htmlHelper: HtmlHelper = new HtmlHelper();
    connectionPoints:Point[];
    @ViewChild("container") containerEl:ElementRef;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    private parentCallbacks:{[name:string]:(e:any)=>any};
    private cbDragStartHandler: (e: any) => any;


    cbConnectHandler:(event:ConnectEvent)=>any;
    private modeler: VarBpmnModelerContainer;


    constructor(private resolver: ComponentFactoryResolver, private bpmnService:VarBpmnService) {
        this.id = UUID.UUID();
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    getWidth(){
        let width = [];
        width[BpmnActivitiType.StartEvent] = 24;
        width[BpmnActivitiType.EndEvent] = 24;
        width[BpmnActivitiType.ExclusiveGateway] = 24;

        width[BpmnActivitiType.UserTask] = 80;
        width[BpmnActivitiType.ServiceTask] = 80;
        width[BpmnActivitiType.ScriptTask] = 80;


        let width_ = width[this.type];
        return width_;
    }

    getHeight(){
        let height = [];
        height[BpmnActivitiType.StartEvent] = 24;
        height[BpmnActivitiType.EndEvent] = 24;
        height[BpmnActivitiType.UserTask] = 40;
        height[BpmnActivitiType.ServiceTask] = 40;
        height[BpmnActivitiType.ScriptTask] = 40;


        height[BpmnActivitiType.ExclusiveGateway] = 24;

        let width_ = height[this.type];
        return width_;
    }

    cssClass(){
        let classes = [];
        classes[BpmnActivitiType.StartEvent] = "bpmnevent entry bpmn-icon-start-event-none";
        classes[BpmnActivitiType.EndEvent] = "bpmnevent entry bpmn-icon-end-event-none";
        classes[BpmnActivitiType.UserTask] = "bpmnusertask";
        classes[BpmnActivitiType.ServiceTask] = "bpmnservicetask";
        classes[BpmnActivitiType.ScriptTask] = "bpmnservicetask";

        classes[BpmnActivitiType.ExclusiveGateway] = "bpmnevent entry bpmn-icon-gateway-xor";

        let class_ = classes[this.type];
        return class_;

    }


    getXM(){
        return this.x+this.metric;
    }
    getYM(){
        return this.y+this.metric;
    }

    getWidthM(){
        return this.getWidth()+this.metric;
    }

    getHeightM(){
        return this.getHeight()+this.metric;
    }


    setX(x: number): void {
        this.x = x;

    }

    setY(y: number): void {
        this.y = y;
    }

    setPosition(clientX: number, clientY: number): void {
    }




    @HostListener("onConnect",['$event'])
    connected(e:ConnectEvent){
        varConsole.info("connected inside usertask");
        this.cbConnectHandler(e);
    }



    init(type:BpmnActivitiType, pos:Point, modeler:VarBpmnModelerContainer,  cbs:{[name:string]:(arg:any)=>any}){
        this.id = "ut"+UUID.UUID().substr(0,4);
        this.type = type;
        this.cssClass_ = this.cssClass();
        this.modeler = modeler;
        this.x = pos.x-this.getWidth();
        this.y = pos.y;
        this.connectionPoints = this.getConnectionPoints();

    }




    public position(): Point {
        return new Point(this.x, this.y);
    }

    public getConnectionPoints() {
        let leftTop:Point=new Point(this.x, this.y);
        let centerTop:Point=new Point(this.x+this.getWidth()/2, this.y);
        let centerRight:Point=new Point(this.x+this.getWidth(), this.y+this.getHeight()/2);
        let centerBottom:Point=new Point(this.x+this.getWidth()/2, this.y+this.getHeight());
        let centerLeft:Point=new Point(this.x, this.y+this.getHeight()/2);

        return [centerTop, centerRight, centerBottom, centerLeft];
    }










    @HostListener('drop', ['$event'])
    drop(e) {
        e.preventDefault();
        e.stopPropagation();
        let data=null;
        try {
            data = JSON.parse(e.dataTransfer.getData('application/json'));
        } catch (e) {
            data = null;

        }

        if (data==null) {
            return;
        }
        if (data.startsWith("connect.bpmn.")==false)
            return;

        if (data.startsWith("connect.bpmn.arrow")==true) {
            this.drawArrowFrom(this.bpmnService.focusedBpmnObject);
        }

    }

    private drawArrowFrom(from: VarBpmnActivitiable) {
        let to:VarBpmnActiviti = this;
        this.modeler.drawArrow(from,to);
        this.modeler.doJobsOnEmptyAreas();
    }





    getBpmnDefinition():string{
        let defs:string[]=[];
        defs[BpmnActivitiType.UserTask] = `<userTask id="${this.id}" name="User Task"  activiti:assignee="${this.assignee}"></userTask>`;
        defs[BpmnActivitiType.StartEvent] =  `<startEvent id="${this.id}" name="Start"></startEvent>`;
        defs[BpmnActivitiType.EndEvent] =  `<endEvent id="${this.id}" name="End"></endEvent>`;
        defs[BpmnActivitiType.ExclusiveGateway] =  `<exclusiveGateway id="${this.id}" name="Exclusive Gateway"></exclusiveGateway>`;
        defs[BpmnActivitiType.ServiceTask] =  this.getServiceTaskDefinition();
        //defs[BpmnActivitiType.ScriptTask] =  `<scriptTask id="${this.id}" name="${this.title}" activiti:expression="${this.expression}"></scriptTask>`;
        defs[BpmnActivitiType.ScriptTask] =  `<scriptTask id="${this.id}" name="${this.title}" scriptFormat="groovy"><script><![CDATA[${this.expression}]]></script></scriptTask>`;


        return defs[this.type];
    }


    getDiagramDefinition():string {
        return `<bpmndi:BPMNShape bpmnElement="${this.id}" id="BPMNShape_${this.id}">
            <omgdc:Bounds height="${this.getHeight()}" width="${this.getWidth()}" x="${this.getX()}" y="${this.getY()}"></omgdc:Bounds>
        </bpmndi:BPMNShape>`;
    }

    private getServiceTaskDefinition() {
        if (this.type!=this.BpmnActivitiType_.ServiceTask)
            return;

        if (this.expression!=undefined && this.serviceClass!=undefined )
            if (this.expression.replace(/^\s+|\s+$/g,'').length>0 && this.serviceClass.replace(/^\s+|\s+$/g,'').length>0  ) {
                throw new Error("Service task icin expression ve class tanimini ayni tanimlanamaz. Lutfen sadece birini tanimlayiniz.")
            }

        if (this.serviceClass!=undefined && this.serviceClass.trim().length>0)
            return `<serviceTask id="${this.id}" name="${this.title}" activiti:class="${this.serviceClass}"></serviceTask>`

        if (this.expression!=undefined && this.expression.trim().length>0)
            return `<serviceTask id="${this.id}" name="${this.title}" activiti:expression="#{${this.expression}}"></serviceTask>`
        else
            throw new Error ("Lutfen service task icin class veya expresion giriniz.");
    }
}