/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import GlobalFonts from '../style/form/injection';
import SortType from './sortType';
import TransplantType from './transplantType';
import Ticket from './ticket';
import { TicketWrapper, CompaniImage } from '../style/form/checkBox';
import logo from './logo.svg';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 820px;
  background-color: #E5E5E5;
  border: 1px solid transparent;
  margin: 0 auto;
`;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      transplantType: {
        all: false,
        without: false,
        one: false,
        two: false,
        three: false,
      },
      sortType: {
        cheap: true,
        fast: false,
      },
    };
  }

  updateTransplantType = (valueObect) => {
    this.setState({ transplantType: { ...valueObect } });
  }

  updateSortType = (valueObject) => {
    this.setState({ sortType: { ...valueObject } });
  }

  render() {
    const { transplantType, sortType } = this.state;
    return (
      <Wrapper>
        <GlobalFonts />
        <TransplantType updateTransplantType={this.updateTransplantType} />
        <TicketWrapper>
          <CompaniImage src={logo} />
          <SortType updateSortType={this.updateSortType} sortType={sortType} />
          <Ticket transplantType={transplantType} sortType={sortType} />
        </TicketWrapper>
      </Wrapper>
    );
  }
}
