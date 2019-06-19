import {Gpio} from 'pigpio';

const trigger = new Gpio(18, {
    edge: Gpio.FALLING_EDGE,
    mode: Gpio.INPUT,
});

const servo = new Gpio(17, {
    mode: Gpio.OUTPUT,
});

const testLED = new Gpio(21, {
    mode: Gpio.OUTPUT,
});

export {trigger, servo, testLED};
