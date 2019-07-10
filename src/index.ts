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
    if (!processing) {
        processing = true;
        servo.servoWrite(500);
        await delay(100);
        servo.servoWrite(1000);
        await delay(800);
        await axios.put<undefined>('https://kwang-server.herokuapp.com/kwang', {
            deviceId: 'TEST',
            timestamp: (new Date()).getTime(),
        });
        processing = false;
    }
});

trigger.enableInterrupt(gpio.Gpio.FALLING_EDGE);

// tslint:disable-next-line:no-console
console.log('ready');
