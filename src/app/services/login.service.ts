import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  public loginUser(token:string){
    localStorage.setItem("token",token);
    return true;
  }

  public isLoggedIn(){
    let token=localStorage.getItem("token")
    if(token==undefined||token==""||token==null)return false;
    return true;
  }

  // logout
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // get-token
  public getToken()
  {
    return localStorage.getItem("token")
  }

  public setUser(user:any)
  {
    localStorage.setItem("user",JSON.stringify(user))
  }

  public getUser(){
    let user=localStorage.getItem("user")
    if(user!=null)return JSON.parse(user)
    this.logout()
    return null;
  }

  public getUserRole(){
    let user=this.getUser()
    return user.authorities[0].authority;
  }




}
