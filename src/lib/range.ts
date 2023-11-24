export const range = (start: number, end: number = start) => {
  const output = [];
  for (let i = start; i < end; i += 1) {
    output.push(i);
  }
  return output;
};
