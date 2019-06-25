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
    servo.servoWrite(45);
    servo.servoWrite(0);

    await axios.post<undefined>('https://kwang-server.herokuapp.com/newKwang', {
        deviceId: 'TEST',
    });
});
