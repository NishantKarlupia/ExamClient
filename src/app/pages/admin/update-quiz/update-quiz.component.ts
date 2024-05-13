import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,private _router:Router){}

  qId=0;
  quiz:any;

  categories:any;

  ngOnInit(){
    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId)
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{
        this.quiz=data;
        console.log(this.quiz)
      },
      (error)=>{
        console.log(error)
      }
    )
    this._category.categories().subscribe(
      (data)=>{
        this.categories=data
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  updateForm(){
    // alert("knksnkj")
    
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire("Success","Quiz Updated Successfully","success").then((e)=>{
          this._router.navigate(["/admin/quizzes"])
        })
      },
      (error)=>{
        Swal.fire("Error","Internal Server Error","error")
      }
    )
  }




}
