import {VarBpmnActivitiable} from "./bpmn-activities/VarBpmnActivitiable";
import {Point, Line} from "./VarBpmnShapes";
/**
 * Created by halil on 15/02/2017.
 */
export interface BpmnDragData {
    type:string;
    fromConnectionPoints:Point[];
    source:any;

}

export interface ConnectEvent {
    line:Line;
    fromConnectionPoints:Point[];
    toConnectionPoints:Point[];

}