import Address from "../value-object/address";
import Customer from "./customer";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";

describe("Customer Domain Events", () => {
  describe("CustomerCreatedEvent", () => {
    it("should dispatch CustomerCreatedEvent when a customer is created", () => {
      const notifySpy = jest.spyOn(EventDispatcher.prototype, "notify");
      
      const customer = new Customer("1", "John Doe");
      
      expect(notifySpy).toHaveBeenCalled();
      expect(notifySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          eventData: {
            id: "1",
            name: "John Doe",
          },
        })
      );
      
      notifySpy.mockRestore();
    });

    it("should execute EnviaConsoleLog1Handler when CustomerCreatedEvent is dispatched", () => {
      const consoleSpy = jest.spyOn(console, "log");
      
      const handler1 = new EnviaConsoleLog1Handler();
      const eventDispatcher = new EventDispatcher();
      
      eventDispatcher.register(
        CustomerCreatedEvent.name,
        handler1
      );
      
      const event = new CustomerCreatedEvent({ id: "1", name: "John Doe" });
      eventDispatcher.notify(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Esse é o primeiro console.log do evento: CustomerCreated"
      );
      
      consoleSpy.mockRestore();
    });

    it("should execute EnviaConsoleLog2Handler when CustomerCreatedEvent is dispatched", () => {
      const consoleSpy = jest.spyOn(console, "log");
      
      const handler2 = new EnviaConsoleLog2Handler();
      const eventDispatcher = new EventDispatcher();
      
      eventDispatcher.register(
        CustomerCreatedEvent.name,
        handler2
      );
      
      const event = new CustomerCreatedEvent({ id: "1", name: "John Doe" });
      eventDispatcher.notify(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Esse é o segundo console.log do evento: CustomerCreated"
      );
      
      consoleSpy.mockRestore();
    });

    it("should execute both handlers when CustomerCreatedEvent is dispatched", () => {
      const consoleSpy = jest.spyOn(console, "log");
      
      const handler1 = new EnviaConsoleLog1Handler();
      const handler2 = new EnviaConsoleLog2Handler();
      const eventDispatcher = new EventDispatcher();
      
      eventDispatcher.register(
        CustomerCreatedEvent.name,
        handler1
      );
      eventDispatcher.register(
        CustomerCreatedEvent.name,
        handler2
      );
      
      const event = new CustomerCreatedEvent({ id: "1", name: "John Doe" });
      eventDispatcher.notify(event);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Esse é o primeiro console.log do evento: CustomerCreated"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "Esse é o segundo console.log do evento: CustomerCreated"
      );
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      
      consoleSpy.mockRestore();
    });
  });

  describe("CustomerAddressChangedEvent", () => {
    it("should dispatch CustomerAddressChangedEvent when customer address is changed", () => {
      const consoleSpy = jest.spyOn(console, "log");
      
      const customer = new Customer("1", "John Doe");
      const handler = new EnviaConsoleLogHandler();
      const address = new Address("Street 1", 123, "13330-250", "São Paulo");
      
      customer.EventDispatcher.register(
        CustomerAddressChangedEvent.name,
        handler
      );
      
      customer.changeAddress(address);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Endereço do cliente: 1, John Doe alterado para: Street 1"
      );
      
      consoleSpy.mockRestore();
    });

    it("should include id, name, and address in CustomerAddressChangedEvent data", () => {
      const customer = new Customer("2", "Jane Smith");
      const address = new Address("Avenue 2", 456, "12345-678", "Rio de Janeiro");
      const eventData = {
        id: "2",
        name: "Jane Smith",
        address: address,
      };
      
      const event = new CustomerAddressChangedEvent(eventData);
      
      expect(event.eventData.id).toBe("2");
      expect(event.eventData.name).toBe("Jane Smith");
      expect(event.eventData.address.street).toBe("Avenue 2");
    });

    it("should log with correct format when address changes", () => {
      const consoleSpy = jest.spyOn(console, "log");
      
      const customer = new Customer("3", "Alice Johnson");
      const handler = new EnviaConsoleLogHandler();
      const address = new Address("Main Street", 789, "99999-000", "Brasília");
      
      customer.EventDispatcher.register(
        CustomerAddressChangedEvent.name,
        handler
      );
      
      customer.changeAddress(address);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Endereço do cliente: 3, Alice Johnson alterado para: Main Street"
      );
      
      consoleSpy.mockRestore();
    });
  });
});
