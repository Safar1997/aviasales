/* eslint-disable react/prop-types */
import React from 'react';
import {
  Checkbox, StyledLabel, HeaderWrapper, Header,
} from '../style/form/checkBox';
import LeftComp from '../style/form/checkBoxStyle';

export default class TransplantType extends React.Component {
  constructor() {
    super();
    this.state = {
      all: false,
      without: false,
      one: false,
      two: false,
      three: false,
    };
  }

  // события для чекбоксов
  checked = (_id) => () => {
    const { updateTransplantType } = this.props;
    switch (_id) {
      case 1:
        this.setState((state) => ({
          all: !state.all,
        }), () => {
          updateTransplantType(this.state);
        });
        break;
      case 2:
        this.setState((state) => ({
          without: !state.without,
        }), () => {
          updateTransplantType(this.state);
        });
        break;
      case 3:
        this.setState((state) => ({
          one: !state.one,
        }), () => {
          updateTransplantType(this.state);
        });
        break;
      case 4:
        this.setState((state) => ({
          two: !state.two,
        }), () => {
          updateTransplantType(this.state);
        });
        break;
      case 5:
        this.setState((state) => ({
          three: !state.three,
        }), () => {
          updateTransplantType(this.state);
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {
      all, without, one, two, three,
    } = this.state;
    return (
      <>
        <LeftComp>
          <HeaderWrapper>
            <Header>Количество пересадок</Header>
          </HeaderWrapper>
          <StyledLabel>
            <Checkbox
              checked={all}
              onChange={this.checked(1)}
            />
            <span style={{ marginLeft: 10 }}>Все</span>
          </StyledLabel>
          <StyledLabel>
            <Checkbox
              checked={without}
              onChange={this.checked(2)}
            />
            <span style={{ marginLeft: 10 }}>Без пересадок</span>
          </StyledLabel>
          <StyledLabel>
            <Checkbox
              checked={one}
              onChange={this.checked(3)}
            />
            <span style={{ marginLeft: 10 }}>1 пересадка</span>
          </StyledLabel>
          <StyledLabel>
            <Checkbox
              checked={two}
              onChange={this.checked(4)}
            />
            <span style={{ marginLeft: 10 }}>2 пересадки</span>
          </StyledLabel>
          <StyledLabel>
            <Checkbox
              checked={three}
              onChange={this.checked(5)}
            />
            <span style={{ marginLeft: 10 }}>3 пересадки</span>
          </StyledLabel>
        </LeftComp>
      </>
    );
  }
}
