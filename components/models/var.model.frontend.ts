//import {Belge, EbysFile, BelgeAddRequest, SelectableItem} from "./ebys.backend";

import OrganizationItem = Rest.OrganizationItem;
import BpmnServiceItem = Rest.BpmnServiceItem;
import SelectableItem = Rest.SelectableItem;
import BpmnModel = Rest.BpmnModel;
import BpmnActivitiable = Rest.BpmnActivitiable;

/**
 * Created by halil on 01/03/2017.
 */

export class MOrganization implements OrganizationItem{
    catalogTuru: number;
    roles: string[] = [];
    id: string;
    parentId: string;
    name: string;
    kod: string;
    aciklama: string;
    active: boolean;
    activeTimesStart: Rest.Calendar;
    activeHowLongInHour: number;
    tur: number;
    sahisAdi: string;
    sahisSoyadi: string;
    kullaniciAdi: string;
    email: string;
    sahisAdresi: string;
    sahisTel: string;
    sahisMobil: string;
    image: string;
    code: string;
    kullaniciSifresi:string;

}


export class MSelectableItem implements SelectableItem {
    value: any;
    id: string;
    label: string;
}




export class MBpmnModel  implements BpmnModel {
    id: string;
    name: string;
    definitionId: string;
    xml: string;
    modelObjects: MBpmnActivitiable[];

}

export class MBpmnActivitiable  implements BpmnActivitiable {
    id: string;
    title: string;
    fromId: string[];
    toId: string[];
    type: number;
    x: number;
    y: number;
    width: number;
    height: number;

}

export class  MBpmnServiceItem  implements BpmnServiceItem{
    name: string;
    description: string;
    className: string;
}