import IOptionIText from "../../../../interfaces/IOptionIText"
import Option from "./Option"


class OptionIText extends Option {
    public value: IOptionIText["value"]
    public isDisabled: IOptionIText["isDisabled"]

    public element: HTMLElement
    public inputElement: HTMLInputElement

    private events: Map<string, Map<number, Function>>

    constructor({ 
        key, 
        name, 
        description, 
        value = "",
        isDisabled = false
    }: IOptionIText) {
        const element: HTMLElement = document.createElement("box")

        super({ key, name, description, 
            node: element
        })

        this.value = value
        this.isDisabled = isDisabled

        this.element = element
        this.inputElement = null

        this.events = new Map([
            [ "input", new Map() ]
        ])
    }

    private get html(): string {
        return `
        <input class="ui-option-input-text" title="${this.description}" placeholder="${this.name}">
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
    
    private onInput(event: InputEvent): string {
        this.setValue(this.inputElement.value)

        const eventMap: Map<number, Function> = this.events.get("input")

        eventMap.forEach((callback: Function) => {
            callback(this.value, event, this.inputElement)
        })

        return this.value
    }

    private initEvents(): void {
        this.inputElement.addEventListener("input", this.onInput.bind(this))
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
        this.element.classList.add("ui-model", "input-text-model", "inactive")

        this.parent.appendChild(this.element)

        this.element.insertAdjacentHTML("beforeend", this.html)

        this.inputElement = this.element.querySelector("input")

        this.setValue(this.value)

        this.updateClasses()
        this.initEvents()
    }
}

export default OptionIText