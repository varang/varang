import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";


export interface VarBpmnRestService {
	post(url:string, requestBody:any, options:any, successFn:(data)=>any, errorFn:(data)=>any):any;
	get(url:string, requestBody:any,  successFn:(data)=>any, errorFn:(data)=>any):any;

}

@Injectable()
export class VarBpmnRestServiceImpl implements VarBpmnRestService{
	public appRoot:string;
	constructor(public http:Http){
		this.appRoot = localStorage.getItem("app.root");
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




}