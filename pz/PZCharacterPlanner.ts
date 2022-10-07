import { computed, makeObservable } from "mobx";
import PZData from "@pz/PZData";
import PZCharacter from "@pz/PZCharacter";

export default class PZCharacterPlanner {
  private readonly _data: PZData;
  private readonly _character: PZCharacter;

  @computed
  public get availableJobs() {
    return this._data.jobs;
  }

  @computed
  public get availablePositiveTraits() {
    return this._data.traits.filter(
      (x) => x.cost < 0 && !this._character.hasTrait(x)
    );
  }

  @computed
  public get availableNegativeTraits() {
    return this._data.traits.filter(
      (x) => x.cost >= 0 && !this._character.hasTrait(x)
    );
  }

  public get character() {
    return this._character;
  }

  public constructor() {
    this._data = new PZData();
    this._character = new PZCharacter(this._data.jobs[0]);
    makeObservable(this);
  }
}
