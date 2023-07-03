import ICheckbox from "../../../interfaces/checkbox/ICheckbox"
import UIModel from "./UIModel"

class Checkbox extends UIModel {
    public isActive: ICheckbox["isActive"]
    public isDisabled: ICheckbox["isDisabled"]
    
    public element: HTMLElement

    private events: Map<string, Map<number, Function>>

    constructor({
        key,
        name, 
        description, 
        options = [], 
        isActive = false,
        isDisabled = false
    }: ICheckbox) {
        const element: HTMLElement = document.createElement("box")

        super({ key, name, description, options, 
            node: element 
        })

        this.isActive = isActive
        this.isDisabled = isDisabled

        this.element = element

        this.events = new Map([
            [ "click", new Map() ]
        ])
    }

    private get html(): string {
        return `
        <span class="ui-model-text" title="${this.description}">${this.name}</span>
        `
    }

    public on(event: string, callback: Function) {
        const eventMap: Map<number, Function> = this.events.get(event)

        eventMap.set(eventMap.size + 1, callback)
    }

    public setActive(activeState: boolean): void {
        this.isActive = activeState

        this.updateClasses()
    }

    public setDisabled(activeState: boolean): void {
        this.isDisabled = activeState

        this.updateClasses()
    }
    
    private toggle(): boolean {
        this.setActive(!this.isActive)

        const eventMap: Map<number, Function> = this.events.get("click")

        eventMap.forEach((callback: Function) => {
            callback(this.isActive, this.element)
        })

        return this.isActive
    }

    private initEvents(): void {
        let mousePressed: boolean = false

        this.element.addEventListener("mousedown", (event) => {
            if (mousePressed) return

            if (event.button === this.config.checkbox.toggleKey && !this.isDisabled) {
                this.toggle()
            }
            
            if (event.button === this.config.checkbox.openOptionsKey) {
                this.toggleOptions()
            }

            mousePressed = true
        })

        window.addEventListener("mouseup", (event) => {
            if (
                event.button !== this.config.checkbox.toggleKey &&
                event.button !== this.config.checkbox.openOptionsKey
            ) return

            mousePressed = false
        })
    }

    private updateClasses(): void {
        const activeClass = (isActive: boolean): string => isActive ? "active" : "inactive"
        
        this.element.classList.remove(activeClass(!this.isActive))
        this.element.classList.add(activeClass(this.isActive))

        if (this.isDisabled) {
            this.element.classList.add("disabled")
        } else {
            this.element.classList.remove("disabled")
        }
        
        this.options.size && this.element.classList.add("has-options")
    }

    public build(): void {
        this.element.classList.add("ui-model", "checkbox-model")

        this.updateClasses()

        this.parent.appendChild(this.element)

        this.element.insertAdjacentHTML("beforeend", this.html)

        this.initOptions()
        this.initEvents()
    }
}

export default Checkbox
