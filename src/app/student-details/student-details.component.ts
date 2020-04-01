import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
    student: any;
    courseName: any;

    constructor(
        private route: ActivatedRoute,
        private service: StudentService,
        private courseService: CourseService
    ) {}

    ngOnInit(): void {
        this.getStudent();
        this.getCourse();
    }
    getStudent(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.service.getStudent(id).subscribe(res => {
            this.student = res;
        });
    }

    getCourse(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.courseService.getCourse(id).subscribe(res => {
            // console.log(res['name']);
            this.courseName = res;
        });
    }
}
