let timer: number | null = null;
export const debounce = (callback: Function, time: number) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(callback, time);
};

export const debounceClear = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
