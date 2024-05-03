import { GiBroadsword } from "react-icons/gi";
import { LiaMagicSolid } from "react-icons/lia";

const classes = [
  {
    classTitle: "戰士",
    icon: GiBroadsword,
    initialStats: {
      minATK: 10,
      maxATK: 15,
      minDEF: 10,
      maxDEF: 15,
      minMATK: 2,
      maxMATK: 3,
      minMDEF: 2,
      maxMDEF: 3,
      minSPD: 2,
      maxSPD: 3,
      maxHP: 100,
      maxMP: 10,
    },
    initialSkills: [],
  },
  {
    classTitle: "法師",
    icon: LiaMagicSolid,
    initialStats: {
      minATK: 3,
      maxATK: 8,
      minDEF: 3,
      maxDEF: 8,
      minMATK: 10,
      maxMATK: 15,
      minMDEF: 10,
      maxMDEF: 15,
      minSPD: 2,
      maxSPD: 3,
      maxHP: 70,
      maxMP: 35,
    },
    initialSkills: ["火焰"],
  },
];

export default classes;
