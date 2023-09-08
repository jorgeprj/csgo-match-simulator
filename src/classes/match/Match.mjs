import { MatchStats } from './MatchStats.mjs';
import { MatchTeam } from './MatchTeam.mjs'
import { MatchPlayer } from './MatchPlayer.mjs'
import { Team } from '../team/Team.mjs'

export class Match {
    constructor(id, teamA, teamB) {
        this.id = id;
        this.teamA = teamA;
        this.teamB = teamB;
        this.stats = new MatchStats(teamA, teamB);
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    getTeamA() {
        return this.teamA;
    }

    setTeamA(teamA) {
        this.teamA = teamA;
    }

    getTeamB() {
        return this.teamB;
    }

    setTeamB(teamB) {
        this.teamB = teamB;
    }

    getStats() {
        return this.stats;
    }

    setStats(stats) {
        this.stats = stats;
    }

    play() {
        const MAX_ROUNDS = 30;
        let currentRound = 1;

        const lineupA = new MatchTeam(this.getTeamA().getID(), []);
        lineupA.setPlayers(this.teamA);

        const lineupB = new MatchTeam(this.getTeamB().getID(), []);
        lineupB.setPlayers(this.teamB);

        while (currentRound <= MAX_ROUNDS) {
            this.playRound(lineupA, lineupB);

            if (this.stats.getScoreTeamA() === 16 || this.stats.getScoreTeamB() === 16) {
                console.log(`Match ended. ${this.stats.getScoreTeamA()} x ${this.stats.getScoreTeamB()}`);
                return;
            }
            currentRound++;
        }

        if (this.stats.getScoreTeamA() === 15 && this.stats.getScoreTeamB() === 15) {
            console.log("OVERTIME!");
            this.playOvertime(lineupA, lineupB);
        }
    }

    playOvertime(playersTeamA, playersTeamB) {
        const MAX_ROUNDS = 6;
        let overtimeRound = 1;
        const scoreTeamA = this.stats.getScoreTeamA();
        const scoreTeamB = this.stats.getScoreTeamB();

        while (overtimeRound <= MAX_ROUNDS) {
            this.playRound(playersTeamA, playersTeamB);

            if (this.stats.getScoreTeamA() === scoreTeamA + 4 || this.stats.getScoreTeamB() === scoreTeamB + 4) {
                console.log(`Overtime ended. ${this.stats.getScoreTeamA()} x ${this.stats.getScoreTeamB()}`);
                return;
            }
            overtimeRound++;
        }

        if (this.stats.getScoreTeamA() === scoreTeamA + 3 && this.stats.getScoreTeamB() === scoreTeamB + 3) {
            console.log("OVERTIME AGAIN!");
            this.playOvertime(playersTeamA, playersTeamB);
        }
    }

    playRound(playersTeamA, playersTeamB) {
        let aliveTeamA = playersTeamA;
        let aliveTeamB = playersTeamB;

        while (aliveTeamA.getPlayers().length > 0 && aliveTeamB.getPlayers().length > 0) {
            const randomPlayerTeamA = aliveTeamA.selectRandomPlayer();
            const randomPlayerTeamB = aliveTeamB.selectRandomPlayer();

            this.playEncounter(randomPlayerTeamA, randomPlayerTeamB);

            aliveTeamA = playersTeamA.filterAlivePlayers();
            aliveTeamB = playersTeamB.filterAlivePlayers();
        }

        if (aliveTeamB.isDead())
            this.stats.addScoreTeamA();
        else if (aliveTeamA.isDead())
            this.stats.addScoreTeamB();

        console.log(`${this.stats.getScoreTeamA()} x ${this.stats.getScoreTeamB()}`);
        playersTeamA.resetPlayersHealth();
        playersTeamB.resetPlayersHealth();
    }

    playEncounter(playerCT, playerT) {
        const randomPlayer = Math.floor(Math.random() * 2) + 1; // 50% odd

        if (randomPlayer == 1) {
            playerT.kill();
            this.stats.addKillToPlayerStats(playerCT.getID());
            this.stats.addDeathToPlayerStats(playerT.getID());
        } else {
            playerCT.kill();
            this.stats.addKillToPlayerStats(playerT.getID());
            this.stats.addDeathToPlayerStats(playerCT.getID());
        }
    }
}

/*
const player1 = new Player(1, "Gabriel", "Gab", 27, 83);
const player2 = new Player(2, "Luis", "Lil u", 22, 81);
const player3 = new Player(3, "Chico", "Coin", 29, 87);
const player4 = new Player(4, "Maicon", "GoD", 21, 78);
const player5 = new Player(5, "Gary", "Molusco", 23, 79);
const player6 = new Player(6, "Lucas", "Cobra", 32, 81);
const player7 = new Player(7, "Jorge", "vhx", 33, 82);
const player8 = new Player(8, "Paulo", "Magic", 21, 88);
const player9 = new Player(9, "Sebastian", "Seba", 19, 75);
const player10 = new Player(10, "Kleber", "Kelb", 18, 77);


const teamA = new Team(10, "Vasco da Gama", [player1, player2, player3, player4, player5]);
const teamB = new Team(14, "High", [player6, player7, player8, player9, player10]);
const match = new Match(1, teamA, teamB);
match.play();
*/
