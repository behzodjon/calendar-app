<template>
    <div>
        <div class="container mx-auto mt-10">
            <div class="w-full bg-white rounded shadow wrapper ">
                <div class="flex justify-between p-2 border-b header">

                    <!-- month names -->
                    <span class="text-lg font-bold">
                        {{ calendar.year }} {{ monthNames[calendar.month] }}
                    </span>

                    <!-- navigation buttons -->
                    <div class="buttons">
                        <button :class="{ 'cursor-not-allowed opacity-25': calendar.month == 0 }"
                            :disabled="calendar.month == 0" @click="prevMonth" class="p-1">
                            Prev
                        </button>
                        <button :class="{ 'cursor-not-allowed opacity-25': calendar.month == 11 }"
                            :disabled="calendar.month == 11" @click="nextMonth" class="p-1">
                            Next
                        </button>
                    </div>
                </div>
                <div class="w-full">

                    <!-- week days -->
                    <div class="grid grid-cols-7 mb-[-40px]">
                        <div v-for="(day, index) in weekDays" :key="index">
                            <div class="px-2 py-2 w-[14.26%]">
                                <div v-text="day"
                                    class="text-sm font-bold tracking-wide text-center text-gray-600 uppercase"></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-wrap border-t border-l">

                            <!-- blank days -->
                            <template v-for="(blankday, index) in calendar.blank_days" :key="index">
                                <div class="px-4 pt-2 text-center border-b border-r w-[14.28%] h-[120px]"></div>
                            </template>

                            <!-- month days -->
                            <template class="flex flex-col" v-for="(date, dateIndex) in calendar.month_days"
                                :key="dateIndex">

                                <div class="relative px-4 pt-2 border-b border-r w-[14.28%] h-[120px]">
                                    <div v-text="date"
                                        class="inline-flex items-center justify-center w-6 h-6 ml-5 leading-none text-center transition duration-100 ease-in-out rounded-full"
                                        :class="{ 'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }">
                                    </div>

                                    <!-- event section -->
                                    <div v-if="events.find(e => checkEventDate(e, date))"
                                        class="mt-1 overflow-y-auto h-[80px]">
                                        <template v-for="event in events.filter(e => checkEventDate(e, date))"
                                            :key="event.id">
                                            <div>
                                                <div
                                                    class="px-2 py-1 mt-1 overflow-hidden bg-yellow-400 border rounded-lg ">
                                                    <p v-text="event.title" class="text-sm leading-tight truncate"></p>
                                                </div>
                                                <div class="flex justify-center gap-2 mt-4">
                                                    <div class="text-green-500 cursor-pointer hover:underline"
                                                        @click="showEventModal(date)">Edit</div>
                                                    <div @click="deleteEvent(event)"
                                                        class="text-red-500 cursor-pointer hover:underline">Delete
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="mt-6" v-else>
                                        <div class="flex justify-center text-sm text-blue-400 cursor-pointer hover:underline"
                                            @click="showEventModal(date)">Add event</div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <!-- modal calendar -->
            <EventModal v-show="openEventModal" @save-event="saveEvent" @close-modal="closeModal" :event="event" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import EventModal from "./EventModal.vue";
import { useEventStore } from '../store/EventStore'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const store = useEventStore()

const calendar = reactive({
    month: '',
    year: '',
    month_days: [],
    blank_days: [],
})

const openEventModal = ref(false)

const event = reactive({
    title: null,
    description: null,
    start_date: null,
    end_date: null,
    date: null,
})


const events = computed(() => store.events)

const updateMode = ref(false)

function isToday(date) {
    return new Date().toDateString() === new Date(calendar.year, calendar.month, date).toDateString();
}

function getMonthDays() {
    let daysInMonth = new Date(calendar.year, calendar.month + 1, 0).getDate();
    let dayOfWeek = new Date(calendar.year, calendar.month).getDay();

    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    }

    calendar.blank_days = blankdaysArray;
    calendar.month_days = daysArray;
}

function nextMonth() {
    calendar.month++
    getMonthDays()
}

function prevMonth() {
    calendar.month--
    getMonthDays()
}

// save event
async function saveEvent(data) {

    if (updateMode.value) {
        await store.updateEvent(event, data)
    } else {
        await store.storeEvent(data)
    }

    initFormEvent()
    updateMode.value = false

    //close the modal
    openEventModal.value = false;
    store.fetchEvents()

}

function showEventModal(date) {
    event.date = new Date(calendar.year, calendar.month, date).toDateString();
    openEventModal.value = true;
    let eventData = events.value.find(e => checkEventDate(e, date))
    if (eventData) {
        updateMode.value = true
        initFormEvent(eventData)
    }
}

function checkEventDate(data, date) {
    return new Date(data.date).toDateString() === new Date(calendar.year, calendar.month, date).toDateString()
}

function closeModal() {
    initFormEvent()
    updateMode.value = false
    openEventModal.value = false;
}

function initFormEvent(params = {}) {
    event.id = params.id || null
    event.title = params.title || ''
    event.description = params.description || ''
    event.start_date = params.start_date || ''
    event.end_date = params.end_date || ''
}

async function deleteEvent(event) {
    if (confirm("Are you sure to delete this event?")) {
        await store.deleteEvent(event)
    }
    store.fetchEvents()
}

onMounted(() => {
    let today = new Date();
    calendar.month = today.getMonth();
    calendar.year = today.getFullYear();
    getMonthDays()

    // fetch events
    store.fetchEvents();
})
</script>

