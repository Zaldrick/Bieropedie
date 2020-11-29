import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Biere } from '../../models/Biere.model';
import { BieresService } from '../../services/bieres.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-biere',
  templateUrl: './single-biere.component.html',
  styleUrls: ['./single-biere.component.scss']
})
export class SingleBiereComponent implements OnInit, OnDestroy {

  public biere: Biere;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private bieresService: BieresService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-biere');
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
    this.partSub.unsubscribe();
  }
}
