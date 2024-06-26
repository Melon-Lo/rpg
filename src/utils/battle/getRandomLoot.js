// 預設情況下，戰鬥勝利時，有 50% 的機率會獲得一種戰利品
function getRandomLoot(loot, dropRate = 0.5) {
  const randomNum = Math.random();
  if (randomNum > dropRate) return;

  const randomIndex = Math.floor(Math.random() * loot.length);
  const name = loot[randomIndex].name;
  const quantity = loot[randomIndex].quantity;

  return {
    name,
    quantity,
  };
}

export default getRandomLoot;
