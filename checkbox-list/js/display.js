(function() {

const display = document.createElement(`div`),
      consoleFormEl = document.createElement(`form`),
      listEl = document.createElement(`ul`);

display.style.cssText = `
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px 15px;
  width: 100%;
  min-width: 40px;
  min-height: 40px;
  background-color: #fff;
  border: 1px solid #333;
  box-shadow: 1px 1px 2px #222;
`;

consoleFormEl.hidden = true;
consoleFormEl.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 100px;
  transform: translate(40px, -100%);
`;

consoleFormEl.innerHTML = `<label>print code:
  <input style="height: 40px" name="code">
  </label>`;

display.append(consoleFormEl);
display.append(listEl);

function onClearDisplayClick() {
  if(!this.innerHTML) return;
  this.innerHTML = ``;
}

window.Display = class {
  constructor(logEnable) {
    this.logEnable = logEnable;
    this.display = display;
    this.console = consoleFormEl;
    this.onShowConsoleDisplayClick = this.onShowConsoleDisplayClick.bind(this);
    this.onEvalFormSubmit = this.onEvalFormSubmit.bind(this);
    this.display.addEventListener(`click`, this.onShowConsoleDisplayClick);
    this.console.addEventListener(`submit`, this.onEvalFormSubmit);
    document.body.append(display);
  }
  
  show(value) {
    display.querySelector(`ul`).innerHTML += `<li>${value}</li>`;
  }
  
  onShowConsoleDisplayClick() {
    if(event.target.closest(`form`)) return;
    this.console.hidden = !this.console.hidden;
  }
  
  onEvalFormSubmit(event) {
    event.preventDefault();
    const code = event.target.elements.code.value;
    if(code === `cls`) {
      this.display.querySelector(`ul`).innerHTML = ``;
      event.target.reset();
      return;
    }
    if(this.logEnable) {
      this.show(code);
      this.show(eval(code));
    } else {
      eval(code);
    }
    event.target.reset();
  }
}

})();