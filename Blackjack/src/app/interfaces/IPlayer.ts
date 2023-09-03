export interface IPlayer {    
    sit(balance: number): void;
    deal(): void;
    turn(): void;
    stand(): void;
}

export interface IPlayerObject {
    balance: number;
    availableBetOptions?: number[];
    sessionId?: string
}