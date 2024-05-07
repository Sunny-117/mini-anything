export const isObject = (obj: any): boolean => {
    return obj !== null && typeof obj === 'object'
}

export function hasChanged(oldValue, newValue) {
    return !Object.is(oldValue, newValue)
}