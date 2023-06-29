import IOption from "../IOption"

interface IOptionCheckbox extends IOption {
    isActive?: boolean,
    isDisabled?: boolean
}

export default IOptionCheckbox