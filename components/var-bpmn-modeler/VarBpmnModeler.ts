/**
 * Created by halil on 11/02/2017.
 */

import {
    Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, Renderer,
    ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector, forwardRef, HostListener
} from '@angular/core';
import {VarBpmnActivitiObject} from "./bpmn-activities/VarBpmnActivitiObject";
import {HtmlHelper} from "../helpers/HtmlHelper";
import {VarBpmnActiviti} from "./bpmn-activities/VarBpmnActiviti";
import {VarBpmnArrow} from "./bpmn-activities/VarBpmnArrow";
import {VarBpmnModelerContainer} from "./VarBpmnModelerContainer";
import {varConsole} from "../util/VarConsole";
import {VarBpmnService, BpmnActivitiType} from "./VarBpmnService";
import {VarBpmnPropertyEditor} from "./VarBpmnPropertyEditor";
import {VarBpmnActivitiable} from "./bpmn-activities/VarBpmnActivitiable";



@Component({
    selector: 'div[VarBpmnModeler]',
    styles: [`
    .varbpmnpalette {
        font-size: x-large;
      width: 40px;
      float: left;
    }
    .varbpmnmodelercontainer {
      margin-left: 40px;
      background-color: #dff0d8;
      width: 800px;
      height: 500px;
      /* Change this to whatever the width of your left column is*/
    }
    .clear {
      clear: both;
    }


    .draggable {
        height: 30px;
        width: 20px;
        background-color: Green;
        position: absolute;
        cursor: move;
    }
`],
    styleUrls:['resources/fonts/bpmn-font/css/bpmn.css'],
    templateUrl: 'app/components/varang-components/var-bpmn-modeler/VarBpmnModeler.html'

})
export class VarBpmnModeler implements AfterViewInit {
    @Input() packagePrefix="org.halilagin";
    debugMessage:string="";
    mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
    };
    private isMouseDown = false;

    @Input() width:number=400;
    @Input() height:number=400;

    @Input() rectW:number=20;
    @Input() rectH:number=30;
    rectColor:string = "#fefe55";

    private boundary: any = {};
    private draggable: any;
    context:CanvasRenderingContext2D;

    @ViewChild("container") containerEl:ElementRef;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    //@ViewChild('draggable') private draggableElement: ElementRef;

    @ViewChild(forwardRef(() => VarBpmnModelerContainer)) bpmnContainer: VarBpmnModelerContainer;
    @ViewChild(forwardRef(() => VarBpmnPropertyEditor)) propertyEditor: VarBpmnPropertyEditor;

    visibleActivities_:BpmnActivitiType[]=[];

    constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer, private htmlHelper: HtmlHelper, private bpmnService:VarBpmnService) {

    }

    ngOnInit() {
        this.visibleActivities_ = [
            BpmnActivitiType.UserTask,
            BpmnActivitiType.StartEvent,
            BpmnActivitiType.EndEvent,
            BpmnActivitiType.ExclusiveGateway,
            BpmnActivitiType.ServiceTask,
            BpmnActivitiType.ScriptTask





        ];
        //this.draggable = this.draggableElement.nativeElement;

        // const container = this.containerEl.nativeElement;
        // this.boundary = {
        //     left : container.offsetLeft + (this.rectW / 2),
        //     right : container.clientWidth + container.offsetLeft - (this.rectW / 2),
        //     top : container.offsetTop + (this.rectH / 2),
        //     bottom : container.clientWidth + container.offsetTop - (this.rectH / 2),
        // }
    }

    ngAfterViewInit() {
        //let canvas_ = this.containerEl.nativeElement;
        //this.context = canvas_.getContext("2d");
       // this.tick();
    }



    // tick() {
    //     requestAnimationFrame(()=> {
    //         this.tick()
    //     });
    //
    //     var ctx = this.context;
    //     ctx.clearRect(0, 0, this.width, this.height);
    //     ctx.fillStyle = this.rectColor;
    //     ctx.fillRect(50, 50, this.rectW, this.rectH);
    // }

//see: http://stackoverflow.com/questions/17408010/drawing-a-rectangle-using-click-mouse-move-and-click
//see: http://lishman.io/angular-2-event-binding
//see: http://lishman.io/angular-2-event-binding
//see: https://www.lucidchart.com/techblog/2016/07/19/building-angular-2-components-on-the-fly-a-dialog-box-example/
//https://plnkr.co/edit/Op9dYqWTZsb98E90wN8V?p=preview

    setMousePosition(event?:MouseEvent) {

        // if(event) {
        //     let left = event.pageX - this.containerEl.nativeElement.offsetLeft;
        //     let top = event.pageY - this.containerEl.nativeElement.offsetTop;
        //     let viewport = this.htmlHelper.getViewport();
        //
        //
        //     //fit
        //     if(left < document.body.scrollLeft) {
        //         left = document.body.scrollLeft;
        //     }
        //
        //     //fit
        //     if(top < document.body.scrollTop) {
        //         top = document.body.scrollTop;
        //     }
        //     this.mouse.x = left;
        //     this.mouse.y = top;
        //
        // }


    }

    private isInsideBoundary(event: MouseEvent) {
        return event.clientX > this.boundary.left &&
            event.clientX < this.boundary.right &&
            event.clientY > this.boundary.top &&
            event.clientY < this.boundary.bottom;
    }

    private onMouseMove(event: MouseEvent): void {
        this.setMousePosition(event);
        if (this.isMouseDown && this.isInsideBoundary(event)) {
            //this.renderer.setElementStyle(this.draggable, 'left', event.clientX - (this.rectW / 2) + "px");
            //this.renderer.setElementStyle(this.draggable, 'top', event.clientY - (this.rectH / 2) + "px");
        }
    }


    private onMouseButton(event: MouseEvent): void {
        this.isMouseDown = event.buttons === 1;
    }


//(onDrop)="onBpmnActivitiDropped($event)"

    //@HostListener('drop', ['$event'])
    onBpmnActivitiDropped(e) {
        varConsole.info(e);
        this.bpmnContainer.putBpmnActivitiIntoModeler(e);
    }


    handleFocusedActiviti(e:VarBpmnActivitiable){
        //alert(1);
        this.propertyEditor.focusedActiviti = e;
    }




}

