import Rectangle from "./rectangle.js";

window.addEventListener('load', loadRectangle);
document.getElementById('okRectangle').addEventListener('click', loadRectangle)

function loadRectangle(){
    const width = Number(document.getElementById('widthRectangle').value)
    const height = Number(document.getElementById('heightRectangle').value)
    const rectangle = new Rectangle(width, height);
    console.log(rectangle)
    if(document.getElementById('rectangle')){
        document.getElementById('rectangle').remove()
    }
    document.getElementById('rectangleText').textContent = 'Aire du rectangle: ' + rectangle.area;

    document.getElementById('rectangleContainer').appendChild(rectangle.rectangleHtmlDiv)
}