// B11 · ES6+: Debounce & Throttle   2 min · 2 marks
// ●	Write debounce(fn, delay) and throttle(fn, limit) (ES module exports).

export function debounce(fn, delay) {
    let timer;
    
    return function (...args) {
        clearTimeout(timer);
        
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export function throttle(fn, limit) {
  let waiting = false;

  return function (...args) {
    if (!waiting) {
      fn(...args);

      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}
// ●	One line each: which would you use for a search box, and which for window scroll?
// search- debounce
// window Scroll:- throttle

