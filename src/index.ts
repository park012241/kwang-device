import {testLED, trigger} from './pin';

let isOn = false;
trigger.addListener('interrupt', () => {
    isOn = !isOn;
    testLED.digitalWrite(isOn ? 1 : 0);
});
