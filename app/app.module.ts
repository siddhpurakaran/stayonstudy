import { ViewScoresPageModule } from './../pages/view-scores/view-scores.module';
import { DownloadMaterialPageModule } from './../pages/download-material/download-material.module';
import { StudentDashboardPageModule } from './../pages/student-dashboard/student-dashboard.module';
import { StudentTestViewPageModule } from './../pages/student-test-view/student-test-view.module';
import { AddQuestionPageModule } from './../pages/add-question/add-question.module';
import { ViewRecordsPageModule } from './../pages/view-records/view-records.module';
import { UploadMaterialPageModule } from './../pages/upload-material/upload-material.module';
import { CreateTestPageModule } from './../pages/create-test/create-test.module';
import { PopOverModalPageModule } from './../pages/pop-over-modal/pop-over-modal.module';
import { StudentViewPageModule } from './../pages/student-view/student-view.module';
import { FacultyViewPageModule } from './../pages/faculty-view/faculty-view.module';
import { PasswordresetPageModule } from './../pages/passwordreset/passwordreset.module';
import { SignupPageModule } from './../pages/signup/signup.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    SignupPageModule,
    PasswordresetPageModule,
    FacultyViewPageModule,
    StudentViewPageModule,
    PopOverModalPageModule,
    CreateTestPageModule,
    UploadMaterialPageModule,
    ViewRecordsPageModule,
    AddQuestionPageModule,
    StudentTestViewPageModule,
    StudentDashboardPageModule,
    DownloadMaterialPageModule,
    ViewScoresPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileChooser,
    FilePath,
    FileOpener,
    FileTransfer,
    AngularFireAuth,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    FirebaseServiceProvider
  ]
})
export class AppModule { }
