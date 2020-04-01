/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import LeftComp from '../style/form/leftForm';
import {
  Checkbox, StyledLabel, HeaderWrapper, Header,
} from '../style/form/checkBox';
import Ticket from './tickets';


export default class LeftComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      all: false,
      without: false,
      oneTrans: false,
      twoTrans: false,
      threeTrans: false,
    };
  }

  // события для чекбоксов
  checked = (_id) => () => {
    switch (_id) {
      case 1:
        this.setState((state) => ({
          all: !state.all,
        }));
        break;
      case 2:
        this.setState((state) => ({
          without: !state.without,
        }));
        break;
      case 3:
        this.setState((state) => ({
          oneTrans: !state.oneTrans,
        }));
        break;
      case 4:
        this.setState((state) => ({
          twoTrans: !state.twoTrans,
        }));
        break;
      case 5:
        this.setState((state) => ({
          threeTrans: !state.threeTrans,
        }));
        break;
      default:
        break;
    }
  }

  render() {
    const {
      all, without, oneTrans, twoTrans, threeTrans,
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
              checked={oneTrans}
              onChange={this.checked(3)}
            />
            <span style={{ marginLeft: 10 }}>1 пересадка</span>
          </StyledLabel>
          <StyledLabel>
            <Checkbox
              checked={twoTrans}
              onChange={this.checked(4)}
            />
            <span style={{ marginLeft: 10 }}>2 пересадки</span>
          </StyledLabel>
          <StyledLabel>
            <Checkbox
              checked={threeTrans}
              onChange={this.checked(5)}
            />
            <span style={{ marginLeft: 10 }}>3 пересадки</span>
          </StyledLabel>
        </LeftComp>
        <Ticket condition={{
          all, without, oneTrans, twoTrans, threeTrans,
        }}
        />
      </>
    );
  }
}
