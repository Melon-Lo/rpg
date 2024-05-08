// 技能攻擊傷害值
// 傷害值：((基本值 + (魔攻 - 魔防)) * 弱點傷害倍率) * 浮動值
function decideSkillDamage(
  attackerMATK,
  defenderMDEF,
  basicValue,
  skillAttributes = "none",
  defenderWeakness = "none"
) {
  // 如果擊中弱點，傷害乘以 1.5
  const damageMultiplier = skillAttributes === defenderWeakness ? 1.5 : 1;

  // 傷害浮動
  const randomNumber = Math.random() * (1.1 - 0.9) + 0.9;

  // 如果差值小於0，則等於0
  let basicDamage = attackerMATK - defenderMDEF;
  if (basicDamage < 0) {
    basicDamage = 0;
  }

  const damage = Math.floor(
    (basicValue + basicDamage) * damageMultiplier * randomNumber
  );

  return damage;
}

export default decideSkillDamage;
