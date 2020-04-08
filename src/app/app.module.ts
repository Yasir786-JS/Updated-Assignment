import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        AddStudentComponent,
        CoursesComponent,
        StudentComponent,
        StudentDetailsComponent,
        ViewCourseComponent,
        CourseFormComponent,
        StudentFormComponent
    ],
    exports: [CourseFormComponent],
    imports: [
        NgbModule,
        BrowserModule,
        NgxPaginationModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
    ],
    providers: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
