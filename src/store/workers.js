import { writable } from 'svelte/store';
import { workerTypes } from '../constants/workerTypes';
import { initialWorkerState } from '../constants/workerStates';

const createNewWorkers = (workers) => {
    const { subscribe, update } = writable(workers);

    return {
        subscribe,
        increment,
        decrement,
        updateGenerationValue
    };

    function increment(type) {
        update((workers) => {
            workers[type].value++;
            return workers;
        })
    }

    function decrement(type) {
        update((workers) => {
            workers[type].value = Math.max(0, workers[type].value - 1);
            return workers;
        })
    }

    function updateGenerationValue(type, value) {
        update((workers) => {
            workers[type].generationValue = value;
            return workers;
        })
    }
}

export const workers = createNewWorkers(initialWorkerState);
