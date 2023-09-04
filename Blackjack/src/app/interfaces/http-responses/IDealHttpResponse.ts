export interface IDealHttpResponse {
    dealerCards: ICards[];
    playerCards: ICards[];
    roundEnded: boolean;
    winAmount: number;
    currentBalance: number;
}

export interface ICards {
    rank: string;
    suite: string;
}