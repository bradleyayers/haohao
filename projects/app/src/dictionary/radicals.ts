import { invariant } from "@haohaohow/lib/invariant";
import { mnemonics } from "./radicalNameMnemonics.gen";

interface RadicalDatum {
  hanzi: string[];
  name: string[];
  pinyin: string[];
}

export interface Radical {
  hanzi: string[];
  nameMnemonic?: string;
  name: string[];
  pinyin: string[];
}

const radicalData: RadicalDatum[] = [
  { hanzi: [`一`], name: [`one`], pinyin: [`yī`] },
  { hanzi: [`丨`], name: [`line`], pinyin: [`gǔn`] },
  { hanzi: [`丶`], name: [`dot`], pinyin: [`zhǔ`] },
  { hanzi: [`丿`, `乀`, `⺄`], name: [`slash`], pinyin: [`piě`] },
  { hanzi: [`乙`, `乚`, `乛`], name: [`second`], pinyin: [`yǐ`] },
  { hanzi: [`亅`], name: [`hook`], pinyin: [`jué`] },
  { hanzi: [`二`], name: [`two`], pinyin: [`èr`] },
  { hanzi: [`亠`], name: [`lid`], pinyin: [`tóu`] },
  { hanzi: [`人`, `亻`], name: [`man`], pinyin: [`rén`] },
  { hanzi: [`儿`], name: [`son`, `legs`], pinyin: [`ér`] },
  { hanzi: [`入`], name: [`enter`], pinyin: [`rù`] },
  { hanzi: [`八`, `丷`], name: [`eight`], pinyin: [`bā`] },
  { hanzi: [`冂`], name: [`wide`], pinyin: [`jiōng`] },
  { hanzi: [`冖`], name: [`cloth cover`], pinyin: [`mì`] },
  { hanzi: [`冫`], name: [`ice`], pinyin: [`bīng`] },
  { hanzi: [`几`], name: [`table`], pinyin: [`jī`] },
  { hanzi: [`凵`], name: [`receptacle`], pinyin: [`kǎn`] },
  { hanzi: [`刀`, `刂`, `⺈`], name: [`knife`], pinyin: [`dāo`] },
  { hanzi: [`力`], name: [`power`], pinyin: [`lì`] },
  { hanzi: [`勹`], name: [`wrap`], pinyin: [`bāo`] },
  { hanzi: [`匕`], name: [`spoon`], pinyin: [`bǐ`] },
  { hanzi: [`匚`], name: [`box`], pinyin: [`fāng`] },
  { hanzi: [`匸`], name: [`hiding enclosure`], pinyin: [`xǐ`, `xì`] },
  { hanzi: [`十`], name: [`ten`], pinyin: [`shí`] },
  { hanzi: [`卜`], name: [`divination`], pinyin: [`bǔ`] },
  { hanzi: [`卩`, `㔾`], name: [`seal (device)`], pinyin: [`jié`] },
  { hanzi: [`厂`], name: [`cliff`], pinyin: [`hǎn`] },
  { hanzi: [`厶`], name: [`private`], pinyin: [`sī`] },
  { hanzi: [`又`], name: [`again`], pinyin: [`yòu`] },
  { hanzi: [`口`], name: [`mouth`], pinyin: [`kǒu`] },
  { hanzi: [`囗`], name: [`enclosure`], pinyin: [`wéi`] },
  { hanzi: [`土`], name: [`earth`], pinyin: [`tǔ`] },
  { hanzi: [`士`], name: [`scholar`], pinyin: [`shì`] },
  { hanzi: [`夂`], name: [`go`], pinyin: [`zhǐ`] },
  { hanzi: [`夊`], name: [`go slowly`], pinyin: [`suī`] },
  { hanzi: [`夕`], name: [`evening`], pinyin: [`xī`] },
  { hanzi: [`大`], name: [`big`], pinyin: [`dà`] },
  { hanzi: [`女`], name: [`woman`], pinyin: [`nǚ`] },
  { hanzi: [`子`], name: [`child`], pinyin: [`zǐ`] },
  { hanzi: [`宀`], name: [`roof`], pinyin: [`mián`] },
  { hanzi: [`寸`], name: [`inch`], pinyin: [`cùn`] },
  { hanzi: [`小`, `⺌`, `⺍`], name: [`small`], pinyin: [`xiǎo`] },
  { hanzi: [`尢`, `尣`], name: [`lame`], pinyin: [`wāng`] },
  { hanzi: [`尸`], name: [`corpse`], pinyin: [`shī`] },
  { hanzi: [`屮`], name: [`sprout`], pinyin: [`chè`] },
  { hanzi: [`山`], name: [`mountain`], pinyin: [`shān`] },
  { hanzi: [`巛`, `川`], name: [`river`], pinyin: [`chuān`] },
  { hanzi: [`工`], name: [`work`], pinyin: [`gōng`] },
  { hanzi: [`己`], name: [`oneself`], pinyin: [`jǐ`] },
  { hanzi: [`巾`], name: [`turban`], pinyin: [`jīn`] },
  { hanzi: [`干`], name: [`dry`], pinyin: [`gān`] },
  { hanzi: [`幺`, `么`], name: [`short thread`], pinyin: [`yāo`] },
  { hanzi: [`广`], name: [`dotted cliff`], pinyin: [`yǎn`] },
  { hanzi: [`廴`], name: [`long stride`], pinyin: [`yǐn`] },
  { hanzi: [`廾`], name: [`arch`], pinyin: [`gǒng`] },
  { hanzi: [`弋`], name: [`shoot`], pinyin: [`yì`] },
  { hanzi: [`弓`], name: [`bow`], pinyin: [`gōng`] },
  { hanzi: [`彐`, `彑`], name: [`snout`], pinyin: [`jì`] },
  { hanzi: [`彡`], name: [`bristle`], pinyin: [`shān`] },
  { hanzi: [`彳`], name: [`step`], pinyin: [`chì`] },
  { hanzi: [`心`, `忄`, `⺗`], name: [`heart`], pinyin: [`xīn`] },
  { hanzi: [`戈`], name: [`halberd`], pinyin: [`gē`] },
  { hanzi: [`戶`, `户`, `戸`], name: [`door`], pinyin: [`hù`] },
  {
    hanzi: [`手`, `扌`, `龵`],
    name: [`hand`],
    pinyin: [`shǒu`],
  },
  { hanzi: [`支`], name: [`branch`], pinyin: [`zhī`] },
  { hanzi: [`攴`, `攵`], name: [`rap, tap`], pinyin: [`pū`] },
  { hanzi: [`文`], name: [`script`], pinyin: [`wén`] },
  { hanzi: [`斗`], name: [`dipper`], pinyin: [`dǒu`] },
  { hanzi: [`斤`], name: [`axe`], pinyin: [`jīn`] },
  { hanzi: [`方`], name: [`square`], pinyin: [`fāng`] },
  { hanzi: [`无`, `旡`], name: [`not`], pinyin: [`wú`] },
  { hanzi: [`日`], name: [`sun`], pinyin: [`rì`] },
  { hanzi: [`曰`], name: [`say`], pinyin: [`yuē`] },
  { hanzi: [`月`], name: [`moon`], pinyin: [`yuè`] },
  { hanzi: [`木`], name: [`tree`], pinyin: [`mù`] },
  { hanzi: [`欠`], name: [`lack`], pinyin: [`qiàn`] },
  { hanzi: [`止`], name: [`stop`], pinyin: [`zhǐ`] },
  { hanzi: [`歹`, `歺`], name: [`death`], pinyin: [`dǎi`] },
  { hanzi: [`殳`], name: [`weapon`], pinyin: [`shū`] },
  { hanzi: [`毋`, `母`], name: [`do not`], pinyin: [`wú`] },
  { hanzi: [`比`], name: [`compare`], pinyin: [`bǐ`] },
  { hanzi: [`毛`], name: [`fur`], pinyin: [`máo`] },
  { hanzi: [`氏`], name: [`clan`], pinyin: [`shì`] },
  { hanzi: [`气`], name: [`steam`], pinyin: [`qì`] },
  { hanzi: [`水`, `氵`, `氺`], name: [`water`], pinyin: [`shuǐ`] },
  { hanzi: [`火`, `灬`], name: [`fire`], pinyin: [`huǒ`] },
  { hanzi: [`爪`, `爫`], name: [`claw`], pinyin: [`zhǎo`] },
  { hanzi: [`父`], name: [`father`], pinyin: [`fù`] },
  { hanzi: [`爻`], name: [`Trigrams`], pinyin: [`yáo`] },
  { hanzi: [`爿`, `丬`], name: [`split wood`], pinyin: [`qiáng`] },
  { hanzi: [`片`], name: [`slice`], pinyin: [`piàn`] },
  { hanzi: [`牙`], name: [`fang`], pinyin: [`yá`] },
  { hanzi: [`牛`, `牜`, `⺧`], name: [`cow`], pinyin: [`niú`] },
  { hanzi: [`犬`, `犭`], name: [`dog`], pinyin: [`quǎn`] },
  { hanzi: [`玄`], name: [`profound`], pinyin: [`xuán`] },
  { hanzi: [`玉`, `王`, `玊`], name: [`jade`], pinyin: [`yù`] },
  { hanzi: [`瓜`], name: [`melon`], pinyin: [`guā`] },
  { hanzi: [`瓦`], name: [`tile`], pinyin: [`wǎ`] },
  { hanzi: [`甘`], name: [`sweet`], pinyin: [`gān`] },
  { hanzi: [`生`], name: [`life`], pinyin: [`shēng`] },
  { hanzi: [`用`], name: [`use`], pinyin: [`yòng`] },
  { hanzi: [`田`], name: [`field`], pinyin: [`tián`] },
  { hanzi: [`疋`, `⺪`], name: [`bolt of cloth`], pinyin: [`pǐ`] },
  { hanzi: [`疒`], name: [`sickness`], pinyin: [`nè`] },
  { hanzi: [`癶`], name: [`footsteps`], pinyin: [`bō`] },
  { hanzi: [`白`], name: [`white`], pinyin: [`bái`] },
  { hanzi: [`皮`], name: [`skin`], pinyin: [`pí`] },
  { hanzi: [`皿`], name: [`dish`], pinyin: [`mǐn`] },
  { hanzi: [`目`, `⺫`], name: [`eye`], pinyin: [`mù`] },
  { hanzi: [`矛`], name: [`spear`], pinyin: [`máo`] },
  { hanzi: [`矢`], name: [`arrow`], pinyin: [`shǐ`] },
  { hanzi: [`石`], name: [`stone`], pinyin: [`shí`] },
  { hanzi: [`示`, `礻`], name: [`spirit`], pinyin: [`shì`] },
  { hanzi: [`禸`], name: [`track`], pinyin: [`róu`] },
  { hanzi: [`禾`], name: [`grain`], pinyin: [`hé`] },
  { hanzi: [`穴`], name: [`cave`], pinyin: [`xué`] },
  { hanzi: [`立`], name: [`stand`], pinyin: [`lì`] },
  { hanzi: [`竹`, `⺮`], name: [`bamboo`], pinyin: [`zhú`] },
  { hanzi: [`米`], name: [`rice`], pinyin: [`mǐ`] },
  { hanzi: [`糸`, `糹`], name: [`silk`], pinyin: [`mì`] },
  { hanzi: [`缶`], name: [`jar`], pinyin: [`fǒu`] },
  { hanzi: [`网`, `罓`, `⺳`], name: [`net`], pinyin: [`wǎng`] },
  { hanzi: [`羊`, `⺶`, `⺷`], name: [`sheep`], pinyin: [`yáng`] },
  { hanzi: [`羽`], name: [`feather`], pinyin: [`yǔ`] },
  { hanzi: [`老`, `耂`], name: [`old`], pinyin: [`lǎo`] },
  { hanzi: [`而`], name: [`and`], pinyin: [`ér`] },
  { hanzi: [`耒`], name: [`plough`], pinyin: [`lěi`] },
  { hanzi: [`耳`], name: [`ear`], pinyin: [`ěr`] },
  { hanzi: [`聿`, `⺺`, `⺻`], name: [`brush`], pinyin: [`yù`] },
  { hanzi: [`肉`, `⺼`], name: [`meat`], pinyin: [`ròu`] },
  { hanzi: [`臣`], name: [`minister`], pinyin: [`chén`] },
  { hanzi: [`自`], name: [`self`], pinyin: [`zì`] },
  { hanzi: [`至`], name: [`arrive`], pinyin: [`zhì`] },
  { hanzi: [`臼`], name: [`mortar`], pinyin: [`jiù`] },
  { hanzi: [`舌`], name: [`tongue`], pinyin: [`shé`] },
  { hanzi: [`舛`], name: [`oppose`], pinyin: [`chuǎn`] },
  { hanzi: [`舟`], name: [`boat`], pinyin: [`zhōu`] },
  { hanzi: [`艮`], name: [`stopping`], pinyin: [`gèn`] },
  { hanzi: [`色`], name: [`colour`], pinyin: [`sè`] },
  { hanzi: [`艸`, `⺿`], name: [`grass`], pinyin: [`cǎo`] },
  { hanzi: [`虍`], name: [`tiger`], pinyin: [`hū`] },
  { hanzi: [`虫`], name: [`insect`], pinyin: [`chóng`] },
  { hanzi: [`血`], name: [`blood`], pinyin: [`xuè`] },
  { hanzi: [`行`], name: [`walk enclosure`], pinyin: [`xíng`] },
  { hanzi: [`衣`, `⻂`], name: [`clothes`], pinyin: [`yī`] },
  { hanzi: [`襾`, `西`, `覀`], name: [`cover`], pinyin: [`yà`] },
  { hanzi: [`見`], name: [`see`], pinyin: [`jiàn`] },
  { hanzi: [`角`, `⻇`], name: [`horn`], pinyin: [`jiǎo`] },
  { hanzi: [`言`, `訁`], name: [`speech`], pinyin: [`yán`] },
  { hanzi: [`谷`], name: [`valley`], pinyin: [`gǔ`] },
  { hanzi: [`豆`], name: [`bean`], pinyin: [`dòu`] },
  { hanzi: [`豕`], name: [`pig`], pinyin: [`shǐ`] },
  { hanzi: [`豸`], name: [`badger`], pinyin: [`zhì`] },
  { hanzi: [`貝`], name: [`shell`], pinyin: [`bèi`] },
  { hanzi: [`赤`], name: [`red`], pinyin: [`chì`] },
  { hanzi: [`走`], name: [`run`], pinyin: [`zǒu`] },
  { hanzi: [`足`, `⻊`], name: [`foot`], pinyin: [`zú`] },
  { hanzi: [`身`], name: [`body`], pinyin: [`shēn`] },
  { hanzi: [`車`], name: [`cart`], pinyin: [`chē`] },
  { hanzi: [`辛`], name: [`bitter`], pinyin: [`xīn`] },
  { hanzi: [`辰`], name: [`morning`], pinyin: [`chén`] },
  { hanzi: [`辵`, `⻍`, `⻎`], name: [`walk`], pinyin: [`chuò`] },
  { hanzi: [`邑`, `⻏`], name: [`city`], pinyin: [`yì`] },
  { hanzi: [`酉`], name: [`wine`], pinyin: [`yǒu`] },
  { hanzi: [`釆`], name: [`distinguish`], pinyin: [`biàn`] },
  { hanzi: [`里`], name: [`village`], pinyin: [`lǐ`] },
  { hanzi: [`金`, `釒`], name: [`gold`], pinyin: [`jīn`] },
  { hanzi: [`長`, `镸`], name: [`long`], pinyin: [`cháng`] },
  { hanzi: [`門`], name: [`gate`], pinyin: [`mén`] },
  { hanzi: [`阜`, `⻖`], name: [`mound`], pinyin: [`fù`] },
  { hanzi: [`隶`], name: [`slave`], pinyin: [`lì`] },
  { hanzi: [`隹`], name: [`short-tailed bird`], pinyin: [`zhuī`] },
  { hanzi: [`雨`], name: [`rain`], pinyin: [`yǔ`] },
  { hanzi: [`靑`, `青`], name: [`blue`], pinyin: [`qīng`] },
  { hanzi: [`非`], name: [`wrong`], pinyin: [`fēi`] },
  { hanzi: [`面`, `靣`], name: [`face`], pinyin: [`miàn`] },
  { hanzi: [`革`], name: [`leather`], pinyin: [`gé`] },
  { hanzi: [`韋`], name: [`tanned leather`], pinyin: [`wéi`] },
  { hanzi: [`韭`], name: [`leek`], pinyin: [`jiǔ`] },
  { hanzi: [`音`], name: [`sound`], pinyin: [`yīn`] },
  { hanzi: [`頁`], name: [`leaf`], pinyin: [`yè`] },
  { hanzi: [`風`], name: [`wind`], pinyin: [`fēng`] },
  { hanzi: [`飛`], name: [`fly`], pinyin: [`fēi`] },
  { hanzi: [`食`, `飠`], name: [`eat`], pinyin: [`shí`] },
  { hanzi: [`首`], name: [`head`], pinyin: [`shǒu`] },
  { hanzi: [`香`], name: [`fragrant`], pinyin: [`xiāng`] },
  { hanzi: [`馬`], name: [`horse`], pinyin: [`mǎ`] },
  { hanzi: [`骨`], name: [`bone`], pinyin: [`gǔ`] },
  { hanzi: [`高`, `髙`], name: [`tall`], pinyin: [`gāo`] },
  { hanzi: [`髟`], name: [`hair`], pinyin: [`biāo`] },
  { hanzi: [`鬥`], name: [`fight`], pinyin: [`dòu`] },
  { hanzi: [`鬯`], name: [`sacrificial wine`], pinyin: [`chàng`] },
  { hanzi: [`鬲`], name: [`cauldron`], pinyin: [`lì`] },
  { hanzi: [`鬼`], name: [`ghost`], pinyin: [`guǐ`] },
  { hanzi: [`魚`], name: [`fish`], pinyin: [`yú`] },
  { hanzi: [`鳥`], name: [`bird`], pinyin: [`niǎo`] },
  { hanzi: [`鹵`], name: [`salt`], pinyin: [`lǔ`] },
  { hanzi: [`鹿`], name: [`deer`], pinyin: [`lù`] },
  { hanzi: [`麥`], name: [`wheat`], pinyin: [`mài`] },
  { hanzi: [`麻`], name: [`hemp`], pinyin: [`má`] },
  { hanzi: [`黃`], name: [`yellow`], pinyin: [`huáng`] },
  { hanzi: [`黍`], name: [`millet`], pinyin: [`shǔ`] },
  { hanzi: [`黑`], name: [`black`], pinyin: [`hēi`] },
  { hanzi: [`黹`], name: [`embroidery`], pinyin: [`zhǐ`] },
  { hanzi: [`黽`], name: [`frog`], pinyin: [`mǐn`] },
  { hanzi: [`鼎`], name: [`tripod`], pinyin: [`dǐng`] },
  { hanzi: [`鼓`], name: [`drum`], pinyin: [`gǔ`] },
  { hanzi: [`鼠`], name: [`rat`], pinyin: [`shǔ`] },
  { hanzi: [`鼻`], name: [`nose`], pinyin: [`bí`] },
  { hanzi: [`齊`, `斉`], name: [`even`], pinyin: [`qí`] },
  { hanzi: [`齒`], name: [`tooth`], pinyin: [`chǐ`] },
  { hanzi: [`龍`], name: [`dragon`], pinyin: [`lóng`] },
  { hanzi: [`龜`], name: [`turtle`], pinyin: [`guī`] },
  { hanzi: [`龠`], name: [`flute`], pinyin: [`yuè`] },
];

// Transform data into an easier shape to work with.
export const radicals = radicalData.map(({ hanzi: hanzi, name, pinyin }) => {
  invariant(hanzi.length >= 1, `expected at least one character`);
  invariant(name.length >= 1, `expected at least one name`);

  const radical: Radical = {
    hanzi,
    name,
    pinyin,
  };

  if (hanzi[0] != undefined) {
    const lookup = mnemonics.get(hanzi[0]);
    if (lookup !== undefined) {
      radical.nameMnemonic = lookup[0]?.mnemonic;
    }
  }

  return radical;
});

/**
 * Lookup by any of the characters.
 */
export const radicalLookupByHanzi: ReadonlyMap<string, Radical> = new Map(
  radicals.flatMap((r) => r.hanzi.map((h) => [h, r])),
);

interface KangxiRadicalStrokeGroup {
  strokes: number;
  range: [number, number];
  characters: string[];
}

export const kangxiRadicalsByStroke = [
  {
    strokes: 1,
    range: [1, 6],
    characters: [`⼀`, `⼁`, `⼂`, `⼃`, `⼄`, `⼅`],
    // TODO: add other forms of radicals
  },
  {
    strokes: 2,
    range: [7, 29],
    characters: [
      `二`,
      `亠`,
      `人`,
      `儿`,
      `入`,
      `八`,
      `冂`,
      `冖`,
      `冫`,
      `几`,
      `凵`,
      `刀`,
      `力`,
      `勹`,
      `匕`,
      `匚`,
      `匸`,
      `十`,
      `卜`,
      `卩`,
      `厂`,
      `厶`,
      `又`,
    ],
  },
  {
    strokes: 3,
    range: [30, 60],
    characters: [
      `口`,
      `囗`,
      `土`,
      `士`,
      `夂`,
      `夊`,
      `夕`,
      `大`,
      `女`,
      `子`,
      `宀`,
      `寸`,
      `小`,
      `尢`,
      `尸`,
      `屮`,
      `山`,
      `巛`,
      `工`,
      `己`,
      `巾`,
      `干`,
      `幺`,
      `广`,
      `廴`,
      `廾`,
      `弋`,
      `弓`,
      `彐`,
      `彡`,
      `彳`,
    ],
  },
  {
    strokes: 4,
    range: [61, 94],
    characters: [
      `心`,
      `戈`,
      `戶`,
      `手`,
      `支`,
      `攴`,
      `文`,
      `斗`,
      `斤`,
      `方`,
      `无`,
      `日`,
      `曰`,
      `月`,
      `木`,
      `欠`,
      `止`,
      `歹`,
      `殳`,
      `毋`,
      `比`,
      `毛`,
      `氏`,
      `气`,
      `水`,
      `火`,
      `爪`,
      `父`,
      `爻`,
      `爿`,
      `片`,
      `牙`,
      `牛`,
      `犬`,
    ],
  },
  {
    strokes: 5,
    range: [95, 117],
    characters: [
      `玄`,
      `玉`,
      `瓜`,
      `瓦`,
      `甘`,
      `生`,
      `用`,
      `田`,
      `疋`,
      `疒`,
      `癶`,
      `白`,
      `皮`,
      `皿`,
      `目`,
      `矛`,
      `矢`,
      `石`,
      `示`,
      `禸`,
      `禾`,
      `穴`,
      `立`,
    ],
  },
  {
    strokes: 6,
    range: [118, 146],
    characters: [
      `竹`,
      `米`,
      `糸`,
      `缶`,
      `网`,
      `羊`,
      `羽`,
      `老`,
      `而`,
      `耒`,
      `耳`,
      `聿`,
      `肉`,
      `臣`,
      `自`,
      `至`,
      `臼`,
      `舌`,
      `舛`,
      `舟`,
      `艮`,
      `色`,
      `艸`,
      `虍`,
      `虫`,
      `血`,
      `行`,
      `衣`,
      `襾`,
    ],
  },
  {
    strokes: 7,
    range: [147, 166],
    characters: [
      `見`,
      `角`,
      `言`,
      `谷`,
      `豆`,
      `豕`,
      `豸`,
      `貝`,
      `赤`,
      `走`,
      `足`,
      `身`,
      `車`,
      `辛`,
      `辰`,
      `辵`,
      `邑`,
      `酉`,
      `釆`,
      `里`,
    ],
  },
  {
    strokes: 8,
    range: [167, 175],
    characters: [`金`, `長`, `門`, `阜`, `隶`, `隹`, `雨`, `靑`, `非`],
  },
  {
    strokes: 9,
    range: [176, 186],
    characters: [
      `面`,
      `革`,
      `韋`,
      `韭`,
      `音`,
      `頁`,
      `風`,
      `飛`,
      `食`,
      `首`,
      `香`,
    ],
  },
  {
    strokes: 10,
    range: [187, 194],
    characters: [`馬`, `骨`, `高`, `髟`, `鬥`, `鬯`, `鬲`, `鬼`],
  },
  {
    strokes: 11,
    range: [195, 200],
    characters: [`魚`, `鳥`, `鹵`, `鹿`, `麥`, `麻`],
  },
  {
    strokes: 12,
    range: [201, 204],
    characters: [`黃`, `黍`, `黑`, `黹`],
  },
  {
    strokes: 13,
    range: [205, 208],
    characters: [`黽`, `鼎`, `鼓`, `鼠`],
  },
  {
    strokes: 14,
    range: [209, 210],
    characters: [`鼻`, `齊`],
  },
  {
    strokes: 15,
    range: [211, 211],
    characters: [`齒`],
  },
  {
    strokes: 16,
    range: [212, 213],
    characters: [`龍`, `龜`],
  },
  {
    strokes: 17,
    range: [214, 214],
    characters: [`龠`],
  },
] satisfies KangxiRadicalStrokeGroup[];
