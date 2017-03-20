import {VarBpmnActivitiable} from "./VarBpmnActivitiable";
/**
 * Created by halil on 17/03/2017.
 */

export class VarBpmnHelper
{

    isIdInList(id:string, list:string[]){
        let found:boolean=false;
        list.forEach((item)=>{
            if (item==id)
                found=true;
        });
        return found;
    }

    isActivitiInList(id:string, list:VarBpmnActivitiable[]){
        let found:boolean=false;
        list.forEach((item)=>{
            if (item.id==id)
                found=true;
        });
        return found;
    }


}

export const varBpmnHelper = new VarBpmnHelper();
