const cssLayout = `
.menu-holder {
    z-index: 99999999;
}

.ui-model {
    display: flex;
    align-items: center;
    width: initial;
    height: auto;
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
.ui-model.active > .ui-model.has-options::before {
    filter: invert(0);
}

.ui-model.inactive {
    filter: invert(.075);
}

.ui-model.inactive > .ui-model-text, 
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