let minutes = 0;
let seconds = 60;

class Mainboard {
  constructor() {
    this.setMinutesBtn = document.getElementById("set-minutes");
    this.resetBtn = document.getElementById("reset");
    this.resetBtn.addEventListener("click", this.resetCounting.bind(this));
    this.startBtn = document.getElementById("start");
    this.stopBtn = document.getElementById("stop");
    this.stopBtn.addEventListener("click", this.stopCounting.bind(this));
    this.visibleInput = document.getElementById("invisible");
    this.setMinutesBtn.addEventListener("click", this.showInput.bind(this));
    this.usrInput = document.getElementById("usrInput");
    this.submitInput = document.getElementById("formInput");
    this.submitInput.addEventListener(
      "submit",
      this.minutesOnSubmit.bind(this)
    );
    this.usrChoose = document.getElementById("stoper");
    this.buttonsDisableHandler(true);
    this.startBtn.addEventListener("click", this.startStoper.bind(this));
    this.startCounting;
  }

  showInput() {
    this.visibleInput.id = "visible";
  }

  buttonsDisableHandler(bool) {
    this.resetBtn.disabled = bool;
    this.startBtn.disabled = bool;
    this.stopBtn.disabled = bool;
    this.setMinutesBtn.disabled = !bool;
  }

  minutesOnSubmit(event) {
    event.preventDefault();
    this.usrChoose.textContent = `${this.usrInput.value}:00`;
    this.visibleInput.id = "invisible";
    minutes = this.usrInput.value;
    this.buttonsDisableHandler(false);
  }

  startStoper() {
    this.startCounting = new Timer();
    this.startCounting.startCounting();
    document.getElementById("start").disabled = "true";
  }

  stopCounting() {
    this.startCounting.stopCounting();
    document.getElementById("start").disabled = false;
  }

  resetCounting() {
    this.usrChoose.textContent = `0:00`;
    this.startCounting.stopCounting();
    this.buttonsDisableHandler(true);
  }
}

class Timer {
  constructor() {
    this.usrChoose = document.getElementById("stoper");
    this.secondsCounter = setInterval(this.startCounting.bind(this), 1000);
  }

  startCounting() {
    seconds -= 1;
    this.usrChoose.textContent = `${minutes - 1}:${
      seconds < 10 ? "0" + Math.abs(seconds) : Math.abs(seconds)
    }`;

    if (seconds === 0) {
      minutes -= 1;
      seconds = 60;
    }

    if (minutes <= 0) {
      clearInterval(this.secondsCounter);
      const sound = new Audio("./sound.m4a");
      sound.play();
      document.getElementById("reset").disabled = true;
      document.getElementById("start").disabled = true;
      document.getElementById("stop").disabled = true;
      document.getElementById("set-minutes").disabled = false;
      return;
    }
  }

  stopCounting() {
    clearInterval(this.secondsCounter);
    return;
  }
}

const startApi = new Mainboard();
