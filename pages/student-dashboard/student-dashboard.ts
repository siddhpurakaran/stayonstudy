import { ViewScoresPage } from './../view-scores/view-scores';
import { DownloadMaterialPage } from './../download-material/download-material';
import { StudentViewPage } from './../student-view/student-view';
import { HomePage } from './../home/home';
import { PopOverModalPage } from './../pop-over-modal/pop-over-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage {

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

  attendTest() {
    this.navCtrl.push(StudentViewPage);
  }

  viewMaterial() {
    this.navCtrl.push(DownloadMaterialPage);
  }

  viewScores() {
    this.navCtrl.push(ViewScoresPage);
  }
}
