const inquirer = require("inquirer");

const Assert = require("./Assert");
const Generator = require("./Generator");



class ConsoleInterface {
  /**
   * @param {Assert} assert 
   * @param {Generator} generator 
   */
  constructor(assert, generator) {
    this._Assert = assert;
    this._Generator = generator;
  }

  static async init() {
    const assert = await Assert.init();
    const generator = Generator.init(assert);

    return new ConsoleInterface(assert, generator);
  }

  /**
   * 主選單。
   */
  async mainMenu() {

    /** @type {inquirer.QuestionCollection} */
    const questions = [{
      type: "rawlist",
      message: "[NiceIdea 音樂靈感隨機產生器 v1.0 - 主選單]",
      name: "menu",
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
      },
      ],
    },
    ]

    return await inquirer.prompt(questions).then((answers) => {
      switch (answers["menu"]) {
        case "randomNotes":
          return this.randomNotes();

        case "randomChords":
          return this.randomChords();

        case "randomKeys":
          return this.randomKeys();

        case "randomModes":
          return this.randomModes();

        case "randomMeter":
          return this.randomMeter();

        case "randomTempo":
          return this.randomTempo();

        case "randomTitle":
          return this.randomTitle();

        case "idea":
          return this.randomIdea();

        case "quit":
          console.log("=== 掰掰！ ===");
          return false

        default:
          console.log("=== 掰掰！ ===");
          return false
      }
    });

  }

  /**
   * 回到主選單或結束程式。
   * @returns {false | Promise<any>}
   */
  async exitOrNot() {

    /** @type {inquirer.QuestionCollection} */
    const questions = [{
      type: "confirm",
      message: "還要再玩一次嗎？",
      name: "exit",
      default: true
    }]

    return await inquirer.prompt(questions).then((answers) => {
      if (answers["exit"]) {
        return this.mainMenu();
      }

      console.log("=== 掰掰！記得多到 NiceChord.com 學音樂唷～ ===");
      return false;
    });

  }

  /** 產生隨機音符。 */
  async randomNotes() {

    /** @type {inquirer.QuestionCollection} */
    const questions = [{
      type: "checkbox",
      message: "[隨機音符產生器] 選擇要抽的音：",
      name: "notes",
      pageSize: 12,
      choices: this._Assert.notes,
      default: this._Assert.notes,
      validate(answer) {
        if (answer.length < 1) {
          return "至少要選一個音唷！";
        }

        return true;
      },
    },
    {
      type: "number",
      message: "要產生幾個音？（1-100）",
      name: "howmany",
      default: 8,
      validate(answer) {
        return ConsoleInterface.validateNumberInput(100, 1)(answer)
      }
    },
    ]

    return await inquirer.prompt(questions).then((answers) => {
      /**
       * 選擇的音符列表。
       * @type {string[]}
       */
      const choices = answers["notes"];
      /** @type {number} */
      const howmany = answers["howmany"];

      console.log(this._Generator.getRandomNotes(choices, howmany));
      return this.exitOrNot();
    });

  }

  /** 產生隨機和弦。 */
  async randomChords() {

    /** @type {inquirer.QuestionCollection} */
    const questions = [{
      type: "checkbox",
      message: "[隨機和弦產生器] 選擇要抽的和弦類型：",
      name: "chords",
      pageSize: 12,
      choices: Object.keys(this._Assert.chords),
      default: ["maj7", "m7", "7sus"],
      validate(answer) {
        if (answer.length < 1) {
          return "至少要選一種喔！";
        }

        return true;
      },
    },
    {
      type: "number",
      message: "要產生幾個和弦？（1-100）",
      name: "howmany",
      default: 8,
      validate(answer) {
        return ConsoleInterface.validateNumberInput(100, 1)(answer)
      }
    },
    ]

    return await inquirer.prompt(questions).then((answers) => {
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

      console.log(this._Generator.getRandomChords(types, howmany));
      return this.exitOrNot();
    });

  }

  /** 產生隨機調式 */
  async randomModes() {

    /** @type {inquirer.QuestionCollection} */
    const questions = [{
      type: "number",
      message: "要產生幾個調式？（1-100）",
      name: "howmany",
      default: 4,
      validate(answer) {
        return ConsoleInterface.validateNumberInput(100, 1)(answer)
      }
    },
    ]

    return await inquirer.prompt(questions).then((answers) => {
      const howmany = answers["howmany"];

      console.log(this._Generator.getRandomModes(howmany));
      return this.exitOrNot();
    });

  }

  /** 產生隨機大小調與調號。 */
  async randomKeys() {

    console.log("\n 🎹 " + this._Generator.getRandomKeys() + "\n");
    return await this.exitOrNot();

  }

  /** 產生隨機拍號。 */
  async randomMeter() {

    console.log("\n 🎼 " + this._Generator.getRandomMeter() + " 拍\n");
    return await this.exitOrNot();

  }

  /** 產生隨機速度 */
  async randomTempo() {

    console.log("\n 🎲 " + this._Generator.getRandomTempo() + " BPM\n");
    return await this.exitOrNot();

  }

  /** 產生隨機標題 */
  async randomTitle() {

    console.log("\n 🤔 " + this._Generator.getRandomTitle() + "\n");
    return await this.exitOrNot();

  }

  /** 產生隨機想法 */
  async randomIdea() {

    console.log("\n 💡 " + this._Generator.getRandomIdea() + "\n");
    return await this.exitOrNot();

  }

  static validateNumberInput(max, min) {
    return num => {
      if (isNaN(Number(num))) {
        return "需要輸入數字喔！";
      }

      if (num > max) {
        return `需要小於 ${max} 喔！`;
      }

      if (num < min) {
        return `需要大於 ${min} 喔！`;
      }

      return true;
    }
  }

}



module.exports = ConsoleInterface;
