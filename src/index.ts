import axios from 'axios';
import gpio from 'pigpio';
import {servo, testLED, trigger} from './pin';

gpio.initialize();

process.on('exit', () => {
    gpio.terminate();
});

let isOn = false;
trigger.addListener('interrupt', async () => {
    isOn = !isOn;
    testLED.digitalWrite(isOn ? 1 : 0);
    try {
        servo.servoWrite(45);
        servo.servoWrite(0);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
    }

    await axios.post<undefined>('https://kwang-server.herokuapp.com/newKwang', {
        deviceId: 'TEST',
    });
});
