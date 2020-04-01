import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
    students: Student[];
    selectedStudent: Student[];

    constructor(private service: StudentService) {}

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents(): void {
        this.service.getStudents().subscribe(res => {
            this.students = res;
        });
    }

    deleteStudent(student: Student): void {
        this.service.deleteStudent(student.id).subscribe(
            (res: any) => {
                if (res) {
                    this.getStudents();
                    alert(`Student ${student.name} Deleted Successfully!`);
                }
            },
            (error: any) => {
                console.error(`Error: ${error}`);
            }
        );
    }
}
