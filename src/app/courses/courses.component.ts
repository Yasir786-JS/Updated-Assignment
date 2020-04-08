import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    p = 1;
    courses: Course[];
    selectedCourse: Course[];
    constructor(private service: CourseService) {}

    ngOnInit(): void {
        this.getCourses();
    }

    getCourses(): void {
        this.service.getCourses().subscribe(response => {
            this.courses = response;
        });
    }

    deleteCourse(course): void {
        if (course) {
            this.service.deleteCourse(course.id).subscribe((res: any) => {
                if (res) {
                    this.getCourses();
                    alert(`Course ${course.name} deleted successfully!`);
                }
            });
        }
    }
}
