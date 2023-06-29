interface IOption {
    readonly key: (string | number)
    readonly name: string
    readonly description: string
    readonly node: HTMLElement
}

export default IOption