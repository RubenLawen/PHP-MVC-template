import Dir from "./dir/Dir";

export default class Build
{
    private name: string;
    private dir: Dir;

    constructor(nom: string = "Test"){
        this.name = nom;
        this.dir = new Dir(this.name);
    }

    public async getDirExist(){
        return this.dir.existDir();
    }

    public async initDir() {
        this.dir.createDir();
    }

    public async initMvc(){
        this.dir.createMvc();
    }


}