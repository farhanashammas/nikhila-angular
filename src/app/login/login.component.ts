import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';
import { Login }  from './login.model';
import{ LocalStorageService } from 'angular-web-storage'
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';



const key = "Status";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public local:WebStorageService,private formBuilder:FormBuilder,private router:Router,private complaintService:ComplaintService
    ) { }

  registerForm: FormGroup;
  submitted = false;
user= new Login(null,null);
  status: String;


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      consumerNo: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }
  get f() { return this.registerForm.controls; }

  userLogin() {
    //alert("done");
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }


    this.user.consumerNo = this.registerForm.get("consumerNo").value;
    this.user.password = this.registerForm.get("password").value;
    console.log(this.user);
    this.complaintService.login(this.user)
      .subscribe((result) => {
        this.status = JSON.parse(JSON.stringify(result)).Status;
        console.log(this.status);
        if (this.status == "Success") {
          this.local.set(key, this.status);
          console.log(this.local);
          this.router.navigate(['home']);
        }
        else {
          alert(this.status);
        }

      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
