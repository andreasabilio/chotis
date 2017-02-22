"use strict";

import Vue from 'vue/dist/vue.common';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import 'vue-material/dist/vue-material.css';
// import './styles/style.scss';
// import './components';

Vue.use(VueMaterial);
Vue.use(VueRouter);

// Vue.material.registerTheme('default', {
//     primary: 'blue',
//     accent: 'red',
//     warn: 'red',
//     background: 'grey'
// })


var app = new Vue({
    el: '#app',
    data: {
        appName: 'Chotis Media Library'
    },
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        toggleRightSidenav() {
            this.$refs.rightSidenav.toggle();
        },
        closeRightSidenav() {
            this.$refs.rightSidenav.close();
        },
        open(ref) {
            console.log('Opened: ' + ref);
        },
        close(ref) {
            console.log('Closed: ' + ref);
        }
    }
});