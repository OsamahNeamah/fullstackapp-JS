import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL: string = 'http://localhost:5000';
  private Users?: BehaviorSubject<object> | null = new BehaviorSubject({});
  private Messages?: BehaviorSubject<object> | null = new BehaviorSubject({});
  constructor(private http: HttpClient) {}

  getUsers(): Observable<object> {
    return <any>this.http.get(`${this.baseURL}/getUsers`).pipe(
      map(data => {
        this.Users?.next(data);
        return this.Users
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  DeleteUser(id?:number):Observable<object> {
    return <any>this.http.delete(`${this.baseURL}/deleteUser/id=${id}`).pipe(
      map(data => {
        this.Messages?.next(data);
        return this.Messages
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
  AddUser(name:string,phone:number):Observable<object> {
    return <any>this.http.post(`${this.baseURL}/addUser/`,{name,phone}).pipe(
      map(data => {
        this.Users?.next(data);
        return this.Users
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }

  updateUser(name:string,phone:number,id:number|undefined):Observable<object> {
    return <any>this.http.put(`${this.baseURL}/updateUser/`,{name,phone,id}).pipe(
      map(data => {
        this.Users?.next(data);
        return this.Users
      }),
      catchError((err) => {
        console.log(err);
        return err;
      })
    );
  }
}
