import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  sendReset() {
    this.authService.sendPasswordReset(this.form.value.email)
    .then(() => this.createAlert('Success!', 'Password reset link has been sent to your email',
    [
      {
        text: 'Return to login',
        handler: () => {
          this.router.navigate(['/login']);
          this.form.reset();
        }
      }
    ]))
    .catch(error => this.createAlert('Error', error.message,
    [
      {
        text: 'Try again',
        role: 'cancel'
      }
    ]
    ));

  }

  createAlert(_header, _message, _buttons) {
    this.alertController.create({
      header: _header,
      message: _message,
      buttons: _buttons
    }).then(alert => alert.present());
  }

}
