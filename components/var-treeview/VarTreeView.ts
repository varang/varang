import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {VarTreeItemIconType} from "../core";
import * as _ from 'lodash';


export class VarTreeItem {
    private internalDisabled = false;
    private internalChecked = false;
    text: string;
    value: any;
    collapsed = true;
    children?: VarTreeItem[];
    iconNo: number;
    cssClasses:string[]=[];
    selection=false;
    restoration=false;
    parentId:string;
    kod:string;
    data:any;


    constructor(parentId:string,text: string, value: any = undefined, iconNo: number, collapsed: boolean = true,kod:string) {
        this.text = text;
        this.value = value;
        this.iconNo = iconNo;
        this.collapsed = collapsed;
        this.parentId=parentId;
        this.kod=kod;

    }

    get checked(): boolean {
        return this.internalChecked;
    }

    set checked(checked: boolean) {
        if (!this.disabled) {
        }
        this.internalChecked = checked;
    }

    get disabled(): boolean {
        return this.internalDisabled;
    }

    set disabled(disabled: boolean) {
        this.internalDisabled = disabled;
        if (!_.isNil(this.children)) {
            this.children.forEach(child => child.disabled = disabled);
        }
    }

    removeCssClass(strCssClass){
        let idx=-1;

        this.cssClasses.forEach((name, i)=>{
            if (strCssClass==name)
            {
                console.info("remove.idx:"+idx);
                this.cssClasses.splice(i, 1);
            }

        });
    }
    updateCollapsedRecursive(collapsed: boolean) {
        this.collapsed = collapsed;
        if (!_.isNil(this.children)) {
            this.children.forEach(child => {
                child.updateCollapsedRecursive(collapsed);
            });
        }
    }

    updateCheckedRecursive(checked: boolean) {
        if (this.disabled) {
            return;
        }

        this.checked = checked;
        if (!_.isNil(this.children)) {
            this.children.forEach(child => {
                child.updateCheckedRecursive(checked);
            });
        }
    }

    getCheckedItems(): VarTreeItem[] {
        let checkedItems: VarTreeItem[] = [];
        if (_.isNil(this.children)) {
            if (this.checked) {
                checkedItems.push(this);
            }
        } else {
            for (let i = 0; i < this.children.length; i++) {
                checkedItems = _.concat(checkedItems, this.children[i].getCheckedItems());
            }
        }

        return checkedItems;
    }
}

@Component({
    selector: 'VarSubTreeview',
    template: `

<div class="treeview-item" [class.treeview-parent]="item.children" draggable="true" >

    <i *ngIf="item.children" (click)="toggleCollapseExpand()" aria-hidden="true"
    class="glyphicon" [class.glyphicon-triangle-right]="item.collapsed" [class.glyphicon-triangle-bottom]="!item.collapsed"></i>
   
    <label class="form-check-label" >
        <input type="checkbox" class="form-check-input"  
        [(ngModel)]="item.checked"  (ngModelChange)="onCheckedChange($event)" [disabled]="item.disabled" />
       <!--<span *ngIf="item.checked" class="glyphicon glyphicon-folder-close"></span><span *ngIf="!item.checked" class="glyphicon glyphicon-folder-open"></span>-->
       
    </label><!--label   (click)="selected(item)"  [ngClass]="itemCssClasses(item)">{{item.text}} </label-->
    <label   (click)="selected(item)"  [class.clicked]="item.selection"><span [ngClass]="iconClass(item)"></span> {{item.text}} </label>
    <div [hidden]="item.collapsed"  *ngFor="let child of item.children">
       <VarSubTreeview [item]="child"  (checkedChange)="onChildCheckedChange($event)" (selectedItem)="selected($event)" [icons]="icons"></VarSubTreeview>
       
    </div>
</div>
    `,
    styles: [`
.treeview-item {
    padding-left: 20px;
    white-space: nowrap;
}

.treeview-item .form-check-label {
    padding-top: 2px;
    padding-bottom: 2px;
}

.treeview-item .fa {
    margin-left: -1.0rem;
    width: 10px;
    cursor: pointer;
}
.tree-item-selected{
background-color:#dedede;
}
.clicked{
color :mediumblue;
font-weight: bold;
}

    `]
})
export class VarSubTreeview {
    @Input() item: VarTreeItem;
    @Input() icons: VarTreeItemIconType[];
    @Input() collapsed: boolean = true;
    @Output() selectedItem = new EventEmitter<VarTreeItem>();
    @Input() selectedItem_:VarTreeItem = null;
    previousSelectedItem_ :VarTreeItem= null;
    @Output() checkedChange = new EventEmitter<boolean>();
    @Output() childSelectedItem = new EventEmitter<VarTreeItem>();




    selected( item) {
        this.selectedItem.emit(item);
    }

    //icons arrayinden icon numarasını bulup icon dönüyor.
    iconClass(item) {
        //console.info(this.iconType + "  " + treeIcon);
        //  console.info(this.iconType);
        let iconValue: string;

        this.icons.forEach((icon) => {
            if (icon.iconNo == item.iconNo&&!item.restoration) {
                iconValue = icon.iconClass; }
               else if(item.restoration){
                    iconValue= this.icons[3].iconClass;
                }

        });


        return iconValue;
    }

    toggleCollapseExpand() {
        this.item.collapsed = !this.item.collapsed;
    }

    collapse(item: any) {
        item.collapsed = !item.collapsed;
    }

    ngOnInit() {

        //console.info(this.iconType);
    }

    onCheckedChange(checked: boolean) {
        if (!_.isNil(this.item.children)) {
            this.item.children.forEach(child => {
                child.updateCheckedRecursive(checked);
            });
        }

        this.checkedChange.emit(checked);
    }

    onChildCheckedChange(checked: boolean) {
        if (this.item.checked !== checked) {
            let tempChecked = true;
            for (let i = 0; i < this.item.children.length; i++) {
                if (!this.item.children[i].checked) {
                    tempChecked = false;
                    break;
                }
            }

            if (this.item.checked !== tempChecked) {
                this.item.checked = tempChecked;
            }
        }

        this.checkedChange.emit(checked);
    }
}



@Component({
    selector: 'VarTreeview',
    styles: [`
`],
    template: `
<div *ngFor="let root of roots" >
 <VarSubTreeview *ngIf="root" [item]="root" [icons]="icons"  [collapsed]="collapsed" (selectedItem)="itemSelected($event)"></VarSubTreeview>
</div>
`

})
export class VarTreeview {

    @Input() item: VarTreeItem;
    @Input() icons: VarTreeItemIconType[];
    @Input() collapsed: boolean = true;
    @Output() selectedItem = new EventEmitter<VarTreeItem>();
    selectedItem_:VarTreeItem = null;
    previousSelectedItem_ :VarTreeItem= null;
    @Output() checkedChange = new EventEmitter<boolean>();


    @Input() roots: VarTreeItem[] = null;



    itemSelected($event){
       //console.info($event.text);
        if(this.previousSelectedItem_!=$event&&this.previousSelectedItem_!=null){
            this.previousSelectedItem_.selection=false;
        }
        $event.selection=true;
        this.previousSelectedItem_=$event;
        this.selectedItem.emit($event);
    }

}
