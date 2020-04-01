import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
    selector: 'app-view-course',
    templateUrl: './view-course.component.html',
    styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
    course;
    constructor(private route: ActivatedRoute, private service: CourseService) {}

    ngOnInit(): void {
        this.getCourse();
    }

    getCourse(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.service.getCourse(id).subscribe(res => {
            this.course = res;
        });
    }
}
