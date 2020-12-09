import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Biere } from '../models/Biere.model';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BieresService {

  constructor(private http: HttpClient) {}

  private bieres: Biere[] = [];
  public bieres$ = new Subject<Biere[]>();

  getBieres() {
    this.http.get(GlobalConstants.apiURL + '/api/bieres').subscribe(
      (bieres: Biere[]) => {
        if (bieres) {
          this.bieres = bieres;
          this.emitBieres();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitBieres() {
    this.bieres$.next(this.bieres);
  }

  getBiereById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(GlobalConstants.apiURL + '/api/bieres/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewBiere(biere: Biere) {
    return new Promise((resolve, reject) => {
      this.http.post(GlobalConstants.apiURL + '/api/bieres', biere).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewBiereWithFile(biere: Biere, image: File) {
    return new Promise((resolve, reject) => {
      const biereData = new FormData();
      biereData.append('biere', JSON.stringify(biere));
      biereData.append('image', image, biere.nom);
      this.http.post(GlobalConstants.apiURL + '/api/bieres', biereData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyBiere(id: string, biere: Biere) {
    return new Promise((resolve, reject) => {
      this.http.put(GlobalConstants.apiURL + '/api/bieres/' + id, biere).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyBiereWithFile(id: string, biere: Biere, image: File | string) {
    return new Promise((resolve, reject) => {
      let biereData: Biere | FormData;
      if (typeof image === 'string') {
        biere.imageUrl = image;
        biereData = biere;
      } else {
        biereData = new FormData();
        biereData.append('biere', JSON.stringify(biere));
        biereData.append('image', image, biere.nom);
      }
      this.http.put(GlobalConstants.apiURL + '/api/bieres/' + id, biereData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteBiere(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(GlobalConstants.apiURL + '/api/bieres/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
