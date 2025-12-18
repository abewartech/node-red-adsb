const decoders = require('ads-b');

module.exports = function (RED) {
  function ADSBDecoderNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    const decoder = new decoders.ADSBVersion2Decoder();

    node.on('input', function (msg, send, done) {
      send = send || function () { node.send.apply(node, arguments); };

      const payload = msg.payload != null ? String(msg.payload).trim() : '';

      if (!payload) {
        node.warn('adsb-decoder: empty payload, nothing to decode');
        send(msg);
        if (done) done();
        return;
      }

      try {
        const decoded = decoder.decode(payload);

        msg.adsb = decoded;
        msg.payload = decoded;

        send(msg);
        if (done) done();
      } catch (err) {
        node.error('adsb-decoder: failed to decode ADS-B message: ' + err.message, msg);
        if (done) done(err);
      }
    });
  }

  RED.nodes.registerType('adsb-decoder', ADSBDecoderNode);
};