import Option from "../menu/column/models/option/Option"

interface IUIModel {
    readonly key: (string | number)
    readonly name: string
    readonly description: string
    options?: Option[]
    readonly node: HTMLElement
}

export default IUIModel