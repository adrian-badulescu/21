import { ICards } from "./IDealHttpResponse";

export interface ITurnHttpResponse {
    playerCard: ICards | null;
    dealerCards: ICards[];
    roundEnded: boolean;
    winAmount: number;
    currentBalance: number;
}