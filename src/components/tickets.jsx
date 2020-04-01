/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import Service from '../service/service';
import {
  TopSelector, BtnSelector, TicketWrapper, MainTicket,
  TicketColumn, SpanSells, SpanSellsWrapper, TopCells,
} from '../style/form/checkBox';

export default class Ticket extends React.Component {
  service = new Service();

  constructor() {
    super();
    this.state = {
      packOfTickets: [],
      // eslint-disable-next-line react/no-unused-state
      ticketsMainInfo: [],
      // displayingTicket: [],
      // cheap: false,
      fast: false,
    };
  }

  componentDidMount() {
    this.service.getResourseId()
      .then((pack) => this.setState({ packOfTickets: [...pack] }));
  }

  destructData = (packOfTickets) => (
    packOfTickets.reduce((acc, el) => {
      if (el !== undefined) {
        acc.push(el.data);
      }
      return acc;
    }, [])
  )

  destructTickets = () => {
    const { packOfTickets } = this.state;
    const data = this.destructData(packOfTickets);
    return (
      data.reduce((acc, el) => {
        acc.push(el.tickets);
        return acc;
      }, [])
    );
  }

  deepDestruct = () => {
    const mass = this.destructTickets();
    return (
      mass.reduce((acc, el) => {
        el.forEach((element) => {
          acc.push(element);
        });
        return acc;
      }, [])
    );
  }

  structuringTicket = (ticketsArr) => (
    ticketsArr.reduce((acc, el, id) => {
      acc.push({
        id,
        price: el.price,
        duration: (el.segments[0].duration + el.segments[1].duration),
        transplant: el.segments[0].stops.length,
      });
      return acc;
    }, [])
  )

  displayingTicket = (listId, ticketsData) => {
    const tickets = [];
    listId.forEach((el) => tickets.push(ticketsData[el]));
    return tickets;
  }

  btnSelect = (id) => () => {
    if (id === 'cheap') {
      this.setState({ fast: false });
    } else {
      this.setState({ fast: true });
    }
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
    const { fast } = this.state;
    let arr;
    if (initialArr.length > 0 && fast) {
      arr = initialArr.slice()
        .sort((tik1, tik2) => (tik1.duration > tik2.duration ? 1 : -1));
      return arr;
    }
    arr = initialArr.slice().sort((tik1, tik2) => (tik1.price > tik2.price ? 1 : -1));
    return arr;
  }

  render() {
    const { condition } = this.props;

    const aaa = this.deepDestruct();

    if (aaa.length === 0) {
      return null;
    }

    const structuredTicket = this.structuringTicket(aaa);

    // Логика отображения
    const qqq = this.topBtnLogic(structuredTicket);
    const ids = [];

    if (qqq.length > 0) {
      for (let i = 0; i < qqq.length; i += 1) {
        ids.push(qqq[i].id); // id билетов, которые надо отобразить
      }
    }

    let show = this.displayingTicket(ids, aaa); // id, билеты берем у изначального списка билетов
    // all, without, oneTrans, twoTrans, threeTrans
    const {
      all, without, oneTrans, twoTrans, threeTrans,
    } = condition;
    if (!all && (show.length > 0)) {
      show = show.filter((el) => (without ? (el.segments[0].stops.length === 0) : null)
          || (oneTrans ? (el.segments[0].stops.length === 1) : null)
            || (twoTrans ? (el.segments[0].stops.length === 2) : null)
              || (threeTrans ? (el.segments[0].stops.length === 3) : null));
    }
    show = show.filter((el, id) => id < 5);

    return (
      <TicketWrapper>
        <TopSelector>
          <BtnSelector onClick={this.btnSelect('cheap')}>Самый дешевый</BtnSelector>
          <BtnSelector onClick={this.btnSelect('fast')}>Самый быстрый</BtnSelector>
        </TopSelector>
        {show.map((el, id) => (
          // eslint-disable-next-line react/no-array-index-key
          <MainTicket key={id}>
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
      </TicketWrapper>
    );
  }
}

Ticket.defaultProps = {
  all: false,
  without: false,
  oneTrans: false,
  twoTrans: false,
  threeTrans: false,
  condition: {},
};
Ticket.propTypes = {
  condition: PropTypes.object,
  all: PropTypes.bool,
  without: PropTypes.bool,
  oneTrans: PropTypes.bool,
  twoTrans: PropTypes.bool,
  threeTrans: PropTypes.bool,
};
