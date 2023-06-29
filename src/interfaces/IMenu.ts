interface IMenu {
    id: number
    config: any
    toggleKey: Object
    appendNode: (Node | HTMLElement)
}

export default IMenu