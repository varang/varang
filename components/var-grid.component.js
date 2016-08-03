///<reference path="../node_modules/angular2/typings/browser.d.ts"/> 
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var core_2 = require("../models/core");
// <VarGridClientPagerParams [pageSize]='11' [sord]='ASC' [sidx]='id' [pageStart]='0' [pageSizes]='[10,20,50]'>
// 		fff</VarGridClientPagerParams>
var VarGridRemotePagerParams = (function () {
    function VarGridRemotePagerParams(elementRef) {
        this.elementRef = elementRef;
        // @ViewChild(TodoInputComponent) inputComponent: TodoInputComponent
        //@ViewChild('wrapper') wrapper;
        this.content = "{}";
        this.content = this.elementRef.nativeElement.innerHTML;
    }
    // to ensure bindings have been resolved
    // see also 
    // https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html#!#aftercontent
    VarGridRemotePagerParams.prototype.ngAfterContentInit = function () {
        this.content = this.elementRef.nativeElement.innerHTML;
        var data = JSON.parse(JSON.parse(JSON.stringify(this.content)));
        this.params = new core_2.RemotePagerParams();
        this.params.root = data.root;
        this.params.cell = data.cell;
        this.params.id = data.id;
        this.params.page = data.page;
        this.params.records = data.records;
        this.params.repeatitems = data.repeatitems;
        this.params.total = data.total;
    };
    VarGridRemotePagerParams = __decorate([
        core_1.Component({
            selector: "VarGridRemotePagerParams",
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VarGridRemotePagerParams);
    return VarGridRemotePagerParams;
}());
exports.VarGridRemotePagerParams = VarGridRemotePagerParams;
var VarGridClientPagerParams = (function () {
    function VarGridClientPagerParams(elementRef) {
        this.elementRef = elementRef;
        this.content = "{}";
        this.params = new core_2.ClientPagerParams();
        this.content = this.elementRef.nativeElement.innerHTML;
    }
    VarGridClientPagerParams.prototype.ngAfterContentInit = function () {
        this.content = this.elementRef.nativeElement.innerHTML;
        var data = JSON.parse(JSON.parse(JSON.stringify(this.content)));
        this.params.pageStart = data.pageStart;
        this.params.sidx = data.sidx;
        this.params.pageSize = data.pageSize;
        this.params.sord = data.sord;
        this.params.pageSizes = data.pageSize;
    };
    VarGridClientPagerParams = __decorate([
        core_1.Component({
            selector: "VarGridClientPagerParams",
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VarGridClientPagerParams);
    return VarGridClientPagerParams;
}());
exports.VarGridClientPagerParams = VarGridClientPagerParams;
var VarGridColumn = (function () {
    function VarGridColumn() {
    }
    VarGridColumn.prototype.ngAfterContentInit = function () {
        // console.log(this.input);
        //alert("vargridrow-aftercontentchecked");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumn.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumn.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumn.prototype, "searchOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumn.prototype, "styleClass", void 0);
    VarGridColumn = __decorate([
        core_1.Component({
            selector: "VarGridColumn",
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], VarGridColumn);
    return VarGridColumn;
}());
exports.VarGridColumn = VarGridColumn;
var VarGridColumnView = (function () {
    function VarGridColumnView() {
        this.content = "cell__1";
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumnView.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumnView.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumnView.prototype, "searchOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridColumnView.prototype, "styleClass", void 0);
    VarGridColumnView = __decorate([
        core_1.Component({
            selector: "[VarGridColumnView]",
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], VarGridColumnView);
    return VarGridColumnView;
}());
exports.VarGridColumnView = VarGridColumnView;
var VarGridRow = (function () {
    function VarGridRow() {
    }
    VarGridRow.prototype.ngAfterContentInit = function () {
        // alert("childdefs:"+this.coldefs.length);
        // console.log(this.input);
        //alert("vargridrow-aftercontentchecked");
        // alert(this.Columns.first.styleClass);
    };
    __decorate([
        core_1.ContentChildren(VarGridColumn), 
        __metadata('design:type', core_1.QueryList)
    ], VarGridRow.prototype, "coldefs", void 0);
    VarGridRow = __decorate([
        core_1.Component({
            selector: "VarGridRow",
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], VarGridRow);
    return VarGridRow;
}());
exports.VarGridRow = VarGridRow;
var VarGridRowView = (function () {
    function VarGridRowView() {
        this.cells = [];
        // this.cells.push(new VarGridColumnView());
        // this.cells.push(new VarGridColumnView());
        // this.cells.push(new VarGridColumnView());
        // this.cells.push(new VarGridColumnView());
        // this.cells[0].content="row1data0";
        // this.cells[1].content="row1data1";
        // this.cells[2].content="row1data2";
        // this.cells[3].content="row1data3";
    }
    VarGridRowView.prototype.ngAfterContentInit = function () {
        // console.log(this.input);
        //alert("vargridrow-aftercontentchecked");
        //alert(this.columns.first.styleClass);
    };
    __decorate([
        core_1.ContentChildren(VarGridColumnView), 
        __metadata('design:type', core_1.QueryList)
    ], VarGridRowView.prototype, "columns", void 0);
    VarGridRowView = __decorate([
        core_1.Component({
            selector: "[VarGridRowView]",
            directives: [VarGridColumnView],
            template: "\n        <ng-content></ng-content>\n        "
        }), 
        __metadata('design:paramtypes', [])
    ], VarGridRowView);
    return VarGridRowView;
}());
exports.VarGridRowView = VarGridRowView;
var VarGridDataSource = (function () {
    function VarGridDataSource(elementRef) {
        this.elementRef = elementRef;
        this.content = "{}";
        this.properties = new core_2.DataSourceProperties();
        this.content = this.elementRef.nativeElement.innerHTML;
    }
    VarGridDataSource.prototype.ngAfterContentInit = function () {
        this.content = this.elementRef.nativeElement.innerHTML;
        var data = JSON.parse(JSON.parse(JSON.stringify(this.content)));
        this.properties.url = data.url;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridDataSource.prototype, "url", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridDataSource.prototype, "methodType", void 0);
    __decorate([
        //get post
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridDataSource.prototype, "serverType", void 0);
    __decorate([
        //rest, solr, mongodb
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridDataSource.prototype, "dataOrigin", void 0);
    __decorate([
        //local, remote
        core_1.Input(), 
        __metadata('design:type', Array)
    ], VarGridDataSource.prototype, "localDataSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], VarGridDataSource.prototype, "loadOnInit", void 0);
    VarGridDataSource = __decorate([
        core_1.Component({
            selector: "VarGridDataSource",
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VarGridDataSource);
    return VarGridDataSource;
}());
exports.VarGridDataSource = VarGridDataSource;
var VarGridHeaderColumnView = (function () {
    //   constructor(@Inject(ElementRef) element: ElementRef) {
    //     this.content = element.nativeElement.innerHTML;
    //         // this.content = this.elementRef.nativeElement.innerHTML;
    //         // this.content = "header!!";
    //         //alert("headerColumnview:content:"+this.content);
    //   }
    function VarGridHeaderColumnView(elementRef) {
        this.elementRef = elementRef;
        //this.content = this.elementRef.nativeElement.innerHTML;
    }
    VarGridHeaderColumnView.prototype.ngAfterContentInit = function () {
        this.content = this.elementRef.nativeElement.innerHTML;
        //alert("content"+this.elementRef.nativeElement.innerHTML);
        // console.log(this.input);
        //alert("vargridrow-aftercontentchecked");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridHeaderColumnView.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridHeaderColumnView.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridHeaderColumnView.prototype, "searchOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VarGridHeaderColumnView.prototype, "styleClass", void 0);
    VarGridHeaderColumnView = __decorate([
        core_1.Directive({
            selector: "[VarGridHeaderColumnView]"
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VarGridHeaderColumnView);
    return VarGridHeaderColumnView;
}());
exports.VarGridHeaderColumnView = VarGridHeaderColumnView;
var VarGridHeaderRowView = (function () {
    function VarGridHeaderRowView() {
    }
    VarGridHeaderRowView.prototype.ngAfterContentInit = function () {
        //alert("size:"+this.columns.length);
        // console.log(this.input);
        //alert("vargridrow-aftercontentchecked");
        // alert(this.Columns.first.styleClass);
    };
    __decorate([
        core_1.ContentChildren(VarGridHeaderColumnView), 
        __metadata('design:type', core_1.QueryList)
    ], VarGridHeaderRowView.prototype, "columns", void 0);
    VarGridHeaderRowView = __decorate([
        core_1.Component({
            selector: "[VarGridHeaderRowView]",
            directives: [VarGridHeaderColumnView],
            template: "\n    <th VarGridHeaderColumnView *ngFor=\"let column of columns\"  >{{column.content}}</th>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], VarGridHeaderRowView);
    return VarGridHeaderRowView;
}());
exports.VarGridHeaderRowView = VarGridHeaderRowView;
var VarGrid = (function () {
    function VarGrid(http) {
        this.http = http;
        this.rows = [];
    }
    VarGrid.prototype.copyColumnView = function (declaredColumns) {
        var cols = [];
        declaredColumns.forEach(function (declaredColumn) {
            var col = new VarGridColumnView();
            col.name = declaredColumn.name;
            col.label = declaredColumn.label;
            col.searchOptions = declaredColumn.searchOptions;
            col.styleClass = declaredColumn.styleClass;
            cols.push(col);
        });
        return cols;
    };
    VarGrid.prototype.findColumnViewIndexByName = function (cols, key) {
        for (var i = 0; i < cols.length; i++)
            if (cols[i].name == key)
                return i;
        return -1;
    };
    VarGrid.prototype.loadLocalDataOnInitializaton = function (data) {
        var _this = this;
        if (data === undefined || data.length == 0)
            return;
        //TODO, apply mapping of a best practice
        data.forEach(function (row) {
            var newrow = new VarGridRowView();
            var cols = _this.copyColumnView(_this.rowdef.coldefs);
            Object.keys(row).forEach(function (key) {
                var idx = _this.findColumnViewIndexByName(cols, key);
                if (idx != -1)
                    cols[idx].content = row[key];
            });
            cols.forEach(function (col) { return newrow.cells.push(col); });
            _this.rows.push(newrow);
        });
    };
    VarGrid.prototype.loadRemoteData = function (data) {
        var bodyString = JSON.parse(JSON.stringify(data))._body;
        var griddata = JSON.parse(bodyString);
        var rows = griddata._embedded.persons;
        if (rows === undefined || rows.length == 0)
            return;
        this.loadLocalDataOnInitializaton(rows);
    };
    VarGrid.prototype.buildPaginationUrl = function (url) {
        return url
            + "?page=" + this.clientPagerParams.params.pageStart
            + "&rows=" + this.clientPagerParams.params.pageSize
            + "&sidx=" + this.clientPagerParams.params.sidx
            + "&sord=" + this.clientPagerParams.params.sord;
    };
    VarGrid.prototype.loadRemoteDataOnInitializaton = function (url) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-type': 'application/json' });
        if (this.dataSource.methodType.toUpperCase() === "POST")
            this.http.post(this.dataSource.properties.url, JSON.stringify(this.clientPagerParams.params), { headers: headers })
                .subscribe(function (data) { return _this.loadRemoteData(data); }, function (error) { return console.log(error); });
        this.http.get(this.buildPaginationUrl(this.dataSource.properties.url), { headers: headers })
            .subscribe(function (data) { return _this.loadRemoteData(data); }, function (error) { return console.log(error); });
    };
    VarGrid.prototype.loadPage = function () {
        if (this.dataSource.loadOnInit) {
            if (this.dataSource.dataOrigin === "local")
                this.loadLocalDataOnInitializaton(this.dataSource.localDataSource);
            else if (this.dataSource.dataOrigin === "remote")
                this.loadRemoteDataOnInitializaton(this.dataSource.properties.url);
        }
    };
    VarGrid.prototype.ngAfterContentInit = function () {
        this.dataSource.dataOrigin = "remote";
        this.dataSource.methodType = "POST";
        this.loadPage();
    };
    //// events
    VarGrid.prototype.seekToFirstPage = function () {
        this.clientPagerParams.params.pageStart = 0;
        this.seekToPage();
    };
    VarGrid.prototype.seekToLastPage = function () {
        this.seekToPage();
    };
    VarGrid.prototype.seekToNextPage = function () {
        this.clientPagerParams.params.pageStart = this.clientPagerParams.params.pageStart + 1;
        this.seekToPage();
    };
    VarGrid.prototype.seekToPreviousPage = function () {
        this.clientPagerParams.params.pageStart = this.clientPagerParams.params.pageStart - 1;
        this.seekToPage();
    };
    VarGrid.prototype.seekToPage = function () {
        if (this.clientPagerParams.params.pageStart == -1)
            return;
        this.rows = null;
        this.rows = [];
        this.loadPage();
    };
    __decorate([
        core_1.ContentChild(VarGridRemotePagerParams), 
        __metadata('design:type', VarGridRemotePagerParams)
    ], VarGrid.prototype, "jsonReader", void 0);
    __decorate([
        core_1.ContentChild(VarGridClientPagerParams), 
        __metadata('design:type', VarGridClientPagerParams)
    ], VarGrid.prototype, "clientPagerParams", void 0);
    __decorate([
        core_1.ContentChild(VarGridHeaderRowView), 
        __metadata('design:type', VarGridHeaderRowView)
    ], VarGrid.prototype, "headerColumns", void 0);
    __decorate([
        core_1.ContentChild(VarGridDataSource), 
        __metadata('design:type', VarGridDataSource)
    ], VarGrid.prototype, "dataSource", void 0);
    __decorate([
        core_1.ContentChild(VarGridRow), 
        __metadata('design:type', VarGridRow)
    ], VarGrid.prototype, "rowdef", void 0);
    __decorate([
        core_1.ContentChildren(VarGridColumn), 
        __metadata('design:type', core_1.QueryList)
    ], VarGrid.prototype, "coldefs", void 0);
    VarGrid = __decorate([
        core_1.Component({
            selector: "VarGrid",
            //encapsulation: ViewEncapsulation.Emulated,
            directives: [VarGridHeaderRowView, VarGridHeaderColumnView, VarGridRowView, VarGridColumnView, VarGridDataSource],
            template: "\n    <table class=\"ui celled table\">\n      <thead>\n        <!--tr VarGridHeaderRowView>  \n          <th VarGridHeaderColumnView>Header1</th>\n          <th VarGridHeaderColumnView>Header2</th>\n          <th VarGridHeaderColumnView>Header3</th>\n          <th VarGridHeaderColumnView>Header4</th>\n         </tr-->\n          \n       </thead>\n       <tbody >\n\n        <tr VarGridRowView  *ngFor=\"let row of rows\">\n            <td VarGridColumnView *ngFor=\"let cell of row.cells\">{{cell.content}}</td>\n        </tr>\n       </tbody>\n       <tfoot>\n          <tr><th colspan=\"3\">\n          <div class=\"ui right floated pagination menu\">\n            <a class=\"icon item\" (click)=\"seekToFirstPage()\"><i class=\"angle double left icon\" ></i></a>\n            <a class=\"icon item\" (click)=\"seekToPreviousPage()\"><i class=\"angle left icon\" ></i></a>\n            <a class=\"icon item\" (click)=\"seekToNextPage()\"><i class=\"angle right  icon\" ></i></a>\n            <a class=\"icon item\" (click)=\"seekToLastPage()\"><i class=\"angle double right icon\" ></i></a>\n          </div>\n          </th>\n          </tr>\n        </tfoot>\n    </table>\n\t"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VarGrid);
    return VarGrid;
}());
exports.VarGrid = VarGrid;
//# sourceMappingURL=var-grid.component.js.map