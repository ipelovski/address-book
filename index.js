/**
 * @type {import("umbrellajs").Umbrella}
 */
var u = window.u;

const ab = window.ab = {
  toString(value) {
    if (typeof value === 'string') {
      return '"' + value + '"';
    }
    if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
      return value + '';
    } else if (typeof value === 'function') {
      const s = value.toString();
      if (s.startsWith('(')) {
        return s;
      } else if (s.startsWith('function')) {
        const c = s['function'.length];
        if (c === ' ' || c === '\n' || c === '\t' || c === '(') {
          return s;
        } else {
          return 'function ' + s;
        }
      } else {
        return 'function ' + s;
      }
      return 
    } else if (typeof value === 'object') {
      return '({' + Reflect.ownKeys(value).map((key) => {
        const v = value[key];
        const s = this.toString(v);
        return `${key}:${s},`
      }).join('') + '})';
    }
  },
};

ab.contextMenu = {
  id: 'contextMenu',
  init() {
    u(document).on('contextmenu', (e) => {
      u('#' + this.id).remove();
      u('body').append(this.create());
      e.preventDefault();
    });
  },
  create() {
    return u('<table>').attr('id', this.id)
      .append(u('<tr>')
        .append(u('<td>').text('Sandbox').on('click', () => this.sandBox())));
  },
  sandBox() {
    ab.sandBox.init();
  },
};

ab.sandBox = {
  id: 'sandBox',
  init() {
    u('#' + this.id).remove();
    u('body').append(this.create());
    u('#' + this.id).each((n) => n.focus());
  },
  create() {
    return u('<div>')
      .attr('id', this.id)
      .attr('contenteditable', 'true')
      .text('Type here...');
  },
};

ab.contextMenu.init();
