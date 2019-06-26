import axios from 'axios';
import gpio from 'pigpio';
import {exit} from 'process';
import {servo, trigger} from './pin';

const delay = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

gpio.initialize();
gpio.configureClock(1, gpio.CLOCK_PWM);

process.on('exit', gpio.terminate);
process.on('SIGINT', () => {
    exit();
});

servo.servoWrite(1000);

trigger.addListener('interrupt', async () => {
    try {
        servo.servoWrite(800);
        await delay(100);
        servo.servoWrite(1000);
        await delay(100);
        servo.servoWrite(0);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
    }

    await axios.post<undefined>('https://kwang-server.herokuapp.com/newKwang', {
        deviceId: 'TEST',
    });
});
