
class Debounce {
  constructor() {
    this.timer;
  }
  setTimer(func, timeout = 300) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      func();
    }, timeout);
  }
}

export default Debounce;
