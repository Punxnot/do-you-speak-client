import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  @Input() childMessage: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    if (!!sessionStorage.getItem("token")) {
      this.router.navigate(['/admin']);
    }
  }

  logIn(): Observable<any> {
    const params = new HttpParams()
      .set('email', this.userEmail)
      .set('password', this.userPassword);

    this.http.post(`${environment.apiUrl}/authenticate`, params, { observe: 'response' })
      .subscribe(res => {
        this.storeUserData(res);
        console.log("Logged in successfully!");
        this.router.navigate(['/admin']);
      })

    return;
  }

  // TODO: Use mixin
  storeUserData(response) {
    const token = response.body.auth_token;
    sessionStorage.setItem('token', token);
    // const token = responseHeaders.get("access-token");
    // const client = responseHeaders.get("client");
    // const uid = responseHeaders.get("uid");
    // sessionStorage.setItem('token', token);
    // sessionStorage.setItem('client', client);
    // sessionStorage.setItem('uid', uid);
    // sessionStorage.setItem('isAdmin', isAdmin);
  }
}
