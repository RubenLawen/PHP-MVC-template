import Dir from "./dir/Dir";
import File from "./file/File";
import Content from "./content/Content";

export default class Build
{
    private name: string;
    private dir: Dir;
    private file: File;
    private content: Content;

    constructor(nom: string = "Test"){
        this.name = nom;
        this.dir = new Dir(this.name);
        this.file = new File(this.name);
        this.content = new Content(this.name)
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

    public async iniFileGlobal(){
        this.file.createFileHome();
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

    public async initContentGlobal(){
        this.content.createGlobalContent();
    }

    public async initContentTest(){
        this.content.createTestContent();
    }

    public async initContentSrc(){
        this.content.createSrcContent();
    }

    public async initContentMvc(){
        this.content.createMvcContent();
    }

    public async initContentPublic(){
        this.content.createPublicContent();
    }

}