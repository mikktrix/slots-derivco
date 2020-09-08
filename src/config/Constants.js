const Constants = {
  REELS: 3,
  REEL_SECTORS: 4,
  NUM_SYMBOLS: 2,
  REEL_RERUNS: 10,
  SYMBOL_HEIGHT: 200,
  SYMBOL_PAD: 20,
  SPIN_SPEED: 2,
  SPIN_COST: 1,
  SYMBOL_SEQUENCE: 
  [
      "3127C",
      "3127C",
      "3127C"
  ],
  LINES:
  [
      // [reel, position]
      // top row
      [[0,1],[1,1],[2,1],],
      // middle row
      [[0,2],[1,2],[2,2],],
      // bottom row
      [[0,3],[1,3],[2,3],],
  ],
  PAYOUT_COMBINATIONS: // Symbol, Line, Prize
    [
      ["C", "TOP", 2000],
      ["C", "CENTER", 1000],
      ["C", "BOTTOM", 4000],
      ["7", "ANY", 150],
      ["7oC", "ANY", 75],
      ["3", "ANY", 50],
      ["2", "ANY", 20],
      ["1", "ANY", 10],
      ["AnyBar", "ANY", 5],
    ],
  PAYOUT_LINES: 9,
}

export default Constants;
