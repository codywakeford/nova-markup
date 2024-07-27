export function defineInputs(allowedValues) {
    return function (value) {
        if (!allowedValues.includes(value)) {
            console.error(
                `Invalid prop value: '${value}' should be one of [${allowedValues.join(", ")}].`
            )
            return false
        }
        return true
    }
}
