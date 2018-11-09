import { ViewRecordsPage } from './../view-records/view-records';
import { UploadMaterialPage } from './../upload-material/upload-material';
import { CreateTestPage } from './../create-test/create-test';
import { HomePage } from './../home/home';
import { PopOverModalPage } from './../pop-over-modal/pop-over-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-faculty-view',
  templateUrl: 'faculty-view.html',
})
export class FacultyViewPage {

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController) {
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

  createTest(){
    this.navCtrl.push(CreateTestPage);
  }

  uploadMaterial(){
    this.navCtrl.push(UploadMaterialPage);
  }

  viewRecords(){
    this.navCtrl.push(ViewRecordsPage);
  }

}
