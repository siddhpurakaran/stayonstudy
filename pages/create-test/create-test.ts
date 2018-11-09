import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddQuestionPage } from './../add-question/add-question';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-test',
  templateUrl: 'create-test.html',
})
export class CreateTestPage {

  TestForm: FormGroup;
  questionArr: any[] = [];
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public fireService: FirebaseServiceProvider) {
  }

  ngOnInit() {
    this.TestForm = this.formBuilder.group({
      Department: ['', Validators.required],
      Semester: ['', Validators.required],
      Subject: ['', Validators.required],
      Title: ['', Validators.required],
      Questions: ['', Validators.required]
    });
  }

  addQuestion() {
    let questions = this.modalCtrl.create(AddQuestionPage, {}, { cssClass: 'inset-modal' });
    questions.onDidDismiss(data => {
      if (data) {
        this.questionArr.push(data);
        this.TestForm.controls['Questions'].setValue(JSON.stringify(this.questionArr));
      }
    });
    questions.present();
  }

  setExam() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.fireService.createTest(this.TestForm.value)
      .then(() => {
        loader.dismiss();
        var toaster = this.toastCtrl.create({
          duration: 3000,
          position: 'bottom'
        });
        toaster.setMessage('Exam sheduled succesfully !');
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
