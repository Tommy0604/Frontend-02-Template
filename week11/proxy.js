let obj = {
    a: 1,
    b: 2
  }

  let po = reactive(obj);

  let reactive = new Proxy(obj, {
    set(obj, prop, val) {
      console.log(obj, prop, val);
      obj[prop] = val;
      return obj[prop];
    },
    get(obj, prop,){
      console.log(obj, prop);
      return obj[prop];
    }
  })