'use strict';
const inquirer = require('inquirer');

const Assert = require("./Assert");
const _Generator = require("./Generator")
let Generator = null



function perpare() {
  process.stdout.write('\x1Bc');
  /** @type {import("inquirer").QuestionCollection} */
  const questions = [{
    type: "rawlist",
    message: "是否要載入外部設定檔？",
    name: "isUseFile",
    pageSize: 12,
    choices: [{
      name: "是的，載入 data.txt 檔案",
      value: "yes",
    },
    {
      name: "不用，使用預設設定即可",
      value: "no",
    },]
  }]

  inquirer.prompt(questions).then(answer => {
    const isUseFile = answer["isUseFile"]

    switch (isUseFile) {
      case "yes":
        return Assert.init(true)

      default:
        return Assert.init(false)
    }
  })
    .then(assert => {
      console.log("test log")
      Generator = _Generator.init(assert)
      return mainMenu()
    })
}

function mainMenu() {
  /** @type {import("inquirer").QuestionCollection} */
  const questions = [{
    type: 'rawlist',
    message: '[NiceIdea 音樂靈感隨機產生器 v1.0 - 主選單]',
    name: 'menu',
    pageSize: 12,
    choices: [{
      name: "給我一些隨便的【音】",
      value: "randomNotes"
    },
    {
      name: "給我一些隨便的【和弦】",
      value: "randomChords"
    },
    {
      name: "給我一個隨便的【大小調/調號】",
      value: "randomKeys"
    },
    {
      name: "給我一些隨便的【調式】",
      value: "randomModes"
    },
    {
      name: "給我一個隨便的【拍號】",
      value: "randomMeter"
    },
    {
      name: "給我一個隨便的【速度】",
      value: "randomTempo"
    },
    {
      name: "給我一個隨便的【歌名】",
      value: "randomTitle"
    },
    {
      name: "給我一個隨便的【點子】",
      value: "idea"
    },
    {
      name: "結束",
      value: "quit"
    }
    ],
  },]

  inquirer.prompt(questions).then((answers) => {
    switch (answers["menu"]) {
      case "randomNotes":
        return randomNotes();

      case "randomChords":
        return randomChords();

      case "randomKeys":
        return randomKeys();

      case "randomModes":
        return randomModes();

      case "randomMeter":
        return randomMeter();

      case "randomTempo":
        return randomTempo();

      case "randomTitle":
        return randomTitle();

      case "idea":
        return randomIdea();

      case "quit":
        console.log("=== 掰掰！ ===");
        process.exit(0);

      default:
        console.log("=== 掰掰！ ===");
        process.exit(0);
    }
  });

}

/** 回到主選單或結束程式。 */
function exitOrNot() {
  /** @type {import("inquirer").QuestionCollection} */
  const questions = [{
    type: 'confirm',
    message: '還要再玩一次嗎？',
    name: 'exit',
    default: true
  }]

  inquirer.prompt(questions).then((answers) => {
    if (answers["exit"]) {
      return mainMenu();
    }

    console.log("=== 掰掰！記得多到 NiceChord.com 學音樂唷～ ===");
    process.exit(0);
  });

}

/** 產生隨機音符。 */
function randomNotes() {

  /** @type {import("inquirer").QuestionCollection} */
  const questions = [{
    type: 'checkbox',
    message: '[隨機音符產生器] 選擇要抽的音：',
    name: 'notes',
    pageSize: 12,
    choices: Generator.Assert.notes,
    default: Generator.Assert.notes,
    validate(answer) {
      if (answer.length < 1) {
        return '至少要選一個音唷！';
      }
      return true;
    },
  },
  {
    type: 'number',
    message: '要產生幾個音？（1-100）',
    name: 'howmany',
    default: 8,
    validate(answer) {
      if (isNaN(answer)) {
        return '數量需要輸入數字喔！';
      }

      if (answer < 1) {
        return '數量需要大於 0 喔！';
      }

      if (answer > 100) {
        return '數量需要小於 100 喔！';
      }

      return true;
    }
  },
  ]

  inquirer.prompt(questions).then((answers) => {
    /**
     * 選擇的音符列表。
     * @type {string[]}
     */
    const choices = answers["notes"];
    /** @type {number} */
    const howmany = answers["howmany"];

    console.log(Generator.getRandomNotes(choices, howmany));
    exitOrNot();
  });

}

/** 產生隨機和弦。 */
function randomChords() {

  /** 和弦類型列表。 */
  const chordTypes = ["major", "minor", "augmented", "diminished", "sus2", "maj7", "m7", "7", "7sus", "m7(b5)", "dim7"];

  /** @type {import("inquirer").QuestionCollection} */
  const questions = [{
    type: 'checkbox',
    message: '[隨機和弦產生器] 選擇要抽的和弦類型：',
    name: 'chords',
    pageSize: 12,
    choices: Object.keys(Generator.Assert.chords),
    default: ["maj7", "m7", "7sus"],
    validate(answer) {
      if (answer.length < 1) {
        return '至少要選一種喔！';
      }

      return true;
    },
  },
  {
    type: 'number',
    message: '要產生幾個和弦？（1-100）',
    name: 'howmany',
    default: 8,
    validate(answer) {
      if (isNaN(answer)) {
        return '數量需要輸入數字喔！';
      }

      if (answer < 1) {
        return '數量需要大於 0 喔！';
      }

      if (answer > 100) {
        return '數量需要小於 100 喔！';
      }

      return true;
    }
  },
  ]

  inquirer.prompt(questions).then((answers) => {
    /**
     * 使用者選的和弦類型。
     * @type {string[]}
     */
    const types = answers["chords"];
    /**
     * 產生和弦的數量上限。
     * @type {number}
     */
    const howmany = answers["howmany"];

    console.log(Generator.getRandomChords(types, howmany));
    exitOrNot();
  });

}

/** 產生隨機調式 */
function randomModes() {

  /** @type {import("inquirer").QuestionCollection} */
  const questions = [{
    type: 'number',
    message: '要產生幾個調式？（1-100）',
    name: 'howmany',
    default: 4,
    validate(answer) {
      if (isNaN(answer)) {
        return '數量需要輸入數字喔！';
      }

      if (answer < 1) {
        return '數量需要大於 0 喔！';
      }

      if (answer > 100) {
        return '數量需要小於 100 喔！';
      }

      return true;
    }
  },]

  inquirer.prompt(questions).then((answers) => {
    const howmany = answers["howmany"];

    console.log(Generator.getRandomModes(howmany));
    exitOrNot();
  });

}

function randomKeys() {

  console.log("\n 🎹 " + Generator.getRandomKeys() + "\n");
  exitOrNot();

}

function randomMeter() {

  console.log("\n 🎼 " + Generator.getRandomMeter() + " 拍\n");
  exitOrNot();

}

/** 產生隨機速度 */
function randomTempo() {

  console.log("\n 🎲 " + Generator.getRandomTempo() + " BPM\n");
  exitOrNot();

}

/** 產生隨機標題 */
function randomTitle() {

  console.log("\n 🤔 " + Generator.getRandomTitle() + "\n");
  exitOrNot();

}

/** 產生隨機想法 */
function randomIdea() {

  console.log("\n 💡 " + Generator.getRandomIdea() + "\n");
  exitOrNot();

}



perpare();
