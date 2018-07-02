// commented out coins are due to testing the pairing with btc (test/api/shape_shift/rate.spec.js)
// according the docs (https://info.shapeshift.io/api#api-2)
// these are available, but the response returned unavailable
// when tests were being developed.

const supportedCoinOptions = [
  'btc',
  'ltc',
  // 'ppc',
  // 'drk',
  'doge',
  // 'nmc',
  // 'ftc',
  'blk',
  'nxt',
  // 'btcd',
  // 'qrk',
  'rdd',
  // 'nbt',
  // 'bts',
  // 'bitusd',
  // 'xcp',
  'xmr'
];

const btcPairings = () => {
  return supportedCoinOptions.filter(c => c !== 'btc');
};

export default {
  coins: supportedCoinOptions,
  btcPairings: btcPairings()
}

// TODO: generate a permutations algorithm that builds all possible combinations from supportedCoinOptions