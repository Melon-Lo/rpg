// 比較速度值
// 如果我方的速度值大於或等於敵方，則我方先行動
function decideTurnOrder(selfSPD, enemySPD) {
  let turn;
  if (selfSPD >= enemySPD) {
    turn = "self";
  } else {
    turn = "enemy";
  }

  return turn;
}

export default decideTurnOrder;
