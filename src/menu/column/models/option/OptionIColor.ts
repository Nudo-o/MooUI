import IOptionIColor from "../../../../interfaces/IOptionIColor"
import Option from "./Option"


class OptionIColor extends Option {
    public value: IOptionIColor["value"]
    public isDisabled: IOptionIColor["isDisabled"]

    public element: HTMLElement
    public inputElement: HTMLInputElement

    private events: Map<string, Map<number, Function>>

    constructor({ 
        key, 
        name, 
        description, 
        value = "",
        isDisabled = false
    }: IOptionIColor) {
        const element: HTMLElement = document.createElement("box")

        element.setAttribute("data-name", name)

        super({ key, name, description, 
            node: element
        })

        this.value = value
        this.isDisabled = isDisabled

        this.element = element
        this.inputElement = null

        this.events = new Map([
            [ "change", new Map() ]
        ])
    }

    private get html(): string {
        return `
        <input type="color" class="ui-option-input-color" title="${this.description}">
        `
    }

    public on(event: string, callback: Function) {
        const eventMap: Map<number, Function> = this.events.get(event)

        eventMap.set(eventMap.size + 1, callback)
    }

    public setValue(value: string): void {
        this.value = value

        this.inputElement.value = this.value
    }

    public setDisabled(activeState: boolean): void {
        this.isDisabled = activeState

        this.updateClasses()
    }
    
    private onChange(event: InputEvent): string {
        this.setValue(this.inputElement.value)

        const eventMap: Map<number, Function> = this.events.get("change")

        eventMap.forEach((callback: Function) => {
            callback(this.value, event, this.inputElement)
        })

        return this.value
    }

    private initEvents(): void {
        this.inputElement.addEventListener("change", this.onChange.bind(this))
        this.inputElement.addEventListener("focus", this.onChange.bind(this))
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
        this.element.classList.add("ui-model", "input-color-model", "inactive")

        this.parent.appendChild(this.element)

        this.element.insertAdjacentHTML("beforeend", this.html)

        this.inputElement = this.element.querySelector("input")

        this.setValue(this.value)
        
        this.updateClasses()
        this.initEvents()
    }
}

export default OptionIColor