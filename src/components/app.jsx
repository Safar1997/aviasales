/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import LeftComponent from './Condition';
import GlobalFonts from '../style/form/injection';

const Wrapper = styled.div`
  display: flex;
  height: 1350px;
  width: 960px;
  background-color: #E5E5E5;
  border: 1px solid transparent;
`;

export default class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <GlobalFonts />
        <LeftComponent />
      </Wrapper>
    );
  }
}
