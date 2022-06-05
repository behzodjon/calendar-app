import { defineStore } from 'pinia'
import axios from "axios";

export const useEventStore = defineStore('EventStore', {
  state: () => {
    return { events: [] }
  },
  actions: {
    async fetchEvents() {
      try {
        const res = await axios.get('http://localhost:3001/events');
        this.events = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    async storeEvent(data) {
      try {
        await axios.post('http://localhost:3001/events', data)
      } catch (e) {
        console.error(e);
      }
    },
    async updateEvent(event,data) {
      try {
        await axios.put(`http://localhost:3001/events/${event.id}`, data)
      } catch (e) {
        console.error(e);
      }
    },
    async deleteEvent(event) {
      try {
        await axios.delete(`http://localhost:3001/events/${event.id}`)
      } catch (e) {
        console.error(e);
      }
    }
  },
})