
  let callbacks = new Map();
  let reactivties = new Map();
  let usedReactivties = [];



  let object = {
    a: { b: 3 },
    b: 2
  }

  let po = reactive(object);

  effect(() => {
    console.log(po.a.b); // 触发 get
  })

  function effect(callback) {
    usedReactivties = [];
    callback();
    console.log(usedReactivties);
    for (const reactivity of usedReactivties) {
      if (!callbacks.has(reactivity[0])) {
        callbacks.set(reactivity[0], new Map());
      }
      if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
        callbacks.get(reactivity[0]).set(reactivity[1], []);
      }
      callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
    }
  }

  function reactive(object) {
    if (reactivties.has(object)) {
      return reactivties.get(object);
    }
    let proxy = new Proxy(object, {
      set(obj, prop, val) {
        obj[prop] = val;
        if (callbacks.get(obj))
          if (callbacks.get(obj).get(prop))
            for (let callback of callbacks.get(obj).get(prop)) {
              callback();
            }
        return obj[prop];
      },
      get(obj, prop,) {
        usedReactivties.push([obj, prop]); // 记录使用中的属性
        if (typeof obj[prop] === "object")
          return reactive(obj[prop]);
        return obj[prop];
      }
    })

    reactivties.set(object, proxy);
    return proxy;
  }
