const getBubbleSortSteps = (inputArray) => {
    const steps = [];
    const arr = [...inputArray];

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {

            steps.push({
                step_number: steps.length + 1,
                action: 'compare',
                state: {
                    array: [...arr],
                    comparing: [j, j + 1],
                    sorted: []
                }
            });

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;

                steps.push({
                    step_number: steps.length + 1,
                    action: 'swap',
                    state: {
                        array: [...arr],
                        comparing: [j, j + 1],
                        sorted: []
                    }
                });
            }
        }

        steps.push({
            step_number: steps.length + 1,
            action: 'sorted',
            state: {
                array: [...arr],
                comparing: [],
                sorted: Array.from({ length: i + 1 }, (_, k) => arr.length - 1 - k)
            }
        });
    }
    steps.push({
        step_number: steps.length + 1,
        action: 'done',
        state: { array: [...arr], comparing: [], sorted: arr.map((_, i) => i) }
    });

    return steps;
};

console.log(JSON.stringify(getBubbleSortSteps([5, 3, 8, 1]), null, 2));

module.exports = { getBubbleSortSteps };

