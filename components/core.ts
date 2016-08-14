
export class RemoteProviderPagingParams {
  list:string;
  pageSize:string;
  pageIndex:string;
  total:string;
}

export class RemoteProviderRequestParamNames {
  pageStart;
  pageSize;
  sortIndex;
  sortOrder;
}
export class RemoteDataProviderIn {
  jasonXPath:RemoteProviderPagingParams = new RemoteProviderPagingParams();
  total:number;
  pageCount:number;
  
}

export class RemoteDataProvider {
    in:RemoteDataProviderIn = new RemoteDataProviderIn();
    out:RemoteProviderRequestParamNames= new RemoteProviderRequestParamNames();

    
}

export class ClientPagerParams {
    id:string;
	  sortIndex:string;
	  pageSizes:number[];
  	pageSize:number;
  	sortOrder:string;
  	pageStart:number;
  	
}

export class DataSourceProperties {
  url:string="id";
}

export enum VarangInterceptor {Before=0, After=1}

export class VarangEvent {
    source:any;
    target:any;
    value:any;    
    intercept:VarangInterceptor=VarangInterceptor.Before; //before, after
}

export class VarGridEvent extends VarangEvent {
    
}

export class VarGridRowSelectedEvent extends VarGridEvent {
    rowId:number;
}



export class VarGridHeaderAction {
  public toggle:boolean;
  public enabled:boolean;
  public name:string;
  constructor(name:string, toggle:boolean){
    this.toggle = toggle;
    this.name = name;
    this.enabled=false;
  }

  sord(){
    return this.toggle?"ASC":"DESC";
  }
}


// export interface RemoteProviderPagingParams {
//   list:string;
//   pageSize:string;
//   pageIndex:string;
//   total:string;
// }

// export interface RemoteProviderRequestParamNames {
//   pageStart:string;
//   pageSize:string;
//   sortIndex:string;
//   sortOrder:string;
// }
// export interface RemoteDataProviderIn {
//   jasonXPath:RemoteProviderPagingParams;
// }

// export interface RemoteDataProvider {
//     in:RemoteDataProviderIn;
//     out:RemoteProviderRequestParamNames;

    
// }

// export interface ClientPagerParams {
//     id:string;
//     sortIndex:string;
//     pageSizes:number[];
//     pageSize:number;
//     sortOrder:string;
//     pageStart:number;
    
// }

// export class DataSourceProperties {
//   url:string;
// }
