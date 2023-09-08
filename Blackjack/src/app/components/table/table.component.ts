import { Component, OnInit } from '@angular/core';
import { ICards } from 'src/app/interfaces/http-responses/ICards';
import { CounterService } from 'src/app/services/counter.service';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';
import { IErrorHttpResponse } from 'src/app/interfaces/http-responses/IErrorHttpResponse';
import { ErrorService } from 'src/app/services/error-service';
import { RandomService } from 'src/app/services/random.service';


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
  winAmountAbsolute: any = 0;
  dealerCards: ICards[] = [];
  playerCards: ICards[] = [];
  playerCard: ICards | null = { rank: '', suite: '' };
  counterSubscription: Subscription = new Subscription();
  httpErrorReceived: boolean = false;
  httpError: IErrorHttpResponse = { statusCode: 0, error: '', message: '' };


  constructor(private _playerService: PlayerService,
    private _errorService: ErrorService,
    private _randomService: RandomService) {
    
  }

  lossToAbs(number: number): number {
    return Math.abs(number)
  }

  sitOnTable() {
    this._errorService.clearError();
    this._randomService.setRandomInitialAmount();
    this._randomService.balance$
      .subscribe(balance => this.balance = balance);
    this._playerService.sit({ balance: this.balance });
    this._playerService.sitResponse$
      .subscribe(res => { this.availableBetOptions = res.availableBetOptions, this.sessionId = res.sessionId });
    this.showResults = false;
  }

  turn(action: string) {
    this._playerService.turn({ action: action, sessionId: this.sessionId });
    this._playerService.turnResponse
      .subscribe(res => { this.dealerCards = res.dealerCards, this._playerService.checkIfCardIsNull(res.playerCard, this.playerCards), this.roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance; });
  }


  deal(bet: number) {
    this._playerService.deal({ bet, sessionId: this.sessionId });
    this._playerService.dealResponse$
      .subscribe(res => { this.dealerCards = res.dealerCards, this.playerCards = res.playerCards, this.roundEnded = res.roundEnded, this.winAmount = res.winAmount, this.balance = res.currentBalance; });
    this.showAvailableBettingAmount = false;
    this.showCards = true;
  }

  stand() {
    this._playerService.stand({ sessionId: this.sessionId });
    this._playerService.standResponse.subscribe(res => { this.round = res.roundsPlayed, this.winAmount = res.winAmount });
    this._playerService.clearSession();
    this.showResults = true;
    // this.showCards = false;
  }

  showDealOptions() {
    this._playerService.setBettingOptions(this.balance, this.availableBetOptions);
    this.showAvailableBettingAmount = true;
    this.showCards = false;
    this.roundEnded = false;
  }



  ngOnInit(): void {
    this._errorService.httpError.subscribe(e => this.httpErrorReceived = e);
    this._errorService.err.subscribe(e => this.httpError = e);
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
