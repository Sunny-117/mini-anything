import { inject, reactive } from "vue"

export function createPinia() {
    return {
        install(app: any) {
            const store: any = reactive({})

            app.provide('setSubStore', (storeName: string, subStore: any) => {
                store[storeName] = subStore
                const $patch = (options: any) => {
                    for (const key in options) {
                        store[storeName][key] = options[key]
                    }
                }
                store[storeName].$patch = $patch
            })
            app.provide('piniaStore', store)
        }
    }

}
export function defineStore(storeName: string, options: any) {
    const store: any = reactive({})
    const state = options.state()
    const actions = options.actions
    for (const key in state) {
        store[key] = state[key]
    }
    for (const method in actions) {
        store[method] = actions[method].bind(store)
    }
    return function () {
        const piniaStore: any = inject('piniaStore');
        if (!piniaStore[storeName]) {
            const setSubStore: any = inject('setSubStore')
            setSubStore(storeName, store)
        }
        return piniaStore[storeName]
    }
}