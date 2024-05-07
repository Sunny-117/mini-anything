import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

export function ref(value) {
    return {
        get value() {
            track(this, TrackOpTypes.Get, 'value')
            return value;
        },
        set value(newValue) {
            if (newValue !== value) {
                value = newValue;
                trigger(this, TriggerOpTypes.SET, 'value')
            }
        }
    }
}