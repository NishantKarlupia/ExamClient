import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData={
    username:"",
    password:""
  }

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){}

  formSubmit(){

    console.log("login")

    if(this.loginData.username.trim()==""||this.loginData.username==null)
    {
      this.snack.open("username is required!!!","",{
        duration:2000
      })
      return
    }
    if(this.loginData.password.trim()==""||this.loginData.password==null)
    {
      this.snack.open("password is required!!!","",{
        duration:2000
      })
      return
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data)
        this.login.loginUser(data.token)
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user)
            console.log(user)

            if(this.login.getUserRole()=="ADMIN"){
              // window.location.href="/admin"
            this.login.loginStatusSubject.next(true)

              this.router.navigate(['admin'])
              
            }
            else if(this.login.getUserRole()=="NORMAL")
            {
              // window.location.href="/user-dashboard"
            this.login.loginStatusSubject.next(true)

              this.router.navigate(['user-dashboard/0'])
            }
            else{
              this.login.logout()
              // location.reload()
            }


          }
        )
      },
      (error)=>{
        console.log(error)
      }
    );


  }

}
