
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
    e.style.float = 'left'
    e.style.width = item.width + 'px'
    e.style.height = item.height + 'px'
    display.element.appendChild(e)
}

var redraw = true
document.addEventListener('scroll', function() {
    redraw = true
})

var draw = function() {
    window.requestAnimationFrame(draw)
    if (!redraw) {
        return
    }
    display.element.style.top = window.scrollY % item.height * -1 + 'px'
    var firstRow = Math.floor(window.scrollY / item.height)
    var firstItem = firstRow * container.itemsPerRow
    // fill display with items
    for (var i = 0; i < display.element.childNodes.length; i++) {
        display.element.childNodes[i].style.background = 'hsl(' + (firstItem + i) % 360 + ',42%,35%)'
        display.element.childNodes[i].textContent = firstItem + i
    }
    redraw = false
}

window.requestAnimationFrame(draw)
draw()
