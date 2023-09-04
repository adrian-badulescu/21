import { Component, OnInit } from '@angular/core';
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
    this._playerService.sit(this.player.balance);
  }

  ngOnInit(): void {    
    this.player.balance = this._playerService.balance;    
  }

}
