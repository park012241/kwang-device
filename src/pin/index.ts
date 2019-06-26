import {Gpio} from 'pigpio';

const trigger = new Gpio(14, {
    edge: Gpio.FALLING_EDGE,
    mode: Gpio.INPUT,
});

const servo = new Gpio(15, {
    mode: Gpio.OUTPUT,
});

export {trigger, servo};
