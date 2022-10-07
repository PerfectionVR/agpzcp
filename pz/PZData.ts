import { ObservableMap, computed, makeObservable, action } from "mobx";
import PZTrait from "@pz/models/PZTrait";
import PZJob from "@pz/models/PZJob";
import PZMod from "@pz/models/PZMod";

/**
 * PZData serves as a data cache for loaded mods.
 */
export default class PZData {
  /**
   * Mod Cache
   */
  private readonly _mods = new ObservableMap<number, PZMod>();
  /**
   * Array of loaded mods
   */
  @computed
  public get mods() {
    return Array.from(this._mods.values());
  }

  /**
   * Job Cache
   */
  private readonly _jobs = new ObservableMap<number, PZJob>();
  /**
   * Array of loaded Jobs
   */
  @computed
  public get jobs() {
    return Array.from(this._jobs.values()).sort((x) => x.id);
  }
  /**
   * Trait Cache
   */
  private readonly _traits = new ObservableMap<number, PZTrait>();
  /**
   * Array of loaded Traits
   */
  @computed
  public get traits() {
    return Array.from(this._traits.values()).sort((x) => x.cost);
  }

  /**
   * Loads mods in order.
   * @param mods PZMod list
   */
  @action
  public loadModsInOrder(mods: PZMod[]) {
    const jobMap = new Map<number, PZJob>();
    const traitMap = new Map<number, PZTrait>();
    for (var i = 0; i < mods.length; i++) {
      const mod = mods[i];
      mod.jobs.forEach((job) => jobMap.set(job.id, job));
      mod.traits.forEach((trait) => traitMap.set(trait.id, trait));
    }
    this._jobs.replace(jobMap);
    this._traits.replace(traitMap);
  }

  public constructor() {
    makeObservable(this);
  }
}
