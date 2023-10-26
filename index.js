export async function enter(element, transitionName = null) {
  await transition('enter', element, transitionName, 'leave')
  element.dataset.transitioned = true
}

export async function leave(element, transitionName = null) {
  if (!element.hasAttribute('data-transition-leave-final')) {
    element.dataset.transitionLeaveFinal = 'hidden'
  }

  await transition('leave', element, transitionName, 'enter')
  element.dataset.transitioned = false
}

export async function toggle(element, transitionName = null) {
  if (element.dataset.transitioned === 'true') {
    await leave(element, transitionName)
  } else {
    await enter(element, transitionName)
  }
}

async function transition(direction, element, animation, previousDirection) {
  const dataset = element.dataset
  const animationClass = animation ? `${animation}-${direction}` : direction
  let transition = `transition${direction.charAt(0).toUpperCase() + direction.slice(1)}`
  const genesis = dataset[transition] ? dataset[transition].split(" ") : [animationClass]
  const start = dataset[`${transition}Start`] ? dataset[`${transition}Start`].split(" ") : [`${animationClass}-start`]
  const end = dataset[`${transition}End`] ? dataset[`${transition}End`].split(" ") : [`${animationClass}-end`]
  const final = dataset[`${transition}Final`] ? dataset[`${transition}Final`].split(" ") : [`${animationClass}-final`]

  const previousAnimationClass = animation ? `${animation}-${previousDirection}` : previousDirection
  let previousTransition = `transition${previousDirection.charAt(0).toUpperCase() + previousDirection.slice(1)}`
  const previousFinal = dataset[`${previousTransition}Final`] ? dataset[`${previousTransition}Final`].split(" ") : [`${previousAnimationClass}-final`]

  removeClasses(element, previousFinal)
  addClasses(element, genesis)
  addClasses(element, start)
  await nextFrame()
  removeClasses(element, start)
  addClasses(element, end);
  await afterTransition(element)
  removeClasses(element, end)
  removeClasses(element, genesis)
  await afterTransition(element)
  addClasses(element, final)
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
