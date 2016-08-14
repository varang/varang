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
        Inject,
        EventEmitter
      } from "@angular/core";
import {Http, Headers} from "@angular/http";
import {RemoteDataProvider, 
        ClientPagerParams,
        DataSourceProperties, 
        RemoteProviderPagingParams,
        RemoteProviderRequestParamNames,
        VarGridHeaderAction,
        VarGridRowSelectedEvent, 
        VarangInterceptor,
        VarGridEvent 
      } from "./core";
 
// <VarGridClientPagerParams [pageSize]='11' [sord]='ASC' [sidx]='id' [pageStart]='0' [pageSizes]='[10,20,50]'>
// 		fff</VarGridClientPagerParams>


@Component({
  selector:"VarGridRemoteDataProviderMapping",
  template:`<ng-content></ng-content>`
})
export class VarGridRemoteDataProviderMapping {
  // @ViewChild(TodoInputComponent) inputComponent: TodoInputComponent
  //@ViewChild('wrapper') wrapper;
  public content:string="{}";
  public data: RemoteDataProvider = new RemoteDataProvider();
  
 constructor(private elementRef:ElementRef) {
    this.content = this.elementRef.nativeElement.innerHTML;
  }

  // to ensure bindings have been resolved
  // see also 
  // https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html#!#aftercontent
    ngAfterContentInit() {
      this.content = this.elementRef.nativeElement.innerHTML;
      let json= JSON.parse(JSON.parse(JSON.stringify(this.content)));
      //alert(JSON.stringify(json.in.));
      this.data.in.jasonXPath.list = json.in.jsonXPath.list;
      this.data.in.jasonXPath.pageSize = json.in.jsonXPath.pageSize;
      this.data.in.jasonXPath.pageIndex = json.in.jsonXPath.pageIndex;
      this.data.in.jasonXPath.total = json.in.jsonXPath.total;

      this.data.out.pageSize = json.out.pageSize;
      this.data.out.pageStart = json.out.pageStart;
      this.data.out.sortIndex= json.out.sortIndex;
      this.data.out.sortOrder = json.out.sortOrder;
     
    }
  

}


@Component({
  selector:"VarGridClientPagerParams",
  template:`<ng-content></ng-content>`
})
export class VarGridClientPagerParams {
    public content:string="{}";
    public data:ClientPagerParams = new ClientPagerParams();
    

   constructor(private elementRef:ElementRef) {
          this.content = this.elementRef.nativeElement.innerHTML;
    }
 
    ngAfterContentInit() {
      this.content = this.elementRef.nativeElement.innerHTML;
      let json = JSON.parse(JSON.parse(JSON.stringify(this.content)));      

      this.data.pageSize = json.pageSize;
      this.data.pageSizes = json.pageSizes;
      this.data.pageStart = json.pageStart;
      this.data.sortIndex = json.sortIndex;
      this.data.sortOrder = json.sortOrder;
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
  @Input() type:string="regular";

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

  @Input() type:string="regular";
  @Input() label:string="";
  @Input() name:string="";
  @Input() searchOptions:string="";
  @Input() styleClass:string="";
  @Input() checked:boolean=false;
  
  public content:string="cell__1";
    
  // constructor(private elementRef:ElementRef) {
  //   if (this.type==='checkbox')
  //     this.content="check";
  // }


  ngAfterContentInit(){
    //this.content = this.elementRef.nativeElement.innerHTML;
   if (this.type==='checkbox')
      this.content="check"; 
  }
  
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
  @Input() checked:boolean;
  type:string="regular";
  id:number;

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


@Component({
  selector:"[VarGridHeaderColumnView]",
  template:`<ng-content></ng-content>`
})
export class VarGridHeaderColumnView {

  @Input() label:string="";
  @Input() name:string="";
  @Input() searchOptions:string="";
  @Input() styleClass:string="";
  @Input() type:string="regular";

   public content:string;
  //   constructor(@Inject(ElementRef) element: ElementRef) {

  //     this.content = element.nativeElement.innerHTML;
      
  //         // this.content = this.elementRef.nativeElement.innerHTML;
  //         // this.content = "header!!";
  //         //alert("headerColumnview:content:"+this.content);
  //   }

    // constructor(private elementRef:ElementRef) {
    //       //this.content = this.elementRef.nativeElement.innerHTML;
    // }


  ngAfterContentInit(){
    //this.content = this.elementRef.nativeElement.innerHTML;
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

//<th VarGridHeaderColumnView>Header1</th>
  //        <th VarGridHeaderColumnView>Header2</th>
    //      <th VarGridHeaderColumnView>Header3</th>
          
//[class.up]="headerActions['{{header.label}}'].toggle===true"

@Component({
	selector:"VarGrid",
	//encapsulation: ViewEncapsulation.Emulated,
	directives:[VarGridHeaderRowView,VarGridHeaderColumnView,VarGridRowView,VarGridColumnView, VarGridDataSource],

	template:`
    <table class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>  
          

          <th VarGridHeaderColumnView  *ngFor="let header of headers" >
            <span *ngIf="header.type==='checkbox'"> <input type="checkbox" (click)="onHeaderCheckboxChecked($event, header.label)"/></span>
            <span *ngIf="header.type==='regular'" (click)="onHeaderClicked($event, header.name)"><span>{{header.label}}</span><i  class="fa fa-sort" aria-hidden="true" [class.fa-sort-asc]="headerActions[header.label].toggle===true" [class.fa-sort-desc]="headerActions[header.label].toggle===false" ></i></span>
           </th>
         </tr>
          
       </thead>
       <tbody >
         <ng-content select="VarGridRowView"></ng-content>
        <tr VarGridRowView  *ngFor="let row of rows; let i=index" [class.active]="isRowSelected(row.id)" >
            <td VarGridColumnView *ngFor="let cell of row.cells; let j=index" (mouseup)="rowCellClicked($event, row.id, i, j)" (dblclick)="rowCellDoubleClicked($event, row.id, i, j)">
            <span *ngIf="cell.type==='regular'"  >{{cell.content}}</span>
            <input type="checkbox" *ngIf="cell.type==='checkbox'" [checked]="isRowSelected(row.id)" (change)="rowCheckBoxChecked($event.target.checked,'checkbox',row.id, i, j)"  />
            </td>
        </tr>
       </tbody>
       <tfoot>
          <tr><th [attr.colspan]="headers.length">
          <!--div class="ui right floated pagination menu">
            <a class="icon item" (click)="seekToFirstPage()"><i class="angle double left icon" ></i></a>
            <a class="icon item" (click)="seekToPreviousPage()"><i class="angle left icon" ></i></a>
            <a class="icon item" (click)="seekToNextPage()"><i class="angle right  icon" ></i></a>
            <a class="icon item" (click)="seekToLastPage()"><i class="angle double right icon" ></i></a>
          </div-->
         <ul class = "pagination">
           <li  class="glyphicon glyphicon-fast-backward" (click)="seekToFirstPage()" ></li>
           <li class="glyphicon glyphicon-triangle-left" (click)="seekToPreviousPage()"></li>
           <li > <input value="{{clientPagerParams.data.pageStart}}"  [(ngModel)]="pageIndex" (change)="pageInputChanged($event)" style="width:40px;text-align: right;"/> / {{remoteDataProviderMapping.data.in.pageCount}} </li>
           
           <li class="glyphicon glyphicon-triangle-right" (click)="seekToNextPage()"></li>
           <li class="glyphicon glyphicon-fast-forward" (click)="seekToLastPage()"></li>
           <li > <select (change)="onChangePageSize($event)"  ><option *ngFor="let op of clientPagerParams.data.pageSizes" >{{op}}</option> </select></li>
           
        </ul>
          </th>
          </tr>
        </tfoot>
    </table>
	`
})
export class VarGrid{
	// @ContentChild(VarGridRowComponent)
 //  	rowDef: VarGridRowComponent;
	@ContentChild(VarGridRemoteDataProviderMapping)
  remoteDataProviderMapping: VarGridRemoteDataProviderMapping;
	@ContentChild(VarGridClientPagerParams)
  clientPagerParams: VarGridClientPagerParams;
  @ContentChild(VarGridHeaderRowView)
  headerRow: VarGridHeaderRowView;
  @ContentChild(VarGridDataSource)
  dataSource: VarGridDataSource;
  @ContentChild(VarGridRow)
  rowdef: VarGridRow;
  @ContentChildren(VarGridColumn)
  coldefs: QueryList<VarGridColumn>;

  @Output() onRowSelected: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>();
  @Output() onComplete: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>();
  @Output() onRequest: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>(); 
  @Output() onDataLoad: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>(); 
  @Output() onRowInserting : EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>();
  @Output() onRowDoubleClick: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>();
  @Output() onSorting: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>();
  @Output() onPaging: EventEmitter<VarGridEvent> = new EventEmitter<VarGridEvent>();

  public headers:VarGridHeaderColumnView[]= [];
  public rows:VarGridRowView[]=[];
  private headerActions: { [label: string] : VarGridHeaderAction } = {};
  public data:any[];
  public checkedRows:Map<string,Map<number, boolean>> = new Map<string,Map<number, boolean>>();
  public pageIndex:number;
	constructor(private http:Http) {
	}
  
  copyColumnView(declaredColumns:QueryList<VarGridColumn>){
    let cols:VarGridColumnView[] = [];
    declaredColumns.forEach((declaredColumn)=>{
      let col = new VarGridColumnView();
      col.name=declaredColumn.name;
      col.label = declaredColumn.label;
      col.type=declaredColumn.type;
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

  loadLocalDataOnInitializaton(){
    if (this.data===undefined || this.data.length==0)
      return;
    this.onDataLoad.emit(new VarGridEvent("VarGrid","VarGrid","VarGrid", VarangInterceptor.Before));

    //TODO, apply mapping of a best practice
    let newrows:VarGridRowView[] =[];
    this.data.forEach((row)=>{
          let newrow = new VarGridRowView();
          let cols:VarGridColumnView[] = this.copyColumnView(this.rowdef.coldefs);
          newrow.id = row.id;
          Object.keys(row).forEach((key)=>{
          let idx = this.findColumnViewIndexByName(cols, key);
          if (idx!=-1)
            cols[idx].content = row[key];
         });
         cols.forEach((col)=>{
            if (col.label==="checkbox"){
              if (this.checkedRows.get("checkbox")===undefined)
                this.checkedRows.set("checkbox", new Map<number,boolean>());
              if (this.checkedRows.get("checkbox").get(row["id"])!==undefined)
                col.checked=true;
            }  
            
            newrow.cells.push(col);
         });
        this.onRowInserting.emit(new VarGridEvent("VarGrid","VarGrid",newrow, VarangInterceptor.Before));
        newrows.push(newrow);
        this.onRowInserting.emit(new VarGridEvent("VarGrid","VarGrid",newrow, VarangInterceptor.After));
      });

    this.onDataLoad.emit(new VarGridEvent("VarGrid","VarGrid","VarGrid", VarangInterceptor.After));
    this.rows=null;
    this.rows=newrows;
  }

  xpathtoJsonProperty(json, xpath){
    let idx = xpath.indexOf('.');
    if (idx ==-1)
      return json[xpath];
    var propName = xpath.substring(0,idx);
    return this.xpathtoJsonProperty(json[propName], xpath.substring(idx+1) );
  }

  mapRemoteData(remotedata:any){
    let bodyString:string = JSON.parse(JSON.stringify(remotedata))._body
    let griddata = JSON.parse(bodyString); 
    this.data = this.xpathtoJsonProperty(griddata, this.remoteDataProviderMapping.data.in.jasonXPath.list);
    let total:number = this.xpathtoJsonProperty(griddata, this.remoteDataProviderMapping.data.in.jasonXPath.total);
    this.remoteDataProviderMapping.data.in.total = total;
    this.remoteDataProviderMapping.data.in.pageCount =  Math.ceil(total / this.clientPagerParams.data.pageSize);

    //let rows:any[] = griddata._embedded.persons;
    if (this.data===undefined || this.data.length==0)
      return;
    this.onRequest.emit(new VarGridEvent("VarGrid","VarGrid","VarGrid", VarangInterceptor.After));
    this.loadLocalDataOnInitializaton();
  }

  buildGetParams() {
    let params = this.buildPostParams();
    let paramstring:string="";
    Object.keys(params).forEach((key)=>paramstring+="&"+key+"="+params[key]);
    return "?"+paramstring.substring(1);
  }

  buildPostParams(){
    let hash:any={};
    hash[this.remoteDataProviderMapping.data.out.pageStart]=this.clientPagerParams.data.pageStart;
    hash[this.remoteDataProviderMapping.data.out.pageSize]=this.clientPagerParams.data.pageSize;
    hash[this.remoteDataProviderMapping.data.out.sortIndex]=this.clientPagerParams.data.sortIndex;
    hash[this.remoteDataProviderMapping.data.out.sortOrder]=this.clientPagerParams.data.sortOrder;
    if (this.dataSource.serverType==="spring-datarest"){
       hash[this.remoteDataProviderMapping.data.out.sortOrder] = new SpringDataDriver().buildGridSortOrder(this);
    }
    return hash;
  }

  fetchRemoteDataOnInitializaton(){
    this.onRequest.emit(new VarGridEvent("VarGrid","VarGrid","VarGrid", VarangInterceptor.Before));

    let headers = new Headers({'Content-type':'application/json'});
    if (this.dataSource.methodType.toUpperCase()==="POST")
      this.http.post(this.dataSource.properties.url, 
        JSON.stringify(this.buildPostParams()), {headers:headers})
        .subscribe(
          data=>this.mapRemoteData(data),
          error=>console.log(error)
          );
    else
      this.http.get(this.dataSource.properties.url+this.buildGetParams(), {headers:headers})
        .subscribe(
          data=>this.mapRemoteData(data),
          error=>console.log(error)
          );
  }

  
  loadHeaders(){
    this.rowdef.coldefs.forEach((declaredColumn)=>{
      let col = new VarGridHeaderColumnView();
      col.content = declaredColumn.label;
      col.label = declaredColumn.label;
      col.name = declaredColumn.name;
      col.type = declaredColumn.type;
      this.headerActions[col.label] = new VarGridHeaderAction(col.name, this.clientPagerParams.data.sortOrder==="ASC"?true:false);
      this.headers.push(col);
    });
    
  }

  loadData(){
       this.onComplete.emit(new VarGridEvent("VarGrid","VarGrid","VarGrid", VarangInterceptor.Before));
       if (this.dataSource.dataOrigin==="local")
         this.loadLocalDataOnInitializaton();
       else if (this.dataSource.dataOrigin==="remote")
         this.fetchRemoteDataOnInitializaton();
       this.onComplete.emit(new VarGridEvent("VarGrid","VarGrid","VarGrid", VarangInterceptor.After));
  }
  initGrid(){

     if (this.dataSource.loadOnInit){
       this.loadHeaders();
       this.loadData();
     }
  }


  reloadGrid(){
     this.loadData();
  }

  ngAfterContentInit(){
    this.initGrid();
  }

////methods
  clearGrid(){
    this.rows=null;
    this.rows=[];
    // this.headers=null;
    // this.headers=[];
    // this.headerActions = null;
    // this.headerActions = {};

  }

//// events

  onChangePageSize($event){
    this.clientPagerParams.data.pageSize =  $event.target.value;
    this.reloadGrid();
  }

  seekToFirstPage(){
      this.onPaging.emit(new VarGridEvent("VarGrid", "VarGrid", this.clientPagerParams.data, VarangInterceptor.Before));
      this.clientPagerParams.data.pageStart=0;

      this.seekToPage();
  }
  seekToLastPage(){
    this.onPaging.emit(new VarGridEvent("VarGrid", "VarGrid", this.clientPagerParams.data, VarangInterceptor.Before));
    this.clientPagerParams.data.pageStart=this.remoteDataProviderMapping.data.in.pageCount-1;

    this.seekToPage();
  }

  seekToNextPage(){
    if ( (this.clientPagerParams.data.pageStart+1)>(this.remoteDataProviderMapping.data.in.pageCount-1))
      return;
   this.onPaging.emit(new VarGridEvent("VarGrid", "VarGrid", this.clientPagerParams.data, VarangInterceptor.Before));
   this.clientPagerParams.data.pageStart=this.clientPagerParams.data.pageStart+1; 
   this.seekToPage();
  }
  seekToPreviousPage(){
    if ( (this.clientPagerParams.data.pageStart-1)<0)
      return;
   this.onPaging.emit(new VarGridEvent("VarGrid", "VarGrid", this.clientPagerParams.data, VarangInterceptor.Before));
   this.clientPagerParams.data.pageStart=this.clientPagerParams.data.pageStart-1; 
   this.seekToPage();
  }

  pageInputChanged($event){
    if ( this.clientPagerParams.data.pageStart<0 || this.clientPagerParams.data.pageStart>(this.remoteDataProviderMapping.data.in.pageCount-1))
      return;
    this.clientPagerParams.data.pageStart=this.pageIndex;
    this.seekToPage();
  }

  seekToPage(){
      if (this.clientPagerParams.data.pageStart==-1)
        return;
      this.reloadGrid();
      this.onPaging.emit(new VarGridEvent("VarGrid", "VarGrid", this.clientPagerParams.data, VarangInterceptor.After));
  }

  onHeaderClicked(event, name){
      this.onSorting.emit( new VarGridEvent(event.source, event.target, name, VarangInterceptor.Before));
      this.headerActions[name].enabled=true;
      this.headerActions[name].toggle = !this.headerActions[name].toggle;
      this.clientPagerParams.data.sortOrder = this.headerActions[name].sord();
      this.clientPagerParams.data.sortIndex = name;
      this.reloadGrid();
      this.onSorting.emit( new VarGridEvent(event.source, event.target, name, VarangInterceptor.After));
  }

  onHeaderCheckboxChecked($event, label:string) {
      this.checkedRows.clear();
      this.checkedRows.set(label, new Map<number,boolean>());
      for (let i=0;i<this.rows.length;i++) {
        this.rows[i].cells.forEach((cell) => {
          if (cell.label===label)
            cell.checked=$event.target.checked;
        });
        if ($event.target.checked)
          this.checkedRows.get(label).set(this.data[i].id, true);
      }
  }
  
  rowCheckBoxChecked(checked:boolean, label:string, rowId:number, rowIndex:number, cellIndex:number) {
    if (label==="checkbox" && this.checkedRows.get("checkbox")===undefined)
      this.checkedRows.set("checkbox", new Map<number,boolean>());
    
    if (checked){
      this.checkedRows.get(label).set(rowId, true);
      this.rows[rowIndex].cells[0].checked=true;
    }
    else {
      this.checkedRows.get(label).delete(rowId);
      this.rows[rowIndex].cells[0].checked=false;
    }
    return false;
  }

  rowCellClicked($event, rowId:number, rowIndex:number, cellIndex:number){
    if (this.checkedRows.get("checkbox").get(rowId)!==undefined) {
      //row is already selected, do unselect
      this.rowCheckBoxChecked(false, "checkbox", rowId, rowIndex, 0);
      return;
    }
    this.checkedRows.get("checkbox").set(rowId, true);
    this.rowCheckBoxChecked(true, "checkbox", rowId, rowIndex, cellIndex);
    this.onRowSelected.emit(new VarGridEvent($event.source, $event.target, {"rowId":rowId, "rowIndex":rowIndex, "cellIndex":cellIndex}, VarangInterceptor.After));
    return false;
  }

  rowCellDoubleClicked($event, rowId:number, rowIndex:number, cellIndex:number){
    this.onRowDoubleClick.emit(new VarGridEvent($event.source, $event.target, {"rowId":rowId, "rowIndex":rowIndex, "cellIndex":cellIndex}, VarangInterceptor.After));
    return false;
  }



  isRowSelected(rowId:number){
     if (this.checkedRows.get("checkbox")===undefined)
        this.checkedRows.set("checkbox", new Map<number,boolean>());
      return this.checkedRows.get("checkbox").get(rowId)!==undefined;
  }
}



export class SpringDataDriver{
  buildGridSortOrder(obj:VarGrid){
    return obj.clientPagerParams.data.sortIndex+","+ obj.clientPagerParams.data.sortOrder.toLowerCase();
      //,headerActions:{ [label: string] : VarGridHeaderAction
      //let param:string="";
      // for (var label in headerActions){
      //     let ha:VarGridHeaderAction= headerActions[label];
      //     if (ha.enabled) 
      //       param+="&"+"sort="+ha.name + "," + ha.sord().toLowerCase();
      // }
      // if (param.length>0)
      //   return param.substring(1);
      // return "";
  }
}

