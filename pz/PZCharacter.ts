import {
  action,
  computed,
  makeObservable,
  observable,
  ObservableMap,
} from "mobx";
import { computedFn } from "mobx-utils";
import PZJob from "@pz/models/PZJob";
import PZTrait from "@pz/models/PZTrait";
import PZData from "@pz/PZData";
import { Decimal } from "decimal.js";

/**
 * PZCharacter, contains public methods to manipulate a character and offers statistics.
 */
export default class PZCharacter {
  private readonly _data: PZData;
  /**
   * The selected Job
   */
  @observable
  private _job: PZJob;
  /**
   * Set Job
   * @param job PZJob
   */
  @action
  public setJob(job: PZJob) {
    this._job = job;
  }
  /**
   * Job
   */
  @computed
  public get job() {
    return this._job;
  }
  /**
   * Determines if Job is the current job.
   */
  public isJob = computedFn((job: PZJob) => {
    return this._job.name === job.name;
  });
  /**
   * Array of available jobs.
   */
  @computed
  public get availableJobs() {
    return this._data.jobs;
  }
  /**
   * The selected traits.
   */
  private _traits = new ObservableMap<string, PZTrait>();
  /**
   * Add trait.
   * @param trait PZTrait
   */
  @action
  public addTrait(trait: PZTrait) {
    this._traits.set(trait.name, trait);
  }
  /**
   * Determines if the character has the trait.
   */
  public hasTrait = computedFn((trait: PZTrait) => {
    return this._traits.has(trait.name);
  });
  /**
   * Remove trait.
   * @param trait PZTrait
   */
  @action
  public removeTrait(trait: PZTrait) {
    this._traits.delete(trait.name);
  }
  /**
   * Traits
   */
  @computed
  public get traits() {
    return Array.from(this._traits.values()).sort((x) => x.cost);
  }
  /**
   * List of available positive traits.
   */
  @computed
  public get availablePositiveTraits() {
    return this._data.traits.filter((x) => x.cost < 0 && !this.hasTrait(x));
  }
  /**
   * List of available negative traits.
   */
  @computed
  public get availableNegativeTraits() {
    return this._data.traits.filter((x) => x.cost >= 0 && !this.hasTrait(x));
  }
  /**
   * Calculated trait points available.
   */
  @computed
  public get points() {
    return this.traits.reduce((points, trait) => {
      return points + trait.cost;
    }, this._job.points);
  }

  /**
   * Calculated foraging bonus.
   */
  @computed
  public get foragingBonus() {
    return this.traits.reduce<{ [k: string]: Decimal }>((foraging, trait) => {
      for (const k in trait.modifiers?.foraging) {
        if (!foraging[k]) {
          foraging[k] = new Decimal(0);
        }
        foraging[k] = new Decimal(foraging[k]).add(
          trait.modifiers?.foraging[k] ?? 0
        );
      }
      return foraging;
    }, {});
  }

  /**
   * Calculated skill bonus.
   */
  @computed
  public get skillBonus() {
    return this.traits.reduce<{ [k: string]: number }>((skills, trait) => {
      for (const k in trait.modifiers?.skills) {
        if (!skills[k]) {
          skills[k] = 0;
        }
        skills[k] += trait.modifiers?.skills[k] ?? 0;
      }
      return skills;
    }, {});
  }

  /**
   * Creates a character instance.
   * @param data Instance of PZData used for this character.
   */
  public constructor(data: PZData) {
    this._data = data;
    // Set the first job available.
    this._job = this._data.jobs[0];
    makeObservable(this);
  }
}
