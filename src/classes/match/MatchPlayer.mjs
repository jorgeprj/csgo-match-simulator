export class MatchPlayer {
    constructor(id) {
        this.id = id;
        this.health = 100;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    kill() {
        this.setHealth(0);
    }

    resetHealth() {
        this.setHealth(100);
    }

    isDead() {
        return this.getHealth() <= 0;
    }
}