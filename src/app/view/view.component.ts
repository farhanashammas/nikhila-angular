import { Component, OnInit, Inject } from '@angular/core';
import { ComplaintItem} from './view.model';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ComplaintService } from '../complaint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  complaints:ComplaintItem[];
  complaint:ComplaintItem;
  flag=false;
  status:String;
  sessionVal;
  name;

  constructor(@Inject(LOCAL_STORAGE) public storage:WebStorageService,public complaintService:ComplaintService,
  private router:Router) { }

  ngOnInit(): void {
    this.sessionVal = this.storage.get('consumerNo');
    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else {
      if (this.sessionVal !== '') {
        this.name = this.sessionVal;
        this.complaintService.getComplaint()
        .subscribe((data) => {
          this.complaints = JSON.parse(JSON.stringify(data));
          console.log(this.complaints)
        });
      }
    } 
  }

  delete(id) {
    this.complaintService.deletecomplaint(id)
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

  edit(complaint) {
    // console.log(product);
    // this.serviceObject.product = product;
    this.complaint = complaint;
    this.router.navigate(['home', this.complaint]);
  }

  logout(): void {
    this.storage.remove('consumerNo');
    this.router.navigate(['']);
  }

}
