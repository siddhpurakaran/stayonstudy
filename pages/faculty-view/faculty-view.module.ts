import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacultyViewPage } from './faculty-view';

@NgModule({
  declarations: [
    FacultyViewPage,
  ],
  imports: [
    IonicPageModule.forChild(FacultyViewPage),
  ],
})
export class FacultyViewPageModule {}
