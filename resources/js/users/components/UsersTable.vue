<template>
    <div v-for="(user, index) in userStore.filteredUsers" :key="user.id" class="bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
        <div class="flex items-center space-x-4 p-4 w-full">
            <div class="flex-auto">
                <div class="text-xl font-semibold">{{ user.first_name }} {{ user.last_name }}</div>
                <div class="text-sm font-light mt-0.5 top-0 right-0 flex items-center dark:text-slate-100">
                    <svg class="h-4 w-4 text-black-500" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"/>
                    </svg>
                    <span class="px-1">{{ user.phone }}</span>
                </div>
            </div>
        </div>
        <div class="flex">
            <edit-user-button @edit="userStore.editUser(index)"></edit-user-button>
            <delete-user-button @delete="deleteUser(index)"></delete-user-button>
        </div>
    </div>
    <user-dialog></user-dialog>
</template>

<script setup>
    import { useUserStore} from "../stores/userStore.js";
    import DeleteUserButton from './DeleteUserButton.vue';
    import EditUserButton from './EditUserButton.vue';
    import UserDialog from './UserDialog.vue';

    const userStore = useUserStore();

    const fetchUsers = async () => {
        await userStore.fetch()
    }

    const deleteUser= (userIndex) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            userStore.deleteUser(userIndex)
        }
    }

    fetchUsers();
</script>
