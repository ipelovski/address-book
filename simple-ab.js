export default {
  name: 'simple ab',
  get five() {
    return 5;
  },
  myFn() {
    return this.five;
  },
  imports: ['another ab', { 'extra ab': 'third party ab' }],
  exports: ['five', 'myFn'],
};

// use the mirror api
const mirror = ab.create('simple ab');
mirror.constant('five', 5, 'the number five');
mirror.fn(function myFn() {
  return this.five;
});
mirror.var(['a', 1], ['b', 2]);
mirror.import('another ab', { 'extra ab': 'third party ab' });
mirror.export(mirror.props.five).export('myFn');
const simpleAb = mirror.getPublic(); // => returns the exported ab, that makes certain props from the ab public
simpleAb.five + 1;
