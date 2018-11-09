import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDashboardPage } from './../student-dashboard/student-dashboard';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { StudentViewPage } from './../student-view/student-view';
import { FacultyViewPage } from './../faculty-view/faculty-view';
import { PasswordresetPage } from './../passwordreset/passwordreset';
import { SignupPage } from './../signup/signup';
import { FileOpener } from '@ionic-native/file-opener';
import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController, ModalController, ToastController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File, IWriteOptions } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loading: Loading;
  public type: string = '';
  public loginForm : FormGroup;
  constructor(public navCtrl: NavController,
    private fileChooser: FileChooser,
    private file: File,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private fileopener: FileOpener,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private filePath: FilePath,
    private authservice: AuthServiceProvider) {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }


  signin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.type.length == 0) {
      toaster.setMessage('All fields are required.');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loader.present();
      this.authservice.doLogin(this.loginForm.value)
        .then((userData) => {
          if (userData.Type == this.type) {
            if (this.type == "faculty")
              this.navCtrl.setRoot(FacultyViewPage);
            else
              this.navCtrl.setRoot(StudentDashboardPage);
          }
          else {
            let alert = this.alertCtrl.create({
              buttons: ['Ok']
            });
            alert.setTitle('Error');
            alert.setSubTitle("Please login as valid account type.");
            alert.present();
          }
          loader.dismiss();
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
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  passwordreset() {
    this.navCtrl.push(PasswordresetPage);
  }

}
