export class Player {
    constructor(id, name, nickname, age, skills) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.age = age;
        this.skills = skills;
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

    getNickname() {
        return this.nickname;
    }

    setNickname(nickname) {
        this.nickname = nickname;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }

    getSkills() {
        return this.skills;
    }

    setSkills(skills) {
        this.skills = skills;
    }
}