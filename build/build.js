// #!/usr/bin/env node

const prompts = require("prompts");

(async () => {
    let response = await prompts({
      type: "select",
      name: "question",
      message: "Choisissez une option !",
      choices: [
        { title: "Poser une question à chatGPT ?", value: "question" },
        { title: "Vérifier une probabilité", value: "proba" },
      ],
      initial: 1,
    });

    console.log("észdzed")
      
    process.exit(1);
  })();
  