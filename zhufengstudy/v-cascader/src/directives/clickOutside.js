const listener = function(el, bindings) {
  return function(e) {
    if (el === e.target || el.contains(e.target)) {
      return;
    }
    bindings.value();
  };
};

export default {
  inserted(el, bindings) {
    document.addEventListener("click", listener(el, bindings));
  },
  unbind() {
    document.removeEventListener("click", listener);
  }
}