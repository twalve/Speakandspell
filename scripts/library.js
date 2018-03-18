const $ = function (selector) {
  if (selector.charAt(0) !== "#" || selector.indexOf(" ") !== -1 || selector.indexOf(".") !== -1) {
    return document.querySelectorAll(selector);
  } else {
    return document.querySelector(selector);
  }
}

const $$ = {
  find: {
    nearest: function (target, property) {// #id, .className, [data], tagname
      let current = target;
      let nearest = null;

      while (current !== document.body) {
        if (property.charAt(0) === "#" && current.id) {
          nearest = current;
          break;
        } else if (property.charAt(0) === "." && !!current.classList.length) {
          nearest = current;
          break;
        } else if (property.charAt(0) === "[" && $$.object.length(current.dataset)) {
          nearest = current;
          break;
        } else if (current.tagName.toLowerCase() === property) {
          nearest = current;
          break;
        }

        current = current.parentNode;
      }

      return nearest;
    }
  },
  object: {
    length: function (obj) {
      var length = 0;
      for (property in obj) {
        if (obj.hasOwnProperty(property)) {
          length += 1;
        }
      }
      return length;
    }
  }
}
