
class Throttle {
  constructor() {
    this.timer;
  }
  setTimer(func, timeout = 300) {
    if (!(this.timer)) {
      this.timer = setTimeout(() => {
        func();
        this.timer = undefined;
      }, timeout);
    }
  }
}

export default Throttle;