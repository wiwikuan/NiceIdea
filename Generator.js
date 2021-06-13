

class Generator {
  /**
   * @param {import("./Assert.js")} assert 
   */
  constructor(assert) {
    this._Assert = assert
  }

  /**
   * @param {import("./Assert.js")} assert
   */
  static init(assert) {
    return new Generator(assert)
  }

  get Assert() {
    return this._Assert
  }

  /**
   * 產生隨機的音符。
   * @param {string[]} range 
   * @param {number} limit 
   */
  getRandomNotes(range, limit) {
    return Random.getRandomItems(range, limit);
  }

  /**
   * 產生隨機和弦列表。
   * @param {string[]} range 要挑選的和弦類型範圍。
   * @param {number} limit 要產生的和弦名單長度。
   */
  getRandomChords(range, limit) {
    /** 和弦目錄。 */
    const chordIndex = this._Assert.chords;

    /**
     * 候選和弦名單。
     * @type {string[]}
     */
    const chordsList = range.reduce((result, chord) => chordIndex[chord]
      ? (result = result.concat(chordIndex[chord]), result)
      : result
      , []);

    return Random.getRandomItems(chordsList, limit);
  }

  /**
   * 產生隨機調式列表。
   * @param {number} limit 
   */
  getRandomModes(limit) {
    const getRandomMode = () =>
      Random.getRandomItem(this._Assert.roots) + " " +
      Random.getRandomItem(this._Assert.modes);

    return Random.getRandomItems(getRandomMode, limit);
  }

  /** 產生隨機大小調與調號。 */
  getRandomKeys() {
    return Random.getRandomItem(this._Assert.keys);
  }

  /** 產生隨機拍號。 */
  getRandomMeter() {
    return Random.getRandomItem(this._Assert.meter);
  }

  /** 產生隨機速度。 */
  getRandomTempo() {
    return Random.getRandomNumber(210, 30);
  }

  /** 產生隨機標題。 */
  getRandomTitle() {
    return Random.getRandomItem(this._Assert.titleAround)
      .replace(/(ooo|xxx)/g, Random.getRandomItem(this._Assert.titleNoun));
  }

  /** 產生隨機想法。 */
  getRandomIdea() {
    return Random.getRandomItem(this._Assert.idea)
  }
}



/**
 * 隨機內容產生器。
 */
class Random {
  /**
   * 產生隨機數值。
   * 
   * @param {number} max 最大值（不含）
   * @param {number} [min=0] 最小值（含）
   */
  static getRandomNumber(max, min = 0) {
    return (Math.random() * max) + min | 0;
  }

  /**
   * 取得輸入陣列中的隨機元素。
   * 
   * @template T
   * @param {T[]} source 隨機內容的父集合。
   * @returns {T}
   */
  static getRandomItem(source) {
    return source[Random.getRandomNumber(source.length)];
  }

  /**
   * 以輸入陣列產生隨機內容。
   * 
   * @template T
   * @param {T[]|()=>T} source 隨機內容的父集合，或產生內容的函數。
   * @param {number} [limit=1] 數量。
   * @returns {T[]}
   */
  static getRandomItems(source, limit = 1) {
    return Array.isArray(source)
      ? [...Array(limit)].map(_ => Random.getRandomItem(source))
      : [...Array(limit)].map(source);
  }

}



module.exports = Generator
