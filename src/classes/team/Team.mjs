export class Team {
    constructor(id, name, roster) {
        this.id = id;
        this.name = name;
        this.roster = roster;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getRoster() {
        return this.roster;
    }

    addPlayerRoster(player) {
        this.roster.push(player);
    }

    removePlayerRoster(player) {
        const index = this.roster.indexOf(player);
        this.roster.splice(index, 1);
    }
}