import { produce } from 'immer';
const immer = (initializer) => (set, get, store) => {
    store.setState = (updater) => {
        const nextState = produce(updater);
        return set(nextState);
    };
    return initializer(store.setState, get, store);
};
export { immer };