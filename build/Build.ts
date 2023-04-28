// const { Dir } = require("./dir/dir.ts")

class Build
{
    private name: string;

    constructor(nom: string = "Test"){
        this.name = nom;
    }

    public async initDir() {
        return this.name;
    }

}