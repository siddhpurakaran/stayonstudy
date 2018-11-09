import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentDashboardPage } from './student-dashboard';

@NgModule({
  declarations: [
    StudentDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentDashboardPage),
  ],
})
export class StudentDashboardPageModule {}
