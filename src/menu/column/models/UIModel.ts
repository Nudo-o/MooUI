import columnsTemplate from "../../../configs/templates/columns"
import IUIModel from "../../../interfaces/IUIModel"
import StyleSystem from "../StyleSystem"
import Option from "./option/Option"

class UIModel extends StyleSystem {
    public key: IUIModel["key"]
    public name: IUIModel["name"]
    public description: IUIModel["description"]
    public options: Map<IUIModel["key"], Option>

    public config: any

    public parent: HTMLElement

    constructor({ 
        key, 
        name, 
        description, 
        options,
        node
    }: IUIModel) {
        const config = columnsTemplate.column

        super(node, config.container.colors)
        
        this.key = key
        this.name = name
        this.description = description
        this.options = new Map(
            options.map((option) => [option.key, option])
        )

        this.config = config

        this.parent = null
    }

    public setParent(parentElement: HTMLElement): void {
        this.parent = parentElement
    }

    public showOptions(): void {

    }

    public hideOptions(): void {
        
    }

    public toggleOptions(): void {
        if (!this.node.classList.contains("has-options")) return

        if (this.node.classList.contains("show-options")) {
            this.node.classList.remove("show-options")

            return this.hideOptions()
        }

        this.node.classList.add("show-options")

        this.showOptions()
    }

    public initOptions(): void {
        this._updateStyles("initial", "auto")

        this.options.forEach((option) => {

        })
    }
}

export default UIModel