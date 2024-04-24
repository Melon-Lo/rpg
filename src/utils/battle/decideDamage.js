// 決定傷害值
// 如果我方的速度值大於或等於敵方，則我方先行動
function decideDamage(attackerATK, defenderDEF) {
  let damage;
  damage = attackerATK - defenderDEF;

  return damage;
}

export default decideDamage;
