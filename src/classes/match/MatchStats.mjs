import { Team } from '../team/Team.mjs';
import { MatchPlayerStats } from './MatchPlayerStats.mjs';

export class MatchStats {
    constructor(teamA, teamB) {
        this.scoreTeamA = 0;
        this.scoreTeamB = 0;
        this.playersStats = [];
        this.createPlayersStats(teamA, teamB);
    }

    getScoreTeamA() {
        return this.scoreTeamA;
    }

    setScoreTeamA(scoreTeamA) {
        this.scoreTeamA = scoreTeamA;
    }

    addScoreTeamA() {
        this.setScoreTeamA(this.getScoreTeamA() + 1);
    }

    getScoreTeamB() {
        return this.scoreTeamB;
    }

    setScoreTeamB(scoreTeamB) {
        this.scoreTeamB = scoreTeamB;
    }

    addScoreTeamB() {
        this.setScoreTeamB(this.getScoreTeamB() + 1);
    }

    getWinner() {
        if (this.getScoreTeamA() > this.getScoreTeamB())
            return "A";
        else
            return "B";
    }

    getScore() {
        return `${this.scoreTeamA} x ${this.scoreTeamB}`;
    }

    getPlayersStats() {
        return this.playersStats;
    }

    insertPlayerStats(playerStats) {
        this.playersStats.push(playerStats);
    }

    removePlayerStats(playerStats) {
        const index = this.playersStats.indexOf(playerStats);
        this.playersStats.splice(index, 1);
    }

    createPlayersStats(teamA, teamB) {
        const ROSTER_LENGTH = 5;

        let IDsLineupA = teamA.getRoster();
        let IDsLineupB = teamB.getRoster();

        for (let i = 0; i < ROSTER_LENGTH; i++) {
            this.insertPlayerStats(new MatchPlayerStats(IDsLineupA[i], teamA.getID()));
        }

        for (let i = 0; i < ROSTER_LENGTH; i++) {
            this.insertPlayerStats(new MatchPlayerStats(IDsLineupB[i], teamB.getID()));
        }
    }

    addKillToPlayerStats(idPlayer) {
        const indexPlayer = this.getPlayerIndex(idPlayer);
        this.getPlayersStats()[indexPlayer].addKill();
    }

    addDeathToPlayerStats(idPlayer) {
        const indexPlayer = this.getPlayerIndex(idPlayer);
        this.getPlayersStats()[indexPlayer].addDeath();
    }

    getPlayerIndex(idPlayer) {
        return this.playersStats.findIndex(x => x.getPlayerID() === idPlayer);
    }
}