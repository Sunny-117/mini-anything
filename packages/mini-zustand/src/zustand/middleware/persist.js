export function createJSONStorage(storage) {
    const persistStorage = {
        getItem: name => {
            const str = storage.getItem(name);
            return str ? JSON.parse(str) : {};
        },
        setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue)),
    };
    return persistStorage;
}

export const persist = (createState, { name, storage }) => {
    return (set, get, api) => {
        const result = createState((...args) => {
            set(...args);
            storage.setItem(name, get())
        }, get, api);
        queueMicrotask(() => {
            set(storage.getItem(name))
        });
        return result;
    };
};