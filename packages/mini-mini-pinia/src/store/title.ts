import { defineStore } from "@/pinia"

export default defineStore('title', {
    state: () => ({ title: '付志强', color: 'green' }),
    actions: {
        setTitle(title: string, color: string) {
            this.color = color
            setTimeout(() => {
                this.title = title
            }, 1000);
        }
    }
})