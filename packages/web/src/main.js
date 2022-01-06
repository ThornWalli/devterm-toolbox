
import Vue from 'vue';
import App from '@devterm-toolbox/frontend/components/App.vue';

// plugins
import '@devterm-toolbox/frontend/plugins/error';
import '@devterm-toolbox/frontend/plugins/config';
// import '@devterm-toolbox/frontend/plugins/server';
import '@devterm-toolbox/frontend/plugins/client';

Vue.component('App', App);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
