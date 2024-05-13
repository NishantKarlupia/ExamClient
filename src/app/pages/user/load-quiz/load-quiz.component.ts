import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent {
  constructor(private _route:ActivatedRoute,private _quiz:QuizService){}
  catId:any;
  quizzes:any;

  ngOnInit(){
    this._route.params.subscribe((params)=>{
      this.catId=params['catId'];
        if(this.catId==0){
          console.log("load all quiz")
    
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data
              console.log(this.quizzes)
            },
            (error)=>{
              console.log(error)
            }
          )
          
        }
        else{
          console.log("load specific quiz")
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes=data;
            },
            (error)=>{
              console.log("Internal Server Error")
            }
          )
        }
    }
    )}
  
}
