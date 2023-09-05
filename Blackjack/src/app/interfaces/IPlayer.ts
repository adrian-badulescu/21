import { IDealHttpBodyRequest } from "./http-requests/IDealHttpBodyRequest";
import { ISitHttpBodyRequest } from "./http-requests/ISitHttpBodyRequest";
import { ITurnHttpBodyRequest } from "./http-requests/ITurnHttpBodyRequest";

export interface IPlayer {    
    sit(payload: ISitHttpBodyRequest): void;
    deal(payload: IDealHttpBodyRequest): void;
    turn(payload: ITurnHttpBodyRequest): void;
    stand(): void;
}

// export interface IPlayerObject {
//     balance: number;
//     availableBetOptions?: number[];
//     sessionId?: string;
//     newRound: boolean;
//     canStand: boolean;
// }