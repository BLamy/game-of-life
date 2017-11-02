import Game, { evolveGrid } from "./game-of-life";

describe('Provided Usecases', () => {
  it(`
  010      111
  111  =>  101
  010      111
  `, () => {
    expect(
      evolveGrid([
        [0, 1, 0], 
        [1, 1, 1], 
        [0, 1, 0]
      ])
    ).toEqual([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]);
  });
  
  it(`
  101      010
  010  =>  101
  101      010
  `, () => {
    expect(
      evolveGrid([
        [1, 0, 1], 
        [0, 1, 0], 
        [1, 0, 1]
      ])
    ).toEqual([
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0]
    ]);
  });
  
  it(`
  0110      0110 
  1001      1001 
  0110  =>  0110 
  0000      0000
  `, () => {
    expect(
      evolveGrid([
        [0, 1, 1, 0], 
        [1, 0, 0, 1], 
        [0, 1, 1, 0], 
        [0, 0, 0, 0]
      ])
    ).toEqual([
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]);
  });
  
  it(`
  00000      00100 
  01110      01010 
  01110  =>  10001 
  01110      01010 
  00000      00100
  `, () => {
    expect(
      evolveGrid([
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ])
    ).toEqual([
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0]
    ]);
  });  
});

describe('Multiple Generations', () => {
  it(`
  010      111      101      000
  111  =>  101  =>  000  =>  000
  010      111      101      000
  `, () => {
    const game = Game([
      [0, 1, 0], 
      [1, 1, 1], 
      [0, 1, 0]
    ])
    expect(
      game.next().value
    ).toEqual([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]);
    expect(
      game.next().value
    ).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ]);
    expect(
      game.next().value
    ).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });
});
  