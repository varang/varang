
/**
 * Created by CAN on 7.02.2017.
 */
import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {VarBpmnRestService} from "../../services/restservice.service";
import {varConsole} from "../../util/VarConsole";
import {VarBpmnService} from "../VarBpmnService";
import {VarTreeItem} from "../../var-treeview/VarTreeView";
import {MOrganization} from "../../models/var.model.frontend";
import {VarBpmnOrganizationTree} from "../VarBpmnOrganizationTree";



@Component({
    selector: 'div[VarBpmnDialogOrgAssignee]',
    styles: [`
label{
display: inline-block;
width:140px;
}
input{
 width:250px;
}
`],
    template: `

    <div  class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
          [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
        <div class="modal-dialog">
            <div class="modal-content">
            
                <div class="modal-header">
                    <div>Yeni Organizyon Türü</div>
                    <button type="button" (click)="close()"class="close" data-dismiss="modal" aria-hidden="true">×</button><!-- bu satır silinrse x işareti kalkar-->
                </div>
                <div class="modal-body">
                    <org-tree #orgTree (onItemSelected)="orgAssigneeItemSelected($event)" [catalogType]="catalogType" [loadOnInit]="false"></org-tree>

                    <!--<org-tree  (onItemSelected)="orgAssigneeItemSelected($event)"></org-tree>-->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" (click)="toggle()">İptal</button>
                    <button type="button" class="btn btn-primary" (click)="onOK()"  >Tamam</button>
                </div>
            </div>
        </div>
    </div>
`

})
export class VarBpmnDialogOrgAssignee {
    @Input() visible: boolean = false;
    @Input() parentId: string;
    visibleAnimate: boolean = true;
    orgType: number;
    orgCode: string;
    orgName: string;
    orgHeader: string;
    org_: MOrganization = new MOrganization();
    @Output() onOrgAssigneeSelected:EventEmitter<MOrganization> = new EventEmitter<MOrganization>();

    @ViewChild("orgTree")
    orgTree:VarBpmnOrganizationTree;

    constructor(private bpmnService:VarBpmnService) {
    }

    show() {
        this.orgTree.refresh();
        this.visible = true;
    }

    close() {
        this.visible = false;

    }

    ngAfterContentInit() {

    }
    setParentId(id:string){
        this.org_.parentId=id;
    }

    setOrgType(OrgType) {
        this.orgType = OrgType;


    }


    onOK() {
        this.bpmnService.focusedBpmnObject.assignee=this.org_.name;
        this.onOrgAssigneeSelected.emit(this.org_);
        this.close();
    }


    orgAssigneeItemSelected(org:VarTreeItem) {
        this.org_ =  (<MOrganization>org.data);


    }


}
