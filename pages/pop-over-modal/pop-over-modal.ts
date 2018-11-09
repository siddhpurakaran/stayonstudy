import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pop-over-modal',
  templateUrl: 'pop-over-modal.html',
})
export class PopOverModalPage {

  public userData: any = { Name: "", Email: "" };
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authservice: AuthServiceProvider) {
  }

  ionViewWillEnter() {
    this.userData = this.authservice.userData;
  }

  close() {
    this.userData = "";
    this.viewCtrl.dismiss();
  }

  signOut() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.authservice.doLogout()
      .then(() => {
        loader.dismiss();
        this.userData = "";
        this.viewCtrl.dismiss({ command: "signout" });
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
