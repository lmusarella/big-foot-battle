export interface Player {
    id: string;
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
    id: string;
    img: string;
    name: string;
    isSelected: boolean;
    isEliminated: boolean;
    isBomber: boolean;
    countBattle: number;
    playerChoose: boolean;
    permanentEliminated: boolean;
}
