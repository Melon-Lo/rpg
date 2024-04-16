import { useContext } from "react";
import NavigationContext from "../contexts/navigation";

export default function useNavigation() {
  return useContext(NavigationContext);
}
