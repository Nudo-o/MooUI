interface IToggleKey {
    keyCode?: number
    code?: string
    key?: string
}

interface ICreateMenu {
    toggleKey: IToggleKey
    appendNode: (Node | HTMLElement)
}

export default ICreateMenu