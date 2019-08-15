const listener = function(el,bindings) {
  return function(e){
    if (e.target === el || el.contains(e.target)) {
      return;
    }
    bindings.value(); //close事件
  }
}
export default {
  inserted(el, bindings) {
    document.addEventListener('click', listener(el, bindings))
  },
  unbind() {
    document.removeEventListener('click', listener)
  }
}
