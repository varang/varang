
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {VarBpmnRestService} from "../../services/restservice.service";
import {varConsole} from "../../util/VarConsole";
import {VarBpmnService} from "../VarBpmnService";
import {VarTreeItem} from "../../var-treeview/VarTreeView";
import {Http} from "@angular/http";
import {MBpmnServiceItem} from "../../models/var.model.frontend";


@Component({
    selector: 'div[VarBpmnDialogServiceClass]',
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
                    <div><span>{{getTitle()}}</span></div>
                    <button type="button" (click)="close()"class="close" data-dismiss="modal" aria-hidden="true">×</button><!-- bu satır silinrse x işareti kalkar-->
                </div>
                <div class="modal-body">
                <select multiple="multiple" size="15" style="width:400px;height:100px;" #s (change)="serviceClassSelected(s.value)">
                    <option *ngFor="let item of classes;" [value]="item.className" [title]="item.className">{{item.name}}</option>
                </select>
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
export class VarBpmnDialogServiceClass {
    @Input() visible: boolean = false;
    visibleAnimate: boolean = true;
    classes:MBpmnServiceItem[]=[];
    @Input() packagePrefix: string = "";
    selected: MBpmnServiceItem=null;
    @Output() onServiceClassSelected:EventEmitter<string> = new EventEmitter<string>();

    constructor(private bpmnService:VarBpmnService, private restService:VarBpmnRestService, private http:Http) {
    }

    load(cb:(data)=>any){
        //TODO:halil
        if (this.classes.length==0){
            // this.http.get(bpmnRestEndPoints.Bpmn_listServiceTask+"/vbt.ebys.bpmn.service" , EbysDefaultHeader).subscribe(
            //     payload=>{
            //         let bodyString:string = JSON.parse(JSON.stringify(payload))._body;
            //         this.classes = JSON.parse(bodyString);
            //         varConsole.info(this.classes);
            //         cb(this.classes);
            //     },
            //     error => {
            //         varConsole.error(error);
            //     }
            // );
        }
    }

    show() {
        this.load((data)=>{
            this.visible=true;
        });
    }

    close(){
        this.visible = false;

    }

    ngAfterContentInit() {

    }


    getTitle(){
        return this.selected===null?"Service siniflari":this.selected.description;
    }


    onOK() {
        this.bpmnService.focusedBpmnObject.serviceClass=this.selected.className;
        this.onServiceClassSelected.emit(this.selected.className);
        this.close();
    }


    serviceClassSelected(sc:string) {
        this.classes.forEach((c)=>{
            if (c.className==sc)
                this.selected = c;
        });

    }


}
