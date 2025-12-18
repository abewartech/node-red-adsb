# node-red-contrib-adsb-decoder

Node-RED node for decoding ADS-B (Automatic Dependent Surveillance–Broadcast) messages into structured JavaScript objects.

This node is designed to sit behind an ADS-B source (for example, a TCP/UDP input or a serial decoder) and turn raw hex messages into usable data on the Node-RED message.

## Installation

From your Node-RED user directory (usually `~/.node-red`):

```bash
npm install node-red-contrib-adsb-decoder
```

Or install it via the **Palette Manager** in the Node-RED editor.

## Node: `adsb-decoder`

### Input

- `msg.payload`: ADS-B message as a hex string, for example:

  ```text
  8D4840D6202CC371C32CE0576098
  ```

### Output

On successful decode:

- `msg.payload`: The decoded ADS-B object returned by the underlying decoder library.
- `msg.adsb`: Same decoded object (convenience copy).

If the payload is empty or cannot be decoded, the node logs a warning or error in the Node-RED debug sidebar.

### Example decoded message

An example of the type of output produced (actual fields depend on message type):

```json
{
  "ca": 5,
  "data": {
    "callsign": "KLM1023_"
  },
  "df": 17,
  "icao": "4840D6",
  "messageType": "AircraftIdentifier",
  "pi": "576098",
  "tc": 4
}
```

## Notes

- This node uses the [`ads-b`](https://www.npmjs.com/package/ads-b) library under the hood.
- It currently supports the same subset of ADS-B messages as that library.

