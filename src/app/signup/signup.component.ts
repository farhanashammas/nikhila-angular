import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';
import {Signup} from '../signup/signup.model';
import { ConfirmPasswordValidator } from './confirmpasswordValidator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  model=new Signup(null,null,null,null);
  registerForm :FormGroup;
  status:String;
  submitted=false;


  constructor(private router:Router,private formBuilder:FormBuilder,private complaintService:ComplaintService) { }

  ngOnInit() {


    this.registerForm=this.formBuilder.group({
      consumerNo: ['',Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      confirmPassword:['',Validators.required]
    },{ validator: ConfirmPasswordValidator.MatchPassword })
   }

   get f(){
     return this.registerForm.controls
   }
   signUp():void{
     this.submitted=true;
     if(this.registerForm.invalid===true){
       return ;
     }
     
     this.model.consumerNo=this.registerForm.get('consumerNo').value;
     this.model.email=this.registerForm.get('email').value;
     this.model.password=this.registerForm.get('password').value;
     this.model.confirmPassword=this.registerForm.get('confirmPassword').value;

      console.log(this.model)
     this.complaintService.signup(this.model)
     .subscribe((result)=>{
       console.log(JSON.parse(JSON.stringify(result)).Status);
       this.status=JSON.parse(JSON.stringify(result)).Status;
       if(this.status=="Error")  {
         alert(this.status)
       }else if(this.status==='Invalid'){
         alert("user alrdy exst");
       }else{
        alert('Signup is Successful');
        this.router.navigate(['login']);
       }
        
            
           });
 } 

   onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
