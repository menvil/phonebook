import { createPinia, setActivePinia } from "pinia"
import { beforeEach, describe, it, expect } from "vitest"
import { useUserStore } from '../../resources/js/users/stores/userStore.js'

describe('Users Store', () => {
    let userStore = null
    let userIndex = 0

    beforeEach(async () => {
        const pinia = createPinia();
        setActivePinia(pinia);
        userStore = useUserStore(pinia);
        await userStore.fetch()
    })

    it('opens the users dialog', () => {
        userStore.openDialog()
        expect(userStore.isDialogOpen).toBe(true)
    })

    it('closes the users dialog', () => {
        userStore.closeDialog()
        expect(userStore.isDialogOpen).toBe(false)
    })

    it('fetches the list of users', async () => {
        expect(userStore.users.length).toBe(1)
    })

    it('opens the edit users dialog with the correct form data', () => {
        userStore.editUser(userIndex)
        expect(userStore.formData.first_name).toBe(userStore.filteredUsers[userIndex].first_name)
        expect(userStore.formData.last_name).toBe(userStore.filteredUsers[userIndex].last_name)
        expect(userStore.formData.phone).toBe(userStore.filteredUsers[userIndex].phone)
    })

    it('clears the form data after creating a user', async () => {
        userStore.formData.first_name = 'User Name'
        userStore.formData.last_name = 'User Last'
        userStore.formData.phone = '123456'

        await userStore.storeUser()

        expect(userStore.users.length).toBe(1)
    })

    it('returns the validation errors when creating a user', async () => {

        userStore.formData.first_name = ''
        userStore.formData.last_name = ''
        userStore.formData.phone = ''

        await userStore.storeUser()
        expect(userStore.validationErrors.first_name.length).toBe(1)
    })

    it('returns the validation errors when updating a user', async () => {
        userStore.editUser(userIndex)
        userStore.formData.first_name = ''
        userStore.formData.last_name = ''
        userStore.formData.phone = ''

        await userStore.updateUser()

        expect(userStore.validationErrors.first_name.length).toBe(1)
    })

    it('clears the form data after deleting a user', async () => {
        await userStore.deleteUser(userIndex)

        expect(userStore.formData.id).toBe('')
    })

})
