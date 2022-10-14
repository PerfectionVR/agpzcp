/**
 * In-game Trait
 */
type PZTrait = {
  /**
   * In-game name
   */
  name: string;
  /**
   * In-game cost, can be negative.
   */
  cost: number;
  /**
   * In-game description
   */
  description: string;
  /**
   * In-game modifiers
   */
  modifiers?: {
    /**
     * Foraging skills. Dynamic.
     */
    foraging?: {
      [x: string]: number;
    };
    /**
     * Major skills. Dynamic.
     */
    skills?: {
      [x: string]: number;
    };
  };
};

export default PZTrait;
