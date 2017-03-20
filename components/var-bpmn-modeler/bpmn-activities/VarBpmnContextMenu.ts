/**
 * Created by halil on 26/02/2017.
 */



import {
    Component, EventEmitter, ComponentFactoryResolver, Renderer, ViewChild, ElementRef,
    ViewContainerRef, Output, HostListener, Input
} from '@angular/core';
import {varConsole} from "../../util/VarConsole";
import {ActiveDraggable, VarBpmnService} from "../VarBpmnService";


@Component({
    selector: 'div[VarBpmnContextMenu]',
    styleUrls: ['resources/fonts/bpmn-font/css/bpmn.css'],

    template: `
        <div class="djs-palette-entries">
        <div class="group" data-group="tools">
            <div class="entry bpmn-icon-hand-tool" draggable
                 [dragData]="'hand-tool'" title="Activate the hand tool"></div>
            <div class="entry bpmn-icon-lasso-tool" draggable
                 [dragData]="'lasso-tool'" title="Activate the lasso tool"></div>
            <div class="entry bpmn-icon-space-tool" draggable
                 [dragData]="'space-tool'"
                 title="Activate the create/remove space tool"></div>
            <div class="entry bpmn-icon-connection-multi" draggable (onDragStart)="onDragStartConnection($event)" 
                [dragData]="'connect.bpmn.arrow'"
                title="Connect using Sequence/MessageFlow or Association" style="width:20px;" style="font-size:24px;"></div>
            <hr class="separator">
            
        </div>
        </div>
    `,
    styles: [`

      :host{
        position: absolute;
    }
    
    
    `],
    host: {
        '[style.left]': 'getXM()',
        '[style.top]': 'getYM()',
        '[style.width]': 'getWidthM()',
        '[style.height]': 'getHeightM()',
        '[style.display]':'getDisplay()'


    }
})
export class VarBpmnContextMenu{

    id: string;
    title: string;
    x: number = 40;
    y: number = 40;
    width:number=80;
    height:number=40;

    parent:any=null;

    metric:string="px";

    visible:boolean=false;

    constructor(private bpmnService:VarBpmnService){

    }

    getDisplay(){
        return this.visible?"block":"none";
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
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


    setX(x: number): void {
        this.x = x;
    }

    setY(y: number): void {
        this.y = y;
    }




    onDragStartConnection(e){
        this.bpmnService.activeDraggable = ActiveDraggable.CONNECTION;
    }

}