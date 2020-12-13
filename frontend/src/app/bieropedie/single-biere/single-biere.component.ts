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
  public userName: string;
  public showNote = false ; // hidden by default
  public errorMessage: string;
  public noteForm: FormGroup;
  public notes: Note[] = [];
  public totalNote : number =0;
  public usersNames: string[] = [];
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
    this.userName = this.auth.userName ? this.auth.userName : 'Gars Random';
/*     this.auth.getAllUsersNames().then(
      (usersNames: string[]) => {
        this.usersNames = usersNames;
      }
    );
    console.log(this.usersNames);*/
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
           
            this.notes.forEach( (currentValue, index) => {
  
          this.totalNote+=this.getMoyenne(currentValue);
            });
            this.totalNote=this.totalNote/this.notes.length;
          }


          );
        }
      )

    this.noteForm = this.formBuilder.group({
      userName : [null],
      biereId : [null],
      notePackaging : [null],
      noteEndurance : [null],
      noteBouche : [null],
      noteOdeur : [null],
      noteRetour : [null],
      remarquePackaging : [null],
      remarqueEndurance : [null],
      remarqueBouche : [null],
      remarqueOdeur : [null],
      remarqueRetour : [null],
      remarqueApparence : [null],
    });    
    }

  getBlaze(userId:string)
  {
    return this.usersNames[userId];
  }

  getMoyenne(note:Note){
    return (note.notePackaging+note.noteOdeur*3+note.noteMiseEnBouche*5+note.noteRetour*5+note.noteEndurance*5)/19;
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
    /*this.bieresService.getBiereById(this.userId).then(
    (name: string) => {
      note.userName = name;
    });*/
    note.userName = this.userName;
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
    note.remarqueApparence = this.noteForm.get('remarqueApparence').value;
    this.notesService.createNewNote(note).then(
      () => {
        this.noteForm.reset();
        this.loading = false;
        this.router.navigate(['/bieropedie/bieres']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
