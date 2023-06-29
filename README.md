# MooUI
This library allows you to quickly create a menu for your browser game (More for MooMoo.io) script.

# Installing
`// @require https://raw.githubusercontent.com/Nudo-o/MooUI/main/dist/mooui.min.js`

**Template**:
```JS
// ==UserScript==
// @name         SomeScript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       nudoo
// @match        *://moomoo.io/*
// @match        *://*.moomoo.io/*
// @grant        none
// @require      https://raw.githubusercontent.com/Nudo-o/MooUI/main/dist/mooui.min.js
// ==/UserScript==
```

# How to create a menu
```JS
const menu = MooUI.createMenu({
    toggleKey: {
        code: "Escape",
        key: "Escape",
        keyCode: 27
    },
    appendNode: document.getElementById("gameUI")
})
```
First of all, we create the menu itself by calling the MooUI method called createMenu.<br>
The method takes an object as an argument. The object includes toggleKey and appendNode.<br>
ToggleKey must have at least 1 property type from `KeyboardEvent` (code/keyCode/key) so that when you press the key specified in toggleKey, the menu opens on this key.<br>
AppendNode accepts any NodeElement.

# How to add columns to menu and togglers
```JS
const playersVisual = new MooUI.Column()

playersVisual.setHeaderText("Players")

playersVisual.add(new MooUI.Checkbox({
    key: "tracers", // An individual identifier for getting the properties of this model in the future
    name: "Tracers", // Name of model
    description: "Draws tracers to players", // Description of model
    isActive: false // The initial state of the model. False - disabled. True - enabled
}))

menu.add(playersVisual)
```

# Usage example
```JS
const menu = MooUI.createMenu({
    toggleKey: {
        code: "Escape",
        key: "Escape",
        keyCode: 27
    },
    appendNode: document.getElementById("gameUI")
})

const combatMenu = new MooUI.Column()
const renderMenu = new MooUI.Column()

combatMenu.setHeaderText("Combat")
    .setHeaderBgColor("#600b0b")
    .setContainerBgColor("#600b0b")

renderMenu.setHeaderText("Render")

combatMenu.add(new MooUI.Checkbox({
    key: "anti-insta",
    name: "Anti Insta",
    description: "Extra healing you",
    isActive: true
}))

combatMenu.add(new MooUI.Checkbox({
    key: "pvp-bot",
    name: "PVP Bot",
    description: "The bot automatically fights against other players",
    isActive: false
}))

renderMenu.add(new MooUI.Checkbox({
    key: "tracers",
    name: "Tracers",
    description: "Draws tracers to players",
    isActive: true
}))

menu.add(playersVisual, renderMenu)

// Interval just for example
setInterval(() => {
    if (menu.getModelActive("anti-insta")) {
        console.log("Anti Insta is active")
    }

    if (menu.getModelActive("pvp-bot")) {
        console.log("PVP Bot is active")
    }

    if (menu.getModelActive("tracers")) {
        console.log("Tracers is active")
    }
}, 1000)
```
