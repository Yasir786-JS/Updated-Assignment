import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './course';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private courseList = 'https://sis-rest-api.herokuapp.com/api/courses';

    constructor(private http: HttpClient) {}

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.courseList);
    }

    getCourse(id: number): Observable<Course[]> {
        const courseDetailURL = `${this.courseList}/${id}`;
        return this.http.get<Course[]>(courseDetailURL);
    }

    deleteCourse(id): Observable<Course[]> {
        const URL = `${this.courseList}/${id}`;
        return this.http.delete<Course[]>(URL);
    }
    addCourse(course): Observable<Course> {
        return this.http.post<Course>(this.courseList, course.value);
    }

    editCourse(id: number, course): Observable<Course> {
        const URL = `${this.courseList}/${id}`;
        return this.http.put<Course>(URL, course.value);
    }
}
