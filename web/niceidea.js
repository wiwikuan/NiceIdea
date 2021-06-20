function randomNotes() {
  let choices = [];
  let result = [];
  let howmany = 8
  if (document.getElementById("howmanyNotes").value != "" && document.getElementById("howmanyNotes").value > 0) {
    howmany = document.getElementById("howmanyNotes").value;
  }
  let allCheckBoxes = document.getElementById("notesList").getElementsByTagName("input");
  for (let i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked) {
      choices.push(allCheckBoxes[i].value)
    }
  }
  for (let i = 0; i < howmany; i++) {
    result.push(choices[Math.floor(Math.random() * choices.length)])
  }
  document.getElementById("notesResult").innerHTML = result;
}

function randomChords() {
  let types = [];
  let choices = [];
  let result = [];
  let howmany = 4;
  if (document.getElementById("howmanyChords").value != "" && document.getElementById("howmanyChords").value > 0) {
    howmany = document.getElementById("howmanyChords").value;
  }
  let allCheckBoxes = document.getElementById("chordList").getElementsByTagName("input");
  for (let i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked) {
      types.push(allCheckBoxes[i].value)
    }
  }

  // 所有和弦名單
  let major = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  let minor = ["Cm", "C#m", "Dm", "Ebm", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "Bbm", "Bm"];
  let augmented = ["C+", "Db+", "D+", "Eb+", "E+", "F+", "Gb+", "G+", "Ab+", "A+", "Bb+", "B+"];
  let diminished = ["Cdim", "C#dim", "Ddim", "D#dim", "Edim", "Fdim", "F#dim", "Gdim", "G#dim", "Adim", "A#dim", "Bdim"];
  let sus2 = ["Csus2", "Dbsus2", "Dsus2", "Ebsus2", "Esus2", "Fsus2", "F#sus2", "Gsus2", "Absus2", "Asus2", "Bbsus2", "Bsus2"];
  let maj7 = ["Cmaj7", "Dbmaj7", "Dmaj7", "Ebmaj7", "Emaj7", "Fmaj7", "Gbmaj7", "Gmaj7", "Abmaj7", "Amaj7", "Bbmaj7", "Bmaj7"];
  let m7 = ["Cm7", "C#m7", "Dm7", "Ebm7", "Em7", "Fm7", "F#m7", "Gm7", "G#m7", "Am7", "Bbm7", "Bm7"];
  let dom7 = ["C7", "Db7", "D7", "Eb7", "E7", "F7", "F#7", "G7", "Ab7", "A7", "Bb7", "B7"];
  let dom7sus = ["C7sus", "C#7sus", "D7sus", "Eb7sus", "E7sus", "F7sus", "F#7sus", "G7sus", "Ab7sus", "A7sus", "Bb7sus", "B7sus"];
  let m7b5 = ["Cm7(b5)", "C#m7(b5)", "Dm7(b5)", "D#m7(b5)", "Em7(b5)", "Fm7(b5)", "F#m7(b5)", "Gm7(b5)", "G#m7(b5)", "Am7(b5)", "A#m7(b5)", "Bm7(b5)"];
  let dim7 = ["Cdim7", "C#dim7", "Ddim7", "D#dim7", "Edim7", "Fdim7", "F#dim7", "Gdim7", "G#dim7", "Adim7", "A#dim7", "Bdim7"];

  // 把選擇的和弦放入候選名單
  if (types.includes("major")) {
    choices = choices.concat(major);
  }
  if (types.includes("minor")) {
    choices = choices.concat(minor);
  }
  if (types.includes("augmented")) {
    choices = choices.concat(augmented);
  }
  if (types.includes("diminished")) {
    choices = choices.concat(diminished);
  }
  if (types.includes("sus2")) {
    choices = choices.concat(sus2);
  }
  if (types.includes("maj7")) {
    choices = choices.concat(maj7);
  }
  if (types.includes("m7")) {
    choices = choices.concat(m7);
  }
  if (types.includes("7")) {
    choices = choices.concat(dom7);
  }
  if (types.includes("7sus")) {
    choices = choices.concat(dom7sus);
  }
  if (types.includes("m7(b5)")) {
    choices = choices.concat(m7b5);
  }
  if (types.includes("dim7")) {
    choices = choices.concat(dim7);
  }
  //

  for (let i = 0; i < howmany; i++) {
    result.push(choices[Math.floor(Math.random() * choices.length)])
  }
  document.getElementById("chordsResult").innerHTML = result;
}

function randomKeys() {
  let keys = [
    "C 大調 / A 小調 （沒有升降記號）",
    "G 大調 / E 小調 （1 個升記號）",
    "D 大調 / B 小調 （2 個升記號）",
    "A 大調 / F# 小調 （3 個升記號）",
    "E 大調 / C# 小調 （4 個升記號）",
    "B 大調 / G# 小調 （5 個升記號）",
    "F# 大調 / D# 小調 （6 個升記號）",
    "C# 大調 / A# 小調 （7 個升記號）",
    "F 大調 / D 小調 （1 個降記號）",
    "Bb 大調 / G 小調 （2 個降記號）",
    "Eb 大調 / C 小調 （3 個降記號）",
    "Ab 大調 / F 小調 （4 個降記號）",
    "Db 大調 / Bb 小調 （5 個降記號）",
    "Gb 大調 / Eb 小調 （6 個降記號）",
    "Cb 大調 / Ab 小調 （7 個降記號）",
  ];
  document.getElementById("keysResult").innerHTML = "🎼 " + keys[Math.floor(Math.random() * keys.length)];

}

function randomMeter() {
  let meters = [
    "2/4", "3/4", "4/4", "5/4", "6/4", "7/4", "3/8", "5/8", "6/8", "7/8", "9/8", "11/8", "12/8", "13/8", "15/8", "2/2", "3/2"
  ];
  document.getElementById("meterResult").innerHTML = "⏱ " + meters[Math.floor(Math.random() * meters.length)];

}


function randomMode() {
  let modes = [
    "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"
  ];
  document.getElementById("modeResult").innerHTML = "🎹 " + modes[Math.floor(Math.random() * modes.length)];
}

function randomTempo() {
  document.getElementById("tempoResult").innerHTML = "🎲 " + Math.floor((Math.random() * 210) + 30) + " BPM";
}

function randomTitle() {
  let result = around[Math.floor(Math.random() * around.length)];
  result = result.replace(/ooo/g, noun[Math.floor(Math.random() * noun.length)]);
  result = result.replace(/xxx/g, noun[Math.floor(Math.random() * noun.length)]);
  document.getElementById("titleResult").innerHTML = "🤔 " + result;
}

function randomIdea() {

  document.getElementById("ideaResult").innerHTML = "💡 " + tips[Math.floor(Math.random() * tips.length)]
}
