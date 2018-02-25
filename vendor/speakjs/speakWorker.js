importScripts("speakGenerator.js"),onmessage=function(e){postMessage(generateSpeech(e.data.text,e.data.args))};
