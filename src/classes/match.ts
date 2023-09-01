export class Match{
    private id: number;
    private idTeamA: number;
    private idTeamB: number;
    private scoreTeamA: number;
    private scoreTeamB: number;

    constructor(id: number, idTeamA: number, idTeamB: number, scoreTeamA: number, scoreTeamB: number){
        this.id = id;
        this.idTeamA = idTeamA;
        this.idTeamB = idTeamB;
        this.scoreTeamA = scoreTeamA;
        this.scoreTeamB = scoreTeamB;
    }

    public getID(): number{
        return this.id;
    }

    public setID(id: number): void{
        this.id = id;
    }

    public getIDTeamA(): number{
        return this.idTeamA;
    }

    public setIDTeamA(id: number): void{
        this.idTeamA = id;
    }

    public getIDTeamB(): number{
        return this.idTeamB;
    }

    public setIDTeamB(id: number): void{
        this.idTeamB = id;
    }

    public getScoreTeamA(): number{
        return this.scoreTeamA;
    }

    public setScoreTeamA(scoreTeamA: number): void{
        this.scoreTeamA = scoreTeamA;
    }

    public addScoreTeamA(): void{
        this.setScoreTeamA(this.getScoreTeamA() + 1);
    }

    public getScoreTeamB(): number{
        return this.scoreTeamB;
    }

    public setScoreTeamB(scoreTeamB: number): void{
        this.scoreTeamB = scoreTeamB;
    }

    public addScoreTeamB(): void{
        this.setScoreTeamB(this.getScoreTeamB() + 1);
    }

    public play(): string{
        var teamWith16 = Math.random() < 0.5 ? 'A' : 'B';
        if (teamWith16 === 'A') {
            this.setScoreTeamA(16);
            this.setScoreTeamB(Math.floor(Math.random() * 15)); 
        } else {
            this.setScoreTeamA(Math.floor(Math.random() * 15));
            this.setScoreTeamB(16);
        }
        return(`${this.scoreTeamA} x ${this.scoreTeamB}`);
    }
}