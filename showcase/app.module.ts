//Modules
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

//Components
import {AppComponent} from "./app.component";
import {VarGrid} from "../components/var-grid/VarGrid";
import {VarGridColumn} from "../components/var-grid/VarGrid";
import {VarGridRow} from "../components/var-grid/VarGrid";




@NgModule({
    imports:      [ BrowserModule, HttpModule],
    declarations: [ AppComponent, VarGrid, VarGridColumn, VarGridRow],


    bootstrap:    [ AppComponent ],
    entryComponents: [ ],
    providers:    [ ],

})
export class AppModule {


}
