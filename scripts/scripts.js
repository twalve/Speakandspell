(function(){
  const ENGINE = {
    CALLBACK: null,
    TARGET: null,
    encode(component) {
      return decodeURIComponent(component);
    },
    fetch: function (target) {

    },
    search: function () {
        if (window.location.search) {
            const search = window.location.search.substring(1).replace("\&amp;\gi", "&");
            const queries = search.split("&");
            const pairs = {};

            for (const query in queries) {
                const keyvalue = queries[query].split("=");
                pairs[keyvalue[0]] = keyvalue[1];
            }

            this.CALLBACK(pairs);
        } else {
            this.CALLBACK();
        }
    },
    loaded: function (target, callback) {
      this.CALLBACK = callback;
      this.TARGET = target;

      this.fetch();
      this.search();
    },
  };

  const SPKSPLL = {
    DISPLAY: null,
    USERCOUNT: 0,
    USERLIST: null,
    build: function (title, data) {

    },
    display: function (update) {

    },
    expurgate: function (data, display) {

    },
    language: function (pairs) {

    },
    loaded: function () {
        console.log("loaded");
    },
    init: function () {
        ENGINE.loaded(this, this.loaded);
        this.build();
    }
  };

  window.SPKSPLL = SPKSPLL;
  SPKSPLL.init();
}());
