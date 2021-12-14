import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { BieresService } from '../../services/bieres.service';
import { Subscription } from 'rxjs';
import { Biere } from '../../models/Biere.model';
import { Router } from '@angular/router';
import { Note } from '../../models/Note.model';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { GlobalConstants } from 'src/app/common/global-constants';
@Component({
  selector: 'app-bieres-list',
  templateUrl: './bieres-list.component.html',
  styleUrls: ['./bieres-list.component.scss']
})
export class BieresListComponent implements OnInit, OnDestroy {

  public bieres: Biere[] = [];
  public bieresFiltered: Biere[] = [];
  public loading: boolean;
  public userName: string;
  public saisonSelected: Number;
  private bieresSub: Subscription;
  constructor(private state: StateService,
              private bieresService: BieresService,
              private router: Router,
              private notesService: NotesService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.saisonSelected = -1;
    this.userName = this.auth.userName ? this.auth.userName : 'Gars Random';
    this.bieresSub = this.bieresService.bieres$.subscribe(
      (bieres) => {
        this.bieres = bieres;
        this.bieresFiltered = this.bieres;
        this.loading = false;
      }
    );
    this.bieresService.getBieresNotes();
  }

  onProductClicked(id: string) {
    this.router.navigate(['/bieropedie/biere/' + id]);
  }

  onSaisonClicked(saisonFiltre:Number){
    if (saisonFiltre === -1){
      this.bieresFiltered = this.bieres;
    } else {
      this.bieresFiltered = this.bieres.filter(function(obj) {
        return obj.saison == saisonFiltre;
      })
    }
  }

  joyeuxAnniversaire(id: string) {
    this.router.navigate(['/bieropedie/joyeuxAnniversaire']);
  }

  ngOnDestroy() {
    this.bieresSub.unsubscribe();
  }

}
