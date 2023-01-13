import { defineStore } from "@/pinia"

export default defineStore('main', {
    state: () => ({ count: 0 }),
    actions: {
        plusAsync(num: number) {
            setTimeout(() => {
                this.count += num
            }, 1000);
        }
    }
})