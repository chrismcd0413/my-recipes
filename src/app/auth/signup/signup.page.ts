import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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
      }),
      name: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  signup() {
    const value = this.form.value;
    this.authService.createNewAccount(value.name, value.email, value.password);
  }
}
