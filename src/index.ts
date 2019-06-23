import axios from 'axios';
import {servo, testLED, trigger} from './pin';

let isOn = false;
trigger.addListener('interrupt', async () => {
    isOn = !isOn;
    testLED.digitalWrite(isOn ? 1 : 0);
    servo.servoWrite(45);
    servo.servoWrite(0);

    await axios.get<undefined>('https://google.com/');
});
