import { Team } from '../team/Team.mjs'
import { MatchPlayer } from './MatchPlayer.mjs';

import playersData from '../../database/players.json' assert { type: 'json' };

export class MatchTeam {
    constructor(id, players) {
        this.teamID = id;
        this.players = players;
    }

    getTeamID() {
        return this.teamID;
    }

    setTeamID(id) {
        this.teamID = id;
    }

    getPlayers() {
        return this.players;
    }

    setPlayers(team) {
        const players = [];

        team.getRoster().forEach((playerID) => {
            var player = playersData.find(player => player.id === playerID);
            players.push(new MatchPlayer(playerID, player.skills));
        });

        this.players = players;
    }

    filterAlivePlayers() {
        return new MatchTeam(this.teamID, this.players.filter(player => !player.isDead()));
    }

    selectRandomPlayer() {
        const randomIndex = Math.floor(Math.random() * this.players.length);
        return this.players[randomIndex];
    }

    isDead() {
        return this.players.every((player) => player.isDead());
    }

    resetPlayersHealth() {
        this.players.forEach((player) => player.resetHealth());
    }
}