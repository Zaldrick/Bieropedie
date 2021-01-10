import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BieropedieComponent } from './bieropedie/bieropedie.component';
import { BieresListComponent } from './bieropedie/bieres-list/bieres-list.component';
import { SingleBiereComponent } from './bieropedie/single-biere/single-biere.component';
import { LoginComponent } from './bieropedie/auth/login/login.component';
import { SignupComponent } from './bieropedie/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewBiereWithUploadComponent } from './bieropedie/new-biere-with-upload/new-biere-with-upload.component';
import { ModifyBiereWithUploadComponent } from './bieropedie/modify-biere-with-upload/modify-biere-with-upload.component';
import { JoyeuxAnniversaireComponent } from './joyeux-anniversaire/joyeux-anniversaire.component';

const routes: Routes = [
  { path: 'bieropedie', component: BieropedieComponent,
    children: [
      { path: 'new-biere', component: NewBiereWithUploadComponent, canActivate: [AuthGuard] },
      { path: 'bieres', component: BieresListComponent, canActivate: [AuthGuard] },
      { path: 'biere/:id', component: SingleBiereComponent, canActivate: [AuthGuard] },
      { path: 'modify-biere/:id', component: ModifyBiereWithUploadComponent, canActivate: [AuthGuard] },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: 'joyeuxAnniversaire', component: JoyeuxAnniversaireComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'bieres' }
    ]
  },
  { path: 'bieropedie', component: BieropedieComponent },
  { path: '', pathMatch: 'full', component: BieropedieComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}