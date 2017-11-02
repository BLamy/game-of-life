import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
  width: calc(100% - 360px);
  height: calc(100% - 40px);
  margin: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.4);
`;
export const Tr = styled.tr`
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
`;
export const Td = styled.td`
  border: 1px solid #e0e0e0;
  border-collapse: collapse;
  background-color: ${props => (props.alive ? "#607D8B" : "white")};
`;
