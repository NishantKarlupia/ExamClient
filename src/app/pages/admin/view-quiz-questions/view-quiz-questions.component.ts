import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent {

  qId:any;
  qTitle:any;
  questions:any=[];
  constructor(private _route:ActivatedRoute,private _ques:QuestionService){}
  ngOnInit(){
    this.qId=this._route.snapshot.params["qid"]
    this.qTitle=this._route.snapshot.params["title"]
    console.log(this.qId,this.qTitle)
    this._ques.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data)
        this.questions=data
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  deleteQuestion(quesId:any){
    Swal.fire({
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Delete",
      title:"Are you sure to delete this question?"
    }).then((result)=>{
      if(result.isConfirmed){
        this._ques.deleteQuestion(quesId).subscribe(
          (data)=>{
            Swal.fire("Success","Question deleted successfully!!!","success")
            this.questions=this.questions.filter((q:any)=>q.quesId!=quesId)
          },
          (error)=>{
            Swal.fire("Error","Internal Server Error!!!","error")
          }
        )
      }
    })

    
  }

}
