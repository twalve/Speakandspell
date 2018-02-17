(function(){
  const ROM = {
    revisions: ["2-5"],
    weeks: {
      "2": [
        "jaw", "straw", "dawn", "awful", "yawn", "able", "energy", "always", "circle", "daughter", "weak", "week", "sunset", "fiction", "comb", "enjoy", "mould", "awoke", "dream", "tried"
      ],
      "3": [
        "ready", "heavy", "spread", "instead", "breakfast", "asked", "salt", "itself", "person", "chalk", "grumble", "another", "past", "passed", "change", "surprise", "sorry", "active", "knows", "nose"
      ],
      "4": [
        "fly", "sky", "cry", "spy", "dry", "very", "every", "pretty", "ugly", "family", "mail", "male", "tail", "tale", "pail", "pale", "night", "knight", "travel", "robber"
      ],
      "5": [
        "prize", "twice", "alike", "invite", "alive", "hour", "our", "habit", "thunder", "behind", "beautiful", "story", "happened", "hear", "amuse", "omen", "proper", "wren", "wrong", "knock"
      ]
    },
    setup: function () {
      for (const revision in ROM.revisions) {
        let list = [];
        const range = ROM.revisions[revision].split("-");

        while (range[0] <= range[1]) {
          list = list.concat(ROM.weeks[range[0]]);
          range[0]++;
        }
        ROM.weeks[ROM.revisions[revision]] = list;
      }
    },
    init: function () {
      this.setup();
    }
  }

  window.ROM = ROM;
  ROM.init();
}());
