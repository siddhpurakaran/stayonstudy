import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-student-test-view',
  templateUrl: 'student-test-view.html',
})
export class StudentTestViewPage {

  public questions: any[] = [];
  public textObj: any = "";
  public textId: string = "";
  public answers: string[] = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fireService: FirebaseServiceProvider,
    public navParams: NavParams) {
    this.textObj = this.navParams.get('testObj');
    this.textId = this.navParams.get('testId');
    this.questions = [];
    let temp = JSON.parse(this.textObj.Questions);
    for (let i in temp) {
      this.questions.push(temp[i]);
      this.answers.push("");
    }
  }

  terminate() {
    let loader = this.loadingCtrl.create({
      content: 'Counting marks please wait...'
    });
    loader.present();
    let mark = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.answers[i] == this.questions[i].Answer)
        mark++;
    }
    loader.setContent('Uploading answers!');
    this.fireService.uploadAnswers(this.textId, this.questions.length, mark)
      .then(() => {
        loader.dismiss();
        var toaster = this.toastCtrl.create({
          duration: 3000,
          position: 'bottom'
        });
        toaster.setMessage('Yeah, you have scored ' + mark + "/" + this.questions.length);
        toaster.present();
        this.navCtrl.pop();
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
