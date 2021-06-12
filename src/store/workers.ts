import { writable } from 'svelte/store';
import { WORKER_TYPES } from '~/constants/workers/workerTypes';
import { INITIAL_WORKER_STATE } from '../constants/workers/workerStates';

const createNewWorkers = (workers: Record<string, { value: number, generationValue: number }>) => {
    const { subscribe, update, set } = writable(workers);
    return {
        subscribe,
        increment,
        decrement,
        clearWorkers,
        updateGenerationValue,
        set
    };
    function increment(type: string, value: number) {
        update((workers) => {
            if (type !== WORKER_TYPES.UNASSIGNED) {
                const previousValue = workers[type].value;
                const availableWorkers = Math.min(workers[WORKER_TYPES.UNASSIGNED].value, value);
                workers[type].value = workers[type].value + availableWorkers;
                const difference = workers[type].value - previousValue;
                workers[WORKER_TYPES.UNASSIGNED].value -= difference
            } else {
                workers[type].value += value;
            }
            return workers;
        })
    }
    function decrement(type: string, value: number) {
        update((workers) => {
            const previousValue = workers[type].value;
            workers[type].value = Math.max(workers[type].value - value, 0);
            if (type !== WORKER_TYPES.UNASSIGNED) {
                const difference = previousValue - workers[type].value;
                workers[WORKER_TYPES.UNASSIGNED].value += difference
            }
            return workers;
        })
    }
    function clearWorkers(maxWorkers: number) {
        update((workers) => {
            for (const type in workers) {
                if (type === WORKER_TYPES.UNASSIGNED) {
                    workers[type].value = maxWorkers;
                } else {
                    workers[type].value = 0;
                }
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
