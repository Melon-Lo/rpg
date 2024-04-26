// 決定普通攻擊傷害值
function decideDamage(attackerATK, defenderDEF) {
  const randomNumber = Math.random() * (1.1 - 0.9) + 0.9;
  const damage = Math.floor(randomNumber * (attackerATK - defenderDEF));

  return damage;
}

export default decideDamage;
