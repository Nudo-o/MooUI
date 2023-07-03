import IMenu from "../interfaces/IMenu"
import Column from "./column/Column"
import UIModel from "./column/models/UIModel"
import Option from "./column/models/option/Option"
import htmlLayout from "./layout/htmlLayout"

class Menu {
    public readonly id: IMenu["id"]
    public readonly config: IMenu["config"]
    public readonly toggleKey: IMenu["toggleKey"]
    private readonly appendNode: IMenu["appendNode"]

    public holder: HTMLElement
    public showDisplay: string

    public isMenu: boolean
    
    public columns: Map<number, Column>

    private modelsActionEvents: Map<number, Function>

    constructor({ 
        id, 
        config, 
        toggleKey, 
        appendNode 
    }: IMenu) {
        this.id = id
        this.config = config
        this.toggleKey = toggleKey
        this.appendNode = appendNode

        if (!this.appendNode) {
            console.warn(this.config.warns.appendNode.replace(/\[m_id\]/g, this.id))
        }

        this.holder = document.createElement("div")
        this.showDisplay = this.config.showDisplay

        this.columns = new Map()

        this.isMenu = true

        this.modelsActionEvents = new Map()

        this.append()

        this.hide()

        console.log("Menu created.")
    }

    public get isVisible(): boolean {
        return this.holder.style.display === this.showDisplay
    } 

    public get visibleStatus(): string {
        return this.isVisible ? "show" : "hide"
    }

    private get wrapper(): HTMLElement {
        return this.holder.querySelector(".menu-wrapper")
    }

    public getModel(key: string): any {
        let model = null

        this.columns.forEach((column: Column) => {
            column.container.models.forEach((_model: UIModel) => {
                if (!_model.options.size || !_model.options.get(key)) return

                model = _model.options.get(key)

                return
            })

            column.container.models.get(key) && (model = column.container.models.get(key))
        })

        return model
    }

    public getModelActive(key: string): any {
        return this.getModel(key)?.isActive
    }

    public getModelValue(key: string): any {
        return this.getModel(key)?.value
    }

    public setModelActive(key: string, state: boolean): any {
        const model = this.getModel(key)

        typeof model?.isActive !== 'undefined' && model.setActive(state)
    }

    public setModelValue(key: string, value: boolean): any {
        const model = this.getModel(key)

        typeof model?.value !== 'undefined' && model.setValue(value)
    }

    public onModelsAction(callback: Function): void {
        this.modelsActionEvents.set(this.modelsActionEvents.size + 1, callback)
    }

    public add(...columns: Column[]): void {
        if (!columns.length) return
        
        for (const column of columns) {
            column.id = this.columns.size + 1

            column.build()
            column.setTo(column.width * (column.id - 1) + 10 * (column.id), column.y)

            this.wrapper.appendChild(column.element)

            this.columns.set(column.id, column)

            column.container.models.forEach((model: any) => {
                model.on("click", (state: boolean) => {
                    this.modelsActionEvents.forEach((callback: Function) => {
                        callback(model.key, state, model)
                    })
                })

                if (model.options.size) {
                    model.options.forEach((option: any) => {
                        for (const event of [ "click", "change", "input" ]) {
                            if (option.events.has(event)) {
                                option.on(event, (value: unknown) => {
                                    this.modelsActionEvents.forEach((callback: Function) => {
                                        callback(option.key, value, option)
                                    })
                                })
                            }
                        }
                    })
                }

                return
            })

            console.log(`Menu "${column.header.text}" has been added`)
        }
    }

    public destroy(): void {}

    public show(): void {
        this.holder.style.display = this.showDisplay
    }

    public hide(): void {
        this.holder.style.display = "none"
    }

    public toggle(): void {
        if (this.isVisible) return this.hide()

        this.show()
    }

    private build(): void {
        this.holder.classList.add("menu-holder", "absolute", "wh-100", "no-pointer")

        this.holder.insertAdjacentHTML("beforeend", htmlLayout)

        this.initEvents()
    }

    private initEvents(): void {
        let isPressed: boolean = false

        const isMatchesToggleKey: Function = (event: any): boolean => {
            for (const entrie of Object.entries(this.toggleKey)) {
                if (event[entrie[0]] !== entrie[1]) continue

                return true
            }
            
            return false
        }

        window.addEventListener("keydown", (event) => {
            if (!isMatchesToggleKey(event) || isPressed) return

            this.toggle()

            isPressed = true
        })

        window.addEventListener("keyup", (event) => {
            if (!isMatchesToggleKey(event)) return

            isPressed = false
        })
    }

    private append(): void {
        let appendNode: (Node | HTMLElement) = this.appendNode

        if (typeof appendNode === 'string') {
            if (!/whenload/.test(appendNode)) return

            const constructType: string = /\(\w+\)/.exec(appendNode)[0].replace(/(\(|\))/g, "")
            const appendChild: string = (appendNode as string).split(":")[1]

            switch (constructType) {
                case "Node": {
                    appendNode = eval(appendChild)
                } break

                case "Selector": {
                    appendNode = document.querySelector(appendChild)
                } break
            }

            return window.addEventListener("DOMContentLoaded", 
                () => appendNode.appendChild(this.holder)
            )
        }

        appendNode.appendChild(this.holder)

        this.build()
    }
}

export default Menu
