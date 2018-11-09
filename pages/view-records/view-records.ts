import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-records',
  templateUrl: 'view-records.html',
})
export class ViewRecordsPage {

  testArray: any[] = [];
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public fireService: FirebaseServiceProvider,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fireService.getTests()
      .then((testData) => {
        loader.dismiss();
        this.testArray = [];
        for (let x in testData) {
          if (x == "tests")
            for (let i in testData.tests) {
              this.testArray.push(testData.tests[i]);
            }
        }
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

  onClick() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    toaster.setMessage('Feature is in progress!');
    toaster.present();
  }
}
