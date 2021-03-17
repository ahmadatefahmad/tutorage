import Vue from 'vue'

export default Vue.directive('hoverEffect', {
  bind(el, binding, vnode) {
    if(binding.value != ''){
      const { value = "" } = binding;
      el.addEventListener('mouseenter', () => {
        el.classList.add(...value.split(' '))
      });
      el.addEventListener('mouseleave', () => {
        el.classList.remove(...value.split(' '))
      })
    }
  }
})