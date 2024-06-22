import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Console } from 'console';
import { UserAuth } from '../models/userAuth';
import { UserReturn } from '../models/userReturn';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  BASE_URL: string = 'http://localhost:3000/';
  TOKEN_FIREBASE: string = 'AIzaSyDThl5AbjP3GU4XvtdpBn5ZvVUFVXMJMSA';
  FIREBASE_URL: string = 'https://identitytoolkit.googleapis.com/';
  
  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]>{
    let url:string = (this.BASE_URL + 'users')
    return this.http.get<User[]>(url, httpOptions);
  }

  getUser(id:any): Observable<User>{
    let url:string = (this.BASE_URL + 'users/' + id)
    return this.http.get<User>(url, httpOptions);
  }

  login(data:any): Observable<UserAuth>{
    console.log(data);
    return this.http.post<UserAuth>(this.FIREBASE_URL + 'v1/accounts:signInWithPassword?key=' + this.TOKEN_FIREBASE, data, httpOptions);
  }

  getUserById(): Observable<UserReturn>{
    let data = {idToken: localStorage.getItem('token') || ''};
    var url: string = this.FIREBASE_URL + 'v1/accounts:signInWithPassword?key=' + this.TOKEN_FIREBASE;
    return this.http.post<UserReturn>(url, data, httpOptions);
  }

  addUser(user:any): Observable<User>{
    let url:string = (this.BASE_URL + 'users');
    return this.http.post<User>(url, user, httpOptions);
  }

  editUser(user:any): Observable<User>{
    let url:string = this.BASE_URL + 'users/' + user.id;
    return this.http.put<User>(url, user, httpOptions);
  }

  deleteUser(user:any): Observable<User>{
    let url:string = (this.BASE_URL + 'users/' + user.id);
    return this.http.delete<User>(url, httpOptions);
  }
}
