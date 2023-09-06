import { Component, OnInit } from '@angular/core';
import { ICards, IDealHttpResponse } from 'src/app/interfaces/http-responses/IDealHttpResponse';
import { CounterService } from 'src/app/services/counter.service';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  balance: number = 0;
  round: number = 0;
  showAvailableBettingAmount: boolean = false; 
  availableBetOptions: number[] = [];
  sessionId: string = '';  
  canStand: boolean = false;
  roundEnded: boolean = false;
  toggleDealBtn: boolean = false;
  winAmount: number = 0;
  dealerCards: ICards[] = [];
  playerCards: ICards[] = [];
  playerCard: ICards | null = { rank: '', suite: '' };
  counterSubscription: Subscription = new Subscription();


  constructor(private _playerService: PlayerService, private counter: CounterService) {
    
  }



  sitOnTable() {
    this._playerService.balance$
      .subscribe(balance => this.balance = balance);
    this._playerService.sit({ balance: this.balance });
    this._playerService.sitResponse$
      .subscribe(res => { this.availableBetOptions = res.availableBetOptions, this.sessionId = res.sessionId });
  }

  turn(action: string) {      
    this._playerService.turn({ action: action, sessionId: this.sessionId });
    this._playerService.turnResponse
      .subscribe(res => { this.dealerCards = res.dealerCards, this._playerService.checkIfCardIsNull(res.playerCard, this.playerCards), this.roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance; });    
  }

  deal(bet: number) {
    this.showAvailableBettingAmount = false;    
    this._playerService.deal({ bet, sessionId: this.sessionId });
    this._playerService.dealResponse$
      .subscribe(res => { this.dealerCards = res.dealerCards, this.playerCards = res.playerCards,  this. roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance;});
  }

  showDealOptions() {
    this.showAvailableBettingAmount = true;
    
  }



  ngOnInit(): void { 
    this.counterSubscription = this.counter.count.subscribe(r => this.round = r);
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe()
  }

}
