import {Point} from "../VarBpmnShapes";
import {VarBpmnArrow} from "./VarBpmnArrow";
/**
 * Created by halil on 12/02/2017.
 */

export interface VarBpmnActivitiable {
    id:string;
    title:string;
    type:number;
    fromId:string[];
    toId:string[];
    fromArrow:VarBpmnActivitiable[];
    toArrow:VarBpmnActivitiable[];
    from:Point;
    to:Point;
    active:boolean;
    assignee:string;
    multiInstanse:number;
    collection:string;
    completionCondition:string;
    formKey:string;
    priority:number;
    exclusice:boolean;
    documentation:string;
    isForCompensation:string;
    element:string;
    cardinality:string;
    asynchronous:string;
    class:string;
    delegateExp:string;
    resultVarName:string;
    expression:string;
    classField:string;
    arrowCondition:string;
    serviceClass:string;
    position():Point;
    setPosition(clientX: number, clientY: number): void;


    getWidth():number;
    getHeight():number;
    getX():number;
    getY():number;
    setX(x:number):void;
    setY(y:number):void;

    getConnectionPoints():Point[];

    getBpmnDefinition():string;
    getDiagramDefinition():string;


}