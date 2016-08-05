
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
