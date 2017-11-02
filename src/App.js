import React, { Component } from "react";
import styled from "styled-components";
import { evolveGrid } from "./lib/game-of-life";
import { Button } from "antd";
import SliderBox from "./view/SliderBox";

const Scaffold = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Table = styled.table`
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
  width: calc(100% - 360px);
  height: calc(100% - 40px);
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.4);
`;
const Tr = styled.tr`
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
`;
const Td = styled.td`
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
  background-color: ${props => (props.alive ? "#607D8B" : "white")};
`;
const Sidebar = styled.div`
  width: 320px;
  height: 100%;
  padding: 20px;
  text-align: center;
  > h1 {
    font-size: 18px;
    width: 100%;
  }
  > h2 {
    font-size: 14px;
    text-align: left;
  }
`;

// Taken from https://github.com/ramda/ramda/blob/v0.25.0/source/range.js
const range = (from, to) => {
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // How long in seconds is each evolution cycle 
      evolutionSpeed: 1,
      // Is the game of life currently started
      isStarted: false,
      // 
      numberOfColumns: 10,
      numberOfRows: 10,
      game: range(0, 10).map(row =>
        range(0, 10).map(column => Math.round(Math.random()))
      )
    };
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      this.setState(({ game }) => ({
        isStarted: true,
        game: evolveGrid(game)
      }));
    }, this.state.evolutionSpeed * 1000);
  };

  stopInterval = () => {
    clearInterval(this.interval);
    this.setState({
      isStarted: false
    });
  };

  updateNumberOfColumns = numberOfColumns => {
    this.setState(state => {
      if (state.numberOfColumns > numberOfColumns) {
        return {
          numberOfColumns,
          game: state.game.slice(0, numberOfColumns)
        };
      } else {
        return {
          numberOfColumns,
          game: [
            ...state.game,
            ...new Array(numberOfColumns - state.game.length).fill(
              new Array(state.numberOfRows).fill(0)
            )
          ]
        };
      }
    });
  };

  updateNumberOfRows = numberOfRows => {
    this.setState(state => {
      if (state.numberOfRows > numberOfRows) {
        return {
          numberOfRows,
          game: state.game.map(row => row.slice(0, numberOfRows))
        };
      } else {
        return {
          numberOfRows,
          game: state.game.map(row => [
            ...row,
            ...new Array(numberOfRows - row.length).fill(0)
          ])
        };
      }
    });
  };

  updateEvolutionSpeed = evolutionSpeed => {
    this.setState({
        evolutionSpeed
      },
      () => {
        clearInterval(this.interval);
        this.startInterval();
      }
    );
  };

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
          {range(0, this.state.numberOfRows).map(row => (
            <Tr>
              {range(0, this.state.numberOfColumns).map(column => (
                <Td
                  alive={this.state.game[column][row]}
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
          <h2>Number of Rows:</h2>
          <SliderBox
            value={this.state.numberOfRows}
            onChange={this.updateNumberOfRows}
          />
          <h2>Number of Columns:</h2>
          <SliderBox
            value={this.state.numberOfColumns}
            onChange={this.updateNumberOfColumns}
          />
          <h2>Evolution Speed:</h2>
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
