import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent {

  quizzes=[
    {
      qid:23,
      title:"Basic Java",
      description:"Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
      maxMarks:"50",
      numberOfQuestions:"20",
      active:"",
      category:{
        title:"Programming"
      }
    },
    {
      qid:23,
      title:"Basic Java",
      description:"Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
      maxMarks:"50",
      numberOfQuestions:"20",
      active:"",
      category:{
        title:"Java"
      }
    }
  ]

  constructor(private quiz:QuizService){}

  ngOnInit(){
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data
      },
      (error)=>{
        Swal.fire("Error","Internl Server Error","error")
      }
    )
  }

  deleteQuiz(qId:any){
    // alert(qId)
    
    Swal.fire({
      icon:"warning",
      title:"Are you Sure?",
      confirmButtonText:"Delete",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this.quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qId)
            Swal.fire("Success","Quiz deleted","success")
          },
          (error)=>{
            Swal.fire("Error","Internal Server Error","error")
          }
        )
      }
    })
  }

}
