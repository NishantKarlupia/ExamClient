import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService:UserService,private snack:MatSnackBar){}

  public user={
    username:"",
    password:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:""
  }

  formSubmit(){
    if(this.user.username=='' || this.user.username==null)
    {
      this.snack.open("Username is required!!","",{
        duration:2000,
        verticalPosition:"top",
        horizontalPosition:"right"
      })
      return
    }
    // adduser: userservice
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data)
        Swal.fire("Success","user is registered","success")
      },
      (error)=>{
        console.log(error)
        this.snack.open("something went wrong!!!","",{
          duration:2000,
          verticalPosition:"top",
          horizontalPosition:"right"
        })
      }
    )
  }

}
