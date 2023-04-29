#!/usr/bin/env ts-node

const prompts = require("prompts");
const colors = require("colors");
const emoji = require("node-emoji");
import Reset from "./reset/Reset";

(async () => {
    let response = await prompts({
      type: "select",
      name: "choose",
      message: "Are you sure you want to reset your project ?",
      choices: [
        { title: 'yes', value: true },
        { title: 'no', value: false },
      ]
    });

    if(response.choose){
        const reset = new Reset();
        console.log(emoji.get("wastebasket") + colors.gray(" The environment is resetting..."));
        await (await reset.resetAll());
        console.log(emoji.get("white_check_mark") + colors.green(" The environment has been reset !"))
    } else{
        console.log(emoji.get("white_check_mark") + colors.green(" The environment was not deleted!"))
    }
})();
