export async function enter(element) {
    element.classList.remove('hidden');
    await transition('enter', element)
}

export async function leave(element) {
    await transition('leave', element)
    element.classList.add('hidden');
}

async function transition(direction, element) {
    const dataset = element.dataset
    let transition = `transition${direction.charAt(0).toUpperCase() + direction.slice(1)}`
    const leave = dataset[transition] ? dataset[transition].split(" ") : []
    const leaveStart = dataset[`${transition}Start`] ? dataset[`${transition}Start`].split(" ") : []
    const leaveEnd = dataset[`${transition}End`] ? dataset[`${transition}End`].split(" ") : []

    addClasses(element, leave)
    addClasses(element, leaveStart)
    await nextFrame();
    removeClasses(element, leaveStart);
    addClasses(element, leaveEnd);
    await afterTransition(element)
    removeClasses(element, leaveEnd);
    removeClasses(element, leave);
}

function addClasses(element, classes) {
    element.classList.add(...classes)
}

function removeClasses(element, classes) {
    element.classList.remove(...classes)
}

function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });
}

function afterTransition(element) {
    return new Promise(resolve => {
        const duration = Number(
            getComputedStyle(element)
                .transitionDuration
                .replace('s', '')
        ) * 1000;
        setTimeout(() => {
            resolve();
        }, duration);
    });
}