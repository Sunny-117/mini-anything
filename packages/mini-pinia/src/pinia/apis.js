export function patch (value) {
  const store = this;

  for (let key in value) {
    store[key]  = value[key];
  }
}