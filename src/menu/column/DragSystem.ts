import columnsTemplate from "../../configs/templates/columns"

class DragSystem {
    private _config: any

    private isDragging: boolean

    constructor(
        private readonly targetNode: HTMLElement,
        private readonly node: HTMLElement,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        private collisionWidth: number,
        private collisionHeight: number,
    ) {
        this.targetNode = targetNode
        this.node = node
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.collisionWidth = collisionWidth
        this.collisionHeight = collisionHeight

        this._config = columnsTemplate.column

        this.isDragging = false

        this.setTo(this.x, this.y)
    }

    public fixXY(): void {
        this.x <= 0 && (this.x = 0)
        this.y <= 0 && (this.y = 0)

        this.x + this.collisionWidth >= window.innerWidth && (
            this.x = window.innerWidth - this.collisionWidth
        )
        this.y + this.collisionHeight >= window.innerHeight && (
            this.y = window.innerHeight - this.collisionHeight
        )
    }

    public setTo(x: number, y: number, checkCollision?: boolean): void {
        typeof checkCollision === 'undefined' && (checkCollision = true)

        this.x = x
        this.y = y

        checkCollision && this.fixXY()

        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
    }

    public _initEvents(): void {
        let mousePressed: boolean = false

        this.targetNode.addEventListener("mousedown", (event) => {
            if (mousePressed || event.button !== this._config.dragMouseKey) return

            this.isDragging = true

            mousePressed = true
        })

        window.addEventListener("mouseup", (event) => {
            if (event.button !== this._config.dragMouseKey) return

            this.isDragging = false

            mousePressed = false
        })

        window.addEventListener("mousemove", (event) => {
            if (!this.isDragging) return

            const x: number = event.clientX - parseInt(this.targetNode.style.width) / 2
            const y: number = event.clientY - parseInt(this.targetNode.style.height) / 2

            this.setTo(x, y)
        })

        window.addEventListener("resize", () => {
            this.setTo(this.x, this.y)
        })
    }
}

export default DragSystem