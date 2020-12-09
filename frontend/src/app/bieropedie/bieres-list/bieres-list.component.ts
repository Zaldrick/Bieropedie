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
  public loading: boolean;

  private bieresSub: Subscription;

  constructor(private state: StateService,
              private bieresService: BieresService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
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

  ngOnDestroy() {
    this.bieresSub.unsubscribe();
  }

}
