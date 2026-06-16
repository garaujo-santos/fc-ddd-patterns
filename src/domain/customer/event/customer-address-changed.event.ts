import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: {
    id: string;
    name: string;
    address: any;
  };

  constructor(eventData: { id: string; name: string; address: any }) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
