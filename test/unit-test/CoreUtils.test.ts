// TODO: move unit tests like this to a widely-supported framework like jasmine
var __gasptestsuite__CoreUtils_ = {
  extend_test: function() {
    let objA: Record<string, any> = { foo: "you", bar: "me" };
    const objB = { arty: "bad for the game", ten: 10 };
    objA = CoreUtils.extend(objA, objB);
    Assert_('arty' in objA && objA.arty === objB.arty);
    Assert_('ten' in objA && objA.ten === objB.ten);
  },
};
