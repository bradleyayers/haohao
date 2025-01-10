import {
  deepTransform,
  mapInvert,
  merge,
  objectInvert,
  sortComparatorNumber,
  sortComparatorString,
} from "#util/collections.ts";
import assert from "node:assert/strict";
import test from "node:test";

void test.skip(`type checks only`, () => {
  // @ts-expect-error without arguments it only works on string elements
  [`a`, `b`].sort(sortComparatorNumber());

  // @ts-expect-error without arguments it only works on string elements
  [1, 2].sort(sortComparatorString());
});

void test(`sortComparatorString`, () => {
  {
    const arr = [`c`, `a`, `b`];
    arr.sort(sortComparatorString());
    assert.deepEqual(arr, [`a`, `b`, `c`]);
  }

  {
    const arr = [[`c`], [`a`], [`b`]];
    arr.sort(sortComparatorString(([x]) => x!));
    assert.deepEqual(arr, [[`a`], [`b`], [`c`]]);
  }
});

void test(`sortComparatorNumber`, () => {
  {
    const arr = [3, 1, 2];
    arr.sort(sortComparatorNumber());
    assert.deepEqual(arr, [1, 2, 3]);
  }

  {
    const arr = [[3], [1], [2]];
    arr.sort(sortComparatorNumber(([x]) => x!));
    assert.deepEqual(arr, [[1], [2], [3]]);
  }
});

void test(`merge`, () => {
  assert.deepEqual(merge(null, null), null);
  assert.deepEqual(merge(null, 1), 1);
  assert.deepEqual(merge(1, null), 1);
  assert.deepEqual(merge([1], [2]), [1, 2]);
  assert.deepEqual(
    merge(new Map([[`key1`, `value1`]]), new Map([[`key2`, `value2`]])),
    new Map([
      [`key1`, `value1`],
      [`key2`, `value2`],
    ]),
  );
  assert.deepEqual(
    merge(
      new Map([[`key1`, new Map([[`key1.1`, `value1.1`]])]]),
      new Map([[`key1`, new Map([[`key2.1`, `value2.1`]])]]),
    ),
    new Map([
      [
        `key1`,
        new Map([
          [`key1.1`, `value1.1`],
          [`key2.1`, `value2.1`],
        ]),
      ],
    ]),
  );
});

void test(`deepTransform`, () => {
  assert.deepEqual(
    deepTransform(null, (x) => x),
    null,
  );
  assert.deepEqual(
    deepTransform(new Map([[`key1`, `value1`]]), (x) =>
      x instanceof Map ? Object.fromEntries(x.entries()) : x,
    ),
    { key1: `value1` },
  );
});

void test(`objectInvert`, () => {
  assert.deepEqual(objectInvert({}), {});
  assert.deepEqual(objectInvert({ a: 1, b: 2 }), { 1: `a`, 2: `b` });
});

void test(`mapInvert`, () => {
  assert.deepEqual(mapInvert(new Map()), new Map());
  assert.deepEqual(
    mapInvert(
      new Map<string | number, string | number>([
        [1, 2],
        [`a`, `b`],
      ]),
    ),
    new Map<string | number, string | number>([
      [2, 1],
      [`b`, `a`],
    ]),
  );
});
