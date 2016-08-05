
import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {
	VarGrid,
	VarGridClientPagerParams,
	VarGridRemoteDataProviderMapping, 
	VarGridRow,
	VarGridColumn,
	VarGridDataSource } from "../components/VarGrid";

@Component({
  selector: 'my-app',
  directives:[VarGrid,VarGridRemoteDataProviderMapping,VarGridClientPagerParams, VarGridRow, VarGridColumn, VarGridDataSource],
providers:[ HTTP_PROVIDERS],
  templateUrl:"showcase/app.component.html" 
})
export class AppComponent { }

