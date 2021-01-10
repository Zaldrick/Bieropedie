import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { BieresService } from '../../services/bieres.service';
import { Subscription } from 'rxjs';
import { Biere } from '../../models/Biere.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GlobalConstants } from 'src/app/common/global-constants';
@Component({
  selector: 'app-bieres-list',
  templateUrl: './bieres-list.component.html',
  styleUrls: ['./bieres-list.component.scss']
})
export class BieresListComponent implements OnInit, OnDestroy {

  public bieres: Biere[] = [];
  public loading: boolean;
  public userName: string;
  private bieresSub: Subscription;
  constructor(private state: StateService,
              private bieresService: BieresService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.userName = this.auth.userName ? this.auth.userName : 'Gars Random';
    this.bieresSub = this.bieresService.bieres$.subscribe(
      (bieres) => {
        this.bieres = bieres;
        this.loading = false;
      }
    );
    this.bieresService.getBieres();
  }

  onProductClicked(id: string) {
    this.router.navigate(['/bieropedie/biere/' + id]);
  }

  joyeuxAnniversaire(id: string) {
    this.router.navigate(['/bieropedie/joyeuxAnniversaire']);
  }

  ngOnDestroy() {
    this.bieresSub.unsubscribe();
  }

}
