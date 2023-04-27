#!/usr/bin/env node

const prompts = require("prompts");

(async () => {
    let response = await prompts({
      type: "text",
      name: "question",
      message: "Choose the name of your project !",
      initial: 1,
    });

    console.log(response.question)
      
    process.exit(1);
  })();
  