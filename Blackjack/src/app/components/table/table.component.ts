import { Component, OnInit } from '@angular/core';
import { IDealHttpResponse } from 'src/app/interfaces/http-responses/IDealHttpResponse';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  
    balance: number =  0;
    round: number = 0;
    availableBetOptions: number[] = [];
    sessionId: string =  '';
    newRound: boolean = false;
    canStand: boolean = false;
    dealResponse: IDealHttpResponse = {dealerCards: [], playerCards: [], roundEnded: false, winAmount: 0, currentBalance: this.balance}


  constructor(private _playerService: PlayerService) {
    this.round++;
  }

  sitOnTable() {
    this._playerService.sit({ balance: this.balance });
    this._playerService.sitResponse$
    .subscribe(res => {this.availableBetOptions = res.availableBetOptions, this.sessionId = res.sessionId});    
  }

  deal(bet: number) {    
    this._playerService.deal({bet, sessionId: this.sessionId});
    this._playerService.dealResponse$
    .subscribe(res => this.dealResponse = res);
  }

  ngOnInit(): void {
    this._playerService.balance$
    .subscribe(balance => this.balance = balance);
    // .subscribe(balance => console.log(balance));
  }

}
