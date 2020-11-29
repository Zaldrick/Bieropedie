import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bieropedie',
  templateUrl: './bieropedie.component.html',
  styleUrls: ['./bieropedie.component.scss']
})
export class BieropedieComponent implements OnInit, OnDestroy {

  constructor(private state: StateService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.isAuth$.next(false);
    this.auth.userId = '';
    this.auth.token = '';
  }

  ngOnDestroy() {
  }
}
