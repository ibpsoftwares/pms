import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'namefilter'
})
@Injectable()
export class NameFilterPipe implements PipeTransform {
    transform(tasks: any, search: string): any {
        if (!tasks || !search) {
            return tasks;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return tasks.filter(item => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    }
}