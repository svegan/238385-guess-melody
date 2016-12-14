const Timer = function (elem, duration, callback) {
  this.elem = elem;
  this.minutes = this.elem.querySelector('.timer-value-mins');
  this.seconds = this.elem.querySelector('.timer-value-secs');
  this.minVal = null;
  this.secVall = null;
  this.initDuration = duration;
  this.duration = this.initDuration;
  this.running = false;
  this.callback = callback;
  this.interval = null;
  this.start = this.start.bind(this);
  this._tick = this._tick.bind(this);
  this._setValues = this._setValues.bind(this);
  this.getLeftTime = this.getLeftTime.bind(this);
  this.stop = this.stop.bind(this);
  this.remove = this.remove.bind(this);
};

Timer.prototype = {
  start: function () {
    if (this.running) {
      return;
    }
    this._tick();
    this.running = true;
    this.interval = setInterval(this._tick, 1000);
  },
  _tick: function () {
    this._setValues();
    if (--this.duration < 0) {
      this.stop();
      if (typeof this.callback === 'function') {
        this.callback();
      }
    }
  },
  _setValues: function () {
    let minutes = parseInt(this.duration / 60, 10);
    let seconds = parseInt(this.duration % 60, 10);
    this.minVal = this.minutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    this.secVal = this.seconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
  },
  getLeftTime: function () {
    return this.duration;
  },
  stop: function () {
    if (!this.running) {
      return;
    }
    clearInterval(this.interval);
    this.running = false;
  },
  remove: function () {
    this.elem = null;
    this.minutes = null;
    this.seconds = null;
    this.minVal = null;
    this.secVal = null;
    this.initDuration = null;
    this.duration = null;
    this.running = null;
    this.callback = null;
    this.interval = null;
    this.start = null;
    this._tick = null;
    this._setValues = null;
    this.getLeftTime = null;
    this.stop = null;
    this.remove = null;
  }
};

export default Timer;
