import { forEachValueKey } from "./utils";
import { computed } from 'vue'

export function createMutations(store, mutations) {
    forEachValueKey(mutations, function (mutationFn, mutationKey) {
        store._mutations[mutationKey] = (payload) => {
            mutationFn.apply(store, [store.state, payload])
        }
    })
}


export function createActions(store, actions) {
    forEachValueKey(actions, (actionFn, actionKey) => {
        store._actions[actionKey] = (payload) => {
            actionFn.apply(store, [store, payload])
        }
    })
}
export function createGetters(store, getters) {
    store.getters = {}
    forEachValueKey(getters, function (getterFn, getterKey) {
        Object.defineProperty(store.getters, getterKey, {
            get: () => computed(() => getterFn(store.state, store.getters)).value
        })
    })
}
export function createCommitFn(store, commit) {
    store.commit = function (type, payload) {
        commit.apply(store, [type, payload])
    }
}

export function createDispatchFn(store, dispatch) {
    store.dispatch = function (type, payload) {
        dispatch.apply(store, [type, payload])
    }
}