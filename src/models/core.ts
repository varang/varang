export class RemotePagerParams {
	root:string= "rows";
    page:string= "page";
    total:string= "total";
    records:string= "records";
    repeatitems:boolean= false;
    cell:string= "cell";
    id:string= "id";
}

export class ClientPagerParams {
	sidx:string="id";
	pageSizes:number[]=[10,30,100];
  	pageSize:number=this.pageSizes[0];
  	sord:string="ASC";
  	pageStart:number=1;
  	
}


export class DataSourceProperties {
  url:string="id";
}
