import IOptionCheckbox from "../../../../interfaces/checkbox/IOptionCheckbox"
import Option from "./Option"


class OptionCheckbox extends Option {
    public isActive: IOptionCheckbox["isActive"]
    public isDisabled: IOptionCheckbox["isDisabled"]

    public element: HTMLElement

    constructor({ 
        key, 
        name, 
        description, 
        isActive = false,
        isDisabled = false
    }: IOptionCheckbox) {
        const element = document.createElement("box")

        super({ key, name, description, 
            node: element
        })

        this.isActive = isActive
        this.isDisabled = isDisabled

        this.element = element
    }

    private get html(): string {
        return `
        <span class="ui-option-text" title="${this.description}">${this.name}</span>
        `
    }

    private updateClasses(): void {
        const activeClass = (isActive: boolean): string => isActive ? "active" : "inactive"
        
        this.element.classList.remove(activeClass(!this.isActive))
        this.element.classList.add(activeClass(this.isActive))

        this.isDisabled && this.element.classList.add("disabled")
    }
}

export default OptionCheckbox