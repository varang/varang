import {Injectable} from "@angular/core";
import {VarBpmnActivitiable} from "./bpmn-activities/VarBpmnActivitiable";
import {VarBpmnArrow} from "./bpmn-activities/VarBpmnArrow";
import {Point} from "./VarBpmnShapes";
/**
 * Created by halil on 03/03/2017.
 */



export enum BpmnActivitiType{
    UserTask=1,
    Arrow=2,
    StartEvent=3,
    EndEvent=4,
    ExclusiveGateway=5,
    InclusiveGateway=6,
    Process=7,
    ServiceTask=8,
    ScriptTask=9


}

const BpmnActivitiType_: typeof BpmnActivitiType = BpmnActivitiType;


export enum ActiveDraggable{
    NONE=1,
    ACTIVITI=2,
    CONNECTION=3
}

export class VarBpmnProcess implements VarBpmnActivitiable {
    arrowCondition: string;
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
    id: string="ebysprocess";
    title: string;
    type: number=BpmnActivitiType_.Process;
    fromId: string[];
    toId: string[];
    fromArrow:VarBpmnActivitiable[];
    toArrow:VarBpmnActivitiable[];
    from:Point;
    to:Point;
    active: boolean;

    position(): Point {
        return undefined;
    }

    setPosition(clientX: number, clientY: number): void {
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

    getConnectionPoints(): Point[] {
        return undefined;
    }

    getBpmnDefinition(): string {
        return undefined;
    }

    getDiagramDefinition(): string {
        return undefined;
    }

}



export class GenericActiviti implements VarBpmnActivitiable {
    arrowCondition: string;
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
    id: string;
    title: string;
    type: number=BpmnActivitiType_.Process;
    fromId: string[];
    toId: string[];
    fromArrow:VarBpmnActivitiable[];
    toArrow:VarBpmnActivitiable[];
    from:Point;
    to:Point;
    active: boolean=false;
    assignee:string="";

    position(): Point {
        return undefined;
    }

    setPosition(clientX: number, clientY: number): void {
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

    getConnectionPoints(): Point[] {
        return undefined;
    }

    getBpmnDefinition(): string {
        return undefined;
    }

    getDiagramDefinition(): string {
        return undefined;
    }

    clone(a:VarBpmnActivitiable){
        this.id= a.id;
        this.type=a.type;
        this.title=a.title;
        this.assignee=a.assignee;
        this.serviceClass = a.serviceClass;

    }

}

@Injectable()
export class VarBpmnService{
    public bucket:VarBpmnActivitiable[]=[];
    public focusedBpmnObject : VarBpmnActivitiable;
    public activeDraggable:ActiveDraggable = ActiveDraggable.NONE;
    public process: VarBpmnProcess = new VarBpmnProcess();
    constructor(){

    }

    buildModel():VarBpmnActivitiable[] {
        return this.bucket;
    }

    generateBpmnXml():string {

        try {
            let modelDescription: string = "";
            let diagramDescription: string = "";


            this.bucket.forEach((item) => {
                modelDescription += `${item.getBpmnDefinition()}\n`;
            });
            this.bucket.forEach((item) => {
                diagramDescription += `${item.getDiagramDefinition()}\n`;
            });

            let model: string =
                `<?xml version="1.0" encoding="UTF-8"?>
            <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://www.activiti.org/test">
             <process id="${this.process.id}" name="${this.process.id}" isExecutable="true">
             ${modelDescription}
             </process>
             <bpmndi:BPMNDiagram id="BPMNDiagram_${this.process.id}">
                   <bpmndi:BPMNPlane bpmnElement="${this.process.id}" id="BPMNPlane_${this.process.id}">
                    ${diagramDescription}
                   </bpmndi:BPMNPlane>
             </bpmndi:BPMNDiagram>
            </definitions>
            `;

            return model;
        } catch(e){

            throw e;
        }
    }

    private findModelByType(type: BpmnActivitiType) {
        let list:VarBpmnActivitiable[]=[];
        this.bucket.forEach((item)=>{
            if (item.type==type.valueOf())
                list.push(item);
        });
        return list;
    }

    findActivitiById(id: string) {
        let found:VarBpmnActivitiable=null;
        this.bucket.forEach((item)=>{
            if (item.id==id)
                found=item;
        });
        return found;
    }

    getActivities(ids:string[]){
        let list:VarBpmnActivitiable[] = []

        if (ids==undefined || ids==null )
            return list;

        ids.forEach((id)=>{
            let act = this.findActivitiById(id);
            if (act!=undefined && act!=null)
                list.push(act);
        });
        return list;
    }


    public isActivitiExist(item: VarBpmnActivitiable) {
        let found:boolean=false;
        this.bucket.forEach((it) =>{
            if (it.id===item.id)
                found=true;
        });
        return found;

    }
}
