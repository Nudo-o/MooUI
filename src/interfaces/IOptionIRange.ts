import IOption from "./IOption"

interface IOptionIRange extends IOption {
    min?: (number | string)
    max?: (number | string)
    value?: (string | number)
    fixValue?: number
    isDisabled?: boolean
}

export default IOptionIRange
