import axios from 'axios';
import gpio from 'pigpio';
import {servo, trigger} from './pin';

gpio.initialize();

process.on('exit', () => {
    gpio.terminate();
});

trigger.addListener('interrupt', async () => {
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
