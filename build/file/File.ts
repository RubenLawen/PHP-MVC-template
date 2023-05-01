import * as fs from "fs";

export default class File
{
    private name: string;

    constructor(nom: string = "Test"){
        this.name = nom;
    }

    public async createFileHome(){
        fs.appendFileSync(`composer.json`,'');
        fs.appendFileSync(`README.md`,'');
    }

    public async createFileTest() {
        fs.appendFileSync(`tests/${this.name}Test.php`,'');
    }

    public async createFileSrc(){
        fs.appendFileSync(`src/Route.php`,'');
        fs.appendFileSync(`src/Router.php`,'');
        fs.appendFileSync(`src/Validator.php`,'');
        fs.appendFileSync(`src/helper.php`,'');
    }

    public async createFileConfig() {
        fs.appendFileSync(`src/config/config.php`,'');
    }

    public async createFileViews() {
        fs.appendFileSync(`src/Views/404.php`,'');
        fs.appendFileSync(`src/Views/layout.php`,'');
        fs.appendFileSync(`src/Views/${this.name}/accueil.php`,'');
    }

    public async createFileModels() {
        fs.appendFileSync(`src/Models/Bdd.php`,'');
        fs.appendFileSync(`src/Models/${this.name}.php`,'');
        fs.appendFileSync(`src/Models/${this.name}Manager.php`,'');
    }

    public async createFileControllers() {
        fs.appendFileSync(`src/Controllers/${this.name}Controller.php`,'');
    }

    public async createFilePublic() {
        fs.appendFileSync(`public/index.php`,'');
        fs.appendFileSync(`public/.htaccess`,'');
        fs.appendFileSync(`public/style.scss`,'');
        fs.appendFileSync(`public/js/app.js`, '')
    }

}