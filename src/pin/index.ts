import {Gpio} from 'pigpio';

const trigger = new Gpio(3, {
    edge: Gpio.FALLING_EDGE,
    mode: Gpio.INPUT,
});

const servo = new Gpio(2, {
    mode: Gpio.OUTPUT,
});

export {trigger, servo};
