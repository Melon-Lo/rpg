// 普通攻擊傷害值
// 傷害值：(攻 + (攻 - 防)) * 浮動值
function decideDamage(attackerATK, defenderDEF) {
  // 傷害浮動
  const randomNumber = Math.random() * (1.1 - 0.9) + 0.9;

  // 如果差值小於0，則等於0
  let basicDamage = attackerATK - defenderDEF;
  if (basicDamage < 0) {
    basicDamage = 0;
  }

  const damage = Math.floor((attackerATK + basicDamage) * randomNumber);

  return damage;
}

export default decideDamage;
