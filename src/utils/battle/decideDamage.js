// 普通攻擊傷害值
// 傷害值：(攻 + (攻 - 防)) * 浮動值
function decideDamage(attackerATK, defenderDEF) {
  // 傷害浮動
  const randomNumber = Math.random() * (1.1 - 0.9) + 0.9;
  let damage = Math.floor(randomNumber * (attackerATK * 2 - defenderDEF));

  // 傷害最少是 1
  if (damage <= 0) damage = 1;

  return damage;
}

export default decideDamage;
