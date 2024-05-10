const quests = [
  {
    name: "幫村民在森林裡找皮球",
    npc: "村民",
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
        timing: "reject",
        dialogue: ["好吧，畢竟森林那麼危險，", "不好意思打擾你了。"],
      },
      {
        timing: "notFinish",
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
    rewards: [{ name: "補藥", quantity: 1 }],
  },
];

export default quests;
