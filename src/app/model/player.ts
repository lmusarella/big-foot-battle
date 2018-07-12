export interface Player {
    id: number;
    img: string;
    name: string;
    isSelected: boolean;
    isEliminated: boolean;
    isBomber: boolean;
    countBattle: number;
    playerChoose: boolean;
    permanentEliminated: boolean;
}

export class PlayerImpl implements Player {
    id: number;
    img: string;
    name: string;
    isSelected: boolean;
    isEliminated: boolean;
    isBomber: boolean;
    countBattle: number;
    playerChoose: boolean;
    permanentEliminated: boolean;
}
