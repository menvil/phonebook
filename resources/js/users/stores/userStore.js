import axios from "axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useUserStore = defineStore('user-store', () => {
    const users = ref([]);
    const isDialogOpen = ref(false)
    const filteredUsers = ref([]);
    const validationErrors = ref({})
    const searchQuery = ref('');

    const formData = reactive({
        id: '',
        first_name: '',
        last_name: '',
        phone: ''
    })

    const fetch = async () => {
        try {
            let response = await axios.get('/api/users');
            users.value = response.data.data;
            filteredUsers.value = users.value;
        } catch (error) {
            console.log(error);
        }
    }

    const filter = (query) =>{
        searchQuery.value = query
        if(query === ''){
            filteredUsers.value = users.value
            return
        }
        filteredUsers.value = users.value.filter(user => user.last_name.toLowerCase().includes(query.toLowerCase()))
    }

    const openDialog = () => {
        isDialogOpen.value = true
        validationErrors.value = {}
    }

    const closeDialog = () => {
        isDialogOpen.value = false
        Object.keys(formData).forEach(function(key) { formData[key] = ''; })
    }

    const storeUser = async () => {
        try {
            let response = await axios.post('/api/users', formData)
            users.value = response.data.data
            filter(searchQuery.value)
            validationErrors.value = {}
            //Object.keys(formData).forEach(function(key) { formData[key] = ''; })
            closeDialog()
        } catch (error) {
            if (error.response.status == 422) {
                validationErrors.value = error.response.data.errors
            }
        }
    }

    const createUser = (userIndex) => {
        Object.keys(formData).forEach(function(key) { formData[key] = ''; })
        openDialog()
    }

    const editUser = (userIndex) => {
        const user = filteredUsers.value[userIndex];
        Object.keys(user).forEach(function(key) { formData[key] = user[key]; })
        openDialog()
    }

    const updateUser = async () => {
        try {
            let response = await axios.put(`/api/users/${formData.id}`, formData)
            users.value = response.data.data
            filter(searchQuery.value)
            validationErrors.value = {}
            //Object.keys(formData).forEach(function(key) { formData[key] = ''; })
            closeDialog()
        } catch (error) {
            if (error.response.status == 422) {
                validationErrors.value = error.response.data.errors
            }
        }
    }

    const deleteUser = async (userIndex) => {
        try {
            let response = await axios.delete(`/api/users/${filteredUsers.value[userIndex].id}`)
            users.value = response.data.data
            filter(searchQuery.value)
            closeDialog()
        } catch (error) {
            console.log(error);
        }
    }

    return {
        users,
        fetch,
        filter,
        filteredUsers,
        isDialogOpen,
        validationErrors,
        formData,
        storeUser,
        deleteUser,
        updateUser,
        editUser,
        closeDialog,
        openDialog
    }
});

export class useUsersStore {
}
