import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn=false;
  user:any=null;

  constructor(public login:LoginService){}
  ngOnInit(){
    this.isLoggedIn=this.login.isLoggedIn()
    this.user=this.login.getUser()
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.login.isLoggedIn()
      this.user=this.login.getUser()
    })
  }

  logout(){
    // this.isLoggedIn=false;s
    // this.user=null;
    this.login.logout()
    window.location.reload()
  }

}
