import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.email = '';
  }

  reset() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.email == '') {
      toaster.setMessage('Email is required.');
      toaster.present();
    }
    else {
      let alert = this.alertCtrl.create({
        buttons: ['Ok']
      });
          alert.setTitle('Email Sent');
          alert.setSubTitle('Please follow the instructions in the email to reset your password');
          alert.present();
    }
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }


}
