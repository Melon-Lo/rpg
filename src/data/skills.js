import decideSkillDamage from "../utils/battle/decideSkillDamage";

const skills = [
  {
    name: "火焰",
    basicValue: 20,
    costMP: 10,
    attributes: "fire",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "火屬性攻擊，傷害低",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  {
    name: "地獄鬼火",
    basicValue: 50,
    costMP: 30,
    attributes: "fire",
    canUseOutsideBattle: false,
    type: "attack",
    description: "發出火焰",
    effectDescription: "火屬性攻擊，傷害高",
    effect: decideSkillDamage,
  },
  {
    name: "下雨",
    basicValue: 20,
    costMP: 10,
    attributes: "water",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "水屬性攻擊，傷害低",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  {
    name: "聲波",
    basicValue: 20,
    attributes: "none",
    costMP: 15,
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "無屬性攻擊，傷害低",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  {
    name: "治療",
    basicValue: 50,
    attributes: "none",
    costMP: 10,
    canUseOutsideBattle: true,
    type: "healHP",
    effectDescription: "恢復 HP 50 點",
    effectMessage: "HP 恢復了 50 點",
    effect: function (targetHP) {
      return targetHP + this.basicValue;
    },
  },
];

export default skills;
