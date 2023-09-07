import { ICards } from "./ICards";
export { ICards } from "./ICards";

export interface IDealHttpResponse {
    dealerCards: ICards[];
    playerCards: ICards[];
    roundEnded: boolean;
    winAmount: number;
    currentBalance: number;
}


