/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import { QueryList, ElementRef } from "@angular/core";
import { Http } from "@angular/http";
import { RemotePagerParams, ClientPagerParams, DataSourceProperties } from "../models/core";
export declare class VarGridRemotePagerParams {
    private elementRef;
    content: string;
    params: RemotePagerParams;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
}
export declare class VarGridClientPagerParams {
    private elementRef;
    content: string;
    params: ClientPagerParams;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
}
export declare class VarGridColumn {
    label: string;
    name: string;
    searchOptions: string;
    styleClass: string;
    ngAfterContentInit(): void;
}
export declare class VarGridColumnView {
    label: string;
    name: string;
    searchOptions: string;
    styleClass: string;
    content: string;
}
export declare class VarGridRow {
    coldefs: QueryList<VarGridColumn>;
    ngAfterContentInit(): void;
}
export declare class VarGridRowView {
    columns: QueryList<VarGridColumnView>;
    cells: VarGridColumnView[];
    constructor();
    ngAfterContentInit(): void;
}
export declare class VarGridDataSource {
    private elementRef;
    url: string;
    methodType: string;
    serverType: string;
    dataOrigin: string;
    localDataSource: any[];
    loadOnInit: boolean;
    content: string;
    properties: DataSourceProperties;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
}
export declare class VarGridHeaderColumnView {
    private elementRef;
    label: string;
    name: string;
    searchOptions: string;
    styleClass: string;
    content: string;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
}
export declare class VarGridHeaderRowView {
    columns: QueryList<VarGridHeaderColumnView>;
    ngAfterContentInit(): void;
}
export declare class VarGrid {
    private http;
    jsonReader: VarGridRemotePagerParams;
    clientPagerParams: VarGridClientPagerParams;
    headerColumns: VarGridHeaderRowView;
    dataSource: VarGridDataSource;
    rowdef: VarGridRow;
    coldefs: QueryList<VarGridColumn>;
    private rows;
    constructor(http: Http);
    copyColumnView(declaredColumns: QueryList<VarGridColumn>): VarGridColumnView[];
    findColumnViewIndexByName(cols: VarGridColumnView[], key: string): number;
    loadLocalDataOnInitializaton(data: any[]): void;
    loadRemoteData(data: any): void;
    buildPaginationUrl(url: string): string;
    loadRemoteDataOnInitializaton(url: string): void;
    loadPage(): void;
    ngAfterContentInit(): void;
    seekToFirstPage(): void;
    seekToLastPage(): void;
    seekToNextPage(): void;
    seekToPreviousPage(): void;
    seekToPage(): void;
}
