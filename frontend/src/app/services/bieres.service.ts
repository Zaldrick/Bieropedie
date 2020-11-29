import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Biere } from '../models/Biere.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BieresService {

  constructor(private http: HttpClient) {}

  private bieres: Biere[] = [];
  public bieres$ = new Subject<Biere[]>();

  getBieres() {
    this.http.get('http://localhost:3000/api/bieres').subscribe(
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
      this.http.get('http://localhost:3000/api/bieres/' + id).subscribe(
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
      this.http.post('http://localhost:3000/api/bieres', biere).subscribe(
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
      this.http.post('http://localhost:3000/api/bieres', biereData).subscribe(
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
      this.http.put('http://localhost:3000/api/bieres/' + id, biere).subscribe(
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
      this.http.put('http://localhost:3000/api/bieres/' + id, biereData).subscribe(
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
      this.http.delete('http://localhost:3000/api/bieres/' + id).subscribe(
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
