class StyleSystem {
    public bgColor: string
    public textColor: string

    public isShadowActive: boolean

    constructor(
        public node: HTMLElement,
        private colors: any
    ) {
        this.node = node
        this.colors = colors

        this.bgColor = this.colors.main
        this.textColor = this.colors.text

        this.isShadowActive = false
    }

    get alphaReg(): RegExp { 
        return /\,\s?\d(\.\d+)?\)/gm
    }

    get onlyRGBReg(): RegExp {
        return /(?!\d+\)$)\d+/ig
    }

    private getBorderColor(): string {
        return this.bgColor.replace(this.alphaReg, ",1)").replace(this.onlyRGBReg,
        (value: any): any => {
            const offset: number = 1
                
            return value >> offset <= 255 && value >> offset >= 0 ? value >> offset : value
        })
    }

    private getBackgroundColor(): string {
        return this.bgColor.replace(this.alphaReg, ",0.7)")
    }

    public _updateStyles(width: (number | string), height: (number | string)): void {
        const backgroundColor: string = this.getBackgroundColor()
        const borderColor: string = this.getBorderColor()

        this.node.style.width = typeof width === 'number' ? `${width}px` : width
        this.node.style.height = typeof height === 'number' ? `${height}px` : height
        
        this.node.style.backgroundColor = backgroundColor
        this.node.style.borderColor = borderColor

        this.node.style.boxShadow = this.isShadowActive ? `inset 0px 0px 6px 2px ${borderColor}` : ""

        this.node.style.color = this.textColor
    }
}

export default StyleSystem