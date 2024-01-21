<template>
    <TransitionRoot appear :show="userStore.isDialogOpen" :initial-focus="inputFocus" as="template">
        <Dialog as="div" class="relative z-10">
            <TransitionChild
                as="fragment"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div ref="inputFocus" class="fixed inset-0 bg-black bg-opacity-85" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">

                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                {{ userStore.formData.id ? 'Edit Contact' : 'New Contact' }}
                            </DialogTitle>
                            <div className="absolute top-1 right-1">
                                <button @click="userStore.closeDialog" type="button" class="bg-white rounded-md py-4 px-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:text-black-500 ">
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mt-2">
                                <div>
                                    <label for="first_name" class="block text-sm font-medium text-gray-700" >First Name</label>
                                    <input type="text" v-model="userStore.formData.first_name" name="first_name" class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm">
                                    <span v-if="userStore.validationErrors.hasOwnProperty('first_name')" class="text-sm text-red-600">
                                        {{ userStore.validationErrors.first_name[0] }}
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" v-model="userStore.formData.last_name" name="last_name" class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm">
                                    <span v-if="userStore.validationErrors.hasOwnProperty('last_name')" class="text-sm text-red-600">
                                        {{ userStore.validationErrors.last_name[0] }}
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                                    <input type="text" v-model="userStore.formData.phone" name="phone" class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm">
                                    <span v-if="userStore.validationErrors.hasOwnProperty('phone')" class="text-sm text-red-600">
                                        {{ userStore.validationErrors.phone[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="mt-4">
                                <button :disabled="loading" @click="storeUser" type="button" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                    <span v-if="!loading" class="ml-1 mr-1">Save</span>
                                    <span v-else-if="loading" class="ml-1 mr-1">Saving...</span>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle
} from '@headlessui/vue'

import { useUserStore } from "../stores/userStore.js";
import { ref } from 'vue';

const loading = ref(false)
const inputFocus = ref(null)
const userStore = useUserStore()

const storeUser = async () => {
    loading.value = true
    if (userStore.formData.id) {
        await userStore.updateUser()
    } else {
        await userStore.storeUser()
    }
    loading.value = false
}
</script>
