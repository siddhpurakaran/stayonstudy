import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentViewPage } from './student-view';

@NgModule({
  declarations: [
    StudentViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentViewPage),
  ],
})
export class StudentViewPageModule {}
