import decideSkillDamage from "../utils/battle/decideSkillDamage";
import decidePhysicalSkillDamage from "../utils/battle/decidePhysicalSkillDamage";

const skills = [
  // 火屬性魔法
  {
    name: "火焰",
    basicValue: 15,
    costMP: 10,
    attributes: "fire",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "火屬性攻擊，傷害低",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  {
    name: "熊熊烈火",
    basicValue: 30,
    costMP: 20,
    attributes: "fire",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "火屬性攻擊，傷害一般",
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
  // 水屬性魔法
  {
    name: "水花",
    basicValue: 15,
    costMP: 10,
    attributes: "water",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "水屬性攻擊，傷害低",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  {
    name: "滂沱大雨",
    basicValue: 30,
    costMP: 20,
    attributes: "water",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "水屬性攻擊，傷害一般",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  {
    name: "大海嘯",
    basicValue: 50,
    costMP: 30,
    attributes: "water",
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "水屬性攻擊，傷害高",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  // 無屬性魔法
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
    name: "強聲波",
    basicValue: 40,
    attributes: "none",
    costMP: 25,
    canUseOutsideBattle: false,
    type: "attack",
    effectDescription: "無屬性攻擊，傷害一般",
    effectMessage: "",
    effect: decideSkillDamage,
  },
  // 物理技能
  {
    name: "重砍",
    basicValue: 20,
    attributes: "none",
    costMP: 5,
    canUseOutsideBattle: false,
    type: "physicalAttack",
    effectDescription: "物理技能，傷害低",
    effectMessage: "",
    effect: decidePhysicalSkillDamage,
  },
  {
    name: "衝撞",
    basicValue: 20,
    attributes: "none",
    costMP: 5,
    canUseOutsideBattle: false,
    type: "physicalAttack",
    effectDescription: "物理技能，傷害低",
    effectMessage: "",
    effect: decidePhysicalSkillDamage,
  },
  {
    name: "撕咬",
    basicValue: 30,
    attributes: "none",
    costMP: 7,
    canUseOutsideBattle: false,
    type: "physicalAttack",
    effectDescription: "物理技能，傷害低",
    effectMessage: "",
    effect: decidePhysicalSkillDamage,
  },
  {
    name: "獅吼",
    basicValue: 35,
    attributes: "none",
    costMP: 8,
    canUseOutsideBattle: false,
    type: "physicalAttack",
    effectDescription: "物理技能，傷害低",
    effectMessage: "",
    effect: decidePhysicalSkillDamage,
  },
  // 治療類
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
  {
    name: "如沐春風",
    basicValue: 100,
    attributes: "none",
    costMP: 20,
    canUseOutsideBattle: true,
    type: "healHP",
    effectDescription: "恢復 HP 100 點",
    effectMessage: "HP 恢復了 100 點",
    effect: function (targetHP) {
      return targetHP + this.basicValue;
    },
  },
];

export default skills;
