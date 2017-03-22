/**
 * Created by halil on 14/02/2017.
 */
/**
 * Created by halil on 12/02/2017.
 */
/**
 * Created by halil on 11/02/2017.
 */

import {
    Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, Renderer,
    ViewContainerRef, ComponentFactoryResolver, HostListener, forwardRef
} from '@angular/core';
import {HtmlHelper} from "../helpers/HtmlHelper";
import {VarBpmnActiviti} from "./bpmn-activities/VarBpmnActiviti";
import {VarBpmnArrow} from "./bpmn-activities/VarBpmnArrow";
import {Droppable, DDDropEvent, DDDragEvent} from "../directives/DragDrop";
import {Point} from "./VarBpmnShapes";
import {ConnectEvent} from "./core";
import {varConsole} from "../util/VarConsole";
import {VarBpmnActivitiable} from "./bpmn-activities/VarBpmnActivitiable";
import {VarBpmnContextMenu} from "./bpmn-activities/VarBpmnContextMenu";
import {VarBpmnService, ActiveDraggable, BpmnActivitiType, GenericActiviti} from "./VarBpmnService";
import {varBpmnHelper} from "./bpmn-activities/VarBpmnHelper";



@Component({
    selector: 'div[VarBpmnModelerContainer]',

    host:{
        '[style.position]':"'absolute'",
        '[style.width]':"'800px'",
        '[style.height]':"'500px'",
        '[style.background-color]':"'#dedede'"




    },
    styles: [`

`],
    template: `

<div> mouse:({{mouse.x}},{{mouse.y}})</div>
<div #container></div>
 <div #contextMenu VarBpmnContextMenu></div>

`

})
export class VarBpmnModelerContainer implements AfterViewInit {

    mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
        xOnObject:0,
        yOnObject:0

    };


    private isMouseDown = false;

    @Input() dropScope: string = 'ModelerEntities';
    @Output() onDrop: EventEmitter<DDDropEvent> = new EventEmitter();
    @Input() dragOverClass: string;
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

    @ViewChild("container") containerEl:ElementRef;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild(forwardRef(() => VarBpmnContextMenu)) contextMenu: VarBpmnContextMenu;


    @Output() onFocusedActiviti:EventEmitter<VarBpmnActivitiable> = new EventEmitter<VarBpmnActivitiable>();

    constructor(private meRef: ElementRef, private resolver: ComponentFactoryResolver, private renderer: Renderer, private htmlHelper: HtmlHelper, private bpmnService:VarBpmnService) {

    }


    mouseOnWhichObject(x,y){

        let item_:VarBpmnActivitiable=null;
        this.bpmnService.bucket.forEach((item)=>{
            let rectangleX:number[] =[];
            let rectangleY:number[] =[];
            if (item!=null) {
                if (item.type===BpmnActivitiType.Arrow){
                    let arrow_:VarBpmnArrow= <VarBpmnArrow>item;
                    let abs_=Math.abs( arrow_.angle()-arrow_.angleTarget(x,y));
                    if (abs_<2)
                        item_= item;
                } else {
                    rectangleX = [item.getX(), item.getX() + item.getWidth()];
                    rectangleY = [item.getY(), item.getY() + item.getHeight()];
                    if (x >= rectangleX[0] && x <= rectangleX[1] && y >= rectangleY[0] && y <= rectangleY[1]) {
                        varConsole.info(rectangleX + ":" + rectangleY);
                        item_ = item;
                    }
                }
            }

        });

        return item_;
    }

    addToBucket(item:VarBpmnActivitiable){
        this.bpmnService.bucket.push(item);
    }

    deleteFromBucketById(id:string){
        this.bpmnService.bucket.forEach((item, index)=>{
            if (id==item.id )
                this.bpmnService.bucket.splice(index,1);
        });
    }

    findActivitiById(id:string){
        let activiti:VarBpmnActivitiable=null;
        this.bpmnService.bucket.forEach((item, index)=>{
            if (id==item.id )
                activiti = item;
        });
        return activiti;
    }
    deleteFromBucket(item:VarBpmnActivitiable){
        this.deleteFromBucketById(item.id);
    }


    @HostListener('mousedown', ['$event'])
    mouseDown(e){
        varConsole.info("mousedown");
        this.isMouseDown= true;
        if (this.contextMenu.visible==true) {
            return;//keep previous focused object active, else search for new focused one.
        }

        this.bpmnService.focusedBpmnObject =  this.mouseOnWhichObject(this.mouse.x, this.mouse.y)
        if (this.bpmnService.focusedBpmnObject!=null) {
            this.bpmnService.activeDraggable=ActiveDraggable.ACTIVITI;
            this.mouse.xOnObject = e.clientX - this.bpmnService.focusedBpmnObject.getX();
            this.mouse.yOnObject = e.clientY - this.bpmnService.focusedBpmnObject.getY();
        }

        return;
    }


    @HostListener('click', ['$event'])
    mouseClick(e){
        let newfocusedObject:VarBpmnActivitiable =  this.mouseOnWhichObject(this.mouse.x, this.mouse.y)
        if (newfocusedObject==null){//clicked on empty area
            this.doJobsOnEmptyAreas();
        } else {
            //clicked on a different object
            this.bpmnService.focusedBpmnObject = newfocusedObject;
            varConsole.info("clicked activiti id:"+this.bpmnService.focusedBpmnObject.id);
            this.bpmnService.focusedBpmnObject.active=true;
            this.emitActiveActiviti(this.bpmnService.focusedBpmnObject);
            this.showTheContextMenu(this.bpmnService.focusedBpmnObject);
        }

        return true;
    }


    @HostListener('mouseup', ['$event'])
    mouseUp(e){
        this.isMouseDown= false;

        return true;
    }


    showTheContextMenu(focusedBpmnObject: VarBpmnActivitiable) {
        if (this.bpmnService.focusedBpmnObject!=null && this.bpmnService.focusedBpmnObject.type!=BpmnActivitiType.Arrow) {
            this.contextMenu.parent = this.bpmnService.focusedBpmnObject;
            this.contextMenu.x = +focusedBpmnObject.getX() + focusedBpmnObject.getWidth();
            this.contextMenu.y = +focusedBpmnObject.getY()
            this.contextMenu.visible = true;

        }
    }











    ngAfterViewInit(): void {

    }


    mousePosition(e?:MouseEvent) {

        let left = e.clientX - this.containerEl.nativeElement.offsetLeft;
        let top = e.clientY - this.containerEl.nativeElement.offsetTop;
        let viewport = this.htmlHelper.getViewport();


        //fit
        if(left < document.body.scrollLeft) {
            left = document.body.scrollLeft;
        }

        //fit
        if(top < document.body.scrollTop) {
            top = document.body.scrollTop;
        }

        return {left:left, top:top};

    }

    setMousePosition(event?:MouseEvent) {
        if(event) {
            let mp = this.mousePosition(event);
            this.mouse.x = mp.left;
            this.mouse.y = mp.top;
        }


    }



    public drawArrow(from:VarBpmnActivitiable, to:VarBpmnActivitiable): void {

            let factory = this.resolver.resolveComponentFactory(VarBpmnArrow);
            let component = this.container.createComponent(factory);
            let arrow:VarBpmnArrow =<VarBpmnArrow>component.instance;
            arrow.init(from, to, "1px", "black");
            varConsole.info("line:('"+from.id+"','"+to.id+"')");
            if (arrow.fromId==null || arrow.fromId==null)
                arrow.fromId=[];
            if (arrow.toId==null || arrow.toId==null)
                arrow.toId=[];
            if (from.toArrow==null || from.toArrow==null)
                from.toArrow=[];
            if (to.fromArrow==null || to.fromArrow==null)
                to.fromArrow=[];
            if (from.toId==null || from.toId==null)
                from.toId=[];
            if (to.fromId==null || to.fromId==null)
                to.fromId=[];



            if (!varBpmnHelper.isIdInList(from.id, arrow.fromId))
                arrow.fromId.push(from.id);
            if (!varBpmnHelper.isIdInList(to.id, arrow.toId))
                arrow.toId.push(to.id);

            if (!varBpmnHelper.isActivitiInList(arrow.id, from.toArrow))
                from.toArrow.push(arrow);
            if (!varBpmnHelper.isActivitiInList(arrow.id, to.fromArrow))
                to.fromArrow.push(arrow);

            if (!varBpmnHelper.isIdInList(to.id, from.toId))
                from.toId.push(to.id);

            if (!varBpmnHelper.isIdInList(from.id, to.fromId))
                to.fromId.push(from.id);

            this.addToBucket(arrow);

    }



    public putBpmnActivitiIntoModeler(e:DDDropEvent){
        let item:VarBpmnActivitiable;

        if (e.dragData=="create.bpmn.task")
            item = this.createBpmnActiviti(e, BpmnActivitiType.UserTask);
        else if (e.dragData=="create.bpmn.start-event")
            item = this.createBpmnActiviti(e, BpmnActivitiType.StartEvent);
        else if (e.dragData=="create.bpmn.end-event")
            item = this.createBpmnActiviti(e, BpmnActivitiType.EndEvent);
        else if (e.dragData=="create.bpmn.exclusive-gateway")
            item = this.createBpmnActiviti(e, BpmnActivitiType.ExclusiveGateway);
        else if (e.dragData=="create.bpmn.servicetask")
            item = this.createBpmnActiviti(e, BpmnActivitiType.ServiceTask);
        else if (e.dragData=="create.bpmn.scripttask")
            item = this.createBpmnActiviti(e, BpmnActivitiType.ScriptTask);

        if (this.bpmnService.isActivitiExist(item)){
            alert("bu eleman ile ayni id'ye sahip bir eleman model'de mevcut. Lutfen tekrar deneyiniz. ");
            return;
        }

        this.addToBucket(item);

    }

    //https://plnkr.co/edit/azoGdAUvDvCwJ3RsPXD6?p=preview
    // http://stackoverflow.com/questions/37618222/how-do-i-dynamically-inject-an-angular2-sub-component-via-typescript-code
    // https://medium.com/@tudorgergely/injecting-components-dynamically-in-angular-2-3d36594d49a0#.1nn17nxgx
    // http://stackoverflow.com/questions/39678963/load-existing-components-dynamically-angular-2-final-release
    //http://blog.rangle.io/dynamically-creating-components-with-angular-2/

    createBpmnActiviti(e:DDDropEvent, type:BpmnActivitiType) {
        this.setMousePosition(e.nativeEvent);
        // Close any already open dialogs
        //this.container.clear();

        let factory = this.resolver.resolveComponentFactory(VarBpmnActiviti);
        let component = this.container.createComponent(factory);
        let activiti:VarBpmnActiviti = (<VarBpmnActiviti>component.instance);
        this.bpmnService.focusedBpmnObject = component.instance;
        let mp = this.mousePosition(e.nativeEvent);
        activiti.init(type, new Point(mp.left, mp.top), this, {
                cbConnectHandler: (event) => {
                    //this.cbConnect(event);
                },
                cbDragStartHandler: (event) => {
                    //this.cbActivitiDragStart(event);
                },


            });
        component.changeDetectorRef.detectChanges();
        return component.instance;
    }


    @HostListener('mousemove', ['$event'])
    mouseMove(e){
        let left = e.clientX - this.meRef.nativeElement.offsetLeft;
        let top = e.clientY - this.meRef.nativeElement.offsetTop;
        this.mouse.x= left;
        this.mouse.y= top;
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();
        let data=null;
        try {
            data = JSON.parse(e.dataTransfer.getData('application/json'));

        } catch (e) {
            data = null;

        }
        if (data==null){
            this.bpmnService.focusedBpmnObject=null;
            return;
        }

        if (data.startsWith("create.bpmn.")==false)
            return;
        let dddrop = new DDDropEvent(e, data);
        this.putBpmnActivitiIntoModeler(dddrop);

        this.onDrop.emit(dddrop);
        this.doJobsOnEmptyAreas();
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        this.onDragEnter.emit(e);
    }


    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        e.stopPropagation();
        //varConsole.info("modeler.dragstart:"+e.dataTransfer.getData("application/json"));
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        if (this.allowDrop(e)) {
            if (e.target.classList != undefined && e.target.classList != null)
                e.target.classList.add(this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }

        if (this.bpmnService.activeDraggable==ActiveDraggable.CONNECTION){
            ;//do nothing
        } else if (this.bpmnService.activeDraggable==ActiveDraggable.ACTIVITI) {
            varConsole.info("dragging activiti");

            if (this.bpmnService.focusedBpmnObject==null)
                return;
            this.bpmnService.focusedBpmnObject.setX(e.clientX - this.mouse.xOnObject);
            this.bpmnService.focusedBpmnObject.setY(e.clientY - this.mouse.yOnObject);

            let from_:VarBpmnActivitiable[]=  this.bpmnService.getActivities(this.bpmnService.focusedBpmnObject.fromId);
            let to_:VarBpmnActivitiable[]= this.bpmnService.getActivities(this.bpmnService.focusedBpmnObject.toId);


            if (this.bpmnService.focusedBpmnObject.fromArrow!=null)
                this.bpmnService.focusedBpmnObject.fromArrow.forEach((fr)=>{
                    let arr = <VarBpmnArrow>fr;
                    arr.init(this.bpmnService.findActivitiById(fr.fromId[0]), this.bpmnService.focusedBpmnObject);
                });

            if (this.bpmnService.focusedBpmnObject.toArrow!=null)
                this.bpmnService.focusedBpmnObject.toArrow.forEach((t)=>{
                    let arr = <VarBpmnArrow>t;
                    arr.init(this.bpmnService.focusedBpmnObject, this.bpmnService.findActivitiById(t.toId[0]));
                });



        }


    }


    //
    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
        varConsole.info("dragleave");
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        e.stopPropagation();
        varConsole.info("dragend");
        this.doJobsOnEmptyAreas();
    }


    @HostListener('drag', ['$event'])
    drag(e) {

    }



    allowDrop(e): boolean {

        let allow = true;
        let types = e.dataTransfer.types;
        if (types && types.length) {
            for (let i = 0; i < types.length; i++) {
                if (types[i] == this.dropScope) {
                    allow = true;
                    break;
                }
            }
        }

        return allow;
    }

    emitActiveActiviti(activiti) {
        let ga: GenericActiviti = new GenericActiviti();
        if (activiti==null)
            ga.clone(this.bpmnService.process);
        else
            ga.clone(activiti);
        this.onFocusedActiviti.emit(ga);
    }

    public doJobsOnEmptyAreas() {
        this.contextMenu.visible = false;
        this.bpmnService.activeDraggable=ActiveDraggable.NONE;
        if (this.bpmnService.focusedBpmnObject)
           this.bpmnService.focusedBpmnObject.active=false;
        this.bpmnService.focusedBpmnObject = null;

        this.emitActiveActiviti(null);

        // this.bpmnService.focusedBpmnObject = this.bpmnService.process;
        // this.bpmnService.focusedBpmnObject.active=true;
       // this.onFocusedActiviti.emit(null);


    }


}

