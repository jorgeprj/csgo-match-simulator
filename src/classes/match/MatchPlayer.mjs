export class MatchPlayer {
    constructor(id, skills) {
        this.id = id;
        this.skills = skills;
        this.health = 100;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    getSkills() {
        return this.skills;
    }

    setSkills(skills) {
        this.skills = skills;
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