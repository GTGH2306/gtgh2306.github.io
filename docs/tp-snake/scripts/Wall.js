class Wall{
    constructor(_pos, _width, _height){
        this.pos = _pos;
        this.width = _width;
        this.height = _height;
    }
    isColliding(_testEntity){
        let result;
        const posXStart = this.pos[0];
        const posYStart = this.pos[1];
        const posXEnd = posXStart + (this.width - 1);
        const posYEnd = posYStart + (this.height - 1);
        if (_testEntity.pos[0] >= posXStart &&
            _testEntity.pos[0] <= posXEnd &&
            _testEntity.pos[1] >= posYStart &&
            _testEntity.pos[1] <= posYEnd
        ){
            result = true;
        } else {
            result = false;
        }
        return result;
    }
}

export { Wall }