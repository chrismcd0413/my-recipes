import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  login() {
    const value = this.form.value;
    this.authService.login(value.email, value.password);
  }
}
