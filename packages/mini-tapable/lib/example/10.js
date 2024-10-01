(function anonymous(name, age) {
  var _x = this._x;
  var _context = {};
  var _taps = this.taps;
  var _interceptors = this.interceptors;
  _interceptors[0].call(_context, name, age);
  _interceptors[1].call(_context, name, age);
  var _tap0 = _taps[0];
  _interceptors[0].tap(_context, _tap0);
  _interceptors[1].tap(_context, _tap0);
  var _fn0 = _x[0];
  _fn0(_context, name, age);
  var _tap1 = _taps[1];
  _interceptors[0].tap(_context, _tap1);
  _interceptors[1].tap(_context, _tap1);
  var _fn1 = _x[1];
  _fn1(_context, name, age);
});
