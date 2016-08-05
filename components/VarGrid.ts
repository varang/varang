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
import {RemoteDataProvider, ClientPagerParams,DataSourceProperties, RemoteProviderPagingParams,RemoteProviderRequestParamNames } from "./core";
 
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
	@ContentChild(VarGridRemoteDataProviderMapping)
  remoteDataProviderMapping: VarGridRemoteDataProviderMapping;
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


  private headers:VarGridHeaderColumnView[]=[];
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

  xpathtoJsonProperty(json, xpath){
    let idx = xpath.indexOf('.');
    if (idx ==-1)
      return json[xpath];
    var propName = xpath.substring(0,idx);
    return this.xpathtoJsonProperty(json[propName], xpath.substring(idx+1) );
  }

  fetchRemoteData(data:any){
    let bodyString:string = JSON.parse(JSON.stringify(data))._body
    let griddata = JSON.parse(bodyString); 
    let rows:any[] = this.xpathtoJsonProperty(griddata, this.remoteDataProviderMapping.data.in.jasonXPath.list);
    //let rows:any[] = griddata._embedded.persons;
    if (rows===undefined || rows.length==0)
      return;
    this.loadLocalDataOnInitializaton(rows);
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
    return hash;
  }

  loadRemoteDataOnInitializaton(url:string){
    let headers = new Headers({'Content-type':'application/json'});
    if (this.dataSource.methodType.toUpperCase()==="POST")
      this.http.post(this.dataSource.properties.url, 
        JSON.stringify(this.buildPostParams()), {headers:headers})
        .subscribe(
          data=>this.fetchRemoteData(data),
          error=>console.log(error)
          );
    else
      this.http.get(url+this.buildGetParams(), {headers:headers})
        .subscribe(
          data=>this.fetchRemoteData(data),
          error=>console.log(error)
          );
  }


  initGrid(){
     if (this.dataSource.loadOnInit){
       if (this.dataSource.dataOrigin==="local")
         this.loadLocalDataOnInitializaton(this.dataSource.localDataSource);
       else if (this.dataSource.dataOrigin==="remote")
         this.loadRemoteDataOnInitializaton(this.dataSource.properties.url);
     }
  }

  ngAfterContentInit(){
    this.dataSource.methodType="GET";
    this.dataSource.dataOrigin="remote";
      this.initGrid();
    
  }



//// events

  seekToFirstPage(){
      this.clientPagerParams.data.pageStart=0;
      this.seekToPage();
  }
  seekToLastPage(){
    this.seekToPage();
  }

  seekToNextPage(){
   this.clientPagerParams.data.pageStart=this.clientPagerParams.data.pageStart+1; 
   this.seekToPage();
  }
  seekToPreviousPage(){
   this.clientPagerParams.data.pageStart=this.clientPagerParams.data.pageStart-1; 
   this.seekToPage();
  }

  seekToPage(){
      if (this.clientPagerParams.data.pageStart==-1)
        return;
      this.rows=null;
      this.rows=[];
      
      this.initGrid();
  }
}



