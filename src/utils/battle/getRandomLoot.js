// 戰鬥勝利時，有一半的機率會獲得戰利品
function getRandomLoot(loot) {
  const randomNum = Math.random();
  if (randomNum < 0.5) return;

  const randomIndex = Math.floor(Math.random() * loot.length);
  const name = loot[randomIndex].name;
  const quantity = loot[randomIndex].quantity;

  return {
    name,
    quantity,
  };
}

export default getRandomLoot;
