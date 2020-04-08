import { Component, OnInit, Injectable } from '@angular/core';
import { CourseService } from '../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
    readonly DELIMITER = '/';

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day : parseInt(date[0], 10),
                month : parseInt(date[1], 10),
                year : parseInt(date[2], 10)
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
}
@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    providers: [
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
    ]
})
export class CourseFormComponent implements OnInit {
    courseId: number;
    model1: string;
    model2: string;
    model: NgbDateStruct;

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
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('id')) {
            this.courseId = +this.route.snapshot.paramMap.get('id');
            this.getCourse();
        }
    }

    onSubmit(): void {
        if (this.courseId) {
            this.editCourse();
        } else {
            this.addCourse();
        }
        console.log(typeof(this.courseForm.value.startDate));
    }

    editCourse(): void {
        this.courseService
            .editCourse(this.courseId, this.courseForm)
            .subscribe(res => {
                alert(`${res.name} edited successfully!`);
                this.router.navigate(['/courses']);
            });
    }

    addCourse(): void {
        if (this.courseForm.status === 'invalid') {
            this.courseForm.markAllAsTouched();
        }
        // const dateFormat: Date = this.courseForm.value.startDate;
        // this.courseForm.value.startDate = new DatePipe('en-us').transform(dateFormat, 'MM/dd/yyyy');
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
