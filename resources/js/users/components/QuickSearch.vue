<template>
    <div class="group relative flex justify-between ">
        <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input type="search" v-model="query" class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-4/6 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" aria-label="Filter contacts" placeholder="Filter contacts...">
        <create-user-button @create="userStore.openDialog"></create-user-button>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { useUserStore } from "../stores/userStore.js";
    import CreateUserButton from "./CreateUserButton.vue";

    const query = ref('')
    const userStore = useUserStore();

    watch(query, (newValue, oldValue) => {
        if(newValue !== oldValue) {
            userStore.filter(query.value)
        }
    });
</script>
