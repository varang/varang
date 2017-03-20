import {VarBpmnActivitiObject} from "./VarBpmnActivitiObject";
import {VarBpmnManualTaskShape} from "../VarBpmnShapes";
/**
 * Created by halil on 11/02/2017.
 */

export class VarBpmnManualTask  extends VarBpmnActivitiObject{
    constructor(name: string) {
        super(name, new VarBpmnManualTaskShape());
    }
}