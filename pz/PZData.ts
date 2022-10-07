import { ObservableMap, computed, makeObservable, action } from "mobx";
import PZTrait from "@pz/models/PZTrait";
import PZJob from "@pz/models/PZJob";

export default class PZData {
  private readonly _jobs: ObservableMap<number, PZJob> = new ObservableMap<
    number,
    PZJob
  >();
  @computed
  public get jobs() {
    return Array.from(this._jobs.values()).sort((x) => x.id);
  }

  private readonly _traits: ObservableMap<number, PZTrait> = new ObservableMap<
    number,
    PZTrait
  >();
  @computed
  public get traits() {
    return Array.from(this._traits.values()).sort((x) => x.cost);
  }

  @action
  private _init() {
    this._jobs.replace({
      1: { id: 1, name: "Unemployed", points: 12 },
      2: { id: 2, name: "Chad", points: 99 },
      3: { id: 3, name: "Gimp", points: 0 },
    });
    this._traits.replace({
      1: { id: 1, name: "Trait One", cost: 1 },
      2: { id: 2, name: "Trait Two", cost: -1 },
      3: { id: 3, name: "Trait Three", cost: 10 },
      4: { id: 4, name: "Trait Four", cost: -10 },
    });
  }

  public constructor() {
    makeObservable(this);
    this._init();
  }
}
