import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-download-material',
  templateUrl: 'download-material.html',
})
export class DownloadMaterialPage {

  public materials: any[] = [];

  constructor(public navCtrl: NavController,
    public fireservice: FirebaseServiceProvider,
    public file: File,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public filetransfer: FileTransfer,
    public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.fireservice.getMaterials()
      .then((res) => {
        for (let i in res) {
          for (let j in res[i]) {
            this.materials.push(res[i][j]);
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
      });
  }

  onDownload(path) {
    let loader = this.loadingCtrl.create({
      content: 'Downloading please wait...'
    });
    loader.present();
    const fileTansfer: FileTransferObject = this.filetransfer.create();
    fileTansfer.download(path, this.file.externalRootDirectory + "Material" + new Date().getTime() + ".jpeg")
    .then((entry)=>{
      loader.dismiss();
      let alert = this.alertCtrl.create({
        buttons: ['Ok']
      });
      alert.setTitle('Success');
      alert.setSubTitle("Downloaded successfully");
      alert.present();
    })
    .catch((err) => {
      let alert = this.alertCtrl.create({
        buttons: ['Ok']
      });
      alert.setTitle('Error');
      alert.setSubTitle(JSON.stringify(err));
      alert.setMessage(err.message);
      alert.present();
      loader.dismiss();
    });
  }

}
