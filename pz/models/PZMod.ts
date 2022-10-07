import PZJob from "@pz/models/PZJob";
import PZTrait from "@pz/models/PZTrait";

type PZMod = {
  id: number;
  name: string;
  traits: PZTrait[];
  jobs: PZJob[];
};

export default PZMod;
