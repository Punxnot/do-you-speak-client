import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { levelDisplayName } from './../../utils/utility-functions';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})

export class TextComponent implements OnInit {
  textTitle;
  textAuthor;
  textText;
  textAudio;
  textLevel;
  levelName;
  isLoggedIn;
  uploadForm: FormGroup;

  constructor(private route:ActivatedRoute,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getText(id);

    // TODO: Put this in Input
    const token = sessionStorage.getItem("token");
    if (token) {
      this.isLoggedIn = true;

      this.uploadForm = this.formBuilder.group({
        profile: ['']
      });
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('audio_file', this.uploadForm.get('profile').value);

    const textId = this.route.snapshot.paramMap.get('id');
    formData.append('text_id', textId);

    this.httpClient.post<any>(`${environment.apiUrl}/api/add-audio`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  getText(id) {
    this.httpClient.get(`${environment.apiUrl}/api/texts/${id}`)
      .subscribe(res => {
        this.textTitle = res['title'];
        this.textAuthor = res['author'];
        this.textText = res['text'];
        this.textLevel = res['level'];

        this.levelName = levelDisplayName(this.textLevel);

        if (res['audio_url']) {
          console.log(res['audio_url']);
          this.textAudio = `${environment.apiUrl}${res['audio_url']}`;
        }
      })
  }
}
