import columnsTemplate from "../../../../configs/templates/columns"
import StyleSystem from "../../StyleSystem"

class OptionsContainer extends StyleSystem {
    readonly parent: HTMLElement
    readonly parentKey: (string | number)

    public element: any

    private config: any

    public models: Map<(string | number), any>

    constructor(parent: HTMLElement, parentKey: (string | number)) {
        const element: HTMLElement = document.createElement("container")
        const config: any = columnsTemplate.column

        super(element, config.container.colors)

        this.parent = parent
        this.parentKey = parentKey

        this.element = element

        this.config = config

        this.models = new Map()
    }

    public get isVisible(): boolean {
        return this.element.style.display === this.config.optionsContainer.showDisplay
    } 

    public get visibleStatus(): string {
        return this.isVisible ? "show" : "hide"
    }

    public show(): void {
        this.element.style.display = this.config.container.showDisplay
    }

    public hide(): void {
        this.element.style.display = "none"
    }

    public toggle(): void {
        if (this.isVisible) return this.hide()

        this.show()
    }

    public add(option: any): any {
        return this.models.set(option.key, option).get(option.key)
    }

    public updateStyles(): void {
        this._updateStyles("100%", "auto")

        this.models.forEach((model) => {
            model.bgColor = this.bgColor
            model.textColor = this.textColor

            model._updateStyles("intial", "auto")
        })
    }

    public build(): void {
        this.element.classList.add("options-container", "flex", "fcolumn")

        this.element.id = `${this.parentKey}_container`

        this.parent.insertAdjacentHTML("afterend", this.element.outerHTML)

        this.element = this.parent.nextElementSibling
        this.node = this.element

        this.models.forEach((model) => {
            model.setParent(this.element)
            
            model.build()
        })

        this.hide()

        this.updateStyles()
    }
}

export default OptionsContainer