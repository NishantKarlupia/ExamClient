import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {

  quizData={
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:"",
    category:{
      cid:""
    }

  }

  categories=[
    {
      cid:23,
      title:"Programming"
    },
    {
      cid:24,
      title:"Programming"
    }
  ]

  constructor(private _cat:CategoryService,private snack:MatSnackBar,private _quiz:QuizService){};

  ngOnInit(){
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data
        console.log(data)
      },
      (error)=>{
        console.log(error)
        Swal.fire("Error","Interal Server Error","error")
      }
      )
    }

  addQuiz(){
    if(this.quizData.title.trim()==""|| this.quizData.title==null)
    {
      this.snack.open("Title Required","",{duration:2000});
      return
    }
    console.log(this.quizData);
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        console.log(data)
        Swal.fire("Success","Quiz added successfully","success")
      },
      (error)=>{
        Swal.fire("Error","Interal Server Error","error")
        console.log(error)
      }
    )

  }


}
