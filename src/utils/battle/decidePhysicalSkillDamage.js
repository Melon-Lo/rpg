// 技能攻擊傷害值
// 傷害值：(基本值 + (攻 - 防)) * 浮動值
function decidePhysicalSkillDamage(attackerATK, defenderDEF, basicValue) {
  // 傷害浮動
  const randomNumber = Math.random() * (1.1 - 0.9) + 0.9;

  // 如果差值小於0，則等於0
  let basicDamage = attackerATK - defenderDEF;
  if (basicDamage < 0) {
    basicDamage = 0;
  }

  const damage = Math.floor((basicValue + basicDamage) * randomNumber);

  return damage;
}

export default decidePhysicalSkillDamage;
