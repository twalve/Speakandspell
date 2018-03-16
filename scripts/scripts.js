(function (){
  const ENGINE = {
    CALLBACK: function (){return true;},
    TARGET: null,
    encode(component) {
      return decodeURIComponent(component);
    },
    fetch: function (data) {
      if (window[data]) {
        this.TARGET.DATA = window[data];
      }
    },
    loaded: function (callback) {
      if (callback) { this.CALLBACK = callback; }
      this.search();
    },
    search: function () {
      if (window.location.search) {
        const search = window.location.search.substring(1).replace("\&amp;\gi", "&");
        const queries = search.split("&");
        const pairs = {};

        for (const query in queries) {
          const keyvalue = queries[query].split("=");
          this.TARGET[keyvalue[0]] && this.TARGET[keyvalue[0]](keyvalue[1]);
        }
      } else {
        this.CALLBACK();
      }
    },
    target: function (target) {
      this.TARGET = target;
    },
  };

  const TALK = {
    PITCH: 1,
    RATE: 1,
    SYNTH: window.speechSynthesis,
    VOICES: [],
    speak: function(utterance) {
      var speak = new SpeechSynthesisUtterance(utterance);
      speak.voice = this.VOICES["Daniel (en-GB)"];
      speak.pitch = this.PITCH;
      speak.rate = this.RATE;

      this.SYNTH.speak(speak);
    },
    init: function () {
      this.VOICES = this.SYNTH.getVoices();
    }
  };
  TALK.init();

  const TLKTYP = {
    DATA: null,
    DISPLAY: null,
    DIVISION: null,
    TALK: false,
    SPOKEN: 0,
    build: function (title, data) {
      const list = document.createElement("ol");

      for (const word in TLKTYP.DATA) {
        const item = document.createElement("li");
        const span = document.createElement("span");
        span.innerHTML = TLKTYP.DATA[word];

        item.appendChild(span)
        list.appendChild(item)
      }

      document.querySelector("board").appendChild(list);
    },
    click: function (event) {
      var target = event.target;
      var nearest = $$.find.nearest(target, "[data]");

      console.log(target);
    },
    display: function (update) {
      console.log(this.DATA)
    },
    expurgate: function (data, display) {

    },
    get: {
      week: function () {
        let week = DATE.local().weekNumber;

        return WEEKS[TLKTYP.DIVISION][week];
      }
    },
    keydown: function (event) {
      // console.log(event.keyCode);
    },
    keys: {
      next: function () {

      },
      repeat: function () {

      },
      start: function () {
        this.TALK = true;
      },
      stop: function () {
        this.TALK = false;
      }
    },
    language: function (pairs) {
      if (!TLKTYP.TALK) {
        return false;
      }

      if (TLKTYP.SPOKEN < TLKTYP.DATA.length) {
        TALK.speak(TLKTYP.DATA[TLKTYP.SPOKEN]);
        TLKTYP.SPOKEN += 1;
        setTimeout(TLKTYP.language, 2000)
      }
    },
    loaded: function () {
      TLKTYP.DATA = ROM.weeks[TLKTYP.get.week()];
      // console.log(ROM.weeks)
    },
    listen: function () {
      document.body.addEventListener("click", TLKTYP.click);
      document.body.addEventListener("keydown", TLKTYP.keydown);
    },
    init: function () {
      this.DIVISION = "WAS";

      ENGINE.target(this);
      ENGINE.fetch("ROM");
      ENGINE.loaded(this.loaded);

      this.build();
      this.listen();
    }
  };

  window.TLKTYP = TLKTYP;
  TLKTYP.init();
}());
