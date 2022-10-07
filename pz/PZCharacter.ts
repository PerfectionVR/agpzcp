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
    return this._job.id === job.id;
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
  private _traits = new ObservableMap<number, PZTrait>();
  /**
   * Add trait.
   * @param trait PZTrait
   */
  @action
  public addTrait(trait: PZTrait) {
    this._traits.set(trait.id, trait);
  }
  /**
   * Determines if the character has the trait.
   */
  public hasTrait = computedFn((trait: PZTrait) => {
    return this._traits.has(trait.id);
  });
  /**
   * Remove trait.
   * @param trait PZTrait
   */
  @action
  public removeTrait(trait: PZTrait) {
    this._traits.delete(trait.id);
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
    return this.traits.reduce((points, b) => {
      return points + b.cost;
    }, this._job.points);
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
