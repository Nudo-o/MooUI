import columnsTemplate from "../../../configs/templates/columns"
import IUIModel from "../../../interfaces/IUIModel"
import StyleSystem from "../StyleSystem"
import Option from "./option/Option"
import OptionsContainer from "./option/OptionsContainer"

class UIModel extends StyleSystem {
    public key: IUIModel["key"]
    public name: IUIModel["name"]
    public description: IUIModel["description"]
    public options: Map<IUIModel["key"], Option>

    public config: any

    public parent: HTMLElement
    
    public optionsContainer: OptionsContainer

    constructor({ 
        key, 
        name, 
        description, 
        options,
        node
    }: IUIModel) {
        const config: any = columnsTemplate.column

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
        this.optionsContainer.show()
    }

    public hideOptions(): void {
        this.optionsContainer.hide()
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

        if (this.options.size) {
            this.optionsContainer = new OptionsContainer(this.node, this.key)
        }

        this.options.forEach((option) => {
            this.optionsContainer.add(option)
        })

        if (this.options.size) {
            this.optionsContainer.build()
        }
    }
}

export default UIModel
