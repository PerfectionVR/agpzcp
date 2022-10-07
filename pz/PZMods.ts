import { computed, makeObservable, ObservableMap } from "mobx";
import PZMod from "@pz/models/PZMod";
// Mod data imports
import modVanilla from "./mods/vanilla/mod.json";
import modTest from "./mods/test/mod.json";

/**
 * PZMods contains Mod information and mod presets.
 */
export default class PZMods {
  /**
   * Fixed mod presets with mod order
   */
  private readonly _presets = new ObservableMap<string, PZMod[]>({
    vanilla: [modVanilla as PZMod],
    alreadygone: [modVanilla as PZMod, modTest as PZMod],
  });

  /**
   * Public list of mod presets.
   */
  @computed
  public get presets() {
    return Array.from(this._presets.values());
  }

  public constructor() {
    makeObservable(this);
  }
}
