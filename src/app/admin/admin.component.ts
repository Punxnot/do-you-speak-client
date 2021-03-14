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
  textAudio;
  textLevel = 1;
  textDuration;
  isFlashShown = false;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    // console.log(sessionStorage.getItem("token"));
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/']);
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
        "audio": this.textAudio,
        "level": this.textLevel,
        "duration": this.textDuration
      }
    };

    this.http.post(`${environment.apiUrl}/api/create-text`, data)
      .subscribe(res => {
        console.log(res);
        this.isFlashShown = true;
        setTimeout(() => {
          this.isFlashShown = false;
        }, 3000);
      })
  }
}
