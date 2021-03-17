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

    const token = sessionStorage.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', token);

    this.http.post(`${environment.apiUrl}/api/create-text`, data, {headers: headers})
      .subscribe(res => {
        this.router.navigate([`/texts/${res['id']}`]);
      })
  }
}
