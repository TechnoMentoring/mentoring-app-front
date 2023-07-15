import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MentorModule } from './components/mentor/mentor.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MentorService } from './services/mentor/mentor.service';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './components/home/home.component';
import { StartMentorComponent } from './components/start/start-mentor/start-mentor.component';
import { authInterceptorProviders } from './services/interceptor/authinterceptor';
import { StartModule } from './components/start/start.module';

@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    HomeComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MentorModule,
    HttpClientModule,
    FullCalendarModule,
    ScheduleModule,
    StartModule,


  ],
  providers: [MentorService,authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
