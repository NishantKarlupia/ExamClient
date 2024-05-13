import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private _cat:CategoryService,private _snack:MatSnackBar){};
  categories:any=[]

  ngOnInit(){
    this._cat.categories().subscribe(
      (data:any)=>{this.categories=data},
      (error)=>{
        this._snack.open("Internal server error!!!","",{duration:3000})
      }

    )
  }

}
