<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-full bg-black/80">
        <div class="relative left-0 right-0 max-w-xl p-4 mx-auto overflow-hidden ">
            <!-- modal close button -->
            <div class="absolute top-0 right-0 inline-flex items-center justify-center w-10 h-10 text-gray-500 bg-white rounded-full shadow cursor-pointer hover:text-gray-800"
                @click="$emit('closeModal')">
                <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                </svg>
            </div>
            <!-- event form -->
            <form @submit.prevent="saveEvent">
                <div class="block w-full p-8 overflow-hidden bg-white rounded-lg shadow">
                    <h2 class="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">Add Event Details</h2>
                    <div class="mb-4">
                        <label class="block mb-1 text-sm font-bold tracking-wide text-gray-800">Title</label>
                        <input
                            class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                            type="text" v-model="event.title" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-1 text-sm font-bold tracking-wide text-gray-800">Start date</label>
                        <input
                            class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                            type="date" v-model="event.start_date" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-1 text-sm font-bold tracking-wide text-gray-800">End date</label>
                        <input
                            class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                            type="date" v-model="event.end_date" required>
                    </div>
                    <div class="mb-4">
                        <label class="block mb-1 text-sm font-bold tracking-wide text-gray-800">Event
                            description</label>
                        <textarea class="border border-gray-500" v-model="event.description" rows="4" cols="50"
                            maxlength="200" required>
                            </textarea>
                    </div>

                    <!-- form buttons -->
                    <div class="mt-8 text-right">
                        <button type="button"
                            class="px-4 py-2 mr-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
                            @click="$emit('closeModal')">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 font-semibold text-white bg-gray-800 border border-gray-700 rounded-lg shadow-sm hover:bg-gray-700">
                            Save Event
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["saveEvent", 'closeModal']);
const props = defineProps({
    event: Object,
})

// save event
function saveEvent() {
    emit('saveEvent', props.event);
}

</script>

