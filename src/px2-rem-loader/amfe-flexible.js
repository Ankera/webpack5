const docEl = document.documentElement;

function setRemUnit() {
  const rem = docEl.clientWidth / 10;
  docEl.style.fontSize = rem + "px";
}

setRemUnit();

window.addEventListener("resize", setRemUnit);

/**
 * 10  750
 * 1rem = 37.5px
 */

const dpr = window.devicePixelRatio || 1;
function setBodyFontSize() {
  if (document.body) {
    document.body.style.fontSize = (12 * dpr) + "px";
  } else {
    document.addEventListener("DOMContentLoaded", setBodyFontSize);
  }
}

setBodyFontSize();

