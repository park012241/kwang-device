import axios from 'axios';
import gpio from 'pigpio';
import {servo, trigger} from './pin';

gpio.initialize();
gpio.configureClock(1, gpio.CLOCK_PWM);

process.on('exit', () => {
    gpio.terminate();
});

trigger.addListener('interrupt', async () => {
    try {
        servo.servoWrite(800);
        servo.servoWrite(1000);
        servo.servoWrite(0);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
    }

    await axios.post<undefined>('https://kwang-server.herokuapp.com/newKwang', {
        deviceId: 'TEST',
    });
});
