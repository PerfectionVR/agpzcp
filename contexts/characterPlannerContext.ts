import { createContext } from "react";
import PZCharacterPlanner from "@pz/PZCharacterPlanner";

const characterPlanner = new PZCharacterPlanner();
const characterPlannerContext = createContext(characterPlanner);

export default characterPlannerContext;
