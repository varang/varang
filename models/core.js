"use strict";
var RemotePagerParams = (function () {
    function RemotePagerParams() {
        this.root = "rows";
        this.page = "page";
        this.total = "total";
        this.records = "records";
        this.repeatitems = false;
        this.cell = "cell";
        this.id = "id";
    }
    return RemotePagerParams;
}());
exports.RemotePagerParams = RemotePagerParams;
var ClientPagerParams = (function () {
    function ClientPagerParams() {
        this.sidx = "id";
        this.pageSizes = [10, 30, 100];
        this.pageSize = this.pageSizes[0];
        this.sord = "ASC";
        this.pageStart = 1;
    }
    return ClientPagerParams;
}());
exports.ClientPagerParams = ClientPagerParams;
var DataSourceProperties = (function () {
    function DataSourceProperties() {
        this.url = "id";
    }
    return DataSourceProperties;
}());
exports.DataSourceProperties = DataSourceProperties;
//# sourceMappingURL=core.js.map