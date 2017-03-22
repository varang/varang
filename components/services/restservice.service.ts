import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {RequestOptions} from "@angular/http/src";


export interface VarBpmnRestService {
	orgTreeFetchUrl:string;
	serviceClassesFetchUrl:string;
	bpmnSubmitUrl:string;

	post(url:string, requestBody:any, options:any, successFn:(data)=>any, errorFn:(data)=>any):any;
	get(url:string, requestBody:any,  successFn:(data)=>any, errorFn:(data)=>any):any;
	fetchOrganizationTree(successFn:(data)=>any, errorFn:(data)=>any):void;
	fetchBpmnServiceClasses(successFn:(data)=>any, errorFn:(data)=>any):void;
	postBpmn(successFn:(data)=>any, errorFn:(data)=>any):void;


}

@Injectable()
export class VarBpmnRestServiceImpl implements VarBpmnRestService{

	orgTreeFetchUrl:string="http://localhost:8281/ebys/rest/organization/listAll";
	bpmnSubmitUrl:string="http://localhost:8281/ebys/rest/eimza/addBpmnModel";
	serviceClassesFetchUrl:string="http://localhost:8281/bpmn/rest/service/list/vbt.ebys.bpmn.service";

	constructor(private http:Http){

	}

	public post(url:string, requestBody:any, options:any, successFn:(data)=>any, errorFn:(data)=>any):any{
		this.http.post(url, requestBody, options).subscribe(
			payload=>{
				successFn(payload);
			},
			error => {
				errorFn(error);
			}
		);

		return null;
	}

	public get(url:string, options:any, successFn:(data)=>any, errorFn:(data)=>any):any{
		this.http.get(url, options).subscribe(
			payload=>{
				successFn(payload);
			},
			error => {
				errorFn(error);
			}
		);

		return null;
	}

	public 	fetchOrganizationTree(successFn:(data)=>any, errorFn:(data)=>any):void {
		let reqOpt = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
		this.post(this.orgTreeFetchUrl, {},reqOpt,
			(data) => {
				successFn(data);
			},
			(data) => {
				console.error(data);
				errorFn(data);
			}
		);
	}

	public 	fetchBpmnServiceClasses(successFn:(data)=>any, errorFn:(data)=>any):void {
		let reqOpt = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
		this.post(this.serviceClassesFetchUrl, {},reqOpt,
			(data) => {
				successFn(data);
			},
			(data) => {
				console.error(data);
				errorFn(data);
			}
		);
	}

	public 	postBpmn(successFn:(data)=>any, errorFn:(data)=>any):void {
		let reqOpt = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
		this.post(this.bpmnSubmitUrl, {},reqOpt,
			(data) => {
				successFn(data);
			},
			(data) => {
				console.error(data);
				errorFn(data);
			}
		);
	}





}