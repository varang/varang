import {Component} from "@angular/core";


@Component({
	selector:'VarGridAjaxPage',
	templateUrl:"components/var-grid/var-grid-page-ajax.component.html"
	
})
export class VarGridAjaxPage {

	jsonMapper={
		"in":{
			"jsonXPath":
				{
					"list": "_embedded.persons",
					"pageSize": "page.size",
					"pageIndex": "page.number",
					"total": "page.totalElements"
				}
		},
		"out":{
			"pageStart": "page",
			"pageSize": "rows",
			"sortIndex":"sidx",
			"sortOrder": "sort"
		}
	};


	clientPagerParams={
		"id":"id",
		"sortIndex": "id",
		"pageSize": 10,
		"pageSizes": [10,30,50],
		"sortOrder": "ASC",
		"pageStart": 0
	};
	public localDataStore:any[];
	constructor(){
		this.localDataStore = this._localDataStore();
	}

	_localDataStore(){
		return [
			{"id":1, "name":"joan1", "surname":"doe1", "age":18},
			{"id":2, "name":"joan2", "surname":"doe2", "age":19},
			{"id":3, "name":"joan3", "surname":"doe3", "age":20},
			{"id":4, "name":"joan4", "surname":"doe4", "age":21},
			{"id":5, "name":"joan5", "surname":"doe5", "age":22},
			{"id":6, "name":"joan6", "surname":"doe6", "age":23},
			{"id":7, "name":"joan7", "surname":"doe7", "age":24},
			{"id":8, "name":"joan8", "surname":"doe8", "age":25},
			{"id":9, "name":"joan9", "surname":"doe9", "age":26},
			{"id":10, "name":"joan10", "surname":"doe10", "age":27},
			{"id":11, "name":"joan11", "surname":"doe11", "age":28}
			
		];
	}
}


