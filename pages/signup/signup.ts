import { StudentDashboardPage } from './../student-dashboard/student-dashboard';
import { StudentViewPage } from './../student-view/student-view';
import { FacultyViewPage } from './../faculty-view/faculty-view';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  registrationForm: FormGroup;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public authService: AuthServiceProvider) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      Type: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Passcode: ['', Validators.required],
      MobileNo: ['', Validators.required],
      Department: ['', Validators.required],
      Sem: ['', Validators.required],
    });
  }

  onSubmit() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    let value = { email: this.registrationForm.controls['Email'].value, password: this.registrationForm.controls['Passcode'].value };
    this.authService.doRegister(value,this.registrationForm.value)
      .then(() => {
        var toaster = this.toastCtrl.create({
          duration: 3000,
          position: 'bottom'
        });
        toaster.setMessage('Registartion succesfull !');
        toaster.present();
        this.authService.doLogin(value)
          .then(() => {
            loader.dismiss();
            if ( this.registrationForm.controls['Type'].value == "faculty")
                this.navCtrl.setRoot(FacultyViewPage);
              else
                this.navCtrl.setRoot(StudentDashboardPage);
          })
          .catch((err) => {
            loader.dismiss();
            let alert = this.alertCtrl.create({
              buttons: ['Ok']
            });
            alert.setTitle('Error');
            alert.setSubTitle(err.message);
            alert.present();
          });
      })
      .catch((err) => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          buttons: ['Ok']
        });
        alert.setTitle('Error');
        alert.setSubTitle(err.message);
        alert.present();
      });

  }

  goback() {
    this.navCtrl.setRoot(HomePage);
  }

}
