/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import './fonts.css';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: #2196F3;
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: 'white';
  border-radius: 2px;
  transition: all 150ms;
  border: 1px solid #2196F3;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')}
  }
`;

export const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

// Label for checkbox

export const StyledLabel = styled.label`
  display: block;
  :hover {
    background-color: #F1FCFF;
    cursor: pointer;
  }
  /* box-sizing: border-box; */
  padding: 10px;
  padding-left: 20px;
  height: 20px;
`;
// headerWrapper
export const HeaderWrapper = styled.div`
  padding-bottom: 10px;
  padding-left: 20px;
`;
// h1
export const Header = styled.h1`
  margin: 0px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

// top-selector
export const TopSelector = styled.div`
  box-sizing: border-box;
  width: 508px;
  height: 50px;
`;
// btn-selector

export const BtnSelector = styled.button`
  display: inline-block;
  outline: none;
  width: 252px;
  height: 50px;
  border: 1px solid #DFE5EC;
  border-radius: 5px;
  background-color: #FFFFFF;
  color: #4A4A4A;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  :focus {
    color: #FFFFFF;
    background-color: #2196F3;
  };
  :hover {
    cursor: pointer;
  }
`;

// TicketWrapper

export const TicketWrapper = styled.div`
  /* padding-left: 20px; */
  width: 502px;
`;

// Ticket
export const MainTicket = styled.div`
  box-sizing: border-box;
  display: flex;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  padding-top: 26px;
  padding-left: 0px;
  margin: 0px;
  margin-top: 20px;
  width: 502px;
  height: 184px;
`;
// FirstColumn
export const TicketColumn = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-left: 20px;
  width: 141px;
  justify-content: flex-end;
`;

export const SpanSellsWrapper = styled.div`

`;

export const SpanSells = styled.span`
  display: block;
  font-size: 12px;
  line-height: 18px;
  align-items: center;
  letter-spacing: 0.5px;
`;

export const TopCells = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  margin: 0px;
  color: #2196F3;
`;

export const CompaniImage = styled.img`
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
`;
