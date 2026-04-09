// All kana columns with romaji mappings.
// romaji[] contains accepted inputs (first entry is the "canonical" display hint).

const KANA_COLUMNS = [
  // ── Hiragana basic rows ──────────────────────────────────────────────────
  {
    id: 'hira-a', label: 'あ行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'あ', romaji: ['a'] },
      { kana: 'い', romaji: ['i'] },
      { kana: 'う', romaji: ['u'] },
      { kana: 'え', romaji: ['e'] },
      { kana: 'お', romaji: ['o'] },
    ],
  },
  {
    id: 'hira-ka', label: 'か行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'か', romaji: ['ka'] },
      { kana: 'き', romaji: ['ki'] },
      { kana: 'く', romaji: ['ku'] },
      { kana: 'け', romaji: ['ke'] },
      { kana: 'こ', romaji: ['ko'] },
    ],
  },
  {
    id: 'hira-sa', label: 'さ行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'さ', romaji: ['sa'] },
      { kana: 'し', romaji: ['shi', 'si'] },
      { kana: 'す', romaji: ['su'] },
      { kana: 'せ', romaji: ['se'] },
      { kana: 'そ', romaji: ['so'] },
    ],
  },
  {
    id: 'hira-ta', label: 'た行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'た', romaji: ['ta'] },
      { kana: 'ち', romaji: ['chi', 'ti'] },
      { kana: 'つ', romaji: ['tsu', 'tu'] },
      { kana: 'て', romaji: ['te'] },
      { kana: 'と', romaji: ['to'] },
    ],
  },
  {
    id: 'hira-na', label: 'な行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'な', romaji: ['na'] },
      { kana: 'に', romaji: ['ni'] },
      { kana: 'ぬ', romaji: ['nu'] },
      { kana: 'ね', romaji: ['ne'] },
      { kana: 'の', romaji: ['no'] },
    ],
  },
  {
    id: 'hira-ha', label: 'は行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'は', romaji: ['ha'] },
      { kana: 'ひ', romaji: ['hi'] },
      { kana: 'ふ', romaji: ['fu', 'hu'] },
      { kana: 'へ', romaji: ['he'] },
      { kana: 'ほ', romaji: ['ho'] },
    ],
  },
  {
    id: 'hira-ma', label: 'ま行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'ま', romaji: ['ma'] },
      { kana: 'み', romaji: ['mi'] },
      { kana: 'む', romaji: ['mu'] },
      { kana: 'め', romaji: ['me'] },
      { kana: 'も', romaji: ['mo'] },
    ],
  },
  {
    id: 'hira-ya', label: 'や行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'や', romaji: ['ya'] },
      { kana: 'ゆ', romaji: ['yu'] },
      { kana: 'よ', romaji: ['yo'] },
    ],
  },
  {
    id: 'hira-ra', label: 'ら行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'ら', romaji: ['ra'] },
      { kana: 'り', romaji: ['ri'] },
      { kana: 'る', romaji: ['ru'] },
      { kana: 'れ', romaji: ['re'] },
      { kana: 'ろ', romaji: ['ro'] },
    ],
  },
  {
    id: 'hira-wa', label: 'わ行', kana_type: 'hiragana', group: 'basic',
    chars: [
      { kana: 'わ', romaji: ['wa'] },
      { kana: 'を', romaji: ['wo', 'o'] },
      { kana: 'ん', romaji: ['n', 'nn'] },
    ],
  },

  // ── Hiragana dakuten rows ────────────────────────────────────────────────
  {
    id: 'hira-ga', label: 'が行', kana_type: 'hiragana', group: 'dakuten',
    chars: [
      { kana: 'が', romaji: ['ga'] },
      { kana: 'ぎ', romaji: ['gi'] },
      { kana: 'ぐ', romaji: ['gu'] },
      { kana: 'げ', romaji: ['ge'] },
      { kana: 'ご', romaji: ['go'] },
    ],
  },
  {
    id: 'hira-za', label: 'ざ行', kana_type: 'hiragana', group: 'dakuten',
    chars: [
      { kana: 'ざ', romaji: ['za'] },
      { kana: 'じ', romaji: ['ji', 'zi'] },
      { kana: 'ず', romaji: ['zu'] },
      { kana: 'ぜ', romaji: ['ze'] },
      { kana: 'ぞ', romaji: ['zo'] },
    ],
  },
  {
    id: 'hira-da', label: 'だ行', kana_type: 'hiragana', group: 'dakuten',
    chars: [
      { kana: 'だ', romaji: ['da'] },
      { kana: 'ぢ', romaji: ['di', 'ji'] },
      { kana: 'づ', romaji: ['du', 'zu'] },
      { kana: 'で', romaji: ['de'] },
      { kana: 'ど', romaji: ['do'] },
    ],
  },
  {
    id: 'hira-ba', label: 'ば行', kana_type: 'hiragana', group: 'dakuten',
    chars: [
      { kana: 'ば', romaji: ['ba'] },
      { kana: 'び', romaji: ['bi'] },
      { kana: 'ぶ', romaji: ['bu'] },
      { kana: 'べ', romaji: ['be'] },
      { kana: 'ぼ', romaji: ['bo'] },
    ],
  },
  {
    id: 'hira-pa', label: 'ぱ行', kana_type: 'hiragana', group: 'dakuten',
    chars: [
      { kana: 'ぱ', romaji: ['pa'] },
      { kana: 'ぴ', romaji: ['pi'] },
      { kana: 'ぷ', romaji: ['pu'] },
      { kana: 'ぺ', romaji: ['pe'] },
      { kana: 'ぽ', romaji: ['po'] },
    ],
  },

  // ── Hiragana combination rows ────────────────────────────────────────────
  {
    id: 'hira-kya', label: 'きゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'きゃ', romaji: ['kya'] },
      { kana: 'きゅ', romaji: ['kyu'] },
      { kana: 'きょ', romaji: ['kyo'] },
    ],
  },
  {
    id: 'hira-sha', label: 'しゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'しゃ', romaji: ['sha', 'sya'] },
      { kana: 'しゅ', romaji: ['shu', 'syu'] },
      { kana: 'しょ', romaji: ['sho', 'syo'] },
    ],
  },
  {
    id: 'hira-cha', label: 'ちゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'ちゃ', romaji: ['cha', 'tya'] },
      { kana: 'ちゅ', romaji: ['chu', 'tyu'] },
      { kana: 'ちょ', romaji: ['cho', 'tyo'] },
    ],
  },
  {
    id: 'hira-nya', label: 'にゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'にゃ', romaji: ['nya'] },
      { kana: 'にゅ', romaji: ['nyu'] },
      { kana: 'にょ', romaji: ['nyo'] },
    ],
  },
  {
    id: 'hira-hya', label: 'ひゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'ひゃ', romaji: ['hya'] },
      { kana: 'ひゅ', romaji: ['hyu'] },
      { kana: 'ひょ', romaji: ['hyo'] },
    ],
  },
  {
    id: 'hira-mya', label: 'みゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'みゃ', romaji: ['mya'] },
      { kana: 'みゅ', romaji: ['myu'] },
      { kana: 'みょ', romaji: ['myo'] },
    ],
  },
  {
    id: 'hira-rya', label: 'りゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'りゃ', romaji: ['rya'] },
      { kana: 'りゅ', romaji: ['ryu'] },
      { kana: 'りょ', romaji: ['ryo'] },
    ],
  },
  {
    id: 'hira-gya', label: 'ぎゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'ぎゃ', romaji: ['gya'] },
      { kana: 'ぎゅ', romaji: ['gyu'] },
      { kana: 'ぎょ', romaji: ['gyo'] },
    ],
  },
  {
    id: 'hira-ja', label: 'じゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'じゃ', romaji: ['ja', 'jya', 'zya'] },
      { kana: 'じゅ', romaji: ['ju', 'jyu', 'zyu'] },
      { kana: 'じょ', romaji: ['jo', 'jyo', 'zyo'] },
    ],
  },
  {
    id: 'hira-bya', label: 'びゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'びゃ', romaji: ['bya'] },
      { kana: 'びゅ', romaji: ['byu'] },
      { kana: 'びょ', romaji: ['byo'] },
    ],
  },
  {
    id: 'hira-pya', label: 'ぴゃ行', kana_type: 'hiragana', group: 'combo',
    chars: [
      { kana: 'ぴゃ', romaji: ['pya'] },
      { kana: 'ぴゅ', romaji: ['pyu'] },
      { kana: 'ぴょ', romaji: ['pyo'] },
    ],
  },

  // ── Katakana basic rows ──────────────────────────────────────────────────
  {
    id: 'kata-a', label: 'ア行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'ア', romaji: ['a'] },
      { kana: 'イ', romaji: ['i'] },
      { kana: 'ウ', romaji: ['u'] },
      { kana: 'エ', romaji: ['e'] },
      { kana: 'オ', romaji: ['o'] },
    ],
  },
  {
    id: 'kata-ka', label: 'カ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'カ', romaji: ['ka'] },
      { kana: 'キ', romaji: ['ki'] },
      { kana: 'ク', romaji: ['ku'] },
      { kana: 'ケ', romaji: ['ke'] },
      { kana: 'コ', romaji: ['ko'] },
    ],
  },
  {
    id: 'kata-sa', label: 'サ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'サ', romaji: ['sa'] },
      { kana: 'シ', romaji: ['shi', 'si'] },
      { kana: 'ス', romaji: ['su'] },
      { kana: 'セ', romaji: ['se'] },
      { kana: 'ソ', romaji: ['so'] },
    ],
  },
  {
    id: 'kata-ta', label: 'タ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'タ', romaji: ['ta'] },
      { kana: 'チ', romaji: ['chi', 'ti'] },
      { kana: 'ツ', romaji: ['tsu', 'tu'] },
      { kana: 'テ', romaji: ['te'] },
      { kana: 'ト', romaji: ['to'] },
    ],
  },
  {
    id: 'kata-na', label: 'ナ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'ナ', romaji: ['na'] },
      { kana: 'ニ', romaji: ['ni'] },
      { kana: 'ヌ', romaji: ['nu'] },
      { kana: 'ネ', romaji: ['ne'] },
      { kana: 'ノ', romaji: ['no'] },
    ],
  },
  {
    id: 'kata-ha', label: 'ハ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'ハ', romaji: ['ha'] },
      { kana: 'ヒ', romaji: ['hi'] },
      { kana: 'フ', romaji: ['fu', 'hu'] },
      { kana: 'ヘ', romaji: ['he'] },
      { kana: 'ホ', romaji: ['ho'] },
    ],
  },
  {
    id: 'kata-ma', label: 'マ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'マ', romaji: ['ma'] },
      { kana: 'ミ', romaji: ['mi'] },
      { kana: 'ム', romaji: ['mu'] },
      { kana: 'メ', romaji: ['me'] },
      { kana: 'モ', romaji: ['mo'] },
    ],
  },
  {
    id: 'kata-ya', label: 'ヤ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'ヤ', romaji: ['ya'] },
      { kana: 'ユ', romaji: ['yu'] },
      { kana: 'ヨ', romaji: ['yo'] },
    ],
  },
  {
    id: 'kata-ra', label: 'ラ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'ラ', romaji: ['ra'] },
      { kana: 'リ', romaji: ['ri'] },
      { kana: 'ル', romaji: ['ru'] },
      { kana: 'レ', romaji: ['re'] },
      { kana: 'ロ', romaji: ['ro'] },
    ],
  },
  {
    id: 'kata-wa', label: 'ワ行', kana_type: 'katakana', group: 'basic',
    chars: [
      { kana: 'ワ', romaji: ['wa'] },
      { kana: 'ヲ', romaji: ['wo', 'o'] },
      { kana: 'ン', romaji: ['n', 'nn'] },
    ],
  },

  // ── Katakana dakuten rows ────────────────────────────────────────────────
  {
    id: 'kata-ga', label: 'ガ行', kana_type: 'katakana', group: 'dakuten',
    chars: [
      { kana: 'ガ', romaji: ['ga'] },
      { kana: 'ギ', romaji: ['gi'] },
      { kana: 'グ', romaji: ['gu'] },
      { kana: 'ゲ', romaji: ['ge'] },
      { kana: 'ゴ', romaji: ['go'] },
    ],
  },
  {
    id: 'kata-za', label: 'ザ行', kana_type: 'katakana', group: 'dakuten',
    chars: [
      { kana: 'ザ', romaji: ['za'] },
      { kana: 'ジ', romaji: ['ji', 'zi'] },
      { kana: 'ズ', romaji: ['zu'] },
      { kana: 'ゼ', romaji: ['ze'] },
      { kana: 'ゾ', romaji: ['zo'] },
    ],
  },
  {
    id: 'kata-da', label: 'ダ行', kana_type: 'katakana', group: 'dakuten',
    chars: [
      { kana: 'ダ', romaji: ['da'] },
      { kana: 'ヂ', romaji: ['di', 'ji'] },
      { kana: 'ヅ', romaji: ['du', 'zu'] },
      { kana: 'デ', romaji: ['de'] },
      { kana: 'ド', romaji: ['do'] },
    ],
  },
  {
    id: 'kata-ba', label: 'バ行', kana_type: 'katakana', group: 'dakuten',
    chars: [
      { kana: 'バ', romaji: ['ba'] },
      { kana: 'ビ', romaji: ['bi'] },
      { kana: 'ブ', romaji: ['bu'] },
      { kana: 'ベ', romaji: ['be'] },
      { kana: 'ボ', romaji: ['bo'] },
    ],
  },
  {
    id: 'kata-pa', label: 'パ行', kana_type: 'katakana', group: 'dakuten',
    chars: [
      { kana: 'パ', romaji: ['pa'] },
      { kana: 'ピ', romaji: ['pi'] },
      { kana: 'プ', romaji: ['pu'] },
      { kana: 'ペ', romaji: ['pe'] },
      { kana: 'ポ', romaji: ['po'] },
    ],
  },

  // ── Katakana combination rows ────────────────────────────────────────────
  {
    id: 'kata-kya', label: 'キャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'キャ', romaji: ['kya'] },
      { kana: 'キュ', romaji: ['kyu'] },
      { kana: 'キョ', romaji: ['kyo'] },
    ],
  },
  {
    id: 'kata-sha', label: 'シャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'シャ', romaji: ['sha', 'sya'] },
      { kana: 'シュ', romaji: ['shu', 'syu'] },
      { kana: 'ショ', romaji: ['sho', 'syo'] },
    ],
  },
  {
    id: 'kata-cha', label: 'チャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'チャ', romaji: ['cha', 'tya'] },
      { kana: 'チュ', romaji: ['chu', 'tyu'] },
      { kana: 'チョ', romaji: ['cho', 'tyo'] },
    ],
  },
  {
    id: 'kata-nya', label: 'ニャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ニャ', romaji: ['nya'] },
      { kana: 'ニュ', romaji: ['nyu'] },
      { kana: 'ニョ', romaji: ['nyo'] },
    ],
  },
  {
    id: 'kata-hya', label: 'ヒャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ヒャ', romaji: ['hya'] },
      { kana: 'ヒュ', romaji: ['hyu'] },
      { kana: 'ヒョ', romaji: ['hyo'] },
    ],
  },
  {
    id: 'kata-mya', label: 'ミャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ミャ', romaji: ['mya'] },
      { kana: 'ミュ', romaji: ['myu'] },
      { kana: 'ミョ', romaji: ['myo'] },
    ],
  },
  {
    id: 'kata-rya', label: 'リャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'リャ', romaji: ['rya'] },
      { kana: 'リュ', romaji: ['ryu'] },
      { kana: 'リョ', romaji: ['ryo'] },
    ],
  },
  {
    id: 'kata-gya', label: 'ギャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ギャ', romaji: ['gya'] },
      { kana: 'ギュ', romaji: ['gyu'] },
      { kana: 'ギョ', romaji: ['gyo'] },
    ],
  },
  {
    id: 'kata-ja', label: 'ジャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ジャ', romaji: ['ja', 'jya', 'zya'] },
      { kana: 'ジュ', romaji: ['ju', 'jyu', 'zyu'] },
      { kana: 'ジョ', romaji: ['jo', 'jyo', 'zyo'] },
    ],
  },
  {
    id: 'kata-bya', label: 'ビャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ビャ', romaji: ['bya'] },
      { kana: 'ビュ', romaji: ['byu'] },
      { kana: 'ビョ', romaji: ['byo'] },
    ],
  },
  {
    id: 'kata-pya', label: 'ピャ行', kana_type: 'katakana', group: 'combo',
    chars: [
      { kana: 'ピャ', romaji: ['pya'] },
      { kana: 'ピュ', romaji: ['pyu'] },
      { kana: 'ピョ', romaji: ['pyo'] },
    ],
  },
];

// Speed presets: note travel time in seconds from spawn to zone
const SPEED_PRESETS = {
  easy:   { travelTime: 3.0, spawnInterval: 2.8 },
  normal: { travelTime: 3.0, spawnInterval: 1.8 },
  hard:   { travelTime: 3.0, spawnInterval: 1.0 },
  expert: { travelTime: 3.0, spawnInterval: 0.6 },
};

// Target total gameplay duration in seconds
const TARGET_DURATION = 50;
