import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'priorityfilter'
})
@Injectable()
export class PriorityFilterPipe implements PipeTransform {
    transform(tasks: any, search: string): any {
        if (!tasks || !search) {
            return tasks;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return tasks.filter(item => parseInt(item.priority_id) == parseInt(search));
    }
}