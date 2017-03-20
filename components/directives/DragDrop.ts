/**
 * Created by halil on 13/02/2017.
 */

import { NgModule, Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';


export class DDDragEvent {
    nativeEvent: any;
    dragData: any;
    source:any;

    constructor(event: any, data: any, source:any=null) {
        this.nativeEvent = event;
        this.dragData = data;
        this.source = source;

    }
}

export class DDDropEvent {
    nativeEvent: any;
    dragData: any;
    source:any;

    constructor(event: any, data: any) {
        this.nativeEvent = event;
        this.dragData = data;
    }
}

@Directive({
    selector: '[draggable]',
    host: {
        '[draggable]': 'true'
    }
})
/**
 * Makes an element draggable by adding the draggable html attribute
 */
export class Draggable {
    /**
     * The data that will be avaliable to the droppable directive on its `onDrop()` event.
     */
    @Input() dragData;

    /**
     * The selector that defines the drag Handle. If defined drag will only be allowed if dragged from the selector element.
     */
    @Input() dragHandle: string;

    /**
     * Currently not used
     */
    @Input() dragEffect = 'move';

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dragScope: string = 'default';

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Event fired when Drag is started
     */
    @Output() onDragStart: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired while the element is being dragged
     */
    @Output() onDrag: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when dragged ends
     */
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

    private mouseOverElement: any;


    @HostListener('dragstart', ['$event'])
    dragStart(e) {
        if (this.allowDrag()) {
            if (e.target.classList != undefined && e.target.classList != null)
                e.target.classList.add(this.dragOverClass);
            e.dataTransfer.setData('application/json', JSON.stringify(this.dragData));
            e.dataTransfer.setData(this.dragScope, this.dragScope);
            e.stopPropagation();
            this.onDragStart.emit(e);
        }
        else {
            e.preventDefault();
        }
    }

    @HostListener('drag', ['$event'])
    drag(e) {
        this.onDrag.emit(e)
    }

    @HostListener('dragend', ['$event'])
    dragEnd(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);
        this.onDragEnd.emit(e);
        e.stopPropagation();
        e.preventDefault();
    }

    @HostListener('mouseover', ['$event'])
    mouseover(e) {
        this.mouseOverElement = e.target;
    }

    private allowDrag() {
        if (this.dragHandle)
            return this.mouseOverElement.matches(this.dragHandle);
        else
            return true;
    }
}



@Directive({
    selector: '[droppable]',
    host: {
        '[draggable]': 'true'
    }
})
export class Droppable {

    /**
     *  Event fired when Drag dragged element enters a valid drop target.
     */
    @Output() onDragEnter: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is being dragged over a valid drop target
     */
    @Output() onDragOver: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when a dragged element leaves a valid drop target.
     */
    @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when an element is dropped on a valid drop target.
     */
    @Output() onDrop: EventEmitter<DDDropEvent> = new EventEmitter();

    /**
     * CSS class applied on the draggable that is applied when the item is being dragged.
     */
    @Input() dragOverClass: string;

    /**
     * Defines compatible drag drop pairs. Values must match both in draggable and droppable.dropScope.
     */
    @Input() dropScope: string = 'default';

    constructor(protected el: ElementRef) {
    }

    @HostListener('dragenter', ['$event'])
    dragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.onDragEnter.emit(e);
    }

    @HostListener('dragover', ['$event'])
    dragOver(e) {
        if (this.allowDrop(e)) {
            if (e.target.classList != undefined && e.target.classList != null)
                e.target.classList.add(this.dragOverClass);
            e.preventDefault();
            this.onDragOver.emit(e);
        }
    }

    @HostListener('dragleave', ['$event'])
    dragLeave(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        this.onDragLeave.emit(e);
    }

    @HostListener('drop', ['$event'])
    drop(e) {
        if (e.target.classList != undefined && e.target.classList != null)
            e.target.classList.remove(this.dragOverClass);
        e.preventDefault();
        e.stopPropagation();
        let data;
        try {
            data = JSON.parse(e.dataTransfer.getData('application/json'));
        } catch (e) {
            data = e;
        }
        this.onDrop.emit(new DDDropEvent(e, data));
    }

    allowDrop(e): boolean {
        let allow = false;
        let types = e.dataTransfer.types;
        if (types && types.length) {
            for (let i = 0; i < types.length; i++) {
                if (types[i] == this.dropScope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    }
}



@NgModule({
    imports: [],
    declarations: [
        Draggable,
        Droppable
    ],
    exports: [
        Draggable,
        Droppable
    ],
    providers: [],
})
export class DragDropModule {
}