/* eslint-disable no-await-in-loop */
const axios = require('axios').default;

export default class Service {
  apibase = 'https://front-test.beta.aviasales.ru';

  constructor(iataCode) {
    this.iataCode = iataCode;
  }

  onError = (err) => {
    console.log(`WTF${err}`);
  }

  async getResourseId() {
    const res = await axios.get(`${this.apibase}/search`);
    const { searchId } = res.data;
    const arrTicketsPacket = [];

    const ticketsUrl = `${this.apibase}/tickets?searchId=${searchId}`;

    let ticketPack = await axios.get(`${ticketsUrl}`).catch(this.onError);
    await arrTicketsPacket.push(ticketPack);

    while (ticketPack && !ticketPack.data.stop) {
      ticketPack = await axios.get(`${ticketsUrl}`).catch(this.onError);
      await arrTicketsPacket.push(ticketPack);

      // await console.log(ticketPack);
    }
    return arrTicketsPacket;
  }

  getImage() {
    const arrayImages = [];
    this.iataCode.map(async (el) => {
      const image = await axios.get(`https://pics.avs.io/99/36/${el}.png`);
      arrayImages.push(image);
    });
    return arrayImages;
  }
}
