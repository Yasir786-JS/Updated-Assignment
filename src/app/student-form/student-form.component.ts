import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Student } from '../student';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html',
    styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
    studentId: number;
    courses;

    formStudent = this.fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        class: ['', Validators.required],
        section: ['', Validators.required],
        address: ['', Validators.required],
        courseId: ['', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService,
        private courseService: CourseService
    ) {}

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('id')) {
            this.studentId = +this.route.snapshot.paramMap.get('id');
            this.getStudent();
        }
        this.getCourses();
    }
    onSubmit(): void {
        if (this.studentId) {
            this.editStudent();
        } else {
            this.addStudent();
        }
    }
    editStudent() {
        this.studentService
            .editStudent(this.studentId, this.formStudent)
            .subscribe(res => {
                alert(`${res.name} edited successfully !`);
                this.router.navigate(['/student']);
            });
    }
    addStudent() {
        this.studentService.addStudent(this.formStudent).subscribe(
            res => {
                alert(`${res.name} added successfully`);
                this.router.navigate(['/student']);
            },
            error => {
                console.log(`Error: ${error}`);
            }
        );
    }

    getStudent(): void {
        this.studentService.getStudent(this.studentId).subscribe({
            next: student => {
                this.formStudent.setValue({
                    name: student.name,
                    age: student.age,
                    class: student.class,
                    section: student.section,
                    address: student.address,
                    courseId: student.courseId
                });
            }
        });
    }

    getCourses(): void{
        this.courseService.getCourses().subscribe(
            res => {
                this.courses = res;
            }
        );
    }
}
