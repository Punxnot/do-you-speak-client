import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  textTitle;
  textBody;
  textAuthor;
  textLevel = 1;
  textDuration;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/log-in']);
    } else {
      console.log("Registered user");
    }
  }

  // const headers = new HttpHeaders({
  //     'access-token': sessionStorage.getItem("token"),
  //     'client': sessionStorage.getItem("client"),
  //     'uid': sessionStorage.getItem("uid")
  //   });
  //
  //   this.http.delete(`${environment.apiUrl}/auth/sign_out`, {headers: headers})
  //     .subscribe(res => {
  //       sessionStorage.removeItem("token");
  //       sessionStorage.removeItem("client");
  //       sessionStorage.removeItem("uid");
  //       sessionStorage.removeItem("isAdmin");
  //     });

  onSubmit() {
    const data = {
      "text": {
        "title": this.textTitle,
        "text": this.textBody,
        "author": this.textAuthor,
        "level": this.textLevel,
        "duration": this.textDuration
      }
    };

    const headers = new HttpHeaders({
      'access-token': sessionStorage.getItem("token")
    });

    this.http.post(`${environment.apiUrl}/api/create-text`, data, {headers: headers})
      .subscribe(res => {
        this.router.navigate([`/texts/${res['id']}`]);
      })
  }
}
