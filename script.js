
var item = {
    width: 100,
    height: 100,
    count: 100 * 1000
}

var c = document.getElementById('container')
var container = {
    element: c,
    itemsPerRow: Math.floor(c.clientWidth / item.width)
}
container.element.style.height = Math.ceil(item.count / container.itemsPerRow) * item.height + 'px'

var d = document.getElementById('display')
var display = {
    element: d,
    rowCount: Math.ceil(window.innerHeight / item.height) + 1
}
display.element.style.height = display.rowCount * item.height + 'px'

// fill display with items
for (var i = 0; i < display.rowCount * container.itemsPerRow; i++) {
    var e = document.createElement('div')
    e.style['float'] = 'left'
    e.style.width = item.width + 'px'
    e.style.height = item.height + 'px'
    display.element.appendChild(e)
}

var redraw = true
document.addEventListener('scroll', function() {
    redraw = true
})

var thumbs = {}

var draw = function() {
    window.requestAnimationFrame(draw)
    if (!redraw) {
        return
    }
    display.element.style.top = window.scrollY % item.height * -1 + 'px'
    var firstRow = Math.floor(window.scrollY / item.height)
    var firstItem = firstRow * container.itemsPerRow
    var lastItem = firstItem + display.element.childNodes.length - 1

    var nodes = {}
    for (var i = 0; i < display.element.childNodes.length; i++) {
        nodes[firstItem + i] = display.element.childNodes[i]
    }

    for (var i in nodes) {
        if (i in thumbs) {
            nodes[i].style.background = 'url(data:image/jpg;base64,' + thumbs[i] + ')'
        } else {
            nodes[i].style.background = 'black'
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/load.php?from=' + firstItem + '&to=' + lastItem, true);
    xhr.responseType = 'text';
    xhr.readPosition = 0
    xhr.onreadystatechange = function() {
        if (this.response.length > this.readPosition) {
            var end = this.response.indexOf('\n', this.readPosition);
            while (end != -1) {
                var tmp = this.response.substring(this.readPosition, end)
                tmp = tmp.split(':')
                thumbs[tmp[0]] = tmp[1]

                this.readPosition = end + 1;
                end = this.response.indexOf('\n', this.readPosition);
                redraw = true;
            }
        }
    }
    xhr.send();

    redraw = false
}

window.requestAnimationFrame(draw)
draw()
