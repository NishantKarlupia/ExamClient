import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {
  qid:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router){}

  ngOnInit(){
    this.qid=this._route.snapshot.params["qid"]
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz=data
        // console.log(data)
      },
      (error)=>{
        console.log("Internal Server Error")
      }
    )

  }

  startQuiz(){
    Swal.fire({
      title:"Do you want to start the quiz?",
      showCancelButton:true,
      confirmButtonText:"Start",
      denyButtonText:"",
      icon:"info"
    }).then((result)=>{
      if(result.isConfirmed){
        // Swal.fire("Saved","","success")
        this._router.navigate(['/start/'+this.qid])
      }
    })
  }

}
