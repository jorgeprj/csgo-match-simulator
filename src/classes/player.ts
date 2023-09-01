export class Player{
    private id: number;
    private name: string;
    private nickname: string;
    private age: number;
    private skills: number;

    constructor(id: number, name: string, nickname: string, age: number, skills: number){
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.age = age;
        this.skills = skills;
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

    public getNickname(): string {
        return this.nickname;
    }

    public setNickname(nickname: string): void{
        this.nickname = nickname;
    }

    public getAge(): number{
        return this.age;
    }

    public setAge(age: number): void{
        this.age = age;
    }

    public getSkills(): number{
        return this.skills;
    }

    public setSkills(skills: number): void{
        this.skills = skills;
    }
}