export function debounce(fn: () => void, ms: number) {
  // @ts-ignore
  let timer;
  return () => {
    // @ts-ignore
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      // @ts-ignore
      fn.apply(this, arguments);
    }, ms);
  };
}
