const logo = (text) => `<section class="logo" title="${text}"><h1>${text}</h1></section>`;

const mainTitle = (text) => `<h2 class="title main-title">${text}</h2>`;

const title = (text) => `<h2 class="title">${text}</h2>`;

const timer = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins"></span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs"></span>
  </div>
</svg>`;

export {logo, mainTitle, title, timer};
