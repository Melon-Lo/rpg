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
import { changeItem, changeEnemy, addMessage } from "../store";
import enemies from "../data/enemies";

export default function MainPage() {
  // DEV ONLY
  const dispatch = useDispatch();
  const state = useSelector(state => state.enemies);

  const navigate = useNavigate();
  const { roleCreated } = useSelector(state => state.systemStatus);

  const handleNavigate = () => {
    if (!roleCreated) {
      navigate('/create');
    }
  };

  // 若還未創建角色，自動導航到創建頁面
  useEffect(() => {
    handleNavigate();
  }, [])

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

        // 解構賦值
        const { name, img, loot, money } = currentEnemy;
        const { HP, maxHP, ATK, MATK, DEF, MDEF, SPD } = currentEnemy.stats;
        dispatch(changeEnemy({ name, img, money, loot, HP, maxHP, ATK, MATK, DEF, MDEF, SPD }));
        dispatch(addMessage({
          type: 'system',
          content: `${name}出現了！`
        }));
      }}>
        出現蝙蝠
      </Button>

    </div>
  );
};