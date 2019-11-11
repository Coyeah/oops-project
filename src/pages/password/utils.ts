const Dictionary = {
  letter: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  char: `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`.split('')
};

interface PswValues {
  letter: number;
  char: number;
  number: number;
}

export const pswMaker = (values: PswValues) => {
  let { letter, char, number } = values;
  console.log('pswMaker', values);
  const length = letter + char + number;
  const result: string[] = [];
  let whileFlag = true;
  while (whileFlag) {
    const seat = Math.floor(Math.random() * length);
    if (letter !== 0) {
      const index = Math.floor(Math.random() * Dictionary.letter.length);
      result.splice(seat, 0, Dictionary.letter[index]);
      letter--;
    } else if (number !== 0) {
      const index = Math.floor(Math.random() * 10) + '';
      result.splice(seat, 0, index);
      number--;
    } else if (char !== 0) {
      const index = Math.floor(Math.random() * Dictionary.char.length);
      result.splice(seat, 0, Dictionary.char[index]);
      char--;
    }
    const total = letter + char + number;
    whileFlag = total !== 0;
  }
  return result.join('');
}