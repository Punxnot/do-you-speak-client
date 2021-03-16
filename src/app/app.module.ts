import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Ng2OdometerModule } from 'ng2-odometer';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LevelComponent } from './level/level.component';
import { TextComponent } from './text/text.component';

const appRoutes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'texts/:id', component: TextComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'level1', component: LevelComponent, data: { levelNum: 1 } },
  { path: 'level2', component: LevelComponent, data: { levelNum: 2 } },
  { path: 'level3', component: LevelComponent, data: { levelNum: 3 } },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    AdminComponent,
    HomeComponent,
    LevelComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2OdometerModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
