import { Player } from "./player";

export class Team{
    private id: number;
    private name: string;
    private roster: Player[];

    constructor(id: number, name: string, roster: Player[]){
        this.id = id;
        this.name = name;
        this.roster = roster;
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number): void{
        this.id = id;
    }

    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getRoster(): Player[]{
        return this.roster;
    }

    public addPlayerRoster(player: Player): void{
        this.roster.push(player);
    }

    public removePlayerRoster(player: Player){
        const index = this.roster.indexOf(player);
        this.roster.splice(index, 1);
    }

    public getRosterIDs(): number[]{
        const ids = new Array();
        for(let player of this.getRoster()){
            ids.push(player.getID());
        }
        return ids;
    }
}