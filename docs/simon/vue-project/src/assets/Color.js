export class Color {
    constructor(_name, _rgb){
        this.name = _name;
        this.rgb = []
        for (const _value of _rgb){
            this.rgb.push(_value);
        }
    }
    get hexCode(){
        let result = '#'
        for (const _value of this.rgb){
            let a = _value.toString(16);
            if(a.length === 1){
                a = '0' + a
            }
            result += a;
        }
        return result
    }

    get darkCode(){
        const darkerRgb = []
        for (const _value of this.rgb){
            darkerRgb.push(Math.round(_value * 0.5))
        }
        const result = new Color('newColor', darkerRgb);
        return result.hexCode;
    }
}

export const colors = [
    new Color('red', [255, 0, 0]),
    new Color('blue', [0, 100, 255]),
    new Color('green', [0, 255, 0]),
    new Color('yellow', [255, 255, 0]),
]

export function getRandomColor(){
    const rdm = Math.floor(Math.random() * Object.keys(colors).length);
    return Object.keys(colors)[rdm];
}