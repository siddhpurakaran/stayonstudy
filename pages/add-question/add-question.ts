import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-question',
  templateUrl: 'add-question.html',
})
export class AddQuestionPage {

  questionsForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    params: NavParams,) {

  }

  ngOnInit(){
    this.questionsForm = this.formBuilder.group({
      Question: ['',Validators.required],
      Option1: ['',Validators.required],
      Option2: ['',Validators.required],
      Option3: ['',Validators.required],
      Option4: ['',Validators.required],
      Answer:['',Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss(this.questionsForm.value);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
