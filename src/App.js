import React, { Component } from "react";
import { evolveGrid, generateRandomGrid } from "./lib/game-of-life";
import { Button } from "antd";
import SliderBox from "./view/SliderBox";
import { Table, Td, Tr } from "./view/Table";
import { Sidebar, Scaffold } from "./view/Layout";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // How long in seconds is each evolution cycle
      evolutionSpeed: 1,
      // Is the game of life currently started
      isStarted: false,
      // Game state
      game: generateRandomGrid(10, 10)
    };
  }

  // Generates a new game 
  createNewGame = () => {
    this.setState(({ game }) => ({
      game: generateRandomGrid(game[0].length, game.length)
    }));
  };

  // Starts evolving the grid perodically
  startInterval = () => {
    this.interval = setInterval(() => {
      this.setState(({ game }) => ({
        game: evolveGrid(game)
      }));
    }, this.state.evolutionSpeed * 1000);
    this.setState({ isStarted: true });
  };

  // Stop evolving the grid
  stopInterval = () => {
    clearInterval(this.interval);
    this.setState({ isStarted: false });
  };

  // Change the period between evolution. (seconds)
  updateEvolutionSpeed = evolutionSpeed => {
    this.setState({ evolutionSpeed }, () => {
      clearInterval(this.interval);
      this.startInterval();
    });
  };
  
  // Update how many rows are in the grid
  updateNumberOfRows = numberOfRows => {
    this.setState(({ game }) =>
      game.length > numberOfRows
        ? { game: game.slice(0, numberOfRows) }
        : { game: [
            ...game,
            ...new Array(numberOfRows - game.length).fill(
              new Array(game[0].length).fill(0)
            )
          ]}
    );
  };

  // Update how many columns are in the grid
  updateNumberOfColumns = numberOfColumns => {
    this.setState(({ game }) => 
      (game[0].length > numberOfColumns) 
        ? { game: game.map(columns => columns.slice(0, numberOfColumns)) }
        : { game: game.map(columns => [
            ...columns,
            ...new Array(numberOfColumns - columns.length).fill(0)
          ])}
    );
  };

  // toggles whether a square is active or not
  toggleSquareAtIndex = (row, column) => {
    this.setState(({ game }) => ({
      game: [
        ...game.slice(0, column),
        [
          ...game[column].slice(0, row),
          !game[column][row],
          ...game[column].slice(row + 1)
        ],
        ...game.slice(column + 1)
      ]
    }));
  };

  render() {
    return (
      <Scaffold>
        <Table>
          {this.state.game.map((columns, column) => (
            <Tr>
              {columns.map((isLive, row) => (
                <Td
                  alive={isLive}
                  onClick={() => this.toggleSquareAtIndex(row, column)}
                >
                  &nbsp;
                </Td>
              ))}
            </Tr>
          ))}
        </Table>
        <Sidebar>
          <h1>Conway's Game of Life</h1>
          <Button
            style={{ margin: 10 }}
            type="primary"
            disabled={this.state.isStarted}
            onClick={this.startInterval}
          >
            Start
          </Button>
          <Button
            style={{ margin: 10 }}
            type="danger"
            disabled={!this.state.isStarted}
            onClick={this.stopInterval}
          >
            Stop
          </Button>
          <Button style={{ margin: 10 }} onClick={this.createNewGame}>
            New Game
          </Button>
          <h2>Number of Rows:</h2>
          <SliderBox
            value={this.state.game.length}
            onChange={this.updateNumberOfRows}
          />
          <h2>Number of Columns:</h2>
          <SliderBox
            value={this.state.game[0].length}
            onChange={this.updateNumberOfColumns}
          />
          <h2>Evolution Speed (s):</h2>
          <SliderBox
            min={0.1}
            max={2}
            step={0.1}
            value={this.state.evolutionSpeed}
            onChange={this.updateEvolutionSpeed}
          />
        </Sidebar>
      </Scaffold>
    );
  }
}
