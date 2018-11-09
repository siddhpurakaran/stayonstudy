import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverModalPage } from './pop-over-modal';

@NgModule({
  declarations: [
    PopOverModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PopOverModalPage),
  ],
})
export class PopOverModalPageModule {}
