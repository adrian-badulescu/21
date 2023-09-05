import { Component, OnInit } from '@angular/core';
import { ICards, IDealHttpResponse } from 'src/app/interfaces/http-responses/IDealHttpResponse';
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
    roundEnded: boolean = false;
    winAmount: number = 0;
    dealerCards: ICards[] = [];
    playerCards: ICards[] = [];
    playerCard: ICards | null = {rank: '', suite: ''};
    dealResponse: IDealHttpResponse = {dealerCards: [], playerCards: [], roundEnded: false, winAmount: 0, currentBalance: 0}


  constructor(private _playerService: PlayerService) {
    this.round++;
  }

  sitOnTable() {
    this._playerService.sit({ balance: this.balance });
    this._playerService.sitResponse$
    .subscribe(res => {this.availableBetOptions = res.availableBetOptions, this.sessionId = res.sessionId});    
  }

  turn(action: string) {
    this._playerService.turn({action: action, sessionId: this.sessionId});
    this._playerService.turnResponse
    .subscribe(res => {this.dealerCards = res.dealerCards, this._playerService.checkIfCardIsNull(res.playerCard, this.playerCards),this.roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance});
  }

  deal(bet: number) {    
    this._playerService.deal({bet, sessionId: this.sessionId});
    this._playerService.dealResponse$
    .subscribe(res => {this.dealerCards = res.dealerCards, this.playerCards = res.playerCards, this.roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance});
  }

  ngOnInit(): void {
    this._playerService.balance$
    .subscribe(balance => this.balance = balance);
    // .subscribe(balance => console.log(balance));
  }

}
