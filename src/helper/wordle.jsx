export const initializeRowGuess = (str) => {
  let dict = {};
  for (let i = 0; i < str.length; i++) {
    dict[i] = "";
  }
  return dict;
};

export const ROWS = 5;
