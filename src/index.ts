import columnsTemplate from "./configs/templates/columns"
import ICreateMenu from "./interfaces/ICreateMenu"
import Menu from "./menu/Menu"
import Column from "./menu/column/Column"
import Checkbox from "./menu/column/models/Checkbox"
import OptionCheckbox from "./menu/column/models/option/OptionCheckbox"

const MooUI = (function() {
    this.list = new Map()

    this.Column = Column
    this.Checkbox = Checkbox
    this.OptionCheckbox = OptionCheckbox

    this.createMenu = function({
        toggleKey,
        appendNode
    }: ICreateMenu): Menu {
        const id: number = this.list.size + 1
        const menu: Menu = new Menu({
            id: id,
            config: columnsTemplate,
            toggleKey: toggleKey,
            appendNode: appendNode
        })

        menu.destroy = () => {
            menu.holder.remove()

            this.list.delete(menu.id)
        }

        return this.list.set(id, menu).get(id)
    }

    this.eachAllMenu = function(
        callback: (menu: Menu) => unknown,
        predicate?: (menu: Menu) => unknown
    ): void {
        typeof predicate === 'undefined' && (predicate = () => true)

        Array.from(this.list.values()).filter(
            (item: any) => item.isMenu && predicate(item)
        ).forEach(
            (menu: any) => callback(menu)
        )
    }

    this.toggleAllMenu = function(action: ("show" | "hide")): void {
        this.eachAllMenu((menu: any) => {
            menu[action]()
        }, (menu: any) => action === "show" ? !menu.isVisible : menu.isVisible)
    }

    this.showAllMenu = function(): void {
        this.toggleAllMenu("show")
    }

    this.hideAllMenu = function(): void {
        this.toggleAllMenu("hide")
    }

    console.log("MooUI.js v1.0.0")
    
    return this
}).call(Object.create({}))

declare namespace window {
    let MooUI: any
}

window.MooUI = MooUI
