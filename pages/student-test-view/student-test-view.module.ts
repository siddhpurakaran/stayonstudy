import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentTestViewPage } from './student-test-view';

@NgModule({
  declarations: [
    StudentTestViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentTestViewPage),
  ],
})
export class StudentTestViewPageModule {}
