import { Component, OnInit } from '@angular/core';
import { ICards } from 'src/app/interfaces/http-responses/ICards';
import { CounterService } from 'src/app/services/counter.service';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';
import { IErrorHttpResponse } from 'src/app/interfaces/http-responses/IErrorHttpResponse';
import { ErrorService } from 'src/app/services/error-service';


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
  showResults: boolean = false;
  showCards: boolean = false;
  toggleDealBtn: boolean = false;
  winAmount: number = 0;
  dealerCards: ICards[] = [];
  playerCards: ICards[] = [];
  playerCard: ICards | null = { rank: '', suite: '' };
  counterSubscription: Subscription = new Subscription();
  httpErrorReceived: boolean = false;
  httpError: IErrorHttpResponse = {statusCode: 0, error: '', message: ''};


  constructor(private _playerService: PlayerService, private counter: CounterService, private _errorService: ErrorService) {
    
  }



  sitOnTable() {
    this.showResults = false;  
    this._errorService.clearError();  
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
    this.showCards = true;
    this._playerService.deal({ bet, sessionId: this.sessionId });
    this._playerService.dealResponse$
      .subscribe(res => { this.dealerCards = res.dealerCards, this.playerCards = res.playerCards,  this. roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance;});
  }

  stand() {
    this._playerService.stand({sessionId: this.sessionId});
    this._playerService.standResponse.subscribe(res => {this.round = res.roundsPlayed, this.winAmount = res.winAmount})
    this.showResults = true;
    this._playerService.clearSession();
  }

  showDealOptions() {
    this._playerService.sit({balance: this.balance});
    this.showAvailableBettingAmount = true;
    this.showCards = false;
    this.roundEnded = false;
    
  }



  ngOnInit(): void { 
    this.counterSubscription = this.counter.round.subscribe(round => this.round = round);
    this._errorService.httpError.subscribe(e => this.httpErrorReceived = e);
    this._errorService.err.subscribe(e => this.httpError = e);
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
