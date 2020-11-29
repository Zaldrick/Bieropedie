import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { BieresService } from '../../services/bieres.service';
import { Subscription } from 'rxjs';
import { Biere } from '../../models/Biere.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bieres-list',
  templateUrl: './bieres-list.component.html',
  styleUrls: ['./bieres-list.component.scss']
})
export class BieresListComponent implements OnInit, OnDestroy {

  public bieres: Biere[] = [];
  public part: number;
  public loading: boolean;

  private bieresSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
              private bieresService: BieresService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.bieresSub = this.bieresService.bieres$.subscribe(
      (bieres) => {
        this.bieres = bieres;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.bieresService.getBieres();
  }

  onProductClicked(id: string) {
    this.router.navigate(['/bieropedie/biere/' + id]);
  }

  ngOnDestroy() {
    this.bieresSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
