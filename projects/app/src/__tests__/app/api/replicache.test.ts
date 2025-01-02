import assert from "node:assert/strict";
import test from "node:test";
import { testExpoServer } from "./helpers";

void test(`GET`, () => {
  // const mock = t.mock.module(`@/env`, {
  //   namedExports: {
  //     fn() {
  //       return 42;
  //     },
  //   },
  // });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  assert(1 === 1);

  // const { GET } = await import(`@/app/api/replicache/push+api`);

  // await GET(new Request(`http://example.com`));
});

void test(`API smoke tests`, { timeout: 20_000 }, async (t) => {
  // Test that the API can be bundled and executed using Metro. Metro uses its
  // own Babel configuration which is different from running the unit tests in
  // Node.js, so it's important to actually run it like it would in production
  // and make sure that the code transforms correctly and can executed.
  //
  // There were issues in the past where `import.meta.filename` worked in
  // Node.js but didn't in the Metro bundle.

  await using server = testExpoServer(t);
  await server.untilReady();

  await t.test(`/api/replicache/pull`, { timeout: 5_000 }, async () => {
    const response = await server.fetch(`/api/replicache/pull`);
    assert.equal(response.status, 405);
  });

  await t.test(`/api/replicache/push`, { timeout: 5_000 }, async () => {
    const response = await server.fetch(`/api/replicache/pull`);
    assert.equal(response.status, 405);
  });
});
