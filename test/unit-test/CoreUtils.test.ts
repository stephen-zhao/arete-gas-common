// TODO: move unit tests like this to a widely-supported framework like jasmine
var __gaspTestSuite__CoreUtils_ = {
  extend_test: function() {
    let objA: Record<string, any> = { foo: "you", bar: "me" };
    const objB = { arty: "bad for the game", ten: 10 };
    objA = CoreUtils.extend(objA, objB);
    __gasp__assert('arty' in objA && objA.arty === objB.arty);
    __gasp__assert('ten' in objA && objA.ten === objB.ten);
  },
};
