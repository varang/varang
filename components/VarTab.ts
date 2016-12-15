import {Component, Input, Output, EventEmitter, ContentChildren, ContentChild, QueryList} from "@angular/core";
import {VarTabHeaderModel, VarTabContentModel, TabEvent} from "./core";

@Component({
	selector: 'VarTabHeader',
	template: `
	`
})

export class VarTabHeader {
	@Input() name:string="";

    /*ngAfterContentInit(){
    	this.setClicked();
    }
    setClicked(){
    	this.select.emit(this);
    	//alert("inside setClicked");
	}*/
}

@Component({
	selector: 'VarTabContent',
	template: `
	<ng-content *ngIf="visible===true"></ng-content>
	`
})

export class VarTabContent {
	@Input() name:string;
	public visible:boolean=false;
	
	ngAfterContentInit(){
      	
    }
}



@Component({
	selector: 'VarTabHeaderView',
	template: `
	`
})

export class VarTabHeaderView {
	@Input() name:string="";
    @Output() select = new EventEmitter<TabEvent>();
    
	ngClick(){
		let event:TabEvent = new TabEvent();
		this.select.emit(event);
	}

    /*ngAfterContentInit(){
    	this.setClicked();
    }
    setClicked(){
    	this.select.emit(this);
    	//alert("inside setClicked");
	}*/
}

@Component({
	selector: 'VarTabContentView',
	template: `
		<ng-content></ng-content>
	`
})

export class VarTabContentView {
	@Input() name:string;

	/*ngAfterContentInit(){
      	alert("vartabcontent");
    }*/
}



@Component({
	selector: 'VarTab',
	directives:[VarTabHeader, VarTabContent, VarTabHeaderView, VarTabContentView ],
	template: `
		activeTabNo: {{activeTabNo}}
		<div class="vartab">

			<ul class="nav nav-tabs vartab-headers">
				<li VarTabHeaderView role="presentation" (click)="tabClicked(i)"  *ngFor="let header of headerArray; let i = index"  
					[class.active]="header.order === activeTabNo" > <a href="#">{{header.name}}</a> </li>
			</ul>

			<ng-content select="VarTabContent"></ng-content>
		</div>
		
	`
})

export class VarTab  {
	public activeTabNo:number=0;
	public previousTabNo:number=0;
	
	public activeTabName:string="";
	private headerArray:VarTabHeaderModel[];
	private contentArray:VarTabContentModel[];
	
	@ContentChildren(VarTabHeader) headers: QueryList<VarTabHeader>;
	@ContentChildren(VarTabContent) contents: QueryList<VarTabContent>;
	@Output() tabChanged = new EventEmitter<number>();

	tabClicked(activeTabNo:number){

		this.activeTabNo = activeTabNo;
		this.activeTabName = this.headerArray[this.activeTabNo].name;
		

		//make unvisible previous activetabno
		this.changeTabVisibility(this.previousTabNo, false);
		this.previousTabNo = this.activeTabNo;
		//make visible new activetabno
		this.changeTabVisibility(this.activeTabNo, true);
		this.tabChanged.emit(this.activeTabNo);
		//alert("p:"+previousTabNo+"n:"+this.activeTabNo);
		//alert(activeTabNo);
	}

	changeTabVisibility(tabOrder:number, visible) {
		this.contents.forEach( (content, order)  => {
				if (tabOrder==order)
					content.visible = visible;
		});
	}

	copyHeaderView() {

		let cols:VarTabHeaderModel[] = [];
		this.headers.forEach( (declaredHeader, index) => {
			let col = new VarTabHeaderModel();
			col.name = declaredHeader.name;
			col.order = index;
			cols.push(col);
		});
		this.activeTabName = cols[this.activeTabNo].name;
		return cols;
	}

	copyContentView() {
		let cols:VarTabContentModel[] = [];
		this.contents.forEach((declaredContent)=>{
			let col = new VarTabHeaderModel();
			col.name = declaredContent.name;
			cols.push(col);
		});
		return cols;
	}
	
	headerOrder(headerName:string){
		let ret:number=-1;
		this.headerArray.forEach((item,index) => {
			if (item.name==headerName)
				ret=index;
		});
		return ret;
	}
	
	initTab(){
		this.headerArray = this.copyHeaderView();
		this.changeTabVisibility(this.activeTabNo, true);
		this.contentArray = this.copyContentView();
	}

	ngAfterContentInit(){
      	this.initTab();
      	//alert(this.findHeaderByName(this.headerArray, "home"));
    }
}
