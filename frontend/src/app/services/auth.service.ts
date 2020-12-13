import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  userName: string;

  constructor(private router: Router,
              private http: HttpClient) {}

  createNewUser(name: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        GlobalConstants.apiURL+'/api/auth/signup',
        { name: name, password: password })
        .subscribe(
          () => {
            this.login(name, password).then(
              () => {
                resolve();
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  login(name: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        GlobalConstants.apiURL + '/api/auth/login',
        { name: name, password: password })
        .subscribe(
          (authData: { token: string, userId: string, userName: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.userName = authData.userName;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
/*
  getAllUsersNames() {
    return new Promise((resolve, reject) => {
    this.http.get(GlobalConstants.apiURL + '/api/auth/getAllUsersNames').subscribe(
        (response) => {
          resolve(response);
      },
      (error) => {
        console.log(error);
      }
      );
    });
  }

  getName(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(GlobalConstants.apiURL + '/api/auth/getName/' + id).subscribe(
        (response:string) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
*/
}
