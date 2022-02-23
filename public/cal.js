function getData() {
  const length = getProgramLength(N1, N2);
  const vocublary = getVocubluary(n1, n2);
  const volume = getVolume(length, vocublary);
  const difficulty = getDifficulty(n1, N2, n2);
  const level = getLevel(difficulty);
  const effort = getEffort(volume, difficulty);
  const time = getTime(effort);
  const error = getBug(effort);
  const intellegence = getIntellegence(volume, difficulty);
  const estimatedN = getestimatedN(n1, n2);
}
function getIntellegence(volume, difficulty) {
  return volume / difficulty;
}
function getestimatedN(n1, n2) {
  return n1 * Math.log2(n1) + n2 * Math.log2(n2);
}
function getProgramLength(N1, N2) {
  N1 = parseInt(N1.value);
  N2 = parseInt(N2.value);
  return N1 + N2;
}
function getVocubluary(n1, n2) {
  n1 = parseInt(n1.value);
  n2 = parseInt(n2.value);
  return n1 + n2;
}
function getVolume(length, vocublary) {
  return length * Math.log2(vocublary);
}
function getDifficulty(n1, N2, n2) {
  n1 = parseInt(n1.value);
  n2 = parseInt(n2.value);
  N2 = parseInt(N2.value);
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
