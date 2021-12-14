import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotesService } from './services/notes.service';
import { AppComponent } from './app.component';
import { BieropedieComponent } from './bieropedie/bieropedie.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BieresListComponent } from './bieropedie/bieres-list/bieres-list.component';
import { SingleBiereComponent } from './bieropedie/single-biere/single-biere.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './bieropedie/auth/login/login.component';
import { SignupComponent } from './bieropedie/auth/signup/signup.component';
import { NewBiereWithUploadComponent } from './bieropedie/new-biere-with-upload/new-biere-with-upload.component';
import { ModifyBiereWithUploadComponent } from './bieropedie/modify-biere-with-upload/modify-biere-with-upload.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { NoteComponent } from './note/note.component';
import { MaterialModule } from './material/material.module';
import { JoyeuxAnniversaireComponent } from './joyeux-anniversaire/joyeux-anniversaire.component';

@NgModule({
  declarations: [
    AppComponent,
    BieropedieComponent,
    HeaderComponent,
    BieresListComponent,
    SingleBiereComponent,
    LoginComponent,
    SignupComponent,
    NewBiereWithUploadComponent,
    ModifyBiereWithUploadComponent,
    NoteComponent,
    JoyeuxAnniversaireComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
