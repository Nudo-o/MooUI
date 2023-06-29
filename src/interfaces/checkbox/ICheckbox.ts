import IUIModel from "../IUIModel"

interface ICheckbox extends IUIModel {
    isActive?: boolean,
    isDisabled?: boolean
}

export default ICheckbox