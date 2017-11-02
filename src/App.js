import React, { Component } from "react";
import styled from "styled-components";
import { evolveGrid } from "./lib/game-of-life"

const Scaffold = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const Table = styled.table`
  border: 1px solid #E0E0E0;
  border-collapse: collapse;
  width: calc(100% - 360px);
  height: calc(100% - 40px);
  margin: 20px; 
  border-radius: 4px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
`;
const Tr = styled.tr`
  border: 1px solid #E0E0E0;
  border-collapse: collapse;
`;
const Td = styled.td`
  border: 1px solid #E0E0E0;
  border-collapse: collapse;
  background-color: ${props => (props.alive ? "#607D8B" : "white")};
`;

const Sidebar = styled.div`
  width: 320px;
  height: 100%;
  > h1 {
    font-size: 18px;
    width: 100%;
    text-align: center;
  }
`

// Taken from https://github.com/ramda/ramda/blob/v0.25.0/source/range.js
const range = (from, to) => {
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
}

export default class extends Component {
  
  constructor(props) {
    super(props);
    const { numberOfColumns = 10, numberOfRows = 10 } = props;    
    this.state = {
      game: range(0, numberOfRows).map(row => (
        range(0, numberOfColumns).map(column => (
          Math.round(Math.random())
        ))
      ))
    }
    
    setInterval(() => {
      this.setState(({ game }) => ({
        game: evolveGrid(game)
      }))
    }, 1000)
  }

  toggleSquareAtIndex = (row, column) => {
    this.setState(({ game }) => ({
      game: [
        ...game.slice(0, column),
        [...game[column].slice(0, row), !game[column][row], ...game[column].slice(row + 1)],
        ...game.slice(column + 1)
      ]
    }))
  };

  render() {
    const { numberOfColumns = 10, numberOfRows = 10 } = this.props;
    return (
      <Scaffold>
        <Table>
          {range(0, numberOfRows).map(row => (
            <Tr>
              {range(0, numberOfColumns).map(column => (
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
        <Sidebar><h1>Conway's Game of Life</h1></Sidebar>
      </Scaffold>
    );
  }
}