import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class TextComponent implements OnInit {
  text;

  constructor(private route:ActivatedRoute,
              private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.getText(id);
  }

  getText(id) {
    this.http.get(`${environment.apiUrl}/api/texts/${id}`)
      .subscribe(res => {
        console.log(res);
        this.text = res;
      })
  }
}

// texts/:id
