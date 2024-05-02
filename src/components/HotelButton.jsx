import { useDispatch, useSelector } from "react-redux";
import { addMessage, changeMoney, changeHP, changeMP, changeExecutingCommand } from "../store";
import Button from "./Button";
import Swal from "sweetalert2";

export default function HotelButton({ setCurrentStep }) {
  const dispatch = useDispatch();
  const { money } = useSelector(state => state.items);
  const selfMaxHP = useSelector(state => state.characterStats.maxHP);
  const selfMaxMP = useSelector(state => state.characterStats.maxMP);

  const handleClick = () => {
    // 錢不夠不能休息
    if (money < 10) {
      Swal.fire({
        icon: 'info',
        title: '金錢不足！',
      })

      return;
    };

    Swal.fire({
      title: '確定要在旅館休息嗎？',
      text: '休息一次 $10',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認',
      cancelButtonText: '取消'
    }).then((result) => {
      dispatch(addMessage({
        type: 'basic',
        content: '休息中⋯⋯'
      }))
      dispatch(changeMoney(money - 10));
      dispatch(changeExecutingCommand(true));

      setTimeout(() => {
        dispatch(addMessage({
          type: 'success',
          content: '休息完畢，神清氣爽！HP 和 MP 都恢復了！'
        }))

        // 補滿 HP 和 MP
        dispatch(changeHP(selfMaxHP));
        dispatch(changeMP(selfMaxMP));

        // 回歸先前狀態
        setCurrentStep('主頁');
        dispatch(changeExecutingCommand(false));
      }, 1500)
    });
  }

  return (
    <Button onClick={handleClick} lime>進旅館休息（$10）</Button>
  )
}