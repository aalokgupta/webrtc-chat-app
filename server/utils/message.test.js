  var expect = require('expect');
  var {generateMessage, generateLocationMessage} = require('./message');
  // var {} = require('./message');
  describe('generateMessage', () => {
      it('should generate correct message object', () => {
        var from = "aalok";
        var text = "test generateMessage";
        var message = generateMessage(from, text);
        // expect(message.createdAt).toBe('');
        expect(message).toMatchObject({
          from: from,
          text: text
        });
      });
  });

  describe('generateLocationMessage', () => {
    it('should generate correct location url object', () => {
      var from = "aalok";
      var latitude = 28;
      var longitude = 76;
      var url = "https://www.google.com/maps/search/?api=1&query=28,76";
      var locationMessage = generateLocationMessage(from, latitude, longitude);
      expect(locationMessage).toMatchObject({
        from: from,
        locationUrl: url
      });
    });
  });
