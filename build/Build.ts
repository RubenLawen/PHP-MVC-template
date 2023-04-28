import Dir from "./dir/Dir";

export default class Build
{
    private name: string;
    private dir: Dir;

    constructor(nom: string = "Test"){
        this.name = nom;
        this.dir = new Dir();
    }

    public async initDir() {
        this.dir.createDir();
        // return this.name;
    }

}