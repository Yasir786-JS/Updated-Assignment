import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentComponent } from './student/student.component';
import { CoursesComponent } from './courses/courses.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
    { path: 'student', component: StudentComponent },
    { path: 'student-details/:id', component: StudentDetailsComponent },
    { path: 'add-student', component: StudentFormComponent },
    { path: 'edit-student/:id', component: StudentFormComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'view-course/:id', component: ViewCourseComponent },
    { path: 'add-course', component: CourseFormComponent },
    { path: 'edit-course/:id', component: CourseFormComponent },
    { path: '', redirectTo: '/student', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
