import columnsTemplate from "../../configs/templates/columns"
import Container from "./Container"
import DragSystem from "./DragSystem"
import Header from "./Header"
import UIModel from "./models/UIModel"

function hexToRGBA(hex: string, alpha: (string | number)): string {
    const r: number = parseInt(hex.slice(1, 3), 16)
    const g: number = parseInt(hex.slice(3, 5), 16)
    const b: number = parseInt(hex.slice(5, 7), 16)
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

class Column extends DragSystem {
    public id: number

    public element: HTMLElement
    private config: any

    public header: Header
    public headerValue: string
    public headerBgColor: string
    public headerTextColor: string

    public x: number
    public y: number

    public width: number
    public height: number
    public maxHeight: number

    public container: Container

    constructor() {
        const element: HTMLElement = document.createElement("div")
        const config: any = columnsTemplate.column
        const container: Container = new Container(
            element,
            config.defaultX, config.defaultY,
            config.header.defaultWidth, "auto"
        )
        const header: Header = new Header(
            element,
            config.defaultX, config.defaultY, 
            config.header.defaultWidth, config.header.defaultHeight,
            container
        )

        super(
            header.element,
            element, 
            config.defaultX, config.defaultY, 
            config.defaultWidth, config.defaultHeight,
            header.width, header.height
        )

        this.id = NaN

        this.element = element
        this.config = config

        this.header = header
        this.container = container
    }

    public setMaxHeight(maxHeight: number): Column {
        this.container.maxHeight = Math.abs(maxHeight - this.header.height)

        this.container.updateStyles()
        this.updateStyles()

        return this
    }

    public setSize(width: number, height: number): Column {
        this.width = width
        this.height = height

        this.updateStyles()

        return this
    }

    public setHeaderShadowActive(state: boolean): Column {
        this.header.isShadowActive = state

        return this
    }

    public setHeaderIconURL(iconURL: string): Column {
        this.header.iconURL = iconURL

        return this
    }

    public setHeaderSize(width: number, height: number): Column {
        this.header.width = width
        this.header.height = height

        this.header.updateStyles()

        return this
    }
    
    public setHeaderText(value: string): Column {
        this.header.text = value?.toString()

        this.header.updateStyles()

        return this
    }

    public setHeaderBgColor(hex: string): Column {
        this.header.bgColor = hexToRGBA(hex?.toString(), 1)

        this.header.updateStyles()

        return this
    }

    public setHeaderTextColor(hex: string): Column {
        this.header.textColor = hexToRGBA(hex?.toString(), 1)

        this.header.updateStyles()

        return this
    }

    public setContainerBgColor(hex: string): Column {
        this.container.bgColor = hexToRGBA(hex?.toString(), 1)

        this.container.updateStyles()

        return this
    }

    public setContainerTextColor(hex: string): Column {
        this.container.textColor = hexToRGBA(hex?.toString(), 1)

        this.container.updateStyles()

        return this
    }

    public updateStyles(): void {
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.maxHeight = `${this.maxHeight}px`
    }

    public add(uiModel: any): any {
        return this.container.add(uiModel)
    }

    public build(): void {
        this.element.classList.add("menu-column", "absolute", "flex", "fcolumn")

        this.element.oncontextmenu = function() {
            return false
        }

        this.updateStyles()

        this.header.build()
        this.container.build()

        this.setMaxHeight(this.height)

        this._initEvents()
    }
}

export default Column