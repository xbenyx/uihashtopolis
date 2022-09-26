export class User{
    public username: string;
    public email: string;
    public rightGroupId: number;

    constructor(username: string, email: string, rightGroupId: number ){
        this.username = username;
        this.email = email;
        this.rightGroupId = rightGroupId;
    }
}