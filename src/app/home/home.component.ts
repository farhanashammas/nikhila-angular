import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ComplaintService } from '../complaint.service';
import { Router } from '@angular/router';

import { ComplaintItem} from    '../view/view.model';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    complaintForm:FormGroup;
    submitted=false;
    sessionVal;
    status:String;


  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService,private formBuilder:FormBuilder,
  public serviceObject:ComplaintService,public router:Router ) { }

   item=new ComplaintItem(null,null,null,null,null);

  ngOnInit() {

    this.sessionVal=this.storage.get('consumerNo');
    if(this.sessionVal==''){
      this.router.navigate(['']);
    }
    else{
      if(this.sessionVal !==''){
        this.router.navigate(['home']);
      }
    }

    this.complaintForm = this.formBuilder.group({
      name: ['',Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}$/)]],
      address: ['', Validators.required],
      date: ['', Validators.required],
      complaints: ['', Validators.required],
      
    });

  }
  get f() { return this.complaintForm.controls}



  compReg() {
    this.submitted = true;
    if (this.complaintForm.invalid === true) {
      return;
    } else {
      this.item.name = this.complaintForm.get('name').value;
      this.item.phoneNumber = this.complaintForm.get('phoneNumber').value;
      this.item.address = this.complaintForm.get('address').value;
      this.item.date = this.complaintForm.get('date').value;
      this.item.complaints = this.complaintForm.get('complaints').value;
     

      this.serviceObject.newComplaint(this.complaintForm.getRawValue())
        .subscribe((data) => {
          console.log(JSON.parse(JSON.stringify(data)).Status);
          this.status = JSON.parse(JSON.stringify(data)).Status;
          if (this.status === 'Success') {
          this.router.navigateByUrl('', { skipLocationChange: true })
            .then(() => {
            this.router.navigate(['view']);
          });
        } else {
          alert(this.status);
        }
        });
    }
  }

  

  logout(): void {
    this.storage.remove('consumerNo');
    this.router.navigate(['']);
  }

}
