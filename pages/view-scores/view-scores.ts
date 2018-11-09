import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-scores',
  templateUrl: 'view-scores.html',
})
export class ViewScoresPage {

  public testArray: any[] = [];
  public marksArray: string[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public fireservice: FirebaseServiceProvider) {
  }

  ionViewWillEnter() {
    this.fireservice.getTests()
      .then((testData) => {
        let uid = this.authService.userData.uid;
        for (let x in testData) {
          if (x == "tests")
            for (let i in testData.tests) {
              for (let j in testData.tests[i]) {
                if (j == "Students") {
                  for (let k in testData.tests[i][j]) {
                    if (k == uid) {
                      this.testArray.push(testData.tests[i]);
                      this.marksArray.push(testData.tests[i][j][k].Obtained + "/" + testData.tests[i][j][k].Total);
                    }
                  }
                }
              }
            }
        }
      })
      .catch((err) => {
        let alert = this.alertCtrl.create({
          buttons: ['Ok']
        });
        alert.setTitle('Error');
        alert.setSubTitle(err.message);
        alert.present();
      })
  }

}
