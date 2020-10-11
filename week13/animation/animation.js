const TICK = Symbol("tick");
const TICk_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const ANIMATION_START_TIME = Symbol("a-start-time");

// 用于暂停动画
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");


export class TimeLine {
  constructor() {
    this.state = 'Init';
    this[ANIMATIONS] = new Set();
    this[ANIMATION_START_TIME] = new Map();
  }
  start() {
    if (this.state !== 'Init') return;
    this.state = 'Started';

    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      for (const animation of this[ANIMATIONS]) {
        let t;

        // 调用 start() 之前已 tl.add(anim) 添加进来, 则从 start() 调用开始运行; 
        if (this[ANIMATION_START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME] - animation.delay;
        }
        // start() 之后才 add() 的 anim 从 add 的时刻开始执行
        else {
          t = now - this[ANIMATION_START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        }
        if (animation.duration < t) {
          this[ANIMATIONS].delete(animation);
          t = animation.duration;
        }

        // t < 0 说明动画还没开始
        if (t > 0) {
          animation.receive(t);
        }
      }

      this[TICk_HANDLER] = requestAnimationFrame(this[TICK]);
    }
    this[TICK]();
  }

  // 停止动画
  pause() {
    if (this.state !== 'Started') return;
    this.state = 'Paused';

    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICk_HANDLER]);
  }

  // 继续动画
  resume() {
    if (this.state !== 'Paused') return;
    this.state = 'Started';

    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  // 重置
  reset() {
    this.pause();
    this.state = 'Init';

    // let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[PAUSE_START] = 0;
    this[ANIMATIONS] = new Set();
    this[ANIMATION_START_TIME] = new Map();
    this[TICk_HANDLER] = null;
  }

  // 添加新的动画开始时间
  add(animation, aStartTime = Date.now()) {
    // if(arguments.length < 2){
    //   addTime = Date.now();
    // }
    this[ANIMATIONS].add(animation);
    this[ANIMATION_START_TIME].set(animation, aStartTime);
  }
}


export class Animation {
  /**
   * 
   * @param {*} object 
   * @param {*} property 
   * @param {*} startValue 开始位置
   * @param {*} endValue 结束位置
   * @param {*} duration 时长
   * @param {*} delay 延时
   * @param {*} timingFunction 动画方式
   * @param {*} template 
   */
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction || ((v) => v);
    this.template = template || ((v) => v);
  }

  receive(time) {
    let range = (this.endValue - this.startValue);

    let progress = this.timingFunction(time / this.duration);
    let v = this.startValue + range * progress;

    this.object[this.property] = this.template(v);
  }
}