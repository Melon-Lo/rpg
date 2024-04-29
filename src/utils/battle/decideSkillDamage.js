// 決定技能攻擊傷害值
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
  let damage = Math.floor(
    basicValue +
      damageMultiplier * (randomNumber * (attackerMATK - defenderMDEF))
  );

  // 傷害最少是 1
  if (damage <= 0) damage = 1;

  return damage;
}

export default decideSkillDamage;
