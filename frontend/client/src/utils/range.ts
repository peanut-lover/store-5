/**
 *
 * @param start range 시작 인덱스
 * @param end range 끝 인덱스
 * @param step range step
 * @returns
 */
export const range = function (start: number, end: number, step: number = 1) {
  let arr = [];
  let len = 0;

  step = step === undefined ? 1 : step;

  if (arguments.length === 1) {
    len = start;
    start = 0;
    end = start;
  } else {
    start = start === undefined ? 1 : start;
    end = end === undefined ? 1 : end;
    len = end - start;
  }

  let i = 0;
  while (i < len) {
    arr.push(start + i * step);
    i += 1;
  }

  return arr;
};
