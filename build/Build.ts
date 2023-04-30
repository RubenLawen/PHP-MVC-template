import Dir from "./dir/Dir";
import File from "./file/File";

export default class Build
{
    private name: string;
    private dir: Dir;
    private file: File;

    constructor(nom: string = "Test"){
        this.name = nom;
        this.dir = new Dir(this.name);
        this.file = new File(this.name);
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

    public async initFileTest(){
        this.file.createFileTest();
    }

    public async initFileMvc(){
        this.file.createFileSrc();
        this.file.createFileConfig();
        this.file.createFileViews();
        this.file.createFileModels();
        this.file.createFileControllers();
    }

    public async initFilePublic(){
        this.file.createFilePublic();
    }

}