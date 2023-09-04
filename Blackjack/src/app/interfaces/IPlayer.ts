import { ISitHttpBodyRequest } from "./http-requests/ISitHttpBodyRequest";
import { ISitHttpResponse } from "./http-responses/ISitHttpResponse";

export interface IPlayer {    
    sit(balance: ISitHttpBodyRequest): void;
    deal(): void;
    turn(): void;
    stand(): void;
}

export interface IPlayerObject {
    balance: number;
    availableBetOptions?: number[];
    sessionId?: string
}