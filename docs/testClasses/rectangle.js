export default class Rectangle{
    constructor(_width, _height){
        this.width = _width;
        this.height = _height;
    }
    
    get area(){
        return this.calcArea();
    }

    calcArea(){
        return this.width * this.height;
    }

    get rectangleHtmlDiv(){
        let div = document.createElement('div');
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.id = 'rectangle'
        return div;
    }
}