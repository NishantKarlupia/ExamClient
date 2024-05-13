import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {

  public Editor = ClassicEditor;

  quizId:any;
  qTitle:any;

  question={
    quiz:{
      qid:''
    },
    content:"",
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(private _route:ActivatedRoute,private _ques:QuestionService){}
  ngOnInit(){
    this.quizId=this._route.snapshot.params["qid"]
    this.qTitle=this._route.snapshot.params["title"]
    this.question.quiz['qid']=this.quizId
    console.log(this.quizId)
  }
  formSubmit(){
    if(this.question.content.trim()==''|| this.question.content==null)
    {
      return;
    }
    if(this.question.option1.trim()==''|| this.question.option1==null)
    {
      return;
    }
    if(this.question.option2.trim()==''|| this.question.option2==null)
    {
      return;
    }
    if(this.question.answer.trim()==''|| this.question.answer==null)
    {
      return;
    }

    this._ques.addQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire("Success","Question added Successfully!!!","success")

      },
      (error)=>{
        Swal.fire("Error","Internal Server Error","error")

      }
    )



  }


}
