const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./helpers');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5d6d8691325c9b19017eb18d'
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById('5d6d8691325c9b19017eb18d');
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      const result_1 = await creator.save();
      return createdEvent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
