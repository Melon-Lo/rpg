import { RxCross1 } from "react-icons/rx";
import { useContext } from "react";
import { ModalContext } from "../contexts/modal";

export default function ManualModal() {
  const { setShowModal } = useContext(ModalContext);

  const handleCloseModal = () => {
    setShowModal('');
  };

  return (
    <div className="fixed bg-gray-800/75 inset-0 z-10">
      <div className="relative w-full h-full">
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-20 bg-gray-200 w-10/12 max-w-[1024px] h-5/6 rounded-lg overflow-y-hidden`}>
          <div className="relative flex flex-col justify-center items-center py-5">
            <h1 className="text-3xl text-gray-800">冒險指南</h1>
            <div onClick={handleCloseModal} className="absolute top-2 right-2">
              <RxCross1 className="text-2xl text-gray-900" />
            </div>
          </div>
          <div className="h-5/6 overflow-y-scroll bg-slate-50 p-3 mx-3 rounded-lg">
            <h5 className="text-xl my-2 font-medium">基本操作</h5>
            <p className="leading-6 text-gray-800">
              ＊正式進入遊戲前，需要點擊「新的冒險」創建角色：命名角色、選擇職業（詳見下方「職業」欄目）、擲骰子決定數值。<br />
              ＊進入遊戲後，所有的操作都在操作欄進行，根據場景的不同，可進行「移動」、「交談」、「探險」⋯⋯等等指令。<br />
              ＊「系統」指令中可存取進度，建議隨時保存當前進度。<br />
              ＊若重新整理頁面，則會跳到主頁，此時點擊「讀取進度」便可回到之前的進度繼續冒險。<br />
              <b className="text-red-500">＊若刪除瀏覽紀錄，則會喪失所有進度，請特別注意。</b>
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <h5 className="text-xl my-2 font-medium">職業</h5>
            <p className="leading-6 text-gray-800">
              ＊戰士：HP、攻擊力、防禦力高，一般情況下，普通攻擊就能造成不錯的傷害，技能以物理傷害為主。<br />
              ＊法師：MP、魔法攻擊力、魔法防禦力高，隨著等級提升，會習得不同屬性的攻擊魔法。
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <h5 className="text-xl my-2 font-medium">迷宮</h5>
            <p className="leading-6 text-gray-800">
              ＊當移動到某些場景時，指令欄會顯示「探險」指令，代表當前場景存在著迷宮，並且可進行探索。此時若點擊「探險」並確認，則會正式進入迷宮。<br />
              ＊進入迷宮後，畫面會出現許多格子，並且自己會是一個藍色小人的圖標。指令欄會多出「探索」指令，可以進行上下左右的移動，探索不同格子。<br />
              ＊不同的格子可能會有不同的事件，如獲得寶箱、遇到敵人⋯⋯等等。<br />
              ＊左上方會顯示已找到的寶箱數與總寶箱數。<br />
              ＊迷宮中會有該地區魔王，在畫面中顯示為紅色拱門的圖標。<br />
              ＊迷宮中不可存檔。<br />
              ＊打倒地區魔王、戰鬥失敗或是脫逃才能離開迷宮。<br />
              ＊若選擇脫逃，會損失 50% 金錢。<br />
              ＊每次進入迷宮，寶箱和敵人等都會刷新。<br />
              <b className="text-red-500">＊所有寶箱都只會被開啟一次，開過就不會再有，請特別注意。</b>
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <h5 className="text-xl my-2 font-medium">戰鬥</h5>
            <p className="leading-6 text-gray-800">
              ＊所有戰鬥皆為 1 vs 1，敵我雙方輪流行動。<br />
              ＊戰鬥開始後，會比較敵我的速度值，速度值高的先動作。<br />
              ＊執行完任何指令之後，都會輪到對方行動。<br />
              ＊「攻擊」：一般攻擊，根據攻擊力決定傷害；有機率產生「會心一擊」，傷害會加乘。<br />
              ＊「技能」：攻擊技能分成物理技能和攻擊魔法。物理技能根據攻擊力決定傷害；攻擊魔法根據魔法攻擊力決定傷害，若屬性擊中對方弱點還會有加乘效果。<br />
              ＊「逃跑」：脫離戰鬥，但有機率失敗；魔王戰無法逃跑。<br />
              ＊戰鬥勝利時，獲得經驗值與金錢，並且有機率獲得敵人掉落的戰利品。<br />
              ＊戰鬥失敗時，被傳送回村莊，並且損失 50% 的經驗值。<br />
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <h5 className="text-xl my-2 font-medium">等級與技能</h5>
            <p className="leading-6 text-gray-800">
              ＊經驗值達到當前等級要求經驗值時，則會升級。<br />
              ＊升級後當前 HP 和 MP 自動補滿。<br />
              ＊升級後各項數值提升，根據不同職業，在特定的等級會學習到特定的技能。
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <h5 className="text-xl my-2 font-medium">屬性</h5>
            <p className="leading-6 text-gray-800">
              ＊屬性分為：風、火、水、土、光、暗。<br />
              ＊屬性間無相剋關係。<br />
              ＊大部分的攻擊魔法都有屬性，少數會是無屬性。<br />
              ＊玩家自身不會有屬性。<br />
              ＊所有敵人都有一個弱點屬性，對其施展該屬性攻擊魔法時傷害會加乘。
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <h5 className="text-xl my-2 font-medium">村莊設施</h5>
            <p className="leading-6 text-gray-800">
              ＊位於村莊時，會有一些村莊獨有的指令可進行，供玩家補充資源、恢復裝態。<br />
              ＊「商店」：可買賣各項商品，可購買的品項隨著進度逐漸開放；出售的價格為買進的一半。<br />
              ＊「旅館」：只需要花 $10 便可使恢復狀態至最佳。
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <p className="leading-6 text-gray-800">
              感謝您遊玩好玩的RPG，此遊戲由 Melon Lo 獨立設計與製作，部分素材來自網路。<br />
              如果有任何的建議或是想要交流，歡迎與我聯絡～<br />
              E-mail：<a href="mailto:dp98062@gmail.com">dp98062@gmail.com</a><br />
              GitHub：<a target="_blank" rel="noreferrer" href="https://github.com/Melon-Lo/rpg">https://github.com/Melon-Lo/rpg</a>
            </p>
            <div className="w-full h-px bg-gray-400 my-4"></div>
            <p className="leading-6 text-gray-800">
              Copyright © Designed and Created by Melon Lo, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};