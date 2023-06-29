import columnsTemplate from "../../configs/templates/columns"
import Container from "./Container"
import StyleSystem from "./StyleSystem"

class Header extends StyleSystem {
    public element: HTMLElement
    
    private config: any

    public text: string
    public bgColor: string
    public textColor: string

    public iconURL: string

    constructor(
        private readonly parent: HTMLElement,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        private targetContainer: Container
    ) {
        const element: HTMLElement = document.createElement("header")
        const config: any = columnsTemplate.column

        super(element, config.header.colors)
        
        this.parent = parent
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.targetContainer = targetContainer

        this.element = element

        this.config = config

        this.text = "ColumnMenu"
        
        this.iconURL = ""
    }

    public get textElement(): HTMLSpanElement {
        return this.element.querySelector(".header-text")
    }

    public get iconElement(): HTMLImageElement {
        return this.element.querySelector(".header-icon")
    }
    
    private get html(): string {
        return `
        ${/^https?\:\/{2}/.test(this.iconURL) ? `<img class="header-icon" src="${this.iconURL}">` : ""}
        <span class="header-text">${this.text}</span>
        `
    }

    public updateStyles(): void {
        this._updateStyles(this.width, this.height)

        if (this.iconElement instanceof HTMLImageElement) {
            this.iconElement.src !== this.iconURL && (this.iconElement.src = this.iconURL)
        }
        
        if (this.textElement instanceof HTMLSpanElement) {
            this.textElement.innerText = this.text
        }
    }

    private initEvents() {
        let mousePressed: boolean = false

        this.element.addEventListener("mousedown", (event) => {
            if (mousePressed || event.button !== this.config.header.openMouseKey) return

            this.targetContainer.toggle()

            mousePressed = true
        })

        window.addEventListener("mouseup", (event) => {
            if (event.button !== this.config.header.openMouseKey) return

            mousePressed = false
        })
    }

    public build() {
        this.element.classList.add("column-header", "flex", "fcenter", "all-pointer")

        this.parent.appendChild(this.element)

        this.element.insertAdjacentHTML("beforeend", this.html)

        this.updateStyles()

        this.initEvents()
    }
}

export default Header