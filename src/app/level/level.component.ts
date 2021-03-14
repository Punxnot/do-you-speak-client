import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  texts;
  level;

  constructor(private route:ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
    this.level = route.snapshot.data['levelNum'];
  }

  ngOnInit() {
    this.getTexts();
  }

  getTexts() {
    this.http.get(`${environment.apiUrl}/api/level${this.level}`)
      .subscribe(res => {
        console.log(this.level);
        this.texts = res;
      })
  }
}
