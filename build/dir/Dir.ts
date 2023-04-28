import * as fs from "fs";

export default class Dir
{

    public async createDir() {
        fs.mkdirSync("dzded");
    }

}