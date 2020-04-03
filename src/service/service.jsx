/* eslint-disable no-await-in-loop */
const axios = require('axios').default;

export default class Service {
  apibase = 'https://front-test.beta.aviasales.ru';

  onError = (err) => {
    console.log(`WTF${err}`);
    alert(`Сервер иногда спецом ощибку отправляет,
    чтобы застать нас в расплох, но мы-то готовы, если нет билетов, просто перезагрузи :)`);
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
    // WARNING
    // const pushingPackage = async (ticketPackage, isStop) => {
    //   if (ticketPackage.length > 0 && isStop) {
    //     return;
    //   }
    //   ticketPack = await axios.get(`${ticketsUrl}`).catch(this.onError);
    //   arrTicketsPacket.push(ticketPack);
    //   pushingPackage(ticketPack, ticketPack.data.stop);
    // };
    // pushingPackage(ticketPack, ticketPack.data.stop);
    // END OF WARNING
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
