import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http:HttpClient) { }

  getComplaint() {
    return this.http.get('http://localhost:3000/complaints');
}
deletecomplaint(id) {
  return this.http.post('http://localhost:3000/complaints/delete', {id : id});
}
  login(user) {
    // alert("hai");
    return this.http.post("http://localhost:3000/login", user);
  }
  signup(user) {
    return this.http.post("http://localhost:3000/signup", user);
  }
  newComplaint(item) {  
    return this.http.post('http://localhost:3000/insert',item);
  }
}
