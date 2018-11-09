import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadMaterialPage } from './upload-material';

@NgModule({
  declarations: [
    UploadMaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadMaterialPage),
  ],
})
export class UploadMaterialPageModule {}
