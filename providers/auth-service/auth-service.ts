import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthServiceProvider {
  firedata = firebase.database().ref('/users');
  public userData :any;
  constructor(public afireauth: AngularFireAuth,
    public alertCtrl: AlertController) { }

  doRegister(value, userDetails) {
    return new Promise<any>((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            Type: userDetails.Type,
            Name: userDetails.Name,
            Email: userDetails.Email,
            Passcode: userDetails.Passcode,
            MobileNo: userDetails.MobileNo,
            Department: userDetails.Department,
            Sem: userDetails.Sem
          })
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then((data) => {
          this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
            this.userData = snapshot.val();
            resolve(snapshot.val());
          }).catch((err) => {
            reject(err);
          })
        })
        .catch((err) => {
          reject(err);
        });
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afireauth.auth.currentUser) {
        this.afireauth.auth.signOut()
          .then(() => {
            this.userData = "";
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }
    })
  }

}
