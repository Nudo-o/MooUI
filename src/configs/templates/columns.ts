interface IColumnsTemplate {
    [key: string]: any
}

const columnsTemplate: IColumnsTemplate = {
    showDisplay: "block",
    warns: {
        appendNode: "menu.appendNode is undefined. Without this, the menu will not be added to HTML. MenuID: [m_id]"
    },
    column: {
        defaultX: 20,
        defaultY: 20,
        defaultWidth: 200,
        defaultHeight: 400,
        defaultMaxHeight: 400,
        dragMouseKey: 0,
        header: {
            defaultWidth: 200,
            defaultHeight: 30,
            openMouseKey: 2,
            colors: {
                main: "rgba(26, 26, 26, 1)",
                text: "rgba(255, 255, 255, 1)"
            }
        },
        container: {
            showDisplay: "flex",
            colors: {
                main: "rgba(26, 26, 26, 1)",
                text: "rgba(255, 255, 255, 1)"
            }
        },
        checkbox: {
            toggleKey: 0,
            openOptionsKey: 2
        }
    }
}

export default columnsTemplate