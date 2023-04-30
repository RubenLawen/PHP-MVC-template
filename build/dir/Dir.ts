import * as fs from "fs";

export default class Dir
{
    private name: string;

    constructor(nom: string = "Test"){
        this.name = nom;
    }

    public async existDir(){
        if(fs.existsSync("src")) return true
        if(fs.existsSync("public")) return true
        if(fs.existsSync("tests")) return true
        return false
    }

    public async createDir() {
        fs.mkdirSync("tests");
        fs.mkdirSync("src");
        fs.mkdirSync("public");
        fs.mkdirSync("public/img");
        fs.mkdirSync("public/js");
    }

    public async createMvc() {
        fs.mkdirSync("src/Controllers")
        fs.mkdirSync("src/Models")
        fs.mkdirSync("src/Views")
        fs.mkdirSync("src/config")
        fs.mkdirSync("src/Views/" + this.name)
    }

}