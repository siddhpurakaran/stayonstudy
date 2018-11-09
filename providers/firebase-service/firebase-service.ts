import { File } from '@ionic-native/file';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
@Injectable()
export class FirebaseServiceProvider {

  fireTestData = firebase.database().ref('/tests');
  fireMaterialData = firebase.database().ref('/materials');
  firestore = firebase.storage().ref();
  public snapshotChangesSubscription: any;
  constructor(public afireauth: AngularFireAuth,
    public file: File) {

  }

  createTest(testObj: any) {
    return new Promise<any>((resolve, reject) => {
      var name: string = "Test" + new Date().getTime();
      testObj.Students = [];
      this.fireTestData.child("tests").child(name).set(testObj)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getTests() {
    return new Promise<any>((resolve, reject) => {
      this.fireTestData.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    });
  }

  uploadAnswers(id: string, total: number, obtained: number) {
    return new Promise<any>((resolve, reject) => {
      this.fireTestData.child("tests").child(id).child("Students").child(this.afireauth.auth.currentUser.uid).set({ Obtained: obtained, Total: total })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  uploadFiles(filepath: any) {
    return new Promise<any>((resolve, reject) => {
      (<any>window).resolveLocalFileSystemURL(filepath, (res) => {
        res.file((resFile) => {
          var reader = new FileReader();
          reader.readAsArrayBuffer(resFile);
          reader.onloadend = (evt: any) => {
            var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
            var filename: string = "Test" + new Date().getTime() + ".jpg";
            let imageStore = this.firestore.child(firebase.auth().currentUser.uid).child(filename);
            imageStore.put(imgBlob).then((res) => {
              this.firestore.child(firebase.auth().currentUser.uid).child(filename)
                .updateMetadata({ cacheControl: 'public,max-age=300', contentType: 'image/jpeg' })
                .then(() => {
                  this.firestore.child(firebase.auth().currentUser.uid).child(filename)
                    .getDownloadURL()
                    .then((url) => {
                      resolve(url);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  reject(err);
                })
            }, err => {
              reject(err);
            });
          };
        });
      });
    });
  }

  uploadMaterial(form) {
    return new Promise<any>((resolve, reject) => {
      var tempname: string = "Test" + new Date().getTime();
      this.fireMaterialData.child(this.afireauth.auth.currentUser.uid).child(tempname)
        .set(form)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getMaterials(){
    return new Promise<any>((resolve, reject) => {
      this.fireMaterialData.on('value', (snapshot) => {
        resolve(snapshot.val());
      })
    }); 
  }

}