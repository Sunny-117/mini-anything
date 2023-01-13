import { useState } from "react";

function useCounter(defaultValue, rangeObj) {
    const [max, min] = [rangeObj.max, rangeObj.min]
    let initialValue: any;
    if (defaultValue < min) {
        initialValue = min;
    } else if (defaultValue > max) {
        initialValue = max;
    } else {
        initialValue = defaultValue;
    }
    const [count, setCount] = useState(initialValue)

    const inc = () => {
        // max min
        if (count + 1 > max) {
            setCount(count)
        } else {
            setCount(count + 1)
        }
    }
    const dec = () => {
        // max min
        setCount(count - 1)
    }
    const set = (value: any) => {
        // max min
        if (value > max) {
            setCount(max)
        } else if (value < min) {
            setCount(min)
        } else {
            setCount(value)
        }
    }
    const reset = () => {
        setCount(initialValue)
    }
    return [
        count,
        {
            inc,
            dec,
            set,
            reset
        }
    ]
}
export default useCounter