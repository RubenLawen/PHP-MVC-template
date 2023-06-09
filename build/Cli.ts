#!/usr/bin/env ts-node

const prompts = require("prompts");
const colors = require("colors");
const emoji = require("node-emoji");
import Build from "./Build";

(async () => {
  let flag: boolean = true;

  while (flag) {
    let response = await prompts({
      type: "text",
      name: "question",
      message: "Choose the name of your project !",
      initial: "Test",
    });

    if (
      response.question.match(/^[A-Za-z\s]*$/) &&
      response.question[0] == response.question[0].toUpperCase() &&
      response.question.length > 2 &&
      !response.question.includes(" ")
    ) {
      flag = false;
      let build = new Build(response.question);
      let existedProject = await build.getDirExist();
      if(existedProject){
        console.log(
          emoji.get("x") +
            colors.red(' A project already exists, type "npx reset" to perform this command !')
        );
      } else{
        build.initDir();
        build.initMvc();
        build.iniFileGlobal();
        build.initFileTest();
        build.initFileMvc();
        build.initFilePublic();
        build.initContentGlobal();
        build.initContentTest();
        build.initContentSrc();
        build.initContentMvc();
        build.initContentPublic();
        process.exit(1);
      }
    } else {
      if (!response.question.match(/^[A-Za-z\s]*$/))
        console.log(
          emoji.get("x") +
            colors.red("Name cannot contain digits or special charactere")
        );
      if (response.question.match(/^[A-Za-z\s]*$/))
        console.log(
          emoji.get("white_check_mark") +
            colors.green(" Name cannot contain digits or special charactere")
        );
      if (response.question[0] !== response.question[0].toUpperCase())
        console.log(
          emoji.get("x") + colors.red(" first letter must be uppercase")
        );
      if (response.question[0] == response.question[0].toUpperCase())
        console.log(
          emoji.get("white_check_mark") +
            colors.green(" first letter must be uppercase")
        );
      if (response.question.length <= 2)
        console.log(
          emoji.get("x") + colors.red(" Name size is greater than 2")
        );
      if (response.question.length > 2)
        console.log(
          emoji.get("white_check_mark") +
            colors.green(" Name size is greater than 2")
        );
      if (response.question.includes(" "))
        console.log(emoji.get("x") + colors.red(" Name cannot contain space"));
      if (!response.question.includes(" "))
        console.log(
          emoji.get("white_check_mark") +
            colors.green(" Name cannot contain space")
        );
    }
  }
})();
