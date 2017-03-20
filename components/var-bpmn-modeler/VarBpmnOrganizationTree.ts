/**
 * Created by CAN on 7.02.2017.
 */
import {Component, Input, EventEmitter, Output} from '@angular/core';
import {VarTreeItemIconType} from "../core";
import {VarTreeItem} from "../var-treeview/VarTreeView";
import * as _ from 'lodash';
import {VarBpmnRestService} from "../services/restservice.service";
import {varConsole} from "../util/VarConsole";
import {MOrganization} from "../models/var.model.frontend";

@Component({
    selector: 'VarBpmnOrganizationTree',
    styles: [''],
    template: `

    <treeview   *ngIf="roots" [roots]="roots" [icons]="icons"  [collapsed]="collapsed" (selectedItem)="itemSelected($event)"></treeview>

`
})

export class VarBpmnOrganizationTree {

    icons: VarTreeItemIconType[]=null;
    selectedItem: VarTreeItem = null;

    @Input() array: MOrganization[]=null;
    @Input() roots: VarTreeItem[]=null;
    @Input() treeItems: VarTreeItem[] = null;
    @Input() collapsed:boolean=true;
    @Input() catalogType:number;
    @Input() loadOnInit=false;
    @Output() onItemSelected: EventEmitter<VarTreeItem> = new EventEmitter<VarTreeItem>();

    constructor( private restService:VarBpmnRestService){

    }

    destroy(value) {
        //remove data
        //do ajax request
        //fill roors
        this.treeItems.forEach((node,index)=>{
            if(node.value==value){
                this.treeItems.splice(index,1)
            }
        });
        this.refresh();
        // this.roots = null;
        // this.array = null;
    }

    itemSelected($event) {
        this.selectedItem = $event;
        this.onItemSelected.emit($event);
    }

    getChildrenOfParentId(id: string) {
        let children: VarTreeItem[] = [];
        this.treeItems.forEach((item, index) => {
            if (item.parentId == id) {
                children.push(item);
            }
        });
        return children;
    }

    buildTree( root:VarTreeItem){
        let children:VarTreeItem[]= this.getChildrenOfParentId(root.value);
        root.children = children;
        children.forEach((item) => this.buildTree(item));

    }

    refreshAfterUpdate(updatedOrgItem: VarTreeItem) {

        this.treeItems.forEach((item,index)=>{
            if(updatedOrgItem.value==item.value){
                varConsole.info(item);
                this.treeItems.splice(index,1);
            }
        });
        this.treeItems.push(updatedOrgItem);
        this.refresh();

    }

    addTreeNode(treeItem){
        this.treeItems.push(treeItem);
        this.refresh();
    }

    refresh(){
/*
        this.roots = null;   // fetchOrgs içine tasındı.
*/
        this.load();
    }

    initIconTypes(){
        this.icons = [
            {iconNo:1, iconClass:"glyphicon glyphicon-king"},//organizasyon
            {iconNo:2, iconClass:"glyphicon glyphicon-queen"},//baskanlık
            {iconNo:3, iconClass:"glyphicon glyphicon-knight"},//mudurluk
            {iconNo:4, iconClass:"glyphicon glyphicon-bishop"},//seflik
            {iconNo:5, iconClass:"glyphicon glyphicon-pawn"},//Grup
            {iconNo:6, iconClass:"glyphicon glyphicon-file"},//rol
            {iconNo:7, iconClass:"glyphicon glyphicon-user"}//sahıs
        ];
    }

    ngAfterContentInit() {
        this.init();

    }

    load(){
        this.initIconTypes();
        this.fetchORGs();

    }
    init(){
        if (this.loadOnInit!=null && this.loadOnInit==true) {
            this.load();
        }
    }

    copyORGsToTreeItems() {
        if (this.treeItems==null)
            this.treeItems = [];
        this.array.forEach((item, index) => {
            let treeItem:VarTreeItem = new VarTreeItem(item.parentId,item.name, item.id, item.tur, this.collapsed,item.kod);
            treeItem.data = item;
            this.treeItems.push(treeItem);

        });
        // console.info(this.treeItems);
    }

    loadTree(){
        this.roots = this.getChildrenOfParentId("-1");
        this.roots.forEach((root) => {
            this.buildTree(root);
        });
        //console.info(this.roots);
    }

    fetchORGs(){
        this.array = null;
//TODO:halil
//         this.restService.fetchOrganizationTree(cb:(any)=>any, successFn, errorFn, {
//             cbSuccess: (data) => {//lambda notation
//                 this.treeItems = null;
//                 this.array = <MOrganization[]>data;
//                 this.roots = null;
//
//                 this.copyORGsToTreeItems();
//                 // ebysConsole.info("Organization listall " + this.array);
//                 this.loadTree();
//
//             },
//             cbError: (err) => {
//                 ebysConsole.log(err);
//             }
//         });
    }

}
