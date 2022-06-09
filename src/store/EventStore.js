import { defineStore } from 'pinia'
import axios from "axios";

export const useEventStore = defineStore('EventStore', {
  state: () => {
    return { events: [] }
  },
  actions: {
    async fetchEvents() {
      const response = await axios.get('http://localhost:3001/events');
      this.events = response.data;
    },
    async storeEvent(data) {
      try {
        await axios.post('http://localhost:3001/events', data)
      } catch (error) {
        throw error
      }
    },
    async updateEvent(event, data) {
      try {
        await axios.put(`http://localhost:3001/events/${event.id}`, data)
      } catch (error) {
        throw error
      }
    },
    async deleteEvent(event) {
      try {
        await axios.delete(`http://localhost:3001/events/${event.id}`)
      } catch (error) {
        throw error
      }
    }
  },
})