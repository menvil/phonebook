import {createApp} from "vue/dist/vue.esm-bundler";
import UsersTable from "./components/UsersTable.vue";
import QuickSearch  from "./components/QuickSearch.vue";
import {createPinia} from "pinia";

const pinia = createPinia();

createApp({
    components: {
        UsersTable,
        QuickSearch
    }
}).use(pinia).mount('#app');
