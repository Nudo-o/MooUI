import columnsTemplate from "../../configs/templates/columns"
import StyleSystem from "./StyleSystem"

class Container extends StyleSystem {
    public element: HTMLElement
    
    private config: any

    public bgColor: string
    public textColor: string

    public maxHeight: number

    public models: Map<(string | number), any>

    constructor(
        private readonly parent: HTMLElement,
        public x: number,
        public y: number,
        public width: number,
        public height: (number | "auto")
    ) {
        const element: HTMLElement = document.createElement("container")
        const config: any = columnsTemplate.column

        super(element, config.container.colors)

        this.parent = parent
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.element = element

        this.config = config

        this.maxHeight = 0

        this.models = new Map()
    }

    public get isVisible(): boolean {
        return this.element.style.display === this.config.container.showDisplay
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

    public add(uiModel: any): any {
        if (!uiModel.key) return

        uiModel.setParent(this.element)

        return this.models.set(uiModel.key, uiModel).get(uiModel.key)
    }

    public updateStyles(): void {
        this._updateStyles(this.width, this.height)

        this.element.style.maxHeight = `${this.maxHeight}px`

        this.models.forEach((model) => {
            model.bgColor = this.bgColor
            model.textColor = this.textColor

            model._updateStyles("intial", "auto")

            if (model.options.size) {
                model.optionsContainer.bgColor = this.bgColor
                model.optionsContainer.textColor = this.textColor
                
                model.optionsContainer.updateStyles()
            }
        })
    }

    public build(): void {
        this.element.classList.add("column-container", "flex", "fcolumn", "all-pointer")

        this.parent.appendChild(this.element)

        this.models.forEach((model) => {
            model.build()
        })

        this.hide()

        this.updateStyles()
    }
}

export default Container
