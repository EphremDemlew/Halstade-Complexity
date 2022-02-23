const express = require("express");

var chainLexer = require("chain-lexer");
const { set } = require("express/lib/application");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
});

app.post("/calculate", (req, res) => {
  const data = req.body.cf;

  let lexer = chainLexer.cLexer;
  lexer.start(data);
  let parsedTokens = lexer.DFA.result.tokens;

  let n1 = 0;
  let n2 = 0;
  let N1 = 0;
  let N2 = 0;

  const uniqueValuesSet = new Set();
  const filteredArr = parsedTokens.filter((obj) => {
    const isPresentInSet = uniqueValuesSet.has(obj.value);
    uniqueValuesSet.add(obj.value);
    return !isPresentInSet;
  });

  filteredArr.forEach((element) => {
    if (
      element.type == "Keyword" ||
      element.type == "DoubleOperator" ||
      element.type == "Symbol" ||
      element.type == "Operator"
    ) {
      if (
        element.value == "(" ||
        element.value == "[" ||
        element.value == "{"
      ) {
        n1 = n1;
      } else if (
        element.value == "++" ||
        element.value == "--" ||
        element.value == "<=" ||
        element.value == ">=" ||
        element.value == "==" ||
        element.value == "===" ||
        element.value == "!=" ||
        element.value == "!=="
      ) {
        n1++;
      } else {
        n1++;
      }
    } else if (
      element.type == "WhiteSpace" ||
      element.type == "LineFeed" ||
      element.type == "Unknown" ||
      element.value == "\r"
    ) {
    } else {
      n2++;
      console.log(element);
    }
  });

  parsedTokens.forEach((element) => {
    if (
      element.type == "Keyword" ||
      element.type == "Symbol" ||
      element.type == "DoubleOperator" ||
      element.type == "Operator"
    ) {
      if (
        element.value == "(" ||
        element.value == "[" ||
        element.value == "{"
      ) {
        N1 = N1;
      } else if (
        element.value == "++" ||
        element.value == "--" ||
        element.value == "<=" ||
        element.value == ">=" ||
        element.value == "==" ||
        element.value == "===" ||
        element.value == "!=" ||
        element.value == "!=="
      ) {
        n1++;
      } else {
        N1++;
      }
    } else if (
      element.type == "Whitespace" ||
      element.type == "LineFeed" ||
      element.type == "Unknown" ||
      element.value == "\r"
    ) {
    } else {
      N2++;
    }
  });

  function getIntellegence(volume, difficulty) {
    return volume / difficulty;
  }
  function getestimatedN(n1, n2) {
    return n1 * Math.log2(n1) + n2 * Math.log2(n2);
  }
  function getProgramLength(N1, N2) {
    return N1 + N2;
  }
  function getVocubluary(n1, n2) {
    return n1 + n2;
  }
  function getVolume(length, vocublary) {
    return length * Math.log2(vocublary);
  }
  function getDifficulty(n1, N2, n2) {
    return (n1 / 2) * (N2 / n2);
  }
  function getLevel(difficulty) {
    return 1 / difficulty;
  }
  function getEffort(volume, difficulty) {
    return volume * difficulty;
  }
  function getTime(effort) {
    return effort / 18;
  }
  function getBug(effort) {
    return Math.pow(effort, 2 / 3) / 3000;
  }

  const length = getProgramLength(N1, N2);
  const vocublary = getVocubluary(n1, n2);
  const volume = getVolume(length, vocublary).toFixed(2);
  const difficulty = getDifficulty(n1, N2, n2).toFixed(2);
  const level = getLevel(difficulty).toFixed(2);
  const effort = getEffort(volume, difficulty).toFixed(2);
  const time = getTime(effort).toFixed(2);
  const error = getBug(effort).toFixed(2);
  const intellegence = getIntellegence(volume, difficulty).toFixed(2);
  const estimatedN = getestimatedN(n1, n2).toFixed(2);

  console.log("n1: " + n1);
  console.log("n2: " + n2);
  console.log("N1: " + N1);
  console.log("N2: " + N2);

  res.render("main", {
    data: data,
    n1: n1,
    n2: n2,
    N1: N1,
    N2: N2,
    length: length,
    vocublary: vocublary,
    volume: volume,
    intellegence: intellegence,
    effort: effort,
    error: error,
    time: time,
    level: level,
    difficulty: difficulty,
    estimatedN: estimatedN,
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000 ......");
});
