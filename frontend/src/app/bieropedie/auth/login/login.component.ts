import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.loading = true;
    const name = this.loginForm.get('name').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(name, password).then(
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
