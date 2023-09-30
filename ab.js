(function () {
  const ab = {
    abs: new Map(),
    create(name) {
      const ab = this.Ab.clone({ name });
      this.abs.set(name, ab);
      return ab;
    },
    get(name) {
      return this.abs.get(name);
    },
    AbMirrorProto,
    // An exemplar for making address-books mirrors.
    Ab: Object.assign(Object.create(AbMirrorProto), {
      clone(init) {
        return Object.assign(Object.create(AbMirrorProto), this, init);
      },
    }),
  };
  // The prototype of the address-book mirrors.
  const AbMirrorProto = {
    name: '',
    _ab: {},
    _help: {},
    _public: undefined,
    init(fn) {
      this._ab.init = fn;
    },
    var(name, value, help) {
      this._ab[name] = value;
      this._help[name] = help;
      return this;
    },
    fn(name, fn, help) {
      const fnString = fn.toString();
      // const fnName = extractName(fnString);
      const fnParams = extractParams(fnString);
      const fnBody = extractBody(fnString);
      const body = `
        const fn = function ${name}(${fnParams}){ ${fnBody} };
        fn[Symbol.for('ab')] = ab;
        fn[Symbol.for('ab.indexProp')] = ab.props.length;
        ab.props.push(fn);
        return fn;
      `;
      this._help[name] = help;
      const boundFn = (new Function('ab', body))(ab);
      this._ab[name] = boundFn;
      return this;
    },
    export(...names) {
      if (this._public == null) {
        this._public = ab.create();
      }
      names.forEach((name) => {
        // this.public
      });
      return this;
    },
    get() {
      return this._ab;
    },
    getPublic() {
      return this._public;
    },
  };
  window.ab = ab;
}());
