import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

  qid:any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;

  timer:any;


  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService){}
  ngOnInit(){
    this.preventBackButton()
    this.qid=this._route.snapshot.params["qid"]
    this.loadQuestions()

  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        console.log(data)
        this.questions=data
        this.timer=this.questions.length*1*60
        // this.questions.forEach((q:any) => {
        //   q['givenAnswer']="";          
        // });
        this.startTimer()
      },
      (error)=>{
        console.log(error)
        Swal.fire("Error","Internal Server Error","error")
      }
    )
  }
  preventBackButton(){
    history.pushState(null,"",location.href)
    this.locationSt.onPopState(()=>{
      history.pushState(null,"",location.href)
    })
  }

  submitQuiz(){
    Swal.fire({
      title:"Do you want to submit the quiz?",
      showCancelButton:true,
      confirmButtonText:"Submit",
      icon:"info"
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz()

      }
    })
  }

  evalQuiz(){

    // call to server to evaluate the quiz
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2))
        this.correctAnswers=data.correctAnswers
        this.attempted=data.attempted
        this.isSubmit=true
        console.log(data)
      },
      (error)=>{
        console.log(error)
      }
    )

    //     // console.log(this.questions)
    //     this.questions.forEach((q:any)=>{
    //       if(q.givenAnswer==q.answer){
    //         this.correctAnswers++
    //         let mark=this.questions[0].quiz.maxMarks/this.questions.length
    //         this.marksGot+=mark;
    //       }
    //       if(q.givenAnswer.trim()!=""){
    //         this.attempted++;
    //       }
    //     })
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz()
        clearInterval(t)
      }
      else{
        this.timer--
      }
    },1000)
  }

  getFormattedTime(){
    let mn=Math.floor(this.timer/60)
    let sec=this.timer-mn*60
    return `${mn} min: ${sec} sec`
  }


  printPage(){
    window.print()
  }




}
