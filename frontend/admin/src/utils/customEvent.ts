export function trigger(type: string, data?: object): void {
  document.dispatchEvent(
    new CustomEvent(type, {
      detail: data,
    })
  );
}
export function listen(type: string, listener: EventListenerOrEventListenerObject): void {
  document.addEventListener(type, listener);
}
