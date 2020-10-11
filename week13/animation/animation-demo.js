import { ease, easeIn, easeOut, easeInOut } from "./timing.js"
import { TimeLine, Animation } from "./animation.js";

let tl = new TimeLine();
tl.start();


// const a1 = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 2000, 0, null, (v) => console.log(v));
// tl.add(a1)

const el1 = document.getElementById('el1');
const el2 = document.getElementById('el2');
tl.add(new Animation(el1.style, 'transform', 0, 500, 3000, 0, ease, (v) => `translateX(${v}px)`));
tl.add(new Animation(el2.style, 'transform', 0, 500, 3000, 0, null, (v) => `translateX(${v}px)`));


document.querySelector("#pause-btn").addEventListener('click', () => tl.pause());
document.querySelector("#resume-btn").addEventListener('click', () => tl.resume());
