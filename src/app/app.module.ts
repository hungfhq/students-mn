import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { StudentsMnComponent } from './students-mn/students-mn.component';
import { StudentComponent } from './students-mn/student/student.component';
import { StudentListComponent } from './students-mn/student-list/student-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SearchComponent } from './students-mn/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsMnComponent,
    StudentComponent,
    StudentListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AngularFireDatabaseModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
