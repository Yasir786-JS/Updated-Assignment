import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
    courseId: number;

    courseForm = this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required],
        fee: ['', Validators.required],
        startDate: ['', Validators.required]
    });

    constructor(
        private courseService: CourseService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {

        if (this.route.snapshot.paramMap.get('id')) {
            this.courseId = +this.route.snapshot.paramMap.get('id');
            this.getCourse();
        }
    }

    onSubmit(): void {
        if(this.courseId){
            this.editCourse();
        }else
        {
            this.addCourse();
        }
    }

    editCourse(): void {
        this.courseService.editCourse(this.courseId, this.courseForm).subscribe(
            res => {
                alert(`${res.name} edited successfully!`);
                this.router.navigate(['/courses']);
            }
        );
    }

    addCourse(): void {
        this.courseService.addCourse(this.courseForm).subscribe(
            res => {
                alert(`${res.name} added successfully`);
            },
            (error: any) => {
                console.log(`Error: ${error}`);
            }
        );
    }
    getCourse(): void {
        this.courseService.getCourse(this.courseId).subscribe({
            next: (course: any) => {
                this.courseForm.setValue({
                    name: course.name,
                    duration: course.duration,
                    fee: course.fee,
                    startDate: course.startDate
                });
            }
        });
    }
}
