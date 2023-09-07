import { IDealHttpBodyRequest } from "./http-requests/IDealHttpBodyRequest";
import { ISitHttpBodyRequest } from "./http-requests/ISitHttpBodyRequest";
import { IStandHttpBodyRequest } from "./http-requests/IStandHttpBodyRequest";
import { ITurnHttpBodyRequest } from "./http-requests/ITurnHttpBodyRequest";

export interface IPlayer {    
    sit(payload: ISitHttpBodyRequest): void;
    deal(payload: IDealHttpBodyRequest): void;
    turn(payload: ITurnHttpBodyRequest): void;
    stand(payload: IStandHttpBodyRequest): void;
}

