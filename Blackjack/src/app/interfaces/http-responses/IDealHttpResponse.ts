export interface IDealHttpResponse {
    dealerCards: ICards;
    playerCards: ICards;
    roundEnded: boolean;
    winAmount: number;
    currentBalance: number;
}

interface ICards {
    rank: string;
    suite: string;
}