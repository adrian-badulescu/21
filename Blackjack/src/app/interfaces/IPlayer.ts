import { IDealHttpBodyRequest } from "./http-requests/IDealHttpBodyRequest";
import { ISitHttpBodyRequest } from "./http-requests/ISitHttpBodyRequest";

export interface IPlayer {    
    sit(balance: ISitHttpBodyRequest): void;
    deal(payload: IDealHttpBodyRequest): void;
    turn(): void;
    stand(): void;
}

// export interface IPlayerObject {
//     balance: number;
//     availableBetOptions?: number[];
//     sessionId?: string;
//     newRound: boolean;
//     canStand: boolean;
// }