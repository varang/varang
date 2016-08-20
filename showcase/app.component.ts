
import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {
	VarGrid,
	VarGridClientPagerParams,
	VarGridRemoteDataProviderMapping, 
	VarGridRow,
	VarGridColumn,
	VarGridDataSource
	 } from "../components/VarGrid";
import {VarGridEvent, VarangInterceptor} from "../components/core";

@Component({
  selector: 'my-app',
  directives:[VarGrid,VarGridRemoteDataProviderMapping,VarGridClientPagerParams, VarGridRow, VarGridColumn, VarGridDataSource],
providers:[ HTTP_PROVIDERS],
  templateUrl:"showcase/app.component.html" 
})
export class AppComponent { 


gridRowSelected(event:VarGridEvent) {
	//alert("rowid:"+JSON.stringify(event.value.rowId));
}

onGridPaging(event:VarGridEvent) {
	if (event.intercept = VarangInterceptor.Before){
		//alert("before paging");
	} else if (event.intercept = VarangInterceptor.After) {
		//alert("after paging");
	}
}
}

