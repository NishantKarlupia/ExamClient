import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private _category:CategoryService,private snack:MatSnackBar){}

  category={
    title:"",
    description:""
  }
  formSubmit(){
    if(this.category.title.trim()==""||this.category.title==null)
    {
      this.snack.open("Title Required","",{duration:2000})
      return
    }
    this._category.addCategory(this.category).subscribe(
      (data)=>{
        Swal.fire("Success","Category added successfully","success")
      },
      (error)=>{
        Swal.fire("Error","Server Error","error")
      }
    )
  }

}
