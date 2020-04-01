import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

    courses: Course[];

    newStudent = this.fb.group({
        name: ['', Validators.required],
        age: [, Validators.required],
        class: ['', Validators.required],
        section: ['', Validators.required],
        address: ['', Validators.required],
        courseId: [, Validators.required]
    });
    constructor(
        private fb: FormBuilder,
        private studentService: StudentService,
        private route: Router,
        private courseService: CourseService
    ) { }

    ngOnInit(): void {
        this.getCourses();
    }

    addStudent() {
        this.studentService.addStudent(this.newStudent).subscribe(() => {
            this.route.navigate(['/student']);
        });
    }

    getCourses() {
        this.courseService.getCourses().subscribe((res) => {
            this.courses = res;
        });
    }

}
