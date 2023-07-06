import IOptionIRange from "../../../../interfaces/IOptionIRange"
import Option from "./Option"


class OptionIRange extends Option {
    public min: IOptionIRange["min"]
    public max: IOptionIRange["max"]
    public value: IOptionIRange["value"]
    public fixValue: IOptionIRange["fixValue"]
    public isDisabled: IOptionIRange["isDisabled"]

    public element: HTMLElement
    public inputElement: HTMLInputElement

    private events: Map<string, Map<number, Function>>

    constructor({ 
        key, 
        name, 
        description,
        min = 0,
        max = 100,
        value = "",
        fixValue = 0,
        isDisabled = false
    }: IOptionIRange) {
        const element: HTMLElement = document.createElement("box")

        element.setAttribute("data-name", name)

        super({ key, name, description, 
            node: element
        })

        this.min = min
        this.max = max
        this.value = value
        this.fixValue = fixValue
        this.isDisabled = isDisabled

        this.element = element
        this.inputElement = null

        this.events = new Map([
            [ "input", new Map() ]
        ])
    }

    private get html(): string {
        return `
        <div class="ui-input-range-holder" title="${this.description}">
            <div class="ui-input-range-info">
                <span>${this.name}</span>
                <span id="${this.key}_value">${this.value}</span>
            </div>
            
            <input type="range" class="ui-option-input-range" min="${this.min}" max="${this.max}">
        </div>
        `
    }

    public on(event: string, callback: Function) {
        const eventMap: Map<number, Function> = this.events.get(event)

        eventMap.set(eventMap.size + 1, callback)
    }

    public setValue(value: (string | number)): void {
        const valueInfo: HTMLSpanElement = document.getElementById(`${this.key}_value`)

        this.value = value

        this.inputElement.value = this.value as string

        valueInfo && (valueInfo.innerText = this.value as string)
    }

    public setDisabled(activeState: boolean): void {
        this.isDisabled = activeState

        this.updateClasses()
    }

    private onInput(): number {
        const eventMap: Map<number, Function> = this.events.get("input")

        eventMap.forEach((callback: Function) => {
            callback(this.value, this.inputElement)
        })

        return this.value as number
    }

    private updateBackgroundSize(): void {
        const value = +this.value
        const min = +this.min
        const max = +this.max

        this.inputElement.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
    }

    private getValueByMouseX(mouseX: number): number {
        const rect = this.element.getBoundingClientRect()
        const min = +this.min
        const max = +this.max
        const newValue = ((mouseX / rect.width) * max).toFixed(this.fixValue)

        return Math.min(Math.max(+newValue, min), max)
    }

    private updateInputValue(event: any): void {
        const value = this.getValueByMouseX(event.offsetX)

        this.setValue(value)

        this.onInput()

        this.inputElement.dispatchEvent(new InputEvent("input"))
    }
    
    private initEvents(): void {
        const menuHolder = document.querySelector(".menu-holder")

        let isPressed = false

        this.updateBackgroundSize()

        this.element.addEventListener("mousedown", (event) => {
            isPressed = true

            const allElements = Object.values(document.querySelectorAll(".menu-holder *"))

            allElements.forEach((element: HTMLElement) => {
                if (element.tagName === "INPUT") return
                
                if (element.style.pointerEvents === "none" || element.classList.contains("no-pointer")) {
                    element.style.pointerEvents = "none !important"
                }

                if (/important/.test(element.style.pointerEvents)) return

                element.style.pointerEvents = "none"
            })
        })

        window.addEventListener("mouseup", (event) => {
            if (!isPressed) return

            isPressed = false

            const allElements = Object.values(document.querySelectorAll(".menu-holder *"))

            allElements.forEach((element: HTMLElement) => {
                if (element.tagName === "INPUT") return
                
                if (/important/.test(element.style.pointerEvents)) return

                element.style.pointerEvents = "all"
            })
        })

        menuHolder.addEventListener("mousemove", (event) => {
            if (!isPressed) return

            this.updateInputValue(event)
        })

        this.inputElement.addEventListener("input", () => {
            this.updateBackgroundSize()
        })
    }

    private updateClasses(): void {
        if (this.isDisabled) {
            this.element.classList.add("disabled")
            
            this.inputElement.disabled = true
        } else {
            this.element.classList.remove("disabled")

            this.inputElement.disabled = false
        }
    }

    public build(): void {
        this.element.classList.add("ui-model", "input-range-model", "inactive")

        this.parent.appendChild(this.element)

        this.element.insertAdjacentHTML("beforeend", this.html)

        this.inputElement = this.element.querySelector("input")

        this.setValue(this.value as string)
        
        this.updateClasses()
        this.initEvents()
    }
}

export default OptionIRange
