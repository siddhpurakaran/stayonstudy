import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { HomePage } from './../home/home';
import { PopOverModalPage } from './../pop-over-modal/pop-over-modal';
import { StudentTestViewPage } from './../student-test-view/student-test-view';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-student-view',
  templateUrl: 'student-view.html',
})
export class StudentViewPage {

  testArray: any[] = [];
  testIds: string[] = [];
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public fireService: FirebaseServiceProvider,
    public navParams: NavParams) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverModalPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      if (data && data.command == "signout") {
        this.navCtrl.setRoot(HomePage);
      }
    });
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
                this.testIds.push(i);
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

  onMaterial() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    toaster.setMessage('Downloaded Successfully!');
    toaster.present();
  }

  onTest(test, id) {
    let studentsList: any;
    let flag = 0;
    for (let i in test) {
      if (i == "Students") {
        studentsList = test[i];
      }
    }
    for (let i in studentsList) {
      if (this.authService.userData.uid == i) {
        let alert = this.alertCtrl.create({
          buttons: ['Ok']
        });
        alert.setTitle('Error');
        alert.setSubTitle("Already attempted exam");
        alert.present();
        flag = 1;
      }
    }

    if (flag == 0)
      this.navCtrl.push(StudentTestViewPage, { testObj: test, testId: id });
  }

}
