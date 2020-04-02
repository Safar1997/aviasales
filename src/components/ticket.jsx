/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import Service from '../service/service';
import {
  MainTicket,
  TicketColumn, SpanSells, SpanSellsWrapper, TopCells,
} from '../style/form/checkBox';


export default class Ticket extends React.Component {
  service = new Service();

  constructor() {
    super();
    this.state = {
      packOfTickets: [],
    };
  }

  componentDidMount() {
    this.service.getResourseId()
      .then((pack) => this.setState({ packOfTickets: [...pack] }));
  }

  getFlyInfo = (data) => {
    const { origin, destination } = data.segments[0];
    const direction = `${origin} - ${destination}`;
    const initialDate = data.segments[0].date.slice(0, -1);
    const initialDateSecond = data.segments[1].date.slice(0, -1);

    const hourse = ((new Date(initialDate).getHours())) < 10
      ? `0${(new Date(initialDate).getHours())}` : (new Date(initialDate).getHours());
    const minutes = new Date(initialDate).getMinutes() < 10
      ? `0${new Date(initialDate).getMinutes()}` : new Date(initialDate).getMinutes();

    const { duration } = data.segments[0];

    const durationHourFirst = Math.floor(duration / 60);
    const durationMinuteFirst = duration % 60 < 10
      ? `0${duration % 60}` : duration % 60;

    const allTime = (new Date(initialDate).getHours()) * 60
      + (new Date(initialDate).getMinutes()) + duration;

    const durationTimeHoursFirst = Math.floor(allTime / 60) < 10
      ? `0${Math.floor(allTime / 60)}` : Math.floor(allTime / 60) > 24
        ? (Math.floor(allTime / 60) - 24 < 10
          ? `0${Math.floor(allTime / 60) - 24}` : (Math.floor(allTime / 60) - 24)) : Math.floor(allTime / 60);

    const durationTimeMinutesFirst = allTime % 60 < 10
      ? `0${allTime % 60}` : allTime % 60;

    const firstDurationTime = `${durationTimeHoursFirst}:${durationTimeMinutesFirst}`;
    const firstTime = `${hourse}:${minutes} - ${firstDurationTime}`;
    const firstDurationTimeShow = `${durationHourFirst}ч ${durationMinuteFirst}м`;

    // Second Part
    const { duration: durationSecond } = data.segments[1];

    const hourseSecond = ((new Date(initialDateSecond).getHours())) < 10
      ? `0${(new Date(initialDateSecond).getHours())}` : (new Date(initialDateSecond).getHours());
    const minutesSecond = new Date(initialDateSecond).getMinutes() < 10
      ? `0${new Date(initialDateSecond).getMinutes()}` : new Date(initialDateSecond).getMinutes();


    const durationHourSecond = Math.floor(durationSecond / 60);
    const durationMinuteSecond = durationSecond % 60 < 10
      ? `0${durationSecond % 60}` : durationSecond % 60;

    const allTimeSecond = (new Date(initialDateSecond).getHours()) * 60
    + (new Date(initialDateSecond).getMinutes()) + durationSecond;

    const durationTimeHoursSecond = Math.floor(allTimeSecond / 60) < 10
      ? `0${Math.floor(allTimeSecond / 60)}` : Math.floor(allTimeSecond / 60) > 24
        ? (Math.floor(allTimeSecond / 60) - 24 < 10
          ? `0${Math.floor(allTimeSecond / 60) - 24}` : (Math.floor(allTimeSecond / 60) - 24)) : Math.floor(allTimeSecond / 60);

    const durationTimeMinutesSecond = allTimeSecond % 60 < 10
      ? `0${allTimeSecond % 60}` : allTimeSecond % 60;

    const secondDurationTime = `${durationTimeHoursSecond}:${durationTimeMinutesSecond}`;
    const secondTime = `${hourseSecond}:${minutesSecond} - ${secondDurationTime}`;
    const secondDurationTimeShow = `${durationHourSecond}ч ${durationMinuteSecond}м`;

    return [direction, firstTime, secondTime,
      firstDurationTimeShow, secondDurationTimeShow];
  }

  topBtnLogic = (initialArr) => {
    const { sortType: { fast } } = this.props;
    let arr;
    if (initialArr.length > 0 && fast) {
      arr = initialArr.slice()
        .sort((tik1, tik2) => (tik1.segments[0].duration > tik2.segments[0].duration ? 1 : -1));
      return arr;
    }
    arr = initialArr.slice().sort((tik1, tik2) => (tik1.price > tik2.price ? 1 : -1));
    return arr;
  }

  render() {
    const { transplantType } = this.props;
    const { packOfTickets } = this.state;


    let show = this.topBtnLogic(packOfTickets);

    const {
      all, without, one, two, three,
    } = transplantType;
    if (!all && (show.length > 0)) {
      show = show.filter((el) => (without ? (el.segments[0].stops.length === 0) : null)
          || (one ? (el.segments[0].stops.length === 1) : null)
            || (two ? (el.segments[0].stops.length === 2) : null)
              || (three ? (el.segments[0].stops.length === 3) : null));
    }
    if (show.length === 0) {
      show = this.topBtnLogic(packOfTickets);
    }
    show = show.filter((el, id) => id < 5);
    return (
      <>
        {show.map((el) => (
          <MainTicket key={show.id}>
            <TicketColumn>
              <SpanSellsWrapper>
                <SpanSells style={{ color: '#A0B0B9' }}>{this.getFlyInfo(el)[0]}</SpanSells>
                <SpanSells>{this.getFlyInfo(el)[2]}</SpanSells>
              </SpanSellsWrapper>
              <SpanSellsWrapper style={{ marginBottom: '10px' }}>
                <SpanSells style={{ color: '#A0B0B9' }}>{this.getFlyInfo(el)[0]}</SpanSells>
                <SpanSells>{this.getFlyInfo(el)[1]}</SpanSells>
              </SpanSellsWrapper>
              <SpanSellsWrapper style={{ marginBottom: '26px' }}>
                <TopCells>{el.price}</TopCells>
              </SpanSellsWrapper>
            </TicketColumn>
            <TicketColumn>
              <SpanSellsWrapper>
                <SpanSells style={{ color: '#A0B0B9' }}>В ПУТИ</SpanSells>
                <SpanSells>{this.getFlyInfo(el)[4]}</SpanSells>
              </SpanSellsWrapper>
              <SpanSellsWrapper style={{ marginBottom: '10px' }}>
                <SpanSells style={{ color: '#A0B0B9' }}>В ПУТИ</SpanSells>
                <SpanSells>{this.getFlyInfo(el)[3]}</SpanSells>
              </SpanSellsWrapper>
              <SpanSellsWrapper style={{ marginBottom: '50px' }} />
            </TicketColumn>
            <TicketColumn>
              <SpanSellsWrapper>
                <SpanSells style={{ textTransform: 'uppercase', color: '#A0B0B9' }}>
                  {el.segments[0].stops.length >= 2 ? `${el.segments[0].stops.length} пересадки`
                    : el.segments[0].stops.length === 1 ? '1 пересадка' : '0 пересадок'}
                </SpanSells>
                <SpanSells>
                  {el.segments[0].stops.map((elem, iD, arrr) => {
                    if (iD === arrr.length - 1) {
                      return `${elem}`;
                    }
                    return `${elem},`;
                  })}
                </SpanSells>
              </SpanSellsWrapper>
              <SpanSellsWrapper
                style={{
                  marginBottom: el.segments[1].stops.length === 0
                    ? '31px' : '10px',
                }}
              >
                <SpanSells style={{ textTransform: 'uppercase', color: '#A0B0B9' }}>
                  {el.segments[1].stops.length >= 2 ? `${el.segments[1].stops.length} пересадки`
                    : el.segments[1].stops.length === 1 ? '1 пересадка' : '0 пересадок'}
                </SpanSells>
                <SpanSells>
                  {el.segments[1].stops.map((elem, iD, arrr) => {
                    if (iD === arrr.length - 1) {
                      return `${elem}`;
                    }
                    return `${elem},`;
                  })}
                </SpanSells>
              </SpanSellsWrapper>
              <SpanSellsWrapper style={{ marginBottom: '10px' }}>
                <img alt="aim" src={`https://pics.avs.io/99/36/${el.carrier}.png`} />
              </SpanSellsWrapper>
            </TicketColumn>
          </MainTicket>
        ))}
      </>
    );
  }
}

Ticket.defaultProps = {
  transplantType: {},
};
Ticket.propTypes = {
  transplantType: PropTypes.object,
};
