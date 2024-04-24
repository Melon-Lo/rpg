import StatusSection from "../components/StatusSection";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ScreenSection from "../components/ScreenSection";
import MessageSection from "../components/MessageSection";
import CommandSection from "../components/CommandSection";
import Button from "../components/Button";

// DEV ONLY
import { useDispatch } from "react-redux";
import { changeItem, changeEnemy, addMessage, changeInBattle, changeTurn } from "../store";
import enemies from "../data/enemies";
import decideTurnOrder from "../utils/battle/decideTurnOrder";

export default function MainPage() {
  // DEV ONLY
  const dispatch = useDispatch();
  const selfSPD = useSelector(state => state.characterStats.SPD);
  const enemySPD = useSelector(state => state.enemies.SPD);
  const { turn } = useSelector(state => state.battle);

  // useEffect(() => {
  //   const handleBattle = () => {
  //   }

  //   handleBattle();
  // }, [dispatch, selfSPD, enemySPD, turn])

  const navigate = useNavigate();
  const { roleCreated } = useSelector(state => state.systemStatus);

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    const handleNavigate = () => {
      if (!roleCreated) {
        navigate('/create');
      }
    };

    handleNavigate();
  }, [navigate, roleCreated])

  return (
    <div className="flex flex-col items-center">
      <StatusSection />
      <ScreenSection />
      <MessageSection />
      <CommandSection />

      {/* DEV ONLY */}
      <Button blue onClick={() => navigate('create')}>to create</Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => dispatch(changeItem({
        name: '補藥',
        quantity: 1,
      }))}>
        加1個補藥
      </Button>

      {/* DEV ONLY */}
      <Button blue onClick={() => {
        const currentEnemy = enemies.find(enemy => enemy.name === '蝙蝠');
        const { name, img, loot, money } = currentEnemy;
        const { HP, maxHP, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;
        dispatch(changeEnemy({ name, img, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD }));
        dispatch(addMessage({
          type: 'system',
          content: `${name}出現了！`
        }));
        dispatch(changeInBattle(true));

        const firstTurn = decideTurnOrder(selfSPD, enemySPD);
        dispatch(changeTurn(firstTurn));
      }}>
        出現蝙蝠
      </Button>

    </div>
  );
};