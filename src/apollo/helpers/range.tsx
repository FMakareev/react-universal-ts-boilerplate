/** генерирует массив заданной длинны */

export const range = (len: number): number[] => {
  const arr: number[] = [];
  for (let i: number = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

export default range;
