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
    USERCOUNT: 0,
    USERLIST: null,
    build: function (title, data) {

    },
    display: function (update) {
      console.log(this.DATA)
    },
    expurgate: function (data, display) {

    },
    language: function (pairs) {

    },
    loaded: function () {
      console.log("loaded");
    },
    init: function () {
      ENGINE.target(this);
      ENGINE.fetch("ROM");
      ENGINE.loaded(this.loaded);
      this.build();
    }
  };

  window.SPKSPLL = SPKSPLL;
  SPKSPLL.init();
}());
