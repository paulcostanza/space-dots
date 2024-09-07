// add movement to dots
// grab and 'throw' dots

// grab our html elements
let container = document.querySelector('.container')
let canvas = document.getElementById('dotsCanvas')

// cover the viewport
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

// allows access to functions for us to draw with
let c = canvas.getContext('2d')

let dots = []

// space color theme
let arrayColors = ['#5D3A9B', '#1B1B2F', '#C0C0C0', '#E63946', '#F0F0F0', '#2C2C2C', '#4F4F4F', '#2E8B57', '#4B0082']

// adds our dots to the array
for (let i = 0; i < 100; i++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 7 + 5,
        color: arrayColors[Math.floor(Math.random() * 5)]
    })
}

// draws dots onto the screen
const drawDots = () => {
    dots.forEach(dot => {
        c.fillStyle = dot.color
        c.beginPath()
        c.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        c.fill()
    })
}

drawDots()

// adds lines to dots when in proximity to mouse
container.addEventListener('mousemove', (e) => {

    c.clearRect(0, 0, canvas.width, canvas.height)
    drawDots()

    let mouse = {
        x: e.pageX - container.getBoundingClientRect().left,
        y: e.pageY - container.getBoundingClientRect().top,
    }

    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2)
        if (distance < 200) {
            c.strokeStyle = dot.color
            c.lineWidth = 1
            c.beginPath()
            c.moveTo(dot.x, dot.y)
            c.lineTo(mouse.x, mouse.y)
            c.stroke()
        }
    })
})

// prevents lines from staying on screen when mouse is moved out of screen view
container.addEventListener('mouseout', () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    drawDots()
})

