export interface TestData {
  /**
   * The TestData id
   */
  id: number;
  /**
   * The name of the ship
   */
  name: string;
  /**
   * The ships model number
   */
  model: string;
  /**
   * The ships captain at time of launch
   **/
  captain: string;
  /**
   * The launch year
   **/
  launched: number;
  /**
   * The ships class
   **/
  class: string;
  /**
   * The ships status
   **/
  status: string;
}
