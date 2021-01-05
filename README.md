# el-transition

## Install
```bash
$ npm install el-transition
```

```
$ yarn add el-transition
```

## Purpose
The purpose of this package is to handle enter/leave transition using classes or data attributes. This is similar to the implementations you find in vue.js and alpine.js.

## Usage
Both class based and dataset attributes are supported. 

To hide and show elements an implemenation of the class `hidden` is required.  

```css
.hidden {
  display: none
}
```

`el-transition` exports three async functions `enter`, `leave`, and `toggle`. Each function expects an HTML DOM element as the first argument and optional transition name as the second. 

```js
// app.js
import {enter, leave, toggle} from 'el-transition'

function open() {
    enter(element).then(() => {
        console.log("Enter transition complete")
    })
}

// remove element when close
function close() {
    leave(element).then(() => {
        element.destroy();
    })
}

// calls enter or leave based on presence of the class hidden
function toggle() {
    toggle(element);
}
```

### Dataset Attributes
When using dataset attributes el-transtion expects the following.

* data-transtion-enter: Applied during the entire entering phase.
* data-transition-enter-start: Added before element is inserted, removed one frame after element is inserted.
* data-transition-enter-end: Added one frame after element is inserted (at the same time enter-start is removed), removed when transition/animation finishes.
* data-transition-leave: Applied during the entire leaving phase.
* data-transition-leave-start: Added immediately when a leaving transition is triggered, removed after one frame.
* data-transition-leave-end: Added one frame after a leaving transition is triggered (at the same time leave-start is removed), removed when the transition/animation finishes.


### Example 
```html
<!-- dropdown.html -->
<div class="relative inline-block text-left">
  <div>
    <span class="rounded-md shadow-sm">
      <button type="button" class="dropdown-button" id="dropdown-btn">
        Options
      </button>
    </span>
  </div>

    <!-- declare enter leave anmiations using data attributes -->
    <div id="dropdown-menu" class="menu hidden"
        data-transition-enter="transition ease-out duration-100"
        data-transition-enter-start="transform opacity-0 scale-95"
        data-transition-enter-end="transform opacity-100 scale-100"
        data-transition-leave="transition ease-in duration-75"
        data-transition-leave-start="transform opacity-100 scale-100"
        data-transition-leave-end="transform opacity-0 scale-95"
    >
    <div class="rounded-md bg-white shadow-xs">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <!-- Menu links -->
      </div>
    </div>
  </div>
</div>
```

```js
import {enter, leave, toggle} from 'el-transition'

const dropdownMenu = document.getElementById("dropdown-menu")
const dropdownBtn = document.getElementById("dropdown-btn")

function openMenu() {
  enter(dropdownMenu)
}

function closeMenu() {
  leave(dropdownMenu)
}

function toggleDropdownMenu() {
    toggle(dropdownMenu)
}

dropdownBtn.addEventListener('click', toggleDropdownMenu)
```

### Transition Name Option
You may specificy a transition name and el-transtion will handle applying the inferred css classses at the each stage. If data attributes are set, those will take precedence.

Using the example transition name `dropdown` we need can declare a class per stage. 

* .dropdown-enter: Applied during the entire entering phase.
* .dropdown-enter-start: Added before element is inserted, removed one frame after element is inserted.
* .dropdown-enter-end: Added one frame after element is inserted (at the same time enter-start is removed), removed when transition/animation finishes.
* .dropdown-leave: Applied during the entire leaving phase.
* .dropdown-leave-start: Added immediately when a leaving transition is triggered, removed after one frame.
* .dropdown-leave-end: Added one frame after a leaving transition is triggered (at the same time leave-start is removed), removed when the transition/animation finishes.

```scss
// application.scss

.dropdown-enter {
  @apply transition ease-out duration-100;
}

.dropdown-enter-start {
  @apply transform opacity-0 scale-95;
}
 .dropdown-enter-end {
  @apply transform opacity-100 scale-100;
 }

.dropdown-leave {
   @apply transition ease-in duration-75;
 }

.dropdown-leave-start {
  @apply transform opacity-100 scale-100;
}

.dropdown-leave-end {
  @apply transform opacity-0 scale-95;
}
```

```html
<!-- dropdown.html -->
<div class="relative inline-block text-left">
  <div>
    <span class="rounded-md shadow-sm">
      <button type="button" class="dropdown-button" id="dropdown-btn">
        Options
      </button>
    </span>
  </div>

  <div id="dropdown-menu" class="menu hidden">
    <div class="rounded-md bg-white shadow-xs">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <!-- Menu links -->
      </div>
    </div>
  </div>
</div>
```

```js
// app.js
import {enter, leave, toggle} from 'el-transition'

const dropdownMenu = document.getElementById("dropdown-menu")
const dropdownBtn = document.getElementById("dropdown-btn")

function openMenu() {
  enter(dropdownMenu, 'dropdown')
}

function closeMenu() {
  leave(dropdownMenu, 'dropdown')
}

function toggleDropdownMenu() {
    toggle(dropdownMenu, 'dropdown')
}

dropdownBtn.addEventListener('click', toggleDropdownMenu)
```
