import columnsTemplate from "../../../../configs/templates/columns"
import IOption from "../../../../interfaces/IOption"
import StyleSystem from "../../StyleSystem"

class Option extends StyleSystem {
    public key: IOption["key"]
    public name: IOption["name"]
    public description: IOption["description"]

    public config: any

    public parent: HTMLElement

    constructor({ 
        key, 
        name, 
        description, 
        node
    }: IOption) {
        const config = columnsTemplate.column

        super(node, config.container.colors)
        
        this.key = key
        this.name = name
        this.description = description

        this.config = config

        this.parent = null
    }

    public setParent(parentElement: HTMLElement): void {
        this.parent = parentElement
    }
}

export default Option