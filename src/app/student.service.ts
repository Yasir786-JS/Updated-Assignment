import { Injectable } from '@angular/core';
import { Student } from './student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private studentList = 'https://sis-rest-api.herokuapp.com/api/students';

    constructor(private http: HttpClient) {}

    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.studentList);
    }

    getStudent(id: number): Observable<Student> {
        const URL = `${this.studentList}/${id}`;
        return this.http.get<Student>(URL);
    }

    deleteStudent(id: number): Observable<Student[]> {
        const URL = `${this.studentList}/${id}`;
        return this.http.delete<Student[]>(URL);
    }

    addStudent(student): Observable<Student> {
        const stValue = student.value;
        return this.http.post<Student>(this.studentList, stValue);
    }

    editStudent(id: number, student): Observable<Student> {
        const stValue = student.value;
        const URL = `${this.studentList}/${id}`;
        return this.http.put<Student>(URL, stValue);
    }
}
