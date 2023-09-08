export class MatchPlayerStats {
    constructor(playerID, teamID) {
        this.playerID = playerID;
        this.teamID = teamID;
        this.kills = 0;
        this.deaths = 0;
    }

    getPlayerID() {
        return this.playerID;
    }

    setPlayerID(id) {
        this.playerID = id;
    }

    getTeamID() {
        return this.teamID;
    }

    setTeamID(id) {
        this.teamID = id;
    }

    getKills() {
        return this.kills;
    }

    setKills(kills) {
        this.kills = kills;
    }

    addKill() {
        this.setKills(this.getKills() + 1);
    }

    getDeaths() {
        return this.deaths;
    }

    setDeaths(deaths) {
        this.deaths = deaths;
    }

    addDeath() {
        this.setDeaths(this.getDeaths() + 1);
    }

    getRating() {
        return this.getKills() / this.getDeaths();
    }
}