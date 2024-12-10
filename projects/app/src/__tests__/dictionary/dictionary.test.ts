import {
  allHsk1Words,
  allHsk2Words,
  allHsk3Words,
  allRadicalPrimaryForms,
  allRadicalsByStrokes,
  convertPinyinWithToneNumberToToneMark,
  flattenIds,
  idsNodeToString,
  IdsOperator,
  loadHanziDecomposition,
  loadHhPinyinChart,
  loadHmmPinyinChart,
  loadMmPinyinChart,
  loadMnemonicThemeChoices,
  loadMnemonicThemes,
  loadPinyinWords,
  loadRadicalNameMnemonics,
  loadRadicalPinyinMnemonics,
  loadRadicals,
  loadStandardPinyinChart,
  loadWords,
  parseIds,
  walkIdsNode,
} from "@/dictionary/dictionary";
import { sortComparatorNumber } from "@/util/collections";
import assert from "node:assert";
import test from "node:test";
import { DeepReadonly } from "ts-essentials";

void test(`radical groups have the right number of elements`, async () => {
  // Data integrity test to ensure that the number of characters in each group
  // matches the expected range.
  const radicalsByStrokes = await allRadicalsByStrokes();
  for (const [, group] of radicalsByStrokes.entries()) {
    assert(group.characters.length === group.range[1] - group.range[0] + 1);
  }
});

void test(`json data can be loaded and passes the schema validation`, async () => {
  await allHsk1Words();
  await allHsk2Words();
  await allHsk3Words();
  await allRadicalPrimaryForms();
  await loadHanziDecomposition();
  await loadHhPinyinChart();
  await loadHmmPinyinChart();
  await loadMmPinyinChart();
  await loadMnemonicThemeChoices();
  await loadMnemonicThemes();
  await loadPinyinWords();
  await loadRadicalNameMnemonics();
  await loadRadicalPinyinMnemonics();
  await loadRadicals();
  await loadStandardPinyinChart();
  await loadWords();
});

void test(`there are no pronunciations mixed into word definitions`, async () => {
  const words = await loadWords();

  for (const [, { definitions }] of words) {
    for (const definition of definitions) {
      assert.doesNotMatch(definition, /also pr[a-z]*\.? \[/);
      assert.doesNotMatch(definition, /pronunciation /);
      // assert.doesNotMatch(definition, /\[/); // TODO
    }
  }
});

void test(`there are 214 radicals to match official kangxi radicals`, async () => {
  const radicals = await loadRadicals();
  assert.strictEqual(radicals.length, 214);
});

void test(`radical name mnemonics don't include radical alternatives`, async () => {
  const radicalNameMnemonics = await loadRadicalNameMnemonics();
  const primarySet = new Set(await allRadicalPrimaryForms());

  const radicalsWithNameMnemonics = new Set(radicalNameMnemonics.keys());

  assert.deepStrictEqual(
    radicalsWithNameMnemonics.difference(primarySet),
    new Set(),
  );
});

void test(`radical pinyin mnemonics don't include radical alternatives`, async () => {
  const pinyinMnemonics = await loadRadicalPinyinMnemonics();
  const primarySet = new Set(await allRadicalPrimaryForms());

  const radicalsWithNameMnemonics = new Set(pinyinMnemonics.keys());

  assert.deepStrictEqual(
    radicalsWithNameMnemonics.difference(primarySet),
    new Set(),
  );
});

void test(`radical data uses consistent unicode characters`, async () => {
  const primary = await allRadicalPrimaryForms();
  const primarySet = new Set(primary);

  {
    const violations = primary.filter(isNotCjkUnifiedIdeograph);
    assert.deepStrictEqual(
      violations,
      [],
      await debugNonCjkUnifiedIdeographs(violations),
    );
  }

  {
    const sample = [...(await loadRadicalNameMnemonics()).keys()];
    assert.deepStrictEqual(new Set(sample).difference(primarySet), new Set());
    assert.deepStrictEqual(sample.filter(isNotCjkUnifiedIdeograph), []);
  }

  {
    const sample = (await allRadicalsByStrokes())
      .values()
      .flatMap((r) => r.characters);

    {
      const diff = new Set(sample).difference(primarySet);
      assert.deepStrictEqual(
        diff,
        new Set(),
        await debugNonCjkUnifiedIdeographs([...diff]),
      );
    }
    assert.deepStrictEqual([...sample].filter(isNotCjkUnifiedIdeograph), []);
  }
});

void test(`convertPinyinWithToneNumberToToneMark`, () => {
  // Rules: (from https://en.wikipedia.org/wiki/Pinyin)
  // 1. If there is an a or an e, it will take the tone mark
  // 2. If there is an ou, then the o takes the tone mark
  // 3. Otherwise, the second vowel takes the tone mark

  for (const [input, expected] of [
    // a
    [`a`, `a`],
    [`a1`, `ā`],
    [`a2`, `á`],
    [`a3`, `ǎ`],
    [`a4`, `à`],
    [`a5`, `a`],
    // e
    [`e`, `e`],
    [`e1`, `ē`],
    [`e2`, `é`],
    [`e3`, `ě`],
    [`e4`, `è`],
    [`e5`, `e`],
    // i
    [`bi`, `bi`],
    [`bi1`, `bī`],
    [`bi2`, `bí`],
    [`bi3`, `bǐ`],
    [`bi4`, `bì`],
    [`bi5`, `bi`],
    // o
    [`o`, `o`],
    [`o1`, `ō`],
    [`o2`, `ó`],
    [`o3`, `ǒ`],
    [`o4`, `ò`],
    [`o5`, `o`],
    // u
    [`u`, `u`],
    [`u1`, `ū`],
    [`u2`, `ú`],
    [`u3`, `ǔ`],
    [`u4`, `ù`],
    [`u5`, `u`],
    // u
    [`v`, `ü`],
    [`v1`, `ǖ`],
    [`v2`, `ǘ`],
    [`v3`, `ǚ`],
    [`v4`, `ǜ`],
    [`v5`, `ü`],

    // If there is an ou, then the o takes the tone mark
    [`dou`, `dou`],
    [`dou1`, `dōu`],
    [`dou2`, `dóu`],
    [`dou3`, `dǒu`],
    [`dou4`, `dòu`],
    [`dou5`, `dou`],

    // A few examples
    [`hao3`, `hǎo`],
    [`zhu5`, `zhu`],
    [`zi5`, `zi`],
  ] as const) {
    assert.strictEqual(convertPinyinWithToneNumberToToneMark(input), expected);
  }
});

void test(`flattenIds handles ⿱⿱ to ⿳ and ⿰⿰ to ⿲`, () => {
  for (const [input, expected] of [
    [`⿱⿱abc`, `⿳abc`],
    [`⿱a⿱bc`, `⿳abc`],
    [`⿰⿰abc`, `⿲abc`],
    [`⿰a⿰bc`, `⿲abc`],
  ] as const) {
    assert.strictEqual(idsNodeToString(flattenIds(parseIds(input))), expected);
  }
});

/**
 * `[label, match1, match2, ...]`
 */
type PinyinProduction = readonly string[];

function expandCombinations(
  rules: readonly PinyinProduction[],
): readonly [string, string][] {
  return rules.flatMap(([label, ...xs]): [string, string][] =>
    xs.map((x) => [label!, x] as const),
  );
}

function splitPinyin(
  pinyin: string,
  chart: PinyinChart,
): readonly [initial: string, final: string] | null {
  const initialsList = expandCombinations(
    chart.initials.flatMap((x) => x.initials),
  )
    // There's some overlap with initials and finals, the algorithm should use
    // the longest possible initial.
    .toSorted(sortComparatorNumber(([, x]) => x.length))
    .reverse();
  const finalsList = expandCombinations(chart.finals)
    // There's some overlap with initials and finals, the algorithm should use
    // the longest possible initial.
    .toSorted(sortComparatorNumber((x) => x.length))
    .reverse();

  const override = chart.overrides?.[pinyin];
  if (override) {
    return override;
  }

  for (const [initialLabel, initial] of initialsList) {
    if (pinyin.startsWith(initial)) {
      const final = pinyin.slice(initial.length);
      for (const [finalLabel, finalCandiate] of finalsList) {
        if (final === finalCandiate) {
          return [initialLabel, finalLabel];
        }
      }
    }
  }

  return null;
}

interface PinyinChart {
  initials: DeepReadonly<{ id: string; desc: string; initials: string[][] }[]>;
  finals: readonly PinyinProduction[];
  overrides?: DeepReadonly<Record<string, [initial: string, final: string]>>;
}

async function testPinyinChart(
  chart: PinyinChart,
  testCases: readonly [string, string, string][] = [],
): Promise<void> {
  const pinyinWords = await loadPinyinWords();

  // Start with test cases first as these are easier to debug.
  for (const [input, initial, final] of testCases) {
    assert.deepStrictEqual(
      splitPinyin(input, chart),
      [initial, final],
      `${input} didn't split as expected`,
    );
  }

  for (const x of pinyinWords) {
    assert.notEqual(splitPinyin(x, chart), null, `couldn't split ${x}`);
  }

  // Ensure that there are no duplicates initials or finals.
  assertUniqueArray(
    chart.initials.map((x) => x.initials).flatMap(([, ...x]) => x),
  );
  assertUniqueArray(chart.finals.flatMap(([, ...x]) => x));
}

function assertUniqueArray<T>(items: readonly T[]): void {
  const seen = new Set();
  const duplicates = [];
  for (const x of items) {
    if (!seen.has(x)) {
      seen.add(x);
    } else {
      duplicates.push(x);
    }
  }
  assert.deepStrictEqual(duplicates, [], `expected no duplicates`);
}

void test(`standard pinyin covers kangxi pinyin`, async () => {
  const chart = await loadStandardPinyinChart();

  await testPinyinChart(chart, [
    [`a`, `∅`, `a`],
    [`an`, `∅`, `an`],
    [`ê`, `∅`, `ê`],
    [`ju`, `j`, `ü`],
    [`qu`, `q`, `ü`],
    [`xu`, `x`, `ü`],
    [`bu`, `b`, `u`],
    [`pu`, `p`, `u`],
    [`mu`, `m`, `u`],
    [`fu`, `f`, `u`],
    [`du`, `d`, `u`],
    [`tu`, `t`, `u`],
    [`nu`, `n`, `u`],
    [`lu`, `l`, `u`],
    [`gu`, `g`, `u`],
    [`ku`, `k`, `u`],
    [`hu`, `h`, `u`],
    [`wu`, `∅`, `u`],
    [`wa`, `∅`, `ua`],
    [`er`, `∅`, `er`],
    [`yi`, `∅`, `i`],
    [`ya`, `∅`, `ia`],
    [`yo`, `∅`, `io`],
    [`ye`, `∅`, `ie`],
    [`yai`, `∅`, `iai`],
    [`yao`, `∅`, `iao`],
    [`you`, `∅`, `iu`],
    [`yan`, `∅`, `ian`],
    [`yin`, `∅`, `in`],
    [`yang`, `∅`, `iang`],
    [`ying`, `∅`, `ing`],
    [`wu`, `∅`, `u`],
    [`wa`, `∅`, `ua`],
    [`wo`, `∅`, `uo`],
    [`wai`, `∅`, `uai`],
    [`wei`, `∅`, `ui`],
    [`wan`, `∅`, `uan`],
    [`wen`, `∅`, `un`],
    [`wang`, `∅`, `uang`],
    [`weng`, `∅`, `ong`],
    [`ong`, `∅`, `ong`],
    [`yu`, `∅`, `ü`],
    [`yue`, `∅`, `üe`],
    [`yuan`, `∅`, `üan`],
    [`yun`, `∅`, `ün`],
    [`yong`, `∅`, `iong`],
    [`ju`, `j`, `ü`],
    [`jue`, `j`, `üe`],
    [`juan`, `j`, `üan`],
    [`jun`, `j`, `ün`],
    [`jiong`, `j`, `iong`],
    [`qu`, `q`, `ü`],
    [`que`, `q`, `üe`],
    [`quan`, `q`, `üan`],
    [`qun`, `q`, `ün`],
    [`qiong`, `q`, `iong`],
    [`xu`, `x`, `ü`],
    [`xue`, `x`, `üe`],
    [`xuan`, `x`, `üan`],
    [`xun`, `x`, `ün`],
    [`xiong`, `x`, `iong`],
  ]);
});

void test(`mm pinyin covers kangxi pinyin`, async () => {
  const chart = await loadMmPinyinChart();

  await testPinyinChart(chart, [
    [`zhang`, `zh`, `ang`],
    [`bao`, `b`, `ao`],
    [`ao`, `∅`, `ao`],
    [`ba`, `b`, `a`],
    [`ci`, `c`, `∅`],
    [`chi`, `ch`, `∅`],
    [`cong`, `cu`, `(e)ng`],
    [`chong`, `chu`, `(e)ng`],
    [`chui`, `chu`, `ei`],
    [`diu`, `di`, `ou`],
    [`miu`, `mi`, `ou`],
    [`niu`, `ni`, `ou`],
    [`you`, `y`, `ou`],
    [`yin`, `y`, `(e)n`],
    [`ê`, `∅`, `e`],
    [`er`, `∅`, `∅`],
    // [`zh(i)`, `zh`, `∅`], // ?
    [`zha`, `zh`, `a`],
    [`zhong`, `zhu`, `(e)ng`],
    [`zhe`, `zh`, `e`],
    [`ta`, `t`, `a`],
    [`a`, `∅`, `a`],
    [`xing`, `xi`, `(e)ng`],
    [`qing`, `qi`, `(e)ng`],
  ]);
});

void test(`hh pinyin covers kangxi pinyin`, async () => {
  const chart = await loadHhPinyinChart();

  await testPinyinChart(chart, [
    [`a`, `_`, `a`],
    [`bi`, `bi`, `_`],
    [`tie`, `ti`, `e`],
    [`zhou`, `zh`, `(o)u`],
    [`zhuo`, `zhu`, `o`],
  ]);
});

void test(`hmm pinyin covers kangxi pinyin`, async () => {
  const chart = await loadHmmPinyinChart();

  assert.strictEqual(chart.initials.flatMap((i) => i.initials).length, 55);
  assert.strictEqual(chart.finals.length, 13);

  await testPinyinChart(chart, [
    [`a`, `∅`, `a`],
    [`er`, `∅`, `∅`],
    [`ci`, `c`, `∅`],
    [`yi`, `yi`, `∅`],
    [`ya`, `yi`, `a`],
    [`wa`, `wu`, `a`],
    [`wu`, `wu`, `∅`],
    [`bi`, `bi`, `∅`],
    [`bin`, `bi`, `(e)n`],
    [`meng`, `m`, `(e)ng`],
    [`ming`, `mi`, `(e)ng`],
    [`li`, `li`, `∅`],
    [`diu`, `di`, `ou`],
    [`lu`, `lu`, `∅`],
    [`lü`, `lü`, `∅`],
    [`tie`, `ti`, `e`],
    [`zhou`, `zh`, `ou`],
    [`zhuo`, `zhu`, `o`],
    [`shua`, `shu`, `a`],
  ]);
});

void test(`parseIds handles 1 depth`, () => {
  assert.deepStrictEqual(parseIds(`木`), {
    type: `LeafCharacter`,
    character: `木`,
  });

  // 相
  assert.deepStrictEqual(parseIds(`⿰木目`), {
    type: IdsOperator.LeftToRight,
    left: { type: `LeafCharacter`, character: `木` },
    right: { type: `LeafCharacter`, character: `目` },
  });

  // 杏
  assert.deepStrictEqual(parseIds(`⿱木口`), {
    type: IdsOperator.AboveToBelow,
    above: { type: `LeafCharacter`, character: `木` },
    below: { type: `LeafCharacter`, character: `口` },
  });

  // 衍
  assert.deepStrictEqual(parseIds(`⿲彳氵亍`), {
    type: IdsOperator.LeftToMiddleToRight,
    left: { type: `LeafCharacter`, character: `彳` },
    middle: { type: `LeafCharacter`, character: `氵` },
    right: { type: `LeafCharacter`, character: `亍` },
  });

  // 京
  assert.deepStrictEqual(parseIds(`⿳亠口小`), {
    type: IdsOperator.AboveToMiddleAndBelow,
    above: { type: `LeafCharacter`, character: `亠` },
    middle: { type: `LeafCharacter`, character: `口` },
    below: { type: `LeafCharacter`, character: `小` },
  });

  // 回
  assert.deepStrictEqual(parseIds(`⿴囗口`), {
    type: IdsOperator.FullSurround,
    surrounding: { type: `LeafCharacter`, character: `囗` },
    surrounded: { type: `LeafCharacter`, character: `口` },
  });

  // 凰
  assert.deepStrictEqual(parseIds(`⿵几皇`), {
    type: IdsOperator.SurroundFromAbove,
    above: { type: `LeafCharacter`, character: `几` },
    surrounded: { type: `LeafCharacter`, character: `皇` },
  });

  // 凶
  assert.deepStrictEqual(parseIds(`⿶凵㐅`), {
    type: IdsOperator.SurroundFromBelow,
    below: { type: `LeafCharacter`, character: `凵` },
    surrounded: { type: `LeafCharacter`, character: `㐅` },
  });

  // 匠
  assert.deepStrictEqual(parseIds(`⿷匚斤`), {
    type: IdsOperator.SurroundFromLeft,
    left: { type: `LeafCharacter`, character: `匚` },
    surrounded: { type: `LeafCharacter`, character: `斤` },
  });

  // 㕚
  assert.deepStrictEqual(parseIds(`⿼叉丶`), {
    type: IdsOperator.SurroundFromRight,
    right: { type: `LeafCharacter`, character: `叉` },
    surrounded: { type: `LeafCharacter`, character: `丶` },
  });

  // 病
  assert.deepStrictEqual(parseIds(`⿸疒丙`), {
    type: IdsOperator.SurroundFromUpperLeft,
    upperLeft: { type: `LeafCharacter`, character: `疒` },
    surrounded: { type: `LeafCharacter`, character: `丙` },
  });

  // 戒
  assert.deepStrictEqual(parseIds(`⿹戈廾`), {
    type: IdsOperator.SurroundFromUpperRight,
    upperRight: { type: `LeafCharacter`, character: `戈` },
    surrounded: { type: `LeafCharacter`, character: `廾` },
  });

  // 超
  assert.deepStrictEqual(parseIds(`⿺走召`), {
    type: IdsOperator.SurroundFromLowerLeft,
    lowerLeft: { type: `LeafCharacter`, character: `走` },
    surrounded: { type: `LeafCharacter`, character: `召` },
  });

  // 氷
  assert.deepStrictEqual(parseIds(`⿽水丶`), {
    type: IdsOperator.SurroundFromLowerRight,
    lowerRight: { type: `LeafCharacter`, character: `水` },
    surrounded: { type: `LeafCharacter`, character: `丶` },
  });

  // 巫
  assert.deepStrictEqual(parseIds(`⿻工从`), {
    type: IdsOperator.Overlaid,
    overlay: { type: `LeafCharacter`, character: `工` },
    underlay: { type: `LeafCharacter`, character: `从` },
  });

  // 卐
  assert.deepStrictEqual(parseIds(`⿾卍`), {
    type: IdsOperator.HorizontalReflection,
    reflected: { type: `LeafCharacter`, character: `卍` },
  });

  // 𠕄
  assert.deepStrictEqual(parseIds(`⿿凹`), {
    type: IdsOperator.Rotation,
    rotated: { type: `LeafCharacter`, character: `凹` },
  });

  assert.deepStrictEqual(parseIds(`①`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 1,
  });

  assert.deepStrictEqual(parseIds(`②`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 2,
  });

  assert.deepStrictEqual(parseIds(`③`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 3,
  });

  assert.deepStrictEqual(parseIds(`④`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 4,
  });

  assert.deepStrictEqual(parseIds(`⑤`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 5,
  });

  assert.deepStrictEqual(parseIds(`⑥`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 6,
  });

  assert.deepStrictEqual(parseIds(`⑦`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 7,
  });

  assert.deepStrictEqual(parseIds(`⑧`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 8,
  });

  assert.deepStrictEqual(parseIds(`⑨`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 9,
  });

  assert.deepStrictEqual(parseIds(`⑩`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 10,
  });

  assert.deepStrictEqual(parseIds(`⑪`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 11,
  });

  assert.deepStrictEqual(parseIds(`⑫`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 12,
  });

  assert.deepStrictEqual(parseIds(`⑬`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 13,
  });

  assert.deepStrictEqual(parseIds(`⑭`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 14,
  });

  assert.deepStrictEqual(parseIds(`⑮`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 15,
  });

  assert.deepStrictEqual(parseIds(`⑯`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 16,
  });

  assert.deepStrictEqual(parseIds(`⑰`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 17,
  });

  assert.deepStrictEqual(parseIds(`⑱`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 18,
  });

  assert.deepStrictEqual(parseIds(`⑲`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 19,
  });

  assert.deepStrictEqual(parseIds(`⑳`), {
    type: `LeafUnknownCharacter`,
    strokeCount: 20,
  });
});

void test(`parseIds handles 2 depth`, () => {
  {
    const cursor = { index: 0 };
    assert.deepStrictEqual(parseIds(`⿰a⿱bc`, cursor), {
      type: IdsOperator.LeftToRight,
      left: { type: `LeafCharacter`, character: `a` },
      right: {
        type: IdsOperator.AboveToBelow,
        above: { type: `LeafCharacter`, character: `b` },
        below: { type: `LeafCharacter`, character: `c` },
      },
    });
    assert.deepStrictEqual(cursor, { index: 5 });
  }

  {
    const cursor = { index: 0 };
    assert.deepStrictEqual(parseIds(`⿱a⿳bc⿴de`, cursor), {
      type: IdsOperator.AboveToBelow,
      above: { type: `LeafCharacter`, character: `a` },
      below: {
        type: IdsOperator.AboveToMiddleAndBelow,
        above: { type: `LeafCharacter`, character: `b` },
        middle: { type: `LeafCharacter`, character: `c` },
        below: {
          type: IdsOperator.FullSurround,
          surrounding: { type: `LeafCharacter`, character: `d` },
          surrounded: { type: `LeafCharacter`, character: `e` },
        },
      },
    });
    assert.deepStrictEqual(cursor, { index: 8 });
  }
});

void test(`walkIdsNode`, () => {
  const ids = parseIds(`⿰a⿱bc`);

  const leafs = [...walkIdsNode(ids)].map((x) => {
    switch (x.type) {
      case `LeafCharacter`:
        return x.character;
      case `LeafUnknownCharacter`:
        return x.strokeCount;
    }
  });

  assert.deepStrictEqual(leafs, [`a`, `b`, `c`]);
});

void test(`idsNodeToString roundtrips`, () => {
  for (const input of [
    [`木`],
    [`⿰木目`, `⿱木口`, `⿲彳氵亍`, `⿳亠口小`],
    [`⿴囗口`, `⿵几皇`, `⿶凵㐅`, `⿷匚斤`, `⿸疒丙`, `⿹戈廾`],
    [`⿺走召`],
    [`⿻工从`],
    [`⿼叉丶`],
    [`⿽水丶`],
    [`⿾卍`],
    [`⿿凹`],
    [`①`, `②`, `③`, `④`, `⑤`, `⑥`, `⑦`, `⑧`, `⑨`, `⑩`],
    [`⑪`, `⑫`, `⑬`, `⑭`, `⑮`, `⑯`, `⑰`, `⑱`, `⑲`, `⑳`],
  ].flatMap((x) => x)) {
    assert.strictEqual(idsNodeToString(parseIds(input)), input);
  }
});

async function debugNonCjkUnifiedIdeographs(chars: string[]): Promise<string> {
  const swaps = [];

  for (const x of chars) {
    const unified = await kangxiRadicalToCjkRadical(x);
    const msg =
      unified == null
        ? `${x} -> ???`
        : `${x} (${x.codePointAt(0)?.toString(16)}) -> ${unified} (${unified.codePointAt(0)?.toString(16)})`;
    swaps.push(msg);
  }

  return swaps.join(`, `);
}

function isCjkUnifiedIdeograph(char: string): boolean {
  return char.charCodeAt(0) >= 0x4e00 && char.charCodeAt(0) <= 0x9fff;
}

function isNotCjkUnifiedIdeograph(char: string): boolean {
  return !isCjkUnifiedIdeograph(char);
}

async function kangxiRadicalToCjkRadical(
  kangxi: string,
): Promise<string | undefined> {
  const xCodePoint = kangxi.codePointAt(0)!;

  const { EquivalentUnifiedIdeograph } = await import(
    `ucd-full/EquivalentUnifiedIdeograph.json`
  );

  const newCodePoint = EquivalentUnifiedIdeograph.find((rule) => {
    const minHex = rule.range[0]!;
    const maxHex = rule.range[1] ?? rule.range[0]!;

    const min = parseInt(minHex, 16);
    const max = parseInt(maxHex, 16);

    return xCodePoint >= min && xCodePoint <= max;
  })?.unified;

  if (newCodePoint != null) {
    return String.fromCodePoint(parseInt(newCodePoint, 16));
  }
}
