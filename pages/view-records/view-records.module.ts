import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRecordsPage } from './view-records';

@NgModule({
  declarations: [
    ViewRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRecordsPage),
  ],
})
export class ViewRecordsPageModule {}
