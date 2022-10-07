import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
  runInAction,
} from "mobx";
import { computedFn } from "mobx-utils";
import PZJob from "@pz/models/PZJob";
import PZTrait from "@pz/models/PZTrait";

export default class PZCharacter {
  @observable
  private _job: PZJob;
  @action
  public setJob(job: PZJob) {
    this._job = job;
  }
  @computed
  public get job() {
    return this._job;
  }
  public isJob = computedFn((job: PZJob) => {
    return this._job.id === job.id;
  });

  private _traits = new ObservableMap<number, PZTrait>();
  @action
  public addTrait(trait: PZTrait) {
    this._traits.set(trait.id, trait);
  }
  public hasTrait = computedFn((trait: PZTrait) => {
    return this._traits.has(trait.id);
  });
  @action
  public removeTrait(trait: PZTrait) {
    this._traits.delete(trait.id);
  }
  @computed
  public get traits() {
    return Array.from(this._traits.values()).sort((x) => x.cost);
  }

  @computed
  public get points() {
    return this.traits.reduce((points, b) => {
      return points + b.cost;
    }, this._job.points);
  }

  public constructor(defaultJob: PZJob) {
    this._job = defaultJob;
    makeObservable(this);
  }
}
