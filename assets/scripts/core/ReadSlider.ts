const {ccclass, property} = cc._decorator;

@ccclass
export default class ReadSlider extends cc.Component {

    @property(cc.Label)
    label: cc.Label;

    @property({
        default: 'hello'
    })
    text: string = 'hello';


    readValue(val) {
        console.log(val);
    }
}
