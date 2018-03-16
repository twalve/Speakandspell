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
      let parent = current.parentNode;
      let nearest = null;

      while (parent !== document.body) {
        if (property.charAt(0) === "#" && parent.id) {
          nearest = parent;
          break;
        } else if (property.charAt(0) === "." && !!parent.classList.length) {
          nearest = parent;
          break;
        } else if (property.charAt(0) === "[" && $$.object.length(parent.dataset)) {
          nearest = parent;
          break;
        } else if (parent.tagName.toLowerCase() === property) {
          nearest = parent;
          break;
        }

        parent = parent.parentNode;
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
