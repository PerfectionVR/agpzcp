import PZData from "@pz/PZData";
import PZCharacter from "@pz/PZCharacter";
import PZMods from "@pz/PZMods";

export default class PZCharacterPlanner {
  /**
   * PZMods, contains all mod and preset information.
   */
  private readonly _mods: PZMods;
  /**
   * PZData, load with mods in order to predict actual state.
   */
  private readonly _data: PZData;
  /**
   * PZCharacter
   */
  public readonly character: PZCharacter;

  /**
   * PZCharacter planner.
   */
  public constructor() {
    this._mods = new PZMods();
    this._data = new PZData();
    // Always load first preset by default.
    this._data.loadModsInOrder(this._mods.presets[0]);
    // PZCharacter is dependant on having at least one job available.
    this.character = new PZCharacter(this._data);
  }
}
