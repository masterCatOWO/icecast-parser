const Parser = require('../src');
const Speaker = require('speaker');
const lame = require('lame');

const speaker = new Speaker();
const decoder = new lame.Decoder();
const radioStation = new Parser({
  url: 'http://online-kissfm.tavrmedia.ua/KissFM_deep',
  keepListen: true
});

radioStation.on('error', error => console.log(['Connection to', radioStation.getConfig('url'), 'was rejected'].join(' ')));
radioStation.on('empty', () => console.log(['Radio station', radioStation.getConfig('url'), 'doesn\'t have metadata'].join(' ')));
radioStation.on('metadata', metadata => console.log(metadata.StreamTitle));
radioStation.on('stream', stream => stream.pipe(decoder).pipe(speaker));
