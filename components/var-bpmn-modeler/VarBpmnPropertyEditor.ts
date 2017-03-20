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
import {DDDragEvent} from "../directives/DragDrop";
import {varConsole} from "../util/VarConsole";
import {VarBpmnService, ActiveDraggable, BpmnActivitiType} from "./VarBpmnService";
import {VarBpmnActivitiable} from "./bpmn-activities/VarBpmnActivitiable";
import {VarBpmnDialogOrgAssignee} from "./dialogs/dialog-org-assignee";
import {VarBpmnDialogServiceClass} from "./dialogs/dialog-service-class";
import {MOrganization} from "../models/var.model.frontend";



@Component({
    selector: 'div[VarBpmnPropertyEditor]',
    styleUrls:['resources/fonts/bpmn-font/css/bpmn.css'],
    styles: [`
.form-style-2{
    max-width: 600px;
    padding: 20px 12px 10px 20px;
    font: 13px Arial, Helvetica, sans-serif;
}
.form-style-2-heading{
    font-weight: bold;
    font-style: italic;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
    font-size: 15px;
    padding-bottom: 3px;
}
.form-style-2 label{
    display: block;
    margin: 0px 0px 15px 0px;
}
.form-style-2 label > span{
    width: 120px;
    font-weight: bold;
    float: left;
    padding-top: 8px;
    padding-right: 5px;
}
.form-style-2 span.required{
    color:red;
}
.form-style-2 .tel-number-field{
    width: 40px;
    text-align: center;
}
.form-style-2 input.input-field{
    width: 48%;
    
}

.form-style-2 input.input-field, 
.form-style-2 .tel-number-field, 
.form-style-2 .textarea-field, 
 .form-style-2 .select-field{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border: 1px solid #C2C2C2;
    box-shadow: 1px 1px 4px #EBEBEB;
    -moz-box-shadow: 1px 1px 4px #EBEBEB;
    -webkit-box-shadow: 1px 1px 4px #EBEBEB;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    padding: 7px;
    outline: none;
}
.form-style-2 .input-field:focus, 
.form-style-2 .tel-number-field:focus, 
.form-style-2 .textarea-field:focus,  
.form-style-2 .select-field:focus{
    border: 1px solid #0C0;
}
.form-style-2 .textarea-field{
    height:100px;
    width: 55%;
}
.form-style-2 input[type=submit],
.form-style-2 input[type=button]{
    border: none;
    padding: 8px 15px 8px 15px;
    background: #FF8500;
    color: #fff;
    box-shadow: 1px 1px 4px #DADADA;
    -moz-box-shadow: 1px 1px 4px #DADADA;
    -webkit-box-shadow: 1px 1px 4px #DADADA;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
}
.form-style-2 input[type=submit]:hover,
.form-style-2 input[type=button]:hover{
    background: #EA7B00;
    color: #fff;
}

`],
    template: `
      <template [ngIf]="focusedActiviti!=null">
        <div *ngIf="focusedActiviti.type===BpmnActivitiType_.UserTask" class="form-style-2">
         <div class="form-style-2-heading">User Task</div>
         <div class="row">
          <div class="col-md-6">
            <label for="id"><span>ID <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.id" name="id" value="" /></label>
            <label for="documentation"><span>Documentation</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.documentation"  name="priority" value="" /></label>
            <div class="row" >
            <label for="assignee"><span>Assignee <span class="required">*</span></span><span  ><input class="input-field"type="text" [(ngModel)]="focusedActiviti.assignee" #utAssignee (keyup)="assigneeKeyup(utAssignee.value)" name="assignee"  /> <span class="glyphicon glyphicon-user" (click)="showDialogAssigneeOrgTree()"></span></span></label>
            </div>
            <label for="exclusice"><span>Exclusive</span><input type="checkbox" [(ngModel)]="focusedActiviti.exclusice" name="exclusice" value="" /></label>
            <label for="multi-instance"><span>Multi-instance type:</span><select name="instance" class="select-field">
            <option value="None">None</option>
            <option value="Parallel">Parallel</option>
            <option value="Sequential">Sequential</option>
            </select></label>
            <label for="collection-mi"><span>Collection (mi):</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.collection" name="collection-mi" value="" /></label>
            <label for="completion-mi"><span>Completion condotion (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.completionCondition" name="completion-mi" value="" /></label>
            <label for="formKey"><span>Form Key</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.formKey" name="formKey" value="" /></label>
            <label for="priority"><span>Priority</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.priority" name="priority" value="" /></label>
            <label for="taskListener"><span>Task Listener</span><input type="text" class="input-field"  name="priority" value="" /></label>
          </div>
          <div class="col-md-6">
            <label for="name"><span>Adi <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.title" name="name" value="" /></label>
            <label for="asynchronous"><span>Asynchronous</span><input type="checkbox"   name="asynchronous" [(ngModel)]="focusedActiviti.asynchronous" value="" /></label>
            <label for="executionListener"><span>Execution Listener</span><label> No execution listebers configured</label></label>
            <label for="cardinality"><span>Cardinality (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.cardinality" name="name" value="" /></label>
            <label for="elementVarible"><span>Element Variable (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.element" name="name" value="" /></label>
            <label for="isForCompensation"><span>Is for compensation</span><input type="checkbox"   name="isForCompensation" [(ngModel)]="focusedActiviti.isForCompensation" value="" /></label>
            <label for="dueDate"><span>Due date</span><input type="date" class="input-field"   name="duaeDate" [(ngModel)]="focusedActiviti.dueDate" value="" /></label>
            <label for="Form"><span>Form</span><label> No form</label></label>

          </div>
         </div>
        </div>
        
         <div *ngIf="focusedActiviti.type==BpmnActivitiType_.Arrow" class="form-style-2">
             <div class="form-style-2-heading">Arrow</div>
             <label for="id"><span>ID <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.id" name="id" #arid (keyup)="aridKeyup(arid.value)"  /></label>
             <label for="title"><span>Adi <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.title" name="title"  #arTitle (keyup)="arTitleKeyup(arTitle.value)" /></label>
             <label for="arrowCondition"><span>condition</span><input type="text"  [(ngModel)]="focusedActiviti.arrowCondition"   name="arrowCondition" #arcond (keyup)="arcondKeyup(arcond.value)" /></label>
          </div>
          
           <div *ngIf="focusedActiviti.type===BpmnActivitiType_.StartEvent" class="form-style-2">
            <div class="form-style-2-heading">Provide your information</div>
            <label for="field1"><span>Name <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
            <label for="field2"><span>Email <span class="required">*</span></span><input type="text" class="input-field" name="field2" value="" /></label>
            <label><span>Telephone</span><input type="text" class="tel-number-field" name="tel_no_1" value="" maxlength="4" />-<input type="text" class="tel-number-field" name="tel_no_2" value="" maxlength="4"  />-<input type="text" class="tel-number-field" name="tel_no_3" value="" maxlength="10"  /></label>
            <label for="field4"><span>Regarding</span><select name="field4" class="select-field">
            <option value="General Question">General</option>
            <option value="Advertise">Advertisement</option>
            <option value="Partnership">Partnership</option>
            </select></label>
            <label for="field5"><span>Message <span class="required">*</span></span><textarea name="field5" class="textarea-field"></textarea></label>
          </div>
          
          <div *ngIf="focusedActiviti.type==BpmnActivitiType_.EndEvent" class="form-style-2">
             <div class="form-style-2-heading">EndEvent</div>
             <label for="id"><span>ID <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.id" name="id" #stid (keyup)="stidKeyup(pid.value)"  /></label>
             <label for="documentation"><span>Documentation</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.documentation"  name="priority" value="" /></label>
             <label for="title"><span>Adi <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.title" name="title"  #stTitle (keyup)="stTitleKeyup(stTitle.value)" /></label>
             <label for="executionListener"><span>Execution Listener</span><label> No execution listebers configured</label></label>


          </div>


          
          <div *ngIf="focusedActiviti.type==BpmnActivitiType_.Process" class="form-style-2">
            <div class="form-style-2-heading">Process</div>
            <label for="id"><span>ID <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="bpmnService.process.id" name="id" #pid (keyup)="pidKeyup(pid.value)"  /></label>
            <label for="title"><span>Adi <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="bpmnService.process.title" name="title"  #pTitle (keyup)="pTitleKeyup(pTitle.value)" /></label>
          </div> 
          
        <div *ngIf="focusedActiviti.type==BpmnActivitiType_.ServiceTask" class="form-style-2">
          <div class="form-style-2-heading">Service Task</div>
           <div class="row">
           <div class="col-md-6">
            <label for="id"><span>ID <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.id" name="id" #stid (keyup)="stidKeyup(pid.value)"  /></label>
            <label for="serviceClass"><span>Class<span class="required">*</span></span><span ><input class="input-field" type="text" [(ngModel)]="focusedActiviti.serviceClass" #stClass (keyup)="serviceClassKeyup(stClass.value)" name="serviceClass"  /> <span class="glyphicon glyphicon-cog" (click)="showDialogServiceClass()"></span></span></label>
            <label for="documentation"><span>Documentation</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.documentation"  name="priority" value="" /></label>
            <label for="exclusice"><span>Exclusive</span><input type="checkbox" [(ngModel)]="focusedActiviti.exclusice" name="exclusice" value="" /></label>
            <label for="multi-instance"><span>Multi-instance type:</span><select name="instance" class="select-field">
            <option value="None">None</option>
            <option value="Parallel">Parallel</option>
            <option value="Sequential">Sequential</option>
            </select></label>
            <label for="collection-mi"><span>Collection (mi):</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.collection" name="collection-mi" value="" /></label>
            <label for="completion-mi"><span>Completion condotion (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.completionCondition" name="completion-mi" value="" /></label>
            <label for="expression"><span>Expression</span><textarea cols="40" rows="5" class="input-field" [(ngModel)]="focusedActiviti.expression" name="expression" (change)="onChangeserviceTaskExpression($event)" >{{serviceTaskExpression}}</textarea></label>
            <label for="classField"><span>Class field</span><label>No field selected</label></label>
          </div>
          
          
          <div class="col-md-6">
           <label for="title"><span>Adi <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.title" name="title"  #stTitle (keyup)="stTitleKeyup(stTitle.value)" pTitleKeyup /></label>
            <label for="asynchronous"><span>Asynchronous</span><input type="checkbox"   name="asynchronous" [(ngModel)]="focusedActiviti.asynchronous" value="" /></label>
            <label for="executionListener"><span>Execution Listener</span><label> No execution listebers configured</label></label>
            <label for="cardinality"><span>Cardinality (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.cardinality" name="name" value="" /></label>
            <label for="elementVarible"><span>Element Variable (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.element" name="name" value="" /></label>
            <label for="isForCompensation"><span>Is for compensation</span><input type="checkbox"   name="isForCompensation" [(ngModel)]="focusedActiviti.isForCompensation" value="" /></label>
            <label for="class"><span>Class</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.class" name="name" value="" /></label>
            <label for="delegateExp"><span>Delegate Expression</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.delegateExp" name="name" value="" /></label>
            <label for="resultVarName"><span>Result Variable Name</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.resultVarName" name="name" value="" /></label>
          </div>
        </div>
        </div>
        
        
        
         <div *ngIf="focusedActiviti.type==BpmnActivitiType_.ScriptTask" class="form-style-2">
          <div class="form-style-2-heading">Service Task</div>
           <div class="row">
           <div class="col-md-6">
            <label for="id"><span>ID <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.id" name="id" #stid (keyup)="stidKeyup(pid.value)"  /></label>
            <label for="serviceClass"><span>Class<span class="required">*</span></span><span ><input class="input-field" type="text" [(ngModel)]="focusedActiviti.serviceClass" #stClass (keyup)="serviceClassKeyup(stClass.value)" name="serviceClass"  /> <span class="glyphicon glyphicon-cog" (click)="showDialogServiceClass()"></span></span></label>
            <label for="documentation"><span>Documentation</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.documentation"  name="priority" value="" /></label>
            <label for="exclusice"><span>Exclusive</span><input type="checkbox" [(ngModel)]="focusedActiviti.exclusice" name="exclusice" value="" /></label>
            <label for="multi-instance"><span>Multi-instance type:</span><select name="instance" class="select-field">
            <option value="None">None</option>
            <option value="Parallel">Parallel</option>
            <option value="Sequential">Sequential</option>
            </select></label>
            <label for="collection-mi"><span>Collection (mi):</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.collection" name="collection-mi" value="" /></label>
            <label for="completion-mi"><span>Completion condotion (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.completionCondition" name="completion-mi" value="" /></label>
            <label for="expression"><span>Expression</span><textarea cols="60" rows="15" class="input-field" [(ngModel)]="focusedActiviti.expression" name="expression" (change)="onChangescriptTaskExpression($event)" >{{scriptTaskExpression}}</textarea></label>
            <label for="classField"><span>Class field</span><label>No field selected</label></label>
          </div>
          
          
          <div class="col-md-6">
           <label for="title"><span>Adi <span class="required">*</span></span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.title" name="title"  #stTitle (keyup)="stTitleKeyup(stTitle.value)" pTitleKeyup /></label>
            <label for="asynchronous"><span>Asynchronous</span><input type="checkbox"   name="asynchronous" [(ngModel)]="focusedActiviti.asynchronous" value="" /></label>
            <label for="executionListener"><span>Execution Listener</span><label> No execution listebers configured</label></label>
            <label for="cardinality"><span>Cardinality (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.cardinality" name="name" value="" /></label>
            <label for="elementVarible"><span>Element Variable (mi)</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.element" name="name" value="" /></label>
            <label for="isForCompensation"><span>Is for compensation</span><input type="checkbox"   name="isForCompensation" [(ngModel)]="focusedActiviti.isForCompensation" value="" /></label>
            <label for="class"><span>Class</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.class" name="name" value="" /></label>
            <label for="delegateExp"><span>Delegate Expression</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.delegateExp" name="name" value="" /></label>
            <label for="resultVarName"><span>Result Variable Name</span><input type="text" class="input-field" [(ngModel)]="focusedActiviti.resultVarName" name="name" value="" /></label>
          </div>
        </div>
        </div>
          
          
         </template>
         
         
    
<div VarBpmnDialogOrgAssignee (onOrgAssigneeSelected)="onOrgAssigneeSelected($event)"></div>
<div VarBpmnDialogServiceClass (onServiceClassSelected)="onServiceClassSelected($event)" [packagePrefix]="packagePrefix"></div>

`

})
export class VarBpmnPropertyEditor implements AfterViewInit {
    //see:https://www.sanwebe.com/2014/08/css-html-forms-designs
    BpmnActivitiType_:typeof BpmnActivitiType= BpmnActivitiType;
    focusedActiviti:VarBpmnActivitiable=null;
    @Input() packagePrefix:string;
    @ViewChild(forwardRef(() => VarBpmnDialogOrgAssignee)) dialogOrgAssignee: VarBpmnDialogOrgAssignee;
    @ViewChild(forwardRef(() => VarBpmnDialogServiceClass)) dialogServiceClass: VarBpmnDialogServiceClass;
    scriptTaskExpression:string;
    serviceTaskExpression:string;

    constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer, private htmlHelper: HtmlHelper, private bpmnService:VarBpmnService) {

    }

    ngOnInit() {

    }


    ngAfterViewInit(): void {
    }


    onMouseMove(e){

    }

    onMouseButton(e){

    }

    assigneeKeyup(txt:string){
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.assignee = txt;
    }





    pidKeyup(txt:string){
        this.bpmnService.process.id = txt;
    }


    pTitleKeyup(txt:string){
        this.bpmnService.process.title = txt;
    }

    stTitleKeyup(txt:string){
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.title = txt;
    }

    stidKeyup(txt:string){
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.id = txt;
    }

    serviceClassKeyup(txt:string){
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.serviceClass = txt;
    }

    arcondKeyup(txt:string){

        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.arrowCondition = txt;

    }

    aridKeyup(txt:string){
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.id = txt;
    }

    arTitleKeyup(txt:string){
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.title = txt;
    }





    showDialogAssigneeOrgTree(){
        this.dialogOrgAssignee.show();
    }


    showDialogServiceClass(){
        this.dialogServiceClass.show();
    }




    onOrgAssigneeSelected(e:MOrganization){
        this.focusedActiviti.assignee = e.name;
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.assignee= e.name;
    }
    onServiceClassSelected(e:string){
        this.focusedActiviti.serviceClass = e;
        let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
        act.serviceClass = e;
    }


    onChangescriptTaskExpression(ev){
        try {
            this.scriptTaskExpression = ev.target.value;
            let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
            act.expression = this.scriptTaskExpression;
        } catch(e) {
            console.info('could not set textarea-value');
        }
    }


    onChangeserviceTaskExpression(ev){
        try {
            this.serviceTaskExpression = ev.target.value;
            let act:VarBpmnActivitiable=this.bpmnService.findActivitiById(this.focusedActiviti.id);
            act.expression = this.serviceTaskExpression;
        } catch(e) {
            console.info('could not set textarea-value');
        }
    }


}

