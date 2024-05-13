const quests = [
  {
    quest: "幫村民在森林裡找皮球",
    npc: "村民",
    requirements: [{ type: "item", content: [{ name: "皮球", quantity: 1 }] }],
    rewards: [{ type: "item", content: [{ name: "厲害補藥", quantity: 3 }] }],
    dialogues: [
      {
        timing: "start",
        dialogue: [
          "前幾天我女兒在森林裡面玩皮球，",
          "玩著玩著，突然有隻熊衝了出來！",
          "我女兒嚇得馬上把皮球丟在原地，逃了回家。",
          "那顆皮球是我送給女兒的生日禮物，",
          "所以她回來之後一直哭。",
          "但我也無能為力，畢竟最近森林不太平靜，",
          "而且森林那麼大，這皮球要從何找起呢？",
        ],
      },
      {
        timing: "accept",
        dialogue: ["真的嗎？謝謝你！", "那就麻煩你了，請注意安全！"],
      },
      {
        timing: "doing",
        dialogue: ["找到皮球了嗎？", "森林那麼大，一定要注意安全。"],
      },
      {
        timing: "finish",
        dialogue: [
          "天哪！就是這顆皮球！",
          "我女兒一定會很開心！",
          "這些是回禮，請一定要收下，非常感謝你！",
        ],
      },
      {
        timing: "end",
        dialogue: [
          "謝謝你之前幫我女兒找皮球，",
          "我女兒現在加倍地愛護那顆皮球，也不敢再亂跑了。",
        ],
      },
    ],
  },
  {
    quest: "幫小男孩證明自己的勇氣",
    npc: "小男孩",
    requirements: [
      { type: "item", content: [{ name: "獅子的鬃毛", quantity: 1 }] },
    ],
    rewards: [{ type: "item", content: [{ name: "魔法藥", quantity: 5 }] }],
    dialogues: [
      {
        timing: "start",
        dialogue: [
          "最近朋友們都不跟我玩⋯⋯",
          "他們說我太懦弱了，連隻螞蟻都不敢殺。",
          "害我現在每天都不太敢出門，",
          "怕一出門就被他們給欺負⋯⋯",
          "再這麼下去，這個村莊的大家一定都會瞧不起我的。",
          "該怎麼辦才好呢⋯⋯",
          "唉⋯⋯",
        ],
      },
      {
        timing: "accept",
        dialogue: [
          "什麼？你要幫我？",
          "啊？證明自己的勇氣？",
          "有什麼辦法可以做到呢⋯⋯",
        ],
      },
      {
        timing: "doing",
        dialogue: ["證明自己的勇氣⋯⋯", "該怎麼做呢⋯⋯"],
      },
      {
        timing: "finish",
        dialogue: [
          "哇！這是真的毛嗎？",
          "你真的打倒了那隻獅子？",
          "真的很謝謝你！那我就收下這根毛了。但⋯⋯",
          "這畢竟是你得來的，跟我一點關係都沒有。",
          "不過也因為你，我覺得我也開始有勇氣了！",
          "如果你連隻獅子都能打敗，那我又有什麼好怕的呢？",
          "謝謝你，我覺得我開始有勇氣了！",
          "這些是謝禮，還請你收下。",
          "我會努力面對自己的恐懼的。",
        ],
      },
      {
        timing: "end",
        dialogue: ["我現在正在學習克服恐懼，", "謝謝你之前願意幫我提起勇氣！"],
      },
    ],
  },
];

export default quests;
