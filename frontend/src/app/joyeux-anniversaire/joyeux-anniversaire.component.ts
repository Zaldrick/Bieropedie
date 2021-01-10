import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-joyeux-anniversaire',
  templateUrl: './joyeux-anniversaire.component.html',
  styleUrls: ['./joyeux-anniversaire.component.scss']
})

export class JoyeuxAnniversaireComponent implements OnInit  {
  public biere:any = "../../assets/katakuri.png";
  public userName: string;
  public loading: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.userName = this.auth.userName ? this.auth.userName : 'Gars Random';
      }

}
