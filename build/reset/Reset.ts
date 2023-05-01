const colors = require("colors");
const emoji = require("node-emoji");
import * as fs from "fs";

export default class Reset
{

    public async resetAll() {
        await fs.rmSync("public", {recursive: true, force: true});
        console.log(emoji.get("white_check_mark") +colors.green(" Public deleted"));
        await fs.rmSync("src",{recursive: true, force: true});
        console.log(emoji.get("white_check_mark") +colors.green(" Src deleted"));
        await fs.rmSync("tests", {recursive: true, force: true});
        console.log(emoji.get("white_check_mark") +colors.green(" Tests deleted"));
        await fs.rmSync("composer.json", {recursive: true, force: true});
        console.log(emoji.get("white_check_mark") +colors.green(" Composer.json deleted"));
        await fs.rmSync("README.md", {recursive: true, force: true});
        console.log(emoji.get("white_check_mark") +colors.green(" README.md deleted"));
    }

}