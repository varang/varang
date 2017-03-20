import {VarBpmnShape} from "../VarBpmnShapes";
/**
 * Created by halil on 11/02/2017.
 */
import { UUID } from 'angular2-uuid';

export class VarBpmnActivitiObject {
    public id:string;
    public name:string;
    public shape:VarBpmnShape;
    constructor(name:string, shape:VarBpmnShape){
        this.id = UUID.UUID();
        this.name = name;
        this.shape = shape;
    }
}