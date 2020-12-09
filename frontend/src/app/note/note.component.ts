import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from '../models/Note.model';
import { NotesService } from '../services/notes.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

  public note: Note;
  public loading: boolean;
  public userId: string;
  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private notesService: NotesService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.notesService.getNoteById(params.id).then(
          (note: Note) => {
            this.loading = false;
            this.note = note;
          }
        );
      }
    );
    this.userId = this.auth.userId;
    }

  onGoBack() {
    this.router.navigate(['/bieropedie/notes']);
  }

  onModify() {
    this.router.navigate(['/bieropedie/modify-note/' + this.note._id]);
  }

  onDelete() {
    this.loading = true;
    this.notesService.deleteNote(this.note._id).then(
      () => {
        this.loading = false;
        this.router.navigate(['/bieropedie/notes']);
      }
    );
  }

  ngOnDestroy() {
  }

}



