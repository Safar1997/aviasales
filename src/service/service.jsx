/* eslint-disable no-await-in-loop */
const axios = require('axios').default;

export default class Service {
  apibase = 'https://front-test.beta.aviasales.ru';

  onError = (err) => {
    console.log(`WTF${err}`);
    // alert('Сори, джаст э литтл проблем');
  }

  async getResourseId() {
    const res = await axios.get(`${this.apibase}/search`);
    const { searchId } = res.data;
    const arrTicketsPacket = [];

    const ticketsUrl = `${this.apibase}/tickets?searchId=${searchId}`;

    let ticketPack = await axios.get(`${ticketsUrl}`).catch(this.onError);
    arrTicketsPacket.push(ticketPack);

    while (ticketPack && !ticketPack.data.stop) {
      ticketPack = await axios.get(`${ticketsUrl}`).catch(this.onError);
      arrTicketsPacket.push(ticketPack);
    }
    if (arrTicketsPacket[arrTicketsPacket.length - 1] === undefined) {
      arrTicketsPacket.pop();
    }
    const modified = arrTicketsPacket.reduce((acc, el) => {
      acc.push(el.data.tickets);
      return acc;
    }, []);
    const modifiedTwo = modified.reduce((acc, el) => {
      el.map((elem, id) => acc.push({ ...elem, id }));
      return acc;
    }, []);

    return modifiedTwo;
  }
}
