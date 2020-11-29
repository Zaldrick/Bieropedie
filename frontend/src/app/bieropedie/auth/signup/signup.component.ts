import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    const name = this.signupForm.get('name').value;
    const password = this.signupForm.get('password').value;
    this.auth.createNewUser(name, password).then(
      () => {
        this.loading = false;
        this.router.navigate(['/bieropedie/bieres']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
