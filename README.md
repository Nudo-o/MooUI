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
    appendNode: document.body
})
```
First of all, we create the menu itself by calling the MooUI method called createMenu.<br>
The method takes an object as an argument. The object includes toggleKey and appendNode.<br>
ToggleKey must have at least 1 property type from `KeyboardEvent` (code/keyCode/key) so that when you press the key specified in toggleKey, the menu opens on this key.<br>
AppendNode accepts any NodeElement.

# How to control menu
To open menu column, you need to right-click on header (Where the menu name is).<br>
To move the menu, you need to hold down the header with the left mouse button and move it around the screen. (Beta)<br>
To make a Checkbox switch, you need to click on it with the left mouse button, and to read the description of the switch, you need to hover the mouse cursor over its name.

# How to add columns to menu and togglers
```JS
const playersVisual = new MooUI.Column()

playersVisual.setHeaderText("Players")

playersVisual.add(new MooUI.Checkbox({
    key: "key of toggler", // An individual identifier for getting the properties of this model in the future
    name: "name of toggler", // Name of model
    description: description of toggler", // Description of model
    isActive: default toggler state true/false, // The initial state of the model. False - disabled. True - enabled,
    isDisabled: false/true // Toggler will no longer switch, but options can also open and close. It is not necessary to specify
}))

menu.add(playersVisual)
```

# How to add options to toggler
```JS
const playersVisual = new MooUI.Column()

playersVisual.setHeaderText("Players")

playersVisual.add(new MooUI.Checkbox({
    key: "key of toggler", // An individual identifier for getting the properties of this model in the future
    name: "name of toggler", // Name of model
    description: "description of toggler", // Description of model. It is shown when the mouse is hovered over the toggler
    isActive: "default toggler state true/false", // The initial state of the model. False - disabled. True - enabled,
    isDisabled: "false/true", // Toggler will no longer switch, but options can also open and close. It is not necessary to specify
    options: [
        new MooUI.OptionCheckbox({ // All custom properties are the same as creating the main toggler above
            key: "key",
            name: "name",
            description: "description",
            isActive: false,
            isDisabled: false
        }),
        new MooUI.OptionIText({
            key: "key",
            name: "name",
            description: "description",
            value: "#ffffff" // Default text
        }),
        new MooUI.OptionIRange({
            key: "key",
            name: "name",
            description: "description",
            min: 0, // Minimum value
            max: 2, // Maximum value
            value: 2, // Default value
            fixValue: 1 // Number of digits after the decimal point
        }),
        new MooUI.OptionIColor({
            key: "key",
            name: "name",
            description: "description",
            value: "#ffffff" // Default color
        })
    ]
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
    isActive: false,
    options: [
        new MooUI.OptionCheckbox({
            key: "tracers-arrows",
            name: "Arrows",
            description: "Draws arrows instead of lines",
            isActive: true
        }),
        new MooUI.OptionIColor({
            key: "tracers-color",
            name: "Color",
            description: "Tracers color",
            value: "#ffffff"
        })
    ]
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

    if (menu.getModelActive("tracers-arrows")) {
        console.log("Tracers Arrows is active")
    }

    // Get value of input option:
    console.log("Tracers color:", menu.getModelValue("tracers-color"))
}, 1000)
```
