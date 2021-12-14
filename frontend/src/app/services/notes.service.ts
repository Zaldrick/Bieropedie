import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/Note.model';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {}

  private notes: Note[] = [];
  public notes$ = new Subject<Note[]>();
  public moyenne:number;
  getNotes() {
    this.http.get(GlobalConstants.apiURL + '/api/notes').subscribe(
      (notes: Note[]) => {
        if (notes) {
          this.notes = notes;
          this.emitNotes();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitNotes() {
    this.notes$.next(this.notes);
  }

  getNoteById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(GlobalConstants.apiURL + '/api/notes/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  
  getAllNotesByBiere(id: string) {   
    return new Promise((resolve, reject) => {
      this.http.get(GlobalConstants.apiURL + '/api/notes/allNotes/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getMoyenneNoteByBiere(id: string) {   
    return new Promise((resolve, reject) => {
      this.http.get(GlobalConstants.apiURL + '/api/notes/allNotes/' + id).subscribe(
        (notes: Note[]) => {
          if (notes) {
            this.notes = notes;
            this.moyenne=0;
            notes.forEach(note => {
            this.moyenne+=(note.notePackaging+note.noteOdeur*3+note.noteMiseEnBouche*5+note.noteRetour*5+note.noteEndurance*5)/19});
          }
          resolve(this.moyenne/notes.length);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  createNewNote(note: Note) {
    return new Promise((resolve, reject) => {
      this.http.post(GlobalConstants.apiURL + '/api/notes', note).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyNote(id: string, note: Note) {
    return new Promise((resolve, reject) => {
      this.http.put(GlobalConstants.apiURL + '/api/notes/' + id, note).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteNote(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(GlobalConstants.apiURL + '/api/notes/' + id).subscribe(
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
