import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IPlayerObject } from 'src/app/interfaces/IPlayer';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  player: IPlayerObject = {
    balance: 0,
    availableBetOptions: [],
    sessionId: ''
  }

  constructor(private _playerService: PlayerService) {

  }

  sitOnTable() {
    this._playerService.sit({ balance: this.player.balance });
    this._playerService.sitResponse$
    .subscribe(res => {this.player.availableBetOptions = res.availableBetOptions, this.player.sessionId = res.sessionId})
    
  }

  ngOnInit(): void {
    this._playerService.balance$
    .subscribe(balance => this.player.balance = balance);
    // .subscribe(balance => console.log(balance));
  }

}
