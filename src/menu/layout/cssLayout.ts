const cssLayout = `
.menu-holder {
    z-index: 99999999;
}

.ui-option-input-text {
    width: initial;
    height: initial;
    background: none;
    border: none;
    outline: 0;
    padding: 0;
    color: currentColor;
    font-size: 14px;
}

.ui-option-input-color {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: 0;
    padding: 0;
    overflow: hidden;
    height: 22.5px !important;
}

.ui-option-input-color::-webkit-color-swatch-wrapper {
    padding: 0;    
}

.ui-option-input-color::-webkit-color-swatch {
    border: none;
}

.input-color-model {
    padding: 0 !important;
}

.input-color-model::before {
    content: attr(data-name);
    position: absolute;
    color: currentColor;
    pointer-events: none;
    left: 6.5px;
}

.input-text-model, .input-color-model {
    cursor: default !important;
}

.options-container {
    border: 1.5px solid;
    border-top: none;
    box-sizing: border-box;
    padding: 2.5px;
    gap: 2.5px;
    overflow-y: auto;
    margin-top: -2.5px;
}

.ui-model {
    display: flex;
    align-items: center;
    width: initial;
    height: 20px !important;
    cursor: pointer;
    border: 1.5px solid;
    font-size: 16px;
    gap: 5px;
    padding: 2px 5px;
    color: inherit !important;
}

.ui-model.has-options::before {
    content: ">";
    transform: rotate(0deg) scaleY(1.35);
    cursor: pointer;
}

.ui-model.has-options.show-options::before {
    transform: rotate(90deg) scaleY(1.35);
}

.ui-model.disabled {
    cursor: default;
    filter: invert(.15);
}

.ui-model.active, 
.ui-model.active > .ui-model-text,
.ui-model.active > .ui-option-text,
.ui-model.active > .ui-model.has-options::before {
    filter: invert(0);
}

.ui-model.inactive {
    filter: invert(.075);
}

.ui-model.inactive > .ui-model-text,
.ui-model.inactive > .ui-option-text,
.ui-model.inactive.has-options::before {
    filter: invert(.3);
}

.column-container {
    border: 1.5px solid;
    border-top: none;
    box-sizing: border-box;
    padding: 2.5px;
    gap: 2.5px;
    overflow-y: auto;
}

.column-container::-webkit-scrollbar {
    width: 6px;
}

.column-container::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.column-header {
    cursor: pointer;
    border: 1px solid;
    box-sizing: border-box;
    transition: .1s filter;
}

.column-header:hover {
    filter: grayscale(0.15);
}

.header-text {
    font-size: 16px;
    font-weight: 1000;
}

.no-pointer {
    pointer-events: none;
}

.all-pointer {
    pointer-events: all;
}

.wh-inherit {
    width: inherit;
    height: inherit;
}

.absolute {
    position: absolute;
    top: 0;
    left: 0;
}

.wh-100 {
    width: 100%;
    height: 100%;
}

.flex {
    display: flex;
}

.flex.fcolumn {
    flex-direction: column
}

.flex.fcenter {
    align-items: center;
    justify-content: center;
}

`

export default cssLayout
