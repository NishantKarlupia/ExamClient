import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent {

  categories:any=[
    {
      cid:23,
      title:"Programming",
      description:"this is testing categories"
    },
    {
      cid:23,
      title:"Programming",
      description:"this is testing categories"
    },
    {
      cid:23,
      title:"Programming",
      description:"this is testing categories"
    }
  ]

  constructor(private category:CategoryService){}
  ngOnInit(){
    this.category.categories().subscribe((data:any)=>{
      this.categories= data;
      console.log(data)
    },
    (error)=>{
      console.log(error)
      Swal.fire("Error","Error in loading data","error")
    }
    )
  }

}
