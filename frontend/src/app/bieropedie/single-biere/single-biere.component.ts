import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Biere } from '../../models/Biere.model';
import { BieresService } from '../../services/bieres.service';
import { Note } from '../../models/Note.model';
import { NotesService } from '../../services/notes.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-biere',
  templateUrl: './single-biere.component.html',
  styleUrls: ['./single-biere.component.scss']
})
export class SingleBiereComponent implements OnInit, OnDestroy {

  public biere: Biere;
  public loading: boolean;
  public userId: string;
  public showNote = false ; // hidden by default
  public errorMessage: string;
  public noteForm: FormGroup;
  public notes: Note[] = [];
  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private bieresService: BieresService,
              private notesService: NotesService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.bieresService.getBiereById(params.id).then(
          (biere: Biere) => {
            this.loading = false;
            this.biere = biere;
          }
        );
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.notesService.getAllNotesByBiere(params.id).then(
          (allNotes: Note[]) => {
            this.loading = false;
            this.notes = allNotes;
          }
        );
      }
    );

    this.noteForm = this.formBuilder.group({
      userId : [null],
      biereId : [null],
      notePackaging : [null],
      remarquePackaging : [null],
      noteEndurance : [null],
      noteBouche : [null],
      noteOdeur : [null],
      noteRetour : [null],
      remarqueEndurance : [null],
      remarqueBouche : [null],
      remarqueOdeur : [null],
      remarqueRetour : [null],
    });
    this.userId = this.auth.userId;
    }

  onGoBack() {
    this.router.navigate(['/bieropedie/bieres']);
  }

  onModify() {
    this.router.navigate(['/bieropedie/modify-biere/' + this.biere._id]);
  }

  onDelete() {
    this.loading = true;
    this.bieresService.deleteBiere(this.biere._id).then(
      () => {
        this.loading = false;
        this.router.navigate(['/bieropedie/bieres']);
      }
    );
  }

  ngOnDestroy() {
  }

  addNote() {
    this.showNote = !this.showNote;
  }

  onSubmit() {
    this.loading = true;
    const note = new Note();
    note.userId = this.userId;
    note.biereId = this.biere._id;
    note.remarquePackaging = this.noteForm.get('remarquePackaging').value;
    note.notePackaging = this.noteForm.get('notePackaging').value;
    note.noteEndurance = this.noteForm.get('noteEndurance').value;
    note.noteMiseEnBouche = this.noteForm.get('noteBouche').value;
    note.noteOdeur = this.noteForm.get('noteOdeur').value;
    note.noteRetour = this.noteForm.get('noteRetour').value;
    note.remarqueEndurance = this.noteForm.get('remarqueEndurance').value;
    note.remarqueMiseEnBouche = this.noteForm.get('remarqueBouche').value;
    note.remarqueOdeur = this.noteForm.get('remarqueOdeur').value;
    note.remarqueRetour = this.noteForm.get('remarqueRetour').value;
    this.notesService.createNewNote(note).then(
      () => {
        this.noteForm.reset();
        this.loading = false;
        this.router.navigate(['/bieropedie/biere/' + this.biere._id]);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
