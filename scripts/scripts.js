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

  const SPKSPLL = {
    DATA: null,
    DISPLAY: null,
    DIVISION: null,
    SPOKEN: 0,
    USERCOUNT: 0,
    USERLIST: null,
    build: function (title, data) {
      const list = document.createElement("ol");

      for (const word in SPKSPLL.DATA) {
        const item = document.createElement("li");
        const span = document.createElement("span");
        span.innerHTML = SPKSPLL.DATA[word];

        item.appendChild(span)
        list.appendChild(item)
      }

      document.querySelector("board").appendChild(list);
    },
    display: function (update) {
      console.log(this.DATA)
    },
    expurgate: function (data, display) {

    },
    get: {
      week: function () {
        let week = DATE.local().weekNumber;

        return WEEKS[SPKSPLL.DIVISION][week];
      }
    },
    language: function (pairs) {
      // speak('hello Jem my ma!')//, { voice: "en-rp"})

      if (SPKSPLL.SPOKEN < SPKSPLL.DATA.length) {
        speak(SPKSPLL.DATA[SPKSPLL.SPOKEN])
        SPKSPLL.SPOKEN += 1;
        setTimeout(SPKSPLL.language, 2000)
      }
    },
    loaded: function () {
      SPKSPLL.DATA = ROM.weeks[SPKSPLL.get.week()];
      console.log(ROM.weeks)
    },
    init: function () {
      this.DIVISION = "WAS";
      ENGINE.target(this);
      ENGINE.fetch("ROM");
      ENGINE.loaded(this.loaded);
      this.build();

      this.language();
    }
  };

  window.SPKSPLL = SPKSPLL;
  SPKSPLL.init();
}());
