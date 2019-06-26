import {Gpio} from 'pigpio';

const trigger = new Gpio(2, {
    edge: Gpio.FALLING_EDGE,
    mode: Gpio.INPUT,
});

const servo = new Gpio(3, {
    mode: Gpio.OUTPUT,
});

export {trigger, servo};
