import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'SIS-App';
    p = 1;
    Collection = [];
    students = [
        {
            name: 'name',
            id: '1'
        },
        {
            name: 'name2',
            id: '2'
        }
    ];
    constructor() {
        for (let i = 0; i <= 100; i++) {
            const obj = { name: `EmployeeName ${i}`, code: `Emp ${i}` };
            this.Collection.push(obj);
        }
    }
}
