var __tests__CoreUtils_ = {
  extend_test: function() {
    const objA = { foo: "you", bar: "me" };
    const objB = { arty: "bad for the game", ten: 10 };
    CoreUtils.extend(objA, objB);
    Assert_('arty' in objA && objA.arty === objB.arty);
    Assert_('ten' in objA && objA.ten === objB.ten);
  },
};
