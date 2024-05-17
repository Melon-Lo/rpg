import itemsData from "../../data/items";

function calculateEquipmentsStats(equipments) {
  return [equipments.weapon, equipments.armor, equipments.accessory]
    .filter((equipment) => equipment) // 过滤掉未装备的部分
    .map(
      (equipment) =>
        itemsData.find((itemData) => itemData.name === equipment)?.stats || {}
    )
    .reduce((acc, stats) => {
      Object.keys(stats).forEach((key) => {
        acc[key] = (acc[key] || 0) + (stats[key] || 0);
      });
      return acc;
    }, {});
}

export default calculateEquipmentsStats;
