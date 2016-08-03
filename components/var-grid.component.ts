///<reference path="../node_modules/angular2/typings/browser.d.ts"/> 

import {Component, 
        Directive, 
        ViewChild, 
        ViewChildren,
        ContentChild,
        ContentChildren,
        ViewEncapsulation,
        QueryList,
        ElementRef, 
        Input, 
        Output,
        AfterContentChecked, 
        AfterViewInit, 
        AfterViewChecked, 
        AfterContentInit,
        Inject
      } from "@angular/core";
import {Http, Headers} from "@angular/http";
import {RemotePagerParams, ClientPagerParams,DataSourceProperties} from "../models/core";

// <VarGridClientPagerParams [pageSize]='11' [sord]='ASC' [sidx]='id' [pageStart]='0' [pageSizes]='[10,20,50]'>
// 		fff</VarGridClientPagerParams>



@Component({
  selector:"VarGridRemotePagerParams",
  template:`<ng-content></ng-content>`
})
export class VarGridRemotePagerParams {
  // @ViewChild(TodoInputComponent) inputComponent: TodoInputComponent
  //@ViewChild('wrapper') wrapper;
  public content:string="{}";
  public params:RemotePagerParams;
 constructor(private elementRef:ElementRef) {
    this.content = this.elementRef.nativeElement.innerHTML;
  }

  // to ensure bindings have been resolved
  // see also 
  // https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html#!#aftercontent
    ngAfterContentInit() {
      this.content = this.elementRef.nativeElement.innerHTML;
      let data= JSON.parse(JSON.parse(JSON.stringify(this.content)));
      this.params = new RemotePagerParams();
      this.params.root = data.root;
      this.params.cell = data.cell;
      this.params.id = data.id;
      this.params.page= data.page;
      this.params.records = data.records;
      this.params.repeatitems = data.repeatitems;
      this.params.total = data.total;
    }
  

}


@Component({
  selector:"VarGridClientPagerParams",
  template:`<ng-content></ng-content>`
})
export class VarGridClientPagerParams {
    public content:string="{}";
    public params:ClientPagerParams = new ClientPagerParams();
    

   constructor(private elementRef:ElementRef) {
          this.content = this.elementRef.nativeElement.innerHTML;
    }

    ngAfterContentInit() {
      this.content = this.elementRef.nativeElement.innerHTML;
      let data= JSON.parse(JSON.parse(JSON.stringify(this.content)));
      this.params.pageStart = data.pageStart;
      this.params.sidx=data.sidx;
      this.params.pageSize=data.pageSize
      this.params.sord=data.sord;
      this.params.pageSizes=data.pageSize;
    }
  
}



@Component({
  selector:"VarGridColumn",
  template:`<ng-content></ng-content>`
})
export class VarGridColumn {

  @Input() label:string;
  @Input() name:string;
  @Input() searchOptions:string;
  @Input() styleClass:string;

  ngAfterContentInit() {
      // console.log(this.input);
      //alert("vargridrow-aftercontentchecked");
  }
  
}



@Component({
  selector:"[VarGridColumnView]",
  template:`<ng-content></ng-content>`
})
export class VarGridColumnView {

  @Input() label:string;
  @Input() name:string;
  @Input() searchOptions:string;
  @Input() styleClass:string;

  public content:string="cell__1";
    // constructor(private elementRef:ElementRef) {
    // }


  // ngAfterContentInit(){
  //   this.content = this.elementRef.nativeElement.innerHTML;
  // }
  
}





@Component({
  selector:"VarGridRow",
  template:`<ng-content></ng-content>`
})
export class VarGridRow {

  @ContentChildren(VarGridColumn)
  coldefs: QueryList<VarGridColumn>;

  
  
  
  

  ngAfterContentInit() {

   // alert("childdefs:"+this.coldefs.length);
      // console.log(this.input);
      //alert("vargridrow-aftercontentchecked");
     // alert(this.Columns.first.styleClass);
  }
  
}



@Component({
  selector:"[VarGridRowView]",
  directives:[VarGridColumnView],
  template:`
        <ng-content></ng-content>
        `
})
export class VarGridRowView {

  @ContentChildren(VarGridColumnView)
  columns: QueryList<VarGridColumnView>;
  cells:VarGridColumnView[]=[];
  
  constructor() {
    // this.cells.push(new VarGridColumnView());
    // this.cells.push(new VarGridColumnView());
    // this.cells.push(new VarGridColumnView());
    // this.cells.push(new VarGridColumnView());
    // this.cells[0].content="row1data0";
    // this.cells[1].content="row1data1";
    // this.cells[2].content="row1data2";
    // this.cells[3].content="row1data3";
  }
  

  ngAfterContentInit() {
      // console.log(this.input);
      //alert("vargridrow-aftercontentchecked");
      //alert(this.columns.first.styleClass);
  }
  
}




@Component({
  selector:"VarGridDataSource",
  template:`<ng-content></ng-content>`
})
export class VarGridDataSource {

  @Input() url:string;
  @Input() methodType:string; //get post
  @Input() serverType:string; //rest, solr, mongodb
  @Input() dataOrigin:string; //local, remote
  @Input() localDataSource:any[];
  @Input() loadOnInit:boolean;
  

  public content:string="{}";
    public properties:DataSourceProperties = new DataSourceProperties();
    

   constructor(private elementRef:ElementRef) {
          this.content = this.elementRef.nativeElement.innerHTML;
    }

    ngAfterContentInit() {
      this.content = this.elementRef.nativeElement.innerHTML;
      let data= JSON.parse(JSON.parse(JSON.stringify(this.content)));
      this.properties.url = data.url;
    }
}


@Directive({
  selector:"[VarGridHeaderColumnView]"
  //template:`{{content}}`
})
export class VarGridHeaderColumnView {

  @Input() label:string;
  @Input() name:string;
  @Input() searchOptions:string;
  @Input() styleClass:string;

   public content:string;
  //   constructor(@Inject(ElementRef) element: ElementRef) {

  //     this.content = element.nativeElement.innerHTML;
      
  //         // this.content = this.elementRef.nativeElement.innerHTML;
  //         // this.content = "header!!";
  //         //alert("headerColumnview:content:"+this.content);
  //   }

    constructor(private elementRef:ElementRef) {
          //this.content = this.elementRef.nativeElement.innerHTML;
    }


  ngAfterContentInit(){
    this.content = this.elementRef.nativeElement.innerHTML;
    //alert("content"+this.elementRef.nativeElement.innerHTML);
      // console.log(this.input);
      //alert("vargridrow-aftercontentchecked");
  }
  
}



@Component({
  selector:"[VarGridHeaderRowView]",
  directives:[VarGridHeaderColumnView],
  template:`
    <th VarGridHeaderColumnView *ngFor="let column of columns"  >{{column.content}}</th>
  `
})
export class VarGridHeaderRowView {

  @ContentChildren(VarGridHeaderColumnView) columns: QueryList<VarGridHeaderColumnView>;

  
  
  

  ngAfterContentInit() {
    //alert("size:"+this.columns.length);
      // console.log(this.input);
      //alert("vargridrow-aftercontentchecked");
     // alert(this.Columns.first.styleClass);
  }
  
}



@Component({
	selector:"VarGrid",
	//encapsulation: ViewEncapsulation.Emulated,
	directives:[VarGridHeaderRowView,VarGridHeaderColumnView,VarGridRowView,VarGridColumnView, VarGridDataSource],

	template:`
    <table class="ui celled table">
      <thead>
        <!--tr VarGridHeaderRowView>  
          <th VarGridHeaderColumnView>Header1</th>
          <th VarGridHeaderColumnView>Header2</th>
          <th VarGridHeaderColumnView>Header3</th>
          <th VarGridHeaderColumnView>Header4</th>
         </tr-->
          
       </thead>
       <tbody >

        <tr VarGridRowView  *ngFor="let row of rows">
            <td VarGridColumnView *ngFor="let cell of row.cells">{{cell.content}}</td>
        </tr>
       </tbody>
       <tfoot>
          <tr><th colspan="3">
          <div class="ui right floated pagination menu">
            <a class="icon item" (click)="seekToFirstPage()"><i class="angle double left icon" ></i></a>
            <a class="icon item" (click)="seekToPreviousPage()"><i class="angle left icon" ></i></a>
            <a class="icon item" (click)="seekToNextPage()"><i class="angle right  icon" ></i></a>
            <a class="icon item" (click)="seekToLastPage()"><i class="angle double right icon" ></i></a>
          </div>
          </th>
          </tr>
        </tfoot>
    </table>
	`
})
export class VarGrid{
	// @ContentChild(VarGridRowComponent)
 //  	rowDef: VarGridRowComponent;
	@ContentChild(VarGridRemotePagerParams)
  jsonReader: VarGridRemotePagerParams;
	@ContentChild(VarGridClientPagerParams)
  clientPagerParams: VarGridClientPagerParams;
  @ContentChild(VarGridHeaderRowView)
  headerColumns: VarGridHeaderRowView;
  @ContentChild(VarGridDataSource)
  dataSource: VarGridDataSource;
  @ContentChild(VarGridRow)
  rowdef: VarGridRow;
  @ContentChildren(VarGridColumn)
  coldefs: QueryList<VarGridColumn>;


  private rows:VarGridRowView[]=[];

	constructor(private http:Http) {
	}
  
  copyColumnView(declaredColumns:QueryList<VarGridColumn>){
    let cols:VarGridColumnView[] = [];
    declaredColumns.forEach((declaredColumn)=>{
      let col = new VarGridColumnView();
      col.name=declaredColumn.name;
      col.label = declaredColumn.label;
      col.searchOptions = declaredColumn.searchOptions;
      col.styleClass = declaredColumn.styleClass;
      cols.push(col);
    });
    return cols;
  }
  findColumnViewIndexByName(cols:VarGridColumnView[], key:string){
      for(let i=0;i<cols.length;i++)
        if (cols[i].name==key)
          return i;
      return -1;
  }

  loadLocalDataOnInitializaton(data:any[]){
    if (data===undefined || data.length==0)
      return;
    //TODO, apply mapping of a best practice
    data.forEach((row)=>{
          let newrow = new VarGridRowView();
          let cols:VarGridColumnView[] = this.copyColumnView(this.rowdef.coldefs);
          Object.keys(row).forEach((key)=>{
          let idx = this.findColumnViewIndexByName(cols, key);
          if (idx!=-1)
            cols[idx].content = row[key];
         });
         cols.forEach((col)=>newrow.cells.push(col));
         this.rows.push(newrow);
      });
  }


  loadRemoteData(data:any){
    let bodyString:string = JSON.parse(JSON.stringify(data))._body

    let griddata = JSON.parse(bodyString); 
    let rows:any[] = griddata._embedded.persons;
    if (rows===undefined || rows.length==0)
      return;
    this.loadLocalDataOnInitializaton(rows);
  }

  buildPaginationUrl(url:string) {
    return url
          +"?page="+this.clientPagerParams.params.pageStart
          +"&rows="+this.clientPagerParams.params.pageSize
          +"&sidx="+this.clientPagerParams.params.sidx
          +"&sord="+this.clientPagerParams.params.sord
          ;
  }

  loadRemoteDataOnInitializaton(url:string){
    let headers = new Headers({'Content-type':'application/json'});

    if (this.dataSource.methodType.toUpperCase()==="POST")
      this.http.post(this.dataSource.properties.url, JSON.stringify(this.clientPagerParams.params), {headers:headers})
        .subscribe(
          data=>this.loadRemoteData(data),
          error=>console.log(error)
          );
        this.http.get(this.buildPaginationUrl(this.dataSource.properties.url), {headers:headers})
        .subscribe(
          data=>this.loadRemoteData(data),
          error=>console.log(error)
          );
  }


  loadPage(){
     if (this.dataSource.loadOnInit){
       if (this.dataSource.dataOrigin==="local")
         this.loadLocalDataOnInitializaton(this.dataSource.localDataSource);
       else if (this.dataSource.dataOrigin==="remote")
         this.loadRemoteDataOnInitializaton(this.dataSource.properties.url);
     }
  }

  ngAfterContentInit(){
      this.dataSource.dataOrigin="remote";
      this.dataSource.methodType="POST";
      this.loadPage();  
    
  }



//// events

  seekToFirstPage(){
      this.clientPagerParams.params.pageStart=0;
      this.seekToPage();
  }
  seekToLastPage(){
    this.seekToPage();
  }

  seekToNextPage(){
   this.clientPagerParams.params.pageStart=this.clientPagerParams.params.pageStart+1; 
   this.seekToPage();
  }
  seekToPreviousPage(){
   this.clientPagerParams.params.pageStart=this.clientPagerParams.params.pageStart-1; 
   this.seekToPage();
  }

  seekToPage(){
      if (this.clientPagerParams.params.pageStart==-1)
        return;
      this.rows=null;
      this.rows=[];
      
      this.loadPage();
  }
}



