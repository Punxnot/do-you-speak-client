import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { levelDisplayName } from './../../utils/utility-functions';

@Component({
  selector: 'app-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./text.component.scss']
})

export class EditTextComponent implements OnInit {
  textTitle;
  textBody;
  textAuthor;
  textLevel = 1;
  textDuration;
  textId;
  tinyApiKey = environment.tinyKey;

  constructor(private route:ActivatedRoute,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.textId = id;
    this.getText(id);
  }

  onSubmit() {
    console.log(this);
    const data = {
      "id": this.textId,
      "text": {
        "id": this.textId,
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

    this.http.post(`${environment.apiUrl}/api/update-text`, data, {headers: headers})
      .subscribe(res => {
        this.router.navigate([`/texts/${res['id']}`]);
      })
  }

  getText(id) {
    this.http.get(`${environment.apiUrl}/api/texts/${id}`)
      .subscribe(res => {
        this.textTitle = res['title'];
        this.textAuthor = res['author'];
        this.textBody = res['text'];
        this.textLevel = res['level'];
      })
  }
}
