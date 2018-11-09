import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadMaterialPage } from './download-material';

@NgModule({
  declarations: [
    DownloadMaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(DownloadMaterialPage),
  ],
})
export class DownloadMaterialPageModule {}
