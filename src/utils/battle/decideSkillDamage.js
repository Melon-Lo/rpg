// 決定技能攻擊傷害值
function decideSkillDamage(
  attackerMATK,
  defenderMDEF,
  basicValue,
  skillAttributes = "none",
  defenderWeakness = "none"
) {
  const damageMultiplier = skillAttributes === defenderWeakness ? 1.5 : 1;
  const randomNumber = Math.random() * (1.1 - 0.9) + 0.9;
  const damage = Math.floor(
    basicValue +
      damageMultiplier * (randomNumber * (attackerMATK - defenderMDEF))
  );

  return damage;
}

export default decideSkillDamage;
