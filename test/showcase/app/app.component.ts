
import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {
	VarGrid,
	VarGridClientPagerParams,
	VarGridRemotePagerParams, 
	VarGridRow,
	VarGridColumn,
	VarGridDataSource } from "../node_modules/varang/varang";

@Component({
  selector: 'my-app',
  directives:[VarGrid,VarGridRemotePagerParams,VarGridClientPagerParams, VarGridRow, VarGridColumn, VarGridDataSource],
providers:[ HTTP_PROVIDERS],
  templateUrl:"app/app.component.html" 
})
export class AppComponent { }

