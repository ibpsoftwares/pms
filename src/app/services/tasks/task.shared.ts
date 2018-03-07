import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';

@Injectable()
export class TaskSharedService {
    @Output() currentTask: EventEmitter<any> = new EventEmitter();
    data  = "";
    constructor() {
    }

    get_task() {
        return this.currentTask;
    }

    set_task(task:any){
        this.currentTask.emit(task);
    }

} 
