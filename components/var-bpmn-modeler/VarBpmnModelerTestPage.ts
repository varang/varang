/**
 * Created by halil on 11/02/2017.
 */

import {Component, Input, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';



@Component({
    selector: 'VarBpmnModelerTestPage',
    styles: [`
`],
    template: `
    <div VarBpmnModeler [height]="400" [width]="400"  ></div>
`

})
export class VarBpmnModelerTestPage implements AfterViewInit {



    ngAfterViewInit(): void {
    }


}

