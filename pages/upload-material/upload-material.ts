import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { FilePath } from '@ionic-native/file-path';
import { File, IWriteOptions } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-upload-material',
  templateUrl: 'upload-material.html',
})
export class UploadMaterialPage {

  public Semester: string = "";
  public Department: string = "";
  public Subject: string = "";
  private loading: Loading;
  private fileArr: string[] = [];
  private arr: string[] = [];
  materialsForm: FormGroup;

  constructor(public navCtrl: NavController,
    private fileChooser: FileChooser,
    private file: File,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private filePath: FilePath,
    public fireservice: FirebaseServiceProvider,
    public navParams: NavParams) {
      this.materialsForm = this.formBuilder.group({
        Semester: ['', Validators.required],
        Department: ['', Validators.required],
        Subject: ['', Validators.required],
        Files: ['']
      });
  }

  chooseFile() {
    this.fileChooser.open()
      .then((uri) => {
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present().then(() => {
          this.filePath.resolveNativePath(uri)
            .then((fileurl: string) => {
              this.fireservice.uploadFiles(fileurl)
                .then((url) => {
                  this.fileArr.push(url);
                  let FileName = fileurl.substr(fileurl.lastIndexOf('/') + 1);
                  let FilePath = fileurl.substr(0, fileurl.lastIndexOf('/') + 1);
                  this.arr.push(FileName);
                  this.loading.dismiss();
                  this.loading = null;
                })
                .catch((err) => {
                  this.showUserAlert("Error in execution", err);
                  this.loading.dismiss();
                  this.loading = null;
                });
            });
        }).catch((e) => {
          this.showUserAlert("Error in execution", e);
          this.loading.dismiss();
          this.loading = null;
        });
      });
  }

  uploadFile() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present().then(() => {
      this.materialsForm.controls['Files'].setValue(this.fileArr);
      this.fireservice.uploadMaterial(this.materialsForm.value)
        .then(() => {
          this.loading.dismiss();
          this.loading = null;
          var toaster = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
          });
          toaster.setMessage('Uploaded succesfully !');
          toaster.present();
          this.navCtrl.pop();
        }).catch((e) => {
          this.showUserAlert("Error in execution", e);
          this.loading.dismiss();
          this.loading = null;
        });
    });
  }

  showUserAlert(title: string, err: any) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: err.message ? err.message : err,
      buttons: ['OK']
    });
    alert.present();
  }
}
