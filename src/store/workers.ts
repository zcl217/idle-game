import { writable } from 'svelte/store';
import { WORKER_TYPES } from '~/constants/workers/workerTypes';
import { INITIAL_WORKER_STATE } from '../constants/workers/workerStates';

const createNewWorkers = (workers: Record<string, {value: number, generationValue: number}>) => {
    const { subscribe, update, set } = writable(workers);
    return {
        subscribe,
        increment,
        decrement,
        updateGenerationValue,
        set
    };
    function increment(type: string) {
        update((workers) => {
            workers[type].value++;
            if (type !== WORKER_TYPES.UNASSIGNED) workers[WORKER_TYPES.UNASSIGNED].value--;
            return workers;
        })
    }
    function decrement(type: string) {
        update((workers) => {
            if (workers[type].value - 1 >= 0) {
                workers[type].value--;
                if (type !== WORKER_TYPES.UNASSIGNED) workers[WORKER_TYPES.UNASSIGNED].value++;
            }
            return workers;
        })
    }
    function updateGenerationValue(type: string, value: number) {
        update((workers) => {
            workers[type].generationValue = value;
            return workers;
        })
    }
}

export const workers = createNewWorkers(INITIAL_WORKER_STATE);
