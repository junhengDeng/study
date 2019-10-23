const listener = function(el, bingings) {
  return function(e) {
    if (el === e.target || el.contains(e.target)) return;
    bingings.value();
  };
};

export default {
  inserted(el, bingings) {
    document.addEventListener("click", listener(el, bingings));
  },
  unbind() {
    document.removeEventListener("click", listener);
  }
}
