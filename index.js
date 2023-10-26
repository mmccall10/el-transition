export async function enter(element, transitionName = null, hideElement = true) {
    hideElement && element.classList.remove('hidden')
    await transition('enter', element, transitionName)
    element.dataset.transitioned = true
}

export async function leave(element, transitionName = null, hideElement = true) {
    await transition('leave', element, transitionName)
    hideElement && element.classList.add('hidden')
    element.removeAttribute('transitioned')
}

export async function toggle(element, transitionName = null, hideElement = true) {
    if (element.dataset.transitioned) {
      await leave(element, transitionName)
    } else {
      await enter(element, transitionName)
    }
}

async function transition(direction, element, animation) {
    const dataset = element.dataset
    const animationClass = animation ? `${animation}-${direction}` : direction
    let transition = `transition${direction.charAt(0).toUpperCase() + direction.slice(1)}`
    const genesis = dataset[transition] ? dataset[transition].split(" ") : [animationClass]
    const start = dataset[`${transition}Start`] ? dataset[`${transition}Start`].split(" ") : [`${animationClass}-start`]
    const end = dataset[`${transition}End`] ? dataset[`${transition}End`].split(" ") : [`${animationClass}-end`]

    addClasses(element, genesis)
    addClasses(element, start)
    await nextFrame()
    removeClasses(element, start)
    addClasses(element, end);
    await afterTransition(element)
    removeClasses(element, end)
    removeClasses(element, genesis)
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
            requestAnimationFrame(resolve)
        });
    });
}

function afterTransition(element) {
    return Promise.all(element.getAnimations().map(animation => animation.finished));
}
