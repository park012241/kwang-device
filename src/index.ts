import axios from 'axios';
import gpio from 'pigpio';
import {servo, trigger} from './pin';
import {delay} from './util';

gpio.initialize();
gpio.configureClock(1, gpio.CLOCK_PWM);

process.on('exit', gpio.terminate);

servo.servoWrite(1000);

let processing = false;

trigger.addListener('interrupt', async () => {
    await Promise.all([
        async () => {
            if (!processing) {
                processing = true;
                servo.servoWrite(500);
                await delay(1000);
                servo.servoWrite(1000);
                await delay(1000);
                processing = false;
            }
        },
        axios.post<undefined>('https://kwang-server.herokuapp.com/newKwang', {
            deviceId: 'TEST',
        })
    ]);
});

trigger.enableInterrupt(gpio.Gpio.FALLING_EDGE);

// tslint:disable-next-line:no-console
console.log('ready');
