import {Gpio} from 'pigpio';

const trigger = new Gpio(15, {
    edge: Gpio.FALLING_EDGE,
    mode: Gpio.INPUT,
});

const servo = new Gpio(14, {
    mode: Gpio.OUTPUT,
});

export {trigger, servo};
