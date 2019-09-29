const nodes : number = 5
const lines : number = 2
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const foreColor : string = "#2196F3"
const scGap : number = 0.02
const delay : number = 30
const backColor : string = "#BDBDBD"
const w : number = window.innerWidth
const h : number = window.innerHeight

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, r : number) {
        context.beginPath()
        context.arc(0, 0, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawLineToCircle(context : CanvasRenderingContext2D, h : number, size : number, sc1 : number, sc2 : number) {
        for (var i = 0; i < lines; i++) {
            context.save()
            context.scale(1, 1 - 2 * i)
            DrawingUtil.drawLine(context, 0, -h / 2 + (h / 2) * sc2, 0, (h / 2) * sc1)
            context.restore()
        }
        DrawingUtil.drawCircle(context, size * sc2)
    }

    static drawLTCNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        const gap : number = w / (nodes + 1)
        const size : number = gap / sizeFactor
        context.strokeStyle = foreColor
        context.fillStyle = foreColor
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.save()
        context.translate(gap * (i + 1), h / 2)
        DrawingUtil.drawLineToCircle(context, h, size, ScaleUtil.divideScale(scale, 0, 2), ScaleUtil.divideScale(scale, 1, 2))
        context.restore()
    }
}
