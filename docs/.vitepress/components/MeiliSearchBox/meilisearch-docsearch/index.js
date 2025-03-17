// src/index.tsx
import { createComponent as _$createComponent6 } from "solid-js/web";
import { createSignal as createSignal4, Show as Show3 } from "solid-js";
import { render } from "solid-js/web";

// src/DocSearch.tsx
import { mergeProps as _$mergeProps } from "solid-js/web";
import { memo as _$memo2 } from "solid-js/web";
import { createComponent as _$createComponent5 } from "solid-js/web";
import { createSignal as createSignal3 } from "solid-js";

// src/DocSearchButton.tsx
import { template as _$template2 } from "solid-js/web";
import { delegateEvents as _$delegateEvents } from "solid-js/web";
import { memo as _$memo } from "solid-js/web";
import { insert as _$insert } from "solid-js/web";
import { createComponent as _$createComponent } from "solid-js/web";
import { setAttribute as _$setAttribute2 } from "solid-js/web";
import { addEventListener as _$addEventListener } from "solid-js/web";
import { For, createSignal, onMount } from "solid-js";

// src/icons/Magnifier.tsx
import { template as _$template } from "solid-js/web";
import { setAttribute as _$setAttribute } from "solid-js/web";
import { effect as _$effect } from "solid-js/web";
var _tmpl$ = /* @__PURE__ */ _$template(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"><path fill=currentColor d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z">`);
var MagnifierIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$();
    _$effect(() => _$setAttribute(_el$, "class", props.class));
    return _el$;
  })();
};

// src/utils.ts
function renameKeysWithLevels(object, prefix) {
  return Object.keys(object).reduce((acc, key) => {
    const result = acc;
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, "");
      result[newKey] = object[key];
    } else {
      result[key] = object[key];
    }
    return result;
  }, {});
}
function replaceNullString(object) {
  return Object.keys(object).reduce((acc, key) => {
    const result = acc;
    if (typeof object[key] === "string" && object[key] === "null") {
      result[key] = null;
    } else {
      result[key] = object[key];
    }
    return result;
  }, {});
}
function groupBy(collection, property) {
  const newCollection = {};
  collection.forEach((item) => {
    if (item[property] === void 0) {
      throw new Error(`[groupBy]: Object has no key ${new String(property)}`);
    }
    let key = item[property];
    if (!Object.prototype.hasOwnProperty.call(newCollection, key)) {
      newCollection[key] = [];
    }
    newCollection[key].push(item);
  });
  return newCollection;
}
function compact(array) {
  const results = [];
  array.forEach((value) => {
    if (!value) {
      return;
    }
    results.push(value);
  });
  return results;
}
function getHighlightedValue(object, property) {
  if (object._formatted && object._formatted[property] && typeof object._formatted[property] === "string") {
    return replaceHtmlTagsToHighlight(object._formatted[property]);
  }
  return object[property];
}
function replaceHtmlTagsToHighlight(str) {
  return str.replace(
    /<em>/g,
    '<span class="docsearch-modal-search-hits-item--highlight">'
  ).replace(/<\/em>/g, "</span>");
}
function getSnippetedValue(object, property) {
  if (!object._formatted || !object._formatted[property] || typeof object._formatted[property] !== "string") {
    return object[property];
  }
  let snippet = replaceHtmlTagsToHighlight(object._formatted[property]);
  if (snippet[0] !== snippet[0].toUpperCase()) {
    snippet = `\u2026${snippet}`;
  }
  if ([".", "!", "?"].indexOf(snippet[snippet.length - 1]) === -1) {
    snippet = `${snippet}\u2026`;
  }
  return snippet;
}
function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}
function debounce(func, waitFor = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
function isCtrl(key) {
  return /(ctrl|control|command|cmd|commandorcontrl|cmdorctrl)/i.test(key);
}
function isAlt(key) {
  return /(alt|option)/i.test(key);
}
function isMeta(key) {
  return /(meta|super)/i.test(key);
}
function isAppleDevice() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

// src/DocSearchButton.tsx
var _tmpl$2 = /* @__PURE__ */ _$template2(`<button type=button class=docsearch-btn><span class=docsearch-btn-icon-container></span><span class=docsearch-btn-placeholder> <!> `);
var _tmpl$22 = /* @__PURE__ */ _$template2(`<span class=docsearch-btn-keys>`);
var _tmpl$3 = /* @__PURE__ */ _$template2(`<kbd class=docsearch-btn-key>`);
var CTRL_KEY_DEFAULT = "Ctrl";
var CTRL_KEY_APPLE = "\u2318";
var ALT_KEY_DEFAULT = "Alt";
var ALT_KEY_APPLE = "Option";
var DocSearchButton = ({
  onClick,
  hotKeys,
  translations = {}
}) => {
  const {
    buttonText = "Search",
    buttonAriaLabel = "Search"
  } = translations;
  const [ctrlKey, setCtrlKey] = createSignal(null);
  const [altKey, setAltKey] = createSignal(null);
  onMount(() => {
    if (typeof navigator !== "undefined") {
      if (isAppleDevice()) {
        setCtrlKey(CTRL_KEY_APPLE);
        setAltKey(ALT_KEY_APPLE);
      } else {
        setCtrlKey(CTRL_KEY_DEFAULT);
        setAltKey(ALT_KEY_DEFAULT);
      }
    }
  });
  return (() => {
    var _el$ = _tmpl$2(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$6 = _el$4.nextSibling, _el$5 = _el$6.nextSibling;
    _$addEventListener(_el$, "click", onClick, true);
    _$setAttribute2(_el$, "aria-label", buttonAriaLabel);
    _$insert(_el$2, _$createComponent(MagnifierIcon, {
      "class": "docsearch-modal-btn-icon"
    }));
    _$insert(_el$3, buttonText, _el$6);
    _$insert(_el$, (() => {
      var _c$ = _$memo(() => !!(hotKeys && hotKeys.length > 0));
      return () => _c$() && (() => {
        var _el$7 = _tmpl$22();
        _$insert(_el$7, _$createComponent(For, {
          get each() {
            return hotKeys[0].split("+");
          },
          children: (k) => (() => {
            var _el$8 = _tmpl$3();
            _$insert(_el$8, (() => {
              var _c$2 = _$memo(() => !!isCtrl(k));
              return () => _c$2() ? ctrlKey() : _$memo(() => !!isAlt(k))() ? altKey() : k[0].toUpperCase() + k.slice(1);
            })());
            return _el$8;
          })()
        }));
        return _el$7;
      })();
    })(), null);
    return _el$;
  })();
};
_$delegateEvents(["click"]);

// src/useDocSearchHotKeys.ts
import { onCleanup, onMount as onMount2 } from "solid-js";
function useDocSearchHotKeys({
  isOpen,
  onOpen,
  onClose,
  onInput,
  hotKeys
}) {
  function isEditingContent(event) {
    const element = event.target;
    const tagName = element.tagName;
    return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
  }
  function isHotKey(event) {
    const modsAndkeys = hotKeys && hotKeys.map((k) => k.toLowerCase().split("+"));
    if (modsAndkeys) {
      return modsAndkeys.some((modsAndkeys2) => {
        if (modsAndkeys2.length === 1 && event.key.toLowerCase() === modsAndkeys2[0] && !event.ctrlKey && !event.altKey && !event.shiftKey && !isEditingContent(event) && !isOpen()) {
          return true;
        }
        if (modsAndkeys2.length > 1) {
          const key = modsAndkeys2[modsAndkeys2.length - 1];
          if (event.key.toLowerCase() !== key) return false;
          const ctrl = (isAppleDevice() ? event.metaKey : event.ctrlKey) == modsAndkeys2.some(isCtrl);
          const shift = event.shiftKey == modsAndkeys2.includes("shift");
          const alt = event.altKey == modsAndkeys2.some(isAlt);
          const meta = isAppleDevice() ? true : event.metaKey == modsAndkeys2.some(isMeta);
          return ctrl && shift && alt && meta;
        }
        return false;
      });
    }
    return false;
  }
  function onKeyDown(e) {
    if (e.key === "Escape" && isOpen() || isHotKey(e)) {
      e.preventDefault();
      if (isOpen()) {
        onClose();
      } else if (!document.body.classList.contains("docsearch--active")) {
        const selectedText = window.getSelection();
        if (selectedText) onInput(selectedText.toString());
        onOpen();
      }
    }
  }
  onMount2(() => window.addEventListener("keydown", onKeyDown));
  onCleanup(() => window.removeEventListener("keydown", onKeyDown));
}

// src/DocSearchModal.tsx
import { template as _$template13 } from "solid-js/web";
import { delegateEvents as _$delegateEvents3 } from "solid-js/web";
import { effect as _$effect11 } from "solid-js/web";
import { setAttribute as _$setAttribute12 } from "solid-js/web";
import { insert as _$insert4 } from "solid-js/web";
import { createComponent as _$createComponent4 } from "solid-js/web";
import { use as _$use2 } from "solid-js/web";
import { createSignal as createSignal2, For as For2, Match, onCleanup as onCleanup3, onMount as onMount5, Show as Show2, Switch } from "solid-js";

// src/DocSearchModalFooter.tsx
import { template as _$template9 } from "solid-js/web";
import { insert as _$insert2 } from "solid-js/web";
import { createComponent as _$createComponent2 } from "solid-js/web";

// src/icons/Down.tsx
import { template as _$template3 } from "solid-js/web";
import { setAttribute as _$setAttribute3 } from "solid-js/web";
import { effect as _$effect2 } from "solid-js/web";
var _tmpl$4 = /* @__PURE__ */ _$template3(`<svg xmlns=http://www.w3.org/2000/svg width=15 height=15 viewBox="0 0 24 24"><path fill=currentColor d="M12 4a1 1 0 0 1 1 1v11.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L11 16.586V5a1 1 0 0 1 1-1z">`);
var DownIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$4();
    _$effect2((_p$) => {
      var _v$ = props.class, _v$2 = props["aria-label"];
      _v$ !== _p$.e && _$setAttribute3(_el$, "class", _p$.e = _v$);
      _v$2 !== _p$.t && _$setAttribute3(_el$, "aria-label", _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$;
  })();
};

// src/icons/Enter.tsx
import { template as _$template4 } from "solid-js/web";
import { setAttribute as _$setAttribute4 } from "solid-js/web";
import { effect as _$effect3 } from "solid-js/web";
var _tmpl$5 = /* @__PURE__ */ _$template4(`<svg xmlns=http://www.w3.org/2000/svg width=15 height=15 viewBox="0 0 24 24"><g fill=currentColor fill-rule=evenodd clip-rule=evenodd><path d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z"></path><path d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z">`);
var EnterIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$5();
    _$effect3((_p$) => {
      var _v$ = props.class, _v$2 = props["aria-label"];
      _v$ !== _p$.e && _$setAttribute4(_el$, "class", _p$.e = _v$);
      _v$2 !== _p$.t && _$setAttribute4(_el$, "aria-label", _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$;
  })();
};

// src/icons/Esc.tsx
import { template as _$template5 } from "solid-js/web";
import { setAttribute as _$setAttribute5 } from "solid-js/web";
import { effect as _$effect4 } from "solid-js/web";
var _tmpl$6 = /* @__PURE__ */ _$template5(`<svg width=15 height=15 viewBox="0 0 15 15"role=img><g fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.2><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">`);
var EscIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$6();
    _$effect4((_p$) => {
      var _v$ = props.class, _v$2 = props["aria-label"];
      _v$ !== _p$.e && _$setAttribute5(_el$, "class", _p$.e = _v$);
      _v$2 !== _p$.t && _$setAttribute5(_el$, "aria-label", _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$;
  })();
};

// src/icons/MeilisearchDark.tsx
import { template as _$template6 } from "solid-js/web";
import { setAttribute as _$setAttribute6 } from "solid-js/web";
import { effect as _$effect5 } from "solid-js/web";
var _tmpl$7 = /* @__PURE__ */ _$template6(`<svg width=110 height=30 viewBox="0 0 495 74"><path d="M181.842 42.5349C181.842 37.6137 184.201 34.715 188.718 34.715C192.965 34.715 194.381 37.7486 194.381 41.6585V62.6238H203.953V40.5799C203.953 32.3556 199.639 26.4907 191.145 26.4907C186.089 26.4907 182.516 28.0412 179.415 31.4792C177.393 28.3782 173.955 26.4907 169.168 26.4907C164.112 26.4907 160.607 28.5805 158.989 31.614V27.2996H150.158V62.6238H159.731V42.3326C159.731 37.6137 162.157 34.715 166.607 34.715C170.854 34.715 172.269 37.7486 172.269 41.6585V62.6238H181.842V42.5349Z"fill=white></path><path d="M243.245 47.7256C243.245 47.7256 243.379 46.4448 243.379 44.8943C243.379 34.4454 236.301 26.4907 225.852 26.4907C215.403 26.4907 208.123 34.4454 208.123 44.8943C208.123 55.7477 215.471 63.4327 225.92 63.4327C234.077 63.4327 240.548 58.5116 242.638 51.3659H232.998C231.852 53.9276 229.088 55.2084 226.189 55.2084C221.403 55.2084 218.302 52.5793 217.628 47.7256H243.245ZM225.785 34.1757C230.234 34.1757 233.133 36.8722 233.807 40.8495H217.763C218.572 36.8048 221.403 34.1757 225.785 34.1757Z"fill=white></path><path d="M244.791 35.524H249.038V62.6238H258.61V27.2996H244.791V35.524ZM253.824 22.7156C257.195 22.7156 259.622 20.3561 259.622 16.9855C259.622 13.6149 257.195 11.188 253.824 11.188C250.454 11.188 248.027 13.6149 248.027 16.9855C248.027 20.3561 250.454 22.7156 253.824 22.7156Z"fill=white></path><path d="M278.432 54.3995C278.163 54.3995 277.758 54.4669 277.152 54.4669C274.994 54.4669 274.725 53.4557 274.725 51.9726V12.0644H265.152V52.6467C265.152 59.6576 267.849 62.7586 275.466 62.7586C276.747 62.7586 277.96 62.6238 278.432 62.5564V54.3995Z"fill=white></path><path d="M279.521 35.524H283.768V62.6238H293.341V27.2996H279.521V35.524ZM288.555 22.7156C291.925 22.7156 294.352 20.3561 294.352 16.9855C294.352 13.6149 291.925 11.188 288.555 11.188C285.184 11.188 282.757 13.6149 282.757 16.9855C282.757 20.3561 285.184 22.7156 288.555 22.7156Z"fill=white></path><path d="M312.557 62.9937C321.86 62.9937 326.242 58.0726 326.242 52.8819C326.242 38.4556 305.007 46.4777 305.007 36.9725C305.007 33.8716 307.636 31.2425 312.962 31.2425C318.422 31.2425 320.984 34.2086 321.388 37.9163H326.175C325.77 33.2648 322.602 27.0629 313.097 27.0629C304.94 27.0629 300.356 31.9166 300.356 37.1748C300.356 51.264 321.591 43.1745 321.591 53.0167C321.591 56.4547 318.355 58.8142 312.557 58.8142C306.625 58.8142 303.659 55.848 303.322 51.4662H298.468C298.873 57.4659 302.648 62.9937 312.557 62.9937Z"fill=white></path><path d="M364.256 46.4103C364.256 46.4103 364.324 45.3317 364.324 44.5901C364.324 34.8827 358.054 27.0629 347.808 27.0629C337.494 27.0629 330.955 35.4894 330.955 44.9946C330.955 54.6346 337.022 62.9937 347.875 62.9937C356.032 62.9937 361.695 58.0052 363.717 51.4662H358.729C357.245 55.6458 353.201 58.6794 347.943 58.6794C340.729 58.6794 336.213 53.3538 335.741 46.4103H364.256ZM347.808 31.3773C354.549 31.3773 358.931 35.8939 359.538 42.5004H335.876C336.685 36.1636 341.134 31.3773 347.808 31.3773Z"fill=white></path><path d="M394.037 45.871V49.1068C394.037 54.9717 389.79 59.0164 381.634 59.0164C376.578 59.0164 373.814 56.9266 373.814 52.41C373.814 50.118 374.892 48.3652 376.578 47.4215C378.33 46.4777 380.69 45.871 394.037 45.871ZM381.094 62.9937C387.027 62.9937 391.813 61.1062 394.24 57.1963V62.1848H398.824V39.7364C398.824 32.1188 394.442 27.0629 384.532 27.0629C375.027 27.0629 370.848 31.8492 369.971 37.9837H374.623C375.566 33.13 379.274 31.1751 384.33 31.1751C390.802 31.1751 394.037 33.8716 394.037 39.669V41.8936C383.184 41.8936 378.667 42.0959 375.297 43.4441C371.387 44.9946 369.095 48.4327 369.095 52.5448C369.095 58.5445 372.937 62.9937 381.094 62.9937Z"fill=white></path><path d="M424.991 27.6022C424.991 27.6022 424.182 27.5348 423.845 27.5348C417.509 27.5348 414.138 30.838 412.857 33.1974V27.8718H408.273V62.1848H413.059V42.7026C413.059 35.5569 417.441 32.0514 423.306 32.0514C424.182 32.0514 424.991 32.1188 424.991 32.1188V27.6022Z"fill=white></path><path d="M425.809 45.062C425.809 54.4324 432.28 62.9937 442.729 62.9937C452.032 62.9937 457.425 56.7918 458.773 49.9831H453.92C452.504 55.3087 448.594 58.6794 442.729 58.6794C435.516 58.6794 430.662 52.9493 430.662 45.062C430.662 37.1073 435.516 31.3773 442.729 31.3773C448.594 31.3773 452.504 34.7479 453.92 40.0735H458.773C457.425 33.2648 452.032 27.0629 442.729 27.0629C432.28 27.0629 425.809 35.6243 425.809 45.062Z"fill=white></path><path d="M470.041 11.6254H465.255V62.1848H470.041V41.8936C470.041 34.8827 474.558 31.2425 480.355 31.2425C486.49 31.2425 489.389 35.0176 489.389 41.2195V62.1848H494.175V40.2757C494.175 32.6581 489.658 27.0629 481.164 27.0629C474.76 27.0629 471.255 30.5683 470.041 32.6581V11.6254Z"fill=white></path><path d="M0.825012 73.993L24.0688 14.5224C27.3443 6.14179 35.4223 0.625977 44.4203 0.625977H58.4336L35.1899 60.0966C31.9143 68.4772 23.8363 73.993 14.8384 73.993H0.825012Z"fill=url(#paint0_linear_0_3)></path><path d="M34.9246 73.9932L58.1684 14.5226C61.444 6.14197 69.5219 0.626152 78.5199 0.626152H92.5333L69.2895 60.0968C66.014 68.4774 57.936 73.9932 48.938 73.9932H34.9246Z"fill=url(#paint1_linear_0_3)></path><path d="M69.0262 73.9932L92.27 14.5226C95.5456 6.14197 103.624 0.626152 112.622 0.626152H126.635L103.391 60.0968C100.116 68.4774 92.0376 73.9932 83.0396 73.9932H69.0262Z"fill=url(#paint2_linear_0_3)></path><defs><linearGradient id=paint0_linear_0_3 x1=126.635 y1=-4.97799 x2=0.825008 y2=66.0978 gradientUnits=userSpaceOnUse><stop stop-color=#FF5CAA></stop><stop offset=1 stop-color=#FF4E62></stop></linearGradient><linearGradient id=paint1_linear_0_3 x1=126.635 y1=-4.97799 x2=0.825008 y2=66.0978 gradientUnits=userSpaceOnUse><stop stop-color=#FF5CAA></stop><stop offset=1 stop-color=#FF4E62></stop></linearGradient><linearGradient id=paint2_linear_0_3 x1=126.635 y1=-4.97799 x2=0.825008 y2=66.0978 gradientUnits=userSpaceOnUse><stop stop-color=#FF5CAA></stop><stop offset=1 stop-color=#FF4E62>`);
var MeilisearchDarkIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$7();
    _$effect5(() => _$setAttribute6(_el$, "class", props.class));
    return _el$;
  })();
};

// src/icons/MeilisearchLight.tsx
import { template as _$template7 } from "solid-js/web";
import { setAttribute as _$setAttribute7 } from "solid-js/web";
import { effect as _$effect6 } from "solid-js/web";
var _tmpl$8 = /* @__PURE__ */ _$template7(`<svg width=110 height=30 viewBox="0 0 495 74"fill=none xmlns=http://www.w3.org/2000/svg><path d="M181.84 42.5347C181.84 37.6136 184.199 34.7149 188.716 34.7149C192.963 34.7149 194.378 37.7484 194.378 41.6584V62.6237H203.951V40.5798C203.951 32.3554 199.637 26.4906 191.143 26.4906C186.087 26.4906 182.514 28.041 179.413 31.4791C177.39 28.3781 173.952 26.4906 169.166 26.4906C164.11 26.4906 160.605 28.5804 158.987 31.6139V27.2995H150.156V62.6237H159.728V42.3325C159.728 37.6136 162.155 34.7149 166.604 34.7149C170.851 34.7149 172.267 37.7484 172.267 41.6584V62.6237H181.84V42.5347Z"fill=#21004B></path><path d="M243.242 47.7255C243.242 47.7255 243.377 46.4447 243.377 44.8942C243.377 34.4452 236.299 26.4906 225.85 26.4906C215.401 26.4906 208.12 34.4452 208.12 44.8942C208.12 55.7476 215.468 63.4326 225.917 63.4326C234.074 63.4326 240.546 58.5115 242.636 51.3658H232.996C231.85 53.9274 229.086 55.2083 226.187 55.2083C221.401 55.2083 218.3 52.5792 217.626 47.7255H243.242ZM225.783 34.1756C230.232 34.1756 233.131 36.8721 233.805 40.8494H217.76C218.569 36.8047 221.401 34.1756 225.783 34.1756Z"fill=#21004B></path><path d="M244.789 35.5238H249.036V62.6237H258.608V27.2995H244.789V35.5238ZM253.822 22.7155C257.193 22.7155 259.619 20.356 259.619 16.9854C259.619 13.6148 257.193 11.1879 253.822 11.1879C250.451 11.1879 248.024 13.6148 248.024 16.9854C248.024 20.356 250.451 22.7155 253.822 22.7155Z"fill=#21004B></path><path d="M278.43 54.3993C278.16 54.3993 277.756 54.4667 277.149 54.4667C274.992 54.4667 274.722 53.4556 274.722 51.9725V12.0643H265.15V52.6466C265.15 59.6575 267.846 62.7585 275.464 62.7585C276.745 62.7585 277.958 62.6237 278.43 62.5562V54.3993Z"fill=#21004B></path><path d="M279.519 35.5238H283.766V62.6237H293.339V27.2995H279.519V35.5238ZM288.553 22.7155C291.923 22.7155 294.35 20.356 294.35 16.9854C294.35 13.6148 291.923 11.1879 288.553 11.1879C285.182 11.1879 282.755 13.6148 282.755 16.9854C282.755 20.356 285.182 22.7155 288.553 22.7155Z"fill=#21004B></path><path d="M312.557 62.9939C321.86 62.9939 326.242 58.0728 326.242 52.882C326.242 38.4557 305.007 46.4778 305.007 36.9726C305.007 33.8717 307.636 31.2426 312.962 31.2426C318.422 31.2426 320.984 34.2087 321.388 37.9164H326.175C325.77 33.265 322.602 27.063 313.097 27.063C304.94 27.063 300.356 31.9167 300.356 37.1749C300.356 51.2641 321.591 43.1746 321.591 53.0168C321.591 56.4548 318.355 58.8143 312.557 58.8143C306.625 58.8143 303.659 55.8481 303.322 51.4663H298.468C298.872 57.466 302.648 62.9939 312.557 62.9939Z"fill=#21004B></path><path d="M364.256 46.4104C364.256 46.4104 364.324 45.3318 364.324 44.5903C364.324 34.8829 358.054 27.063 347.808 27.063C337.494 27.063 330.955 35.4896 330.955 44.9947C330.955 54.6347 337.022 62.9939 347.875 62.9939C356.032 62.9939 361.695 58.0053 363.717 51.4663H358.728C357.245 55.6459 353.201 58.6795 347.942 58.6795C340.729 58.6795 336.213 53.3539 335.741 46.4104H364.256ZM347.808 31.3774C354.549 31.3774 358.931 35.894 359.537 42.5005H335.876C336.685 36.1637 341.134 31.3774 347.808 31.3774Z"fill=#21004B></path><path d="M394.037 45.8711V49.1069C394.037 54.9718 389.79 59.0165 381.633 59.0165C376.578 59.0165 373.814 56.9267 373.814 52.4101C373.814 50.1181 374.892 48.3654 376.578 47.4216C378.33 46.4778 380.69 45.8711 394.037 45.8711ZM381.094 62.9939C387.026 62.9939 391.813 61.1063 394.24 57.1964V62.1849H398.824V39.7366C398.824 32.1189 394.442 27.063 384.532 27.063C375.027 27.063 370.847 31.8493 369.971 37.9838H374.623C375.566 33.1301 379.274 31.1752 384.33 31.1752C390.802 31.1752 394.037 33.8717 394.037 39.6691V41.8938C383.184 41.8938 378.667 42.096 375.297 43.4442C371.387 44.9947 369.095 48.4328 369.095 52.5449C369.095 58.5446 372.937 62.9939 381.094 62.9939Z"fill=#21004B></path><path d="M424.991 27.6023C424.991 27.6023 424.182 27.5349 423.845 27.5349C417.508 27.5349 414.138 30.8381 412.857 33.1975V27.872H408.273V62.1849H413.059V42.7027C413.059 35.557 417.441 32.0515 423.306 32.0515C424.182 32.0515 424.991 32.1189 424.991 32.1189V27.6023Z"fill=#21004B></path><path d="M425.809 45.0621C425.809 54.4325 432.28 62.9939 442.729 62.9939C452.032 62.9939 457.425 56.7919 458.773 49.9832H453.92C452.504 55.3088 448.594 58.6795 442.729 58.6795C435.516 58.6795 430.662 52.9494 430.662 45.0621C430.662 37.1075 435.516 31.3774 442.729 31.3774C448.594 31.3774 452.504 34.748 453.92 40.0736H458.773C457.425 33.265 452.032 27.063 442.729 27.063C432.28 27.063 425.809 35.6244 425.809 45.0621Z"fill=#21004B></path><path d="M470.041 11.6255H465.255V62.1849H470.041V41.8938C470.041 34.8829 474.558 31.2426 480.355 31.2426C486.49 31.2426 489.389 35.0177 489.389 41.2196V62.1849H494.175V40.2759C494.175 32.6582 489.658 27.063 481.164 27.063C474.76 27.063 471.255 30.5685 470.041 32.6582V11.6255Z"fill=#21004B></path><path d="M0.824951 73.993L24.0688 14.5224C27.3443 6.14179 35.4223 0.625977 44.4202 0.625977H58.4336L35.1898 60.0966C31.9143 68.4772 23.8363 73.993 14.8383 73.993H0.824951Z"fill=url(#paint0_linear_0_15)></path><path d="M34.9246 73.9932L58.1684 14.5226C61.4439 6.14197 69.5219 0.626152 78.5199 0.626152H92.5332L69.2894 60.0968C66.0139 68.4774 57.9359 73.9932 48.9379 73.9932H34.9246Z"fill=url(#paint1_linear_0_15)></path><path d="M69.0262 73.9932L92.27 14.5226C95.5455 6.14197 103.623 0.626152 112.621 0.626152H126.635L103.391 60.0968C100.115 68.4774 92.0375 73.9932 83.0395 73.9932H69.0262Z"fill=url(#paint2_linear_0_15)></path><defs><linearGradient id=paint0_linear_0_15 x1=126.635 y1=-4.97799 x2=0.824952 y2=66.0978 gradientUnits=userSpaceOnUse><stop stop-color=#FF5CAA></stop><stop offset=1 stop-color=#FF4E62></stop></linearGradient><linearGradient id=paint1_linear_0_15 x1=126.635 y1=-4.97799 x2=0.824952 y2=66.0978 gradientUnits=userSpaceOnUse><stop stop-color=#FF5CAA></stop><stop offset=1 stop-color=#FF4E62></stop></linearGradient><linearGradient id=paint2_linear_0_15 x1=126.635 y1=-4.97799 x2=0.824952 y2=66.0978 gradientUnits=userSpaceOnUse><stop stop-color=#FF5CAA></stop><stop offset=1 stop-color=#FF4E62>`);
var MeilisearchLightIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$8();
    _$effect6(() => _$setAttribute7(_el$, "class", props.class));
    return _el$;
  })();
};

// src/icons/Up.tsx
import { template as _$template8 } from "solid-js/web";
import { setAttribute as _$setAttribute8 } from "solid-js/web";
import { effect as _$effect7 } from "solid-js/web";
var _tmpl$9 = /* @__PURE__ */ _$template8(`<svg xmlns=http://www.w3.org/2000/svg width=15 height=15 viewBox="0 0 24 24"><path fill=currentColor d="M12 4a1 1 0 0 1 .707.293l6 6a1 1 0 0 1-1.414 1.414L13 7.414V19a1 1 0 1 1-2 0V7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l6-6A1 1 0 0 1 12 4z">`);
var UpIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$9();
    _$effect7((_p$) => {
      var _v$ = props.class, _v$2 = props["aria-label"];
      _v$ !== _p$.e && _$setAttribute8(_el$, "class", _p$.e = _v$);
      _v$2 !== _p$.t && _$setAttribute8(_el$, "aria-label", _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$;
  })();
};

// src/DocSearchModalFooter.tsx
var _tmpl$10 = /* @__PURE__ */ _$template9(`<span class=docsearch-modal-footer-commands><li><kbd class=docsearch-modal-footer-commands-key></kbd><span class=docsearch-modal-footer-commands-label></span></li><li><kbd class=docsearch-modal-footer-commands-key></kbd><kbd class=docsearch-modal-footer-commands-key></kbd><span class=docsearch-modal-footer-commands-label></span></li><li><kbd class=docsearch-modal-footer-commands-key></kbd><span class=docsearch-modal-footer-commands-label>`);
var _tmpl$23 = /* @__PURE__ */ _$template9(`<span class=docsearch-modal-footer-logo><span class=docsearch-modal-footer-logo-label></span><a href=https://www.meilisearch.com/>`);
var DocSearchModalFooter = ({
  translations = {}
}) => {
  const {
    selectText = "to select",
    selectKeyAriaLabel = "Enter key",
    navigateText = "to navigate",
    navigateUpKeyAriaLabel = "Arrow up",
    navigateDownKeyAriaLabel = "Arrow down",
    closeText = "to close",
    closeKeyAriaLabel = "Escape key",
    poweredByText = "Powered by"
  } = translations;
  return [(() => {
    var _el$ = _tmpl$10(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$2.nextSibling, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling, _el$9 = _el$5.nextSibling, _el$10 = _el$9.firstChild, _el$11 = _el$10.nextSibling;
    _$insert2(_el$3, _$createComponent2(EnterIcon, {
      "aria-label": selectKeyAriaLabel
    }));
    _$insert2(_el$4, selectText);
    _$insert2(_el$6, _$createComponent2(DownIcon, {
      "aria-label": navigateDownKeyAriaLabel
    }));
    _$insert2(_el$7, _$createComponent2(UpIcon, {
      "aria-label": navigateUpKeyAriaLabel
    }));
    _$insert2(_el$8, navigateText);
    _$insert2(_el$10, _$createComponent2(EscIcon, {
      "aria-label": closeKeyAriaLabel
    }));
    _$insert2(_el$11, closeText);
    return _el$;
  })(), (() => {
    var _el$12 = _tmpl$23(), _el$13 = _el$12.firstChild, _el$14 = _el$13.nextSibling;
    _$insert2(_el$13, poweredByText);
    _$insert2(_el$14, _$createComponent2(MeilisearchLightIcon, {
      "class": "docsearch-modal-footer-logo-icon docsearch-modal-footer-logo-light"
    }), null);
    _$insert2(_el$14, _$createComponent2(MeilisearchDarkIcon, {
      "class": "docsearch-modal-footer-logo-icon docsearch-modal-footer-logo-dark"
    }), null);
    return _el$12;
  })()];
};

// src/DocSearchModalSearchBox.tsx
import { template as _$template12 } from "solid-js/web";
import { delegateEvents as _$delegateEvents2 } from "solid-js/web";
import { insert as _$insert3 } from "solid-js/web";
import { use as _$use } from "solid-js/web";
import { effect as _$effect10 } from "solid-js/web";
import { setAttribute as _$setAttribute11 } from "solid-js/web";
import { createComponent as _$createComponent3 } from "solid-js/web";
import { addEventListener as _$addEventListener2 } from "solid-js/web";
import { onMount as onMount3, Show } from "solid-js";

// src/icons/Close.tsx
import { template as _$template10 } from "solid-js/web";
import { setAttribute as _$setAttribute9 } from "solid-js/web";
import { effect as _$effect8 } from "solid-js/web";
var _tmpl$11 = /* @__PURE__ */ _$template10(`<svg width=20 height=20 xmlns=http://www.w3.org/2000/svg><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"stroke=currentColor fill=none fill-rule=evenodd stroke-linecap=round stroke-linejoin=round>`);
var CloseIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$11();
    _$effect8(() => _$setAttribute9(_el$, "class", props.class));
    return _el$;
  })();
};

// src/icons/Loading.tsx
import { template as _$template11 } from "solid-js/web";
import { setAttribute as _$setAttribute10 } from "solid-js/web";
import { effect as _$effect9 } from "solid-js/web";
var _tmpl$12 = /* @__PURE__ */ _$template11(`<svg width=24 height=24 xmlns=http://www.w3.org/2000/svg><path fill=currentColor d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z">`);
var LoadingIcon = (props) => {
  return (() => {
    var _el$ = _tmpl$12();
    _$effect9(() => _$setAttribute10(_el$, "class", props.class));
    return _el$;
  })();
};

// src/DocSearchModalSearchBox.tsx
var _tmpl$13 = /* @__PURE__ */ _$template12(`<form class=docsearch-modal-search-input-form><input type=search class=docsearch-modal-search-input><button type=reset class=docsearch-modal-search-input-reset>`);
var _tmpl$24 = /* @__PURE__ */ _$template12(`<button type=reset class=docsearch-modal-search-cancel-btn>`);
var DocSearchModalSearchBox = ({
  loading,
  query,
  onInput,
  onKeyDown,
  onReset,
  onClose,
  translations = {}
}) => {
  const {
    searchDocsPlaceHolder = "Search",
    resetButtonTitle = "Clear the query",
    resetButtonAriaLabel = "Clear the query",
    cancelButtonText = "Cancel",
    cancelButtonAriaLabel = "Cancel"
  } = translations;
  let searchInputRef;
  onMount3(() => searchInputRef?.focus());
  return [(() => {
    var _el$ = _tmpl$13(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    _$addEventListener2(_el$, "reset", onReset);
    _el$.addEventListener("submit", (e) => e.preventDefault());
    _$insert3(_el$, _$createComponent3(Show, {
      get when() {
        return loading();
      },
      get fallback() {
        return _$createComponent3(MagnifierIcon, {
          "class": "docsearch-modal-search-input-icon"
        });
      },
      get children() {
        return _$createComponent3(LoadingIcon, {
          "class": "docsearch-modal-search-input-icon docsearch-modal-search-input-loading-icon"
        });
      }
    }), _el$2);
    _$addEventListener2(_el$2, "keydown", onKeyDown, true);
    _$addEventListener2(_el$2, "input", onInput, true);
    var _ref$ = searchInputRef;
    typeof _ref$ === "function" ? _$use(_ref$, _el$2) : searchInputRef = _el$2;
    _$setAttribute11(_el$2, "placeholder", searchDocsPlaceHolder);
    _$setAttribute11(_el$3, "title", resetButtonTitle);
    _$setAttribute11(_el$3, "aria-label", resetButtonAriaLabel);
    _$insert3(_el$3, _$createComponent3(CloseIcon, {
      "class": "docsearch-modal-search-input-reset-icon"
    }));
    _$effect10(() => _el$3.hidden = !query());
    _$effect10(() => _el$2.value = query());
    return _el$;
  })(), (() => {
    var _el$4 = _tmpl$24();
    _$addEventListener2(_el$4, "click", onClose, true);
    _$setAttribute11(_el$4, "aria-label", cancelButtonAriaLabel);
    _$insert3(_el$4, cancelButtonText);
    return _el$4;
  })()];
};
_$delegateEvents2(["input", "keydown", "click"]);

// src/useSearchClient.ts
import { MeiliSearch } from "meilisearch";
import { createMemo } from "solid-js";

// src/version.ts
var version_default = "0.7.0";

// src/useSearchClient.ts
function useSearchClient({
  host,
  apiKey,
  clientAgents = []
}) {
  return createMemo(
    () => new MeiliSearch({
      host,
      apiKey,
      clientAgents: clientAgents.concat(
        `Meilisearch docs-searchbar.js (v${version_default}`
      )
    })
  );
}

// src/useTrapFocus.ts
import { onCleanup as onCleanup2, onMount as onMount4 } from "solid-js";
function trapFocus(el, value) {
  const { environment = window } = value();
  onMount4(() => {
    const focusableElements = el.querySelectorAll(
      "a[href]:not([disabled]), button:not([disabled]), input:not([disabled])"
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    function trap(event) {
      if (event.key !== "Tab") {
        return;
      }
      if (event.shiftKey) {
        if (environment.document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (environment.document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
    el.addEventListener("keydown", trap);
    onCleanup2(() => el.removeEventListener("keydown", trap));
  });
}

// src/DocSearchModal.tsx
var _tmpl$14 = /* @__PURE__ */ _$template13(`<div class=docsearch-modal-empty-query>`);
var _tmpl$25 = /* @__PURE__ */ _$template13(`<div class=docsearch-modal-error><p class=docsearch-modal-title>An error has occured. Please try again...`);
var _tmpl$32 = /* @__PURE__ */ _$template13(`<div class=docsearch-modal-no-search-hits-suggestions-list><p class=docsearch-modal-no-search-hits-help-text>Try searching for:</p><ul>`);
var _tmpl$42 = /* @__PURE__ */ _$template13(`<div class=docsearch-modal-no-search-hits><p class=docsearch-modal-title>No results for "<!>"`);
var _tmpl$52 = /* @__PURE__ */ _$template13(`<div class=docsearch-modal-container role=button tabindex=0><div class=docsearch-modal><header class=docsearch-modal-search-container></header><main class=docsearch-modal-search-hits-container></main><footer class=docsearch-modal-footer>`);
var _tmpl$62 = /* @__PURE__ */ _$template13(`<li><button class=docsearch-modal-no-search-hits-suggestion type=button>`);
var _tmpl$72 = /* @__PURE__ */ _$template13(`<section><div class=docsearch-modal-search-hits-category></div><ul role=listbox>`);
var _tmpl$82 = /* @__PURE__ */ _$template13(`<li role=option class=docsearch-modal-search-hits-item><a><span class=docsearch-modal-search-hits-item-text-container><p class=docsearch-modal-search-hits-item-title></p><p class=docsearch-modal-search-hits-item-text></p></span><span class=docsearch-modal-search-hits-item-trailing-icon-container aria-hidden>`);
var _d_ = false;
if (_d_) trapFocus;
var ScreenState = /* @__PURE__ */ function(ScreenState2) {
  ScreenState2[ScreenState2["Results"] = 0] = "Results";
  ScreenState2[ScreenState2["NoResults"] = 1] = "NoResults";
  ScreenState2[ScreenState2["Error"] = 2] = "Error";
  ScreenState2[ScreenState2["EmptyQuery"] = 3] = "EmptyQuery";
  return ScreenState2;
}(ScreenState || {});
var DocSearchModal = ({
  host,
  apiKey,
  indexUid,
  clientAgents,
  searchParams,
  environment = window,
  debounceDuration = 200,
  translations = {},
  onClose,
  initialQuery
}) => {
  const {
    linkToTheResultAriaLabel = "Link to the result"
  } = translations;
  onMount5(() => document.body.classList.add("docsearch--active"));
  onCleanup3(() => document.body.classList.remove("docsearch--active"));
  let containerRef;
  let modalRef;
  function setFullViewportHeight() {
    if (modalRef) {
      const vh = window.innerHeight * 0.01;
      modalRef.style.setProperty("--docsearch-vh", `${vh}px`);
    }
  }
  onMount5(() => {
    setFullViewportHeight();
    window.addEventListener("resize", setFullViewportHeight);
  });
  onCleanup3(() => window.removeEventListener("resize", setFullViewportHeight));
  const searchClient = useSearchClient({
    host,
    apiKey,
    clientAgents
  });
  const [loading, setLoading] = createSignal2(false);
  const [query, setQuery] = createSignal2("");
  const [activeItemIndex, setActiveItemIndex] = createSignal2(0);
  const [hitCategories, setHitsCategories] = createSignal2([]);
  const [hits, setHits] = createSignal2([]);
  const [screenState, setScreenState] = createSignal2(ScreenState.EmptyQuery);
  const numberOfHits = () => hits().length;
  function onKeyDown(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const down = e.key === "ArrowDown";
      setActiveItemIndex((index) => {
        if (down && index === numberOfHits() - 1) {
          return 0;
        }
        if (!down && index === 0) {
          return numberOfHits() - 1;
        }
        return index + (down ? 1 : -1);
      });
      document.getElementById(`docsearch-hit-item-${activeItemIndex()}`)?.scrollIntoView({
        block: activeItemIndex() === 0 ? "center" : "nearest",
        behavior: "smooth"
      });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const windowRef = environment.open(hits()[activeItemIndex()].url ?? "", "_blank", "noopener");
        windowRef?.focus();
      } else if (e.shiftKey) {
        environment.open(hits()[activeItemIndex()].url ?? "", "_blank", "noopener");
      } else {
        environment.location.assign(hits()[activeItemIndex()].url ?? "");
      }
      if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
        onClose && onClose();
      }
    }
  }
  function onReset() {
    setLoading(false);
    setScreenState(ScreenState.EmptyQuery);
    setHits([]);
    setHitsCategories([]);
    setActiveItemIndex(0);
  }
  function search(query2) {
    setLoading(true);
    searchClient().index(indexUid).search(query2, {
      attributesToHighlight: ["*"],
      attributesToCrop: [`content`],
      cropLength: 30,
      ...searchParams
    }).catch((e) => {
      onReset();
      setScreenState(ScreenState.Error);
      console.error(e);
    }).then((res) => {
      if (!res) {
        onReset();
        setScreenState(ScreenState.Error);
        return;
      }
      if (res.hits.length === 0) {
        onReset();
        setScreenState(ScreenState.NoResults);
        return;
      }
      const [hits2, catgeories] = formatHits(res.hits);
      setLoading(false);
      setScreenState(hits2.length === 0 ? ScreenState.NoResults : ScreenState.Results);
      setActiveItemIndex(0);
      setHits(hits2);
      setHitsCategories(catgeories);
    });
  }
  const debouncedSearch = !debounceDuration ? search : debounce(search, debounceDuration);
  if (initialQuery) {
    onMount5(() => {
      setQuery(initialQuery);
      search(initialQuery);
    });
  }
  function onInput(e) {
    const query2 = e.currentTarget?.value;
    setQuery(query2);
    if (!query2) {
      onReset();
      return;
    }
    debouncedSearch(query2);
  }
  return (() => {
    var _el$ = _tmpl$52(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$15 = _el$4.nextSibling;
    _el$.$$mousedown = (e) => e.target === e.currentTarget && onClose && onClose();
    var _ref$ = modalRef;
    typeof _ref$ === "function" ? _$use2(_ref$, _el$) : modalRef = _el$;
    _$use2(trapFocus, _el$2, () => ({
      environment
    }));
    _$insert4(_el$3, _$createComponent4(DocSearchModalSearchBox, {
      loading,
      query,
      onInput,
      onKeyDown,
      onReset,
      onClose,
      translations
    }));
    var _ref$2 = containerRef;
    typeof _ref$2 === "function" ? _$use2(_ref$2, _el$4) : containerRef = _el$4;
    _$insert4(_el$4, _$createComponent4(Switch, {
      get children() {
        return [_$createComponent4(Match, {
          get when() {
            return screenState() === ScreenState.EmptyQuery;
          },
          get children() {
            return _tmpl$14();
          }
        }), _$createComponent4(Match, {
          get when() {
            return screenState() === ScreenState.Error;
          },
          get children() {
            return _tmpl$25();
          }
        }), _$createComponent4(Match, {
          get when() {
            return screenState() === ScreenState.NoResults;
          },
          get children() {
            var _el$7 = _tmpl$42(), _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$11 = _el$9.nextSibling, _el$10 = _el$11.nextSibling;
            _$insert4(_el$8, query, _el$11);
            _$insert4(_el$7, _$createComponent4(Show2, {
              get when() {
                return hitCategories().length > 0;
              },
              get children() {
                var _el$12 = _tmpl$32(), _el$13 = _el$12.firstChild, _el$14 = _el$13.nextSibling;
                _$insert4(_el$14, _$createComponent4(For2, {
                  get each() {
                    return hitCategories();
                  },
                  children: (category) => (() => {
                    var _el$16 = _tmpl$62(), _el$17 = _el$16.firstChild;
                    _el$17.$$click = () => setQuery(category);
                    _$insert4(_el$17, category);
                    return _el$16;
                  })()
                }));
                return _el$12;
              }
            }), null);
            return _el$7;
          }
        }), _$createComponent4(Match, {
          get when() {
            return screenState() === ScreenState.Results;
          },
          get children() {
            return _$createComponent4(For2, {
              get each() {
                return hitCategories();
              },
              children: (category) => (() => {
                var _el$18 = _tmpl$72(), _el$19 = _el$18.firstChild, _el$20 = _el$19.nextSibling;
                _$insert4(_el$19, category);
                _$insert4(_el$20, _$createComponent4(For2, {
                  get each() {
                    return hits().filter((h) => h.category === category);
                  },
                  children: (hit) => (() => {
                    var _el$21 = _tmpl$82(), _el$22 = _el$21.firstChild, _el$23 = _el$22.firstChild, _el$24 = _el$23.firstChild, _el$25 = _el$24.nextSibling, _el$26 = _el$23.nextSibling;
                    _el$21.addEventListener("mouseenter", () => setActiveItemIndex(hit.index));
                    _el$22.$$click = (e) => {
                      onClose && onClose();
                    };
                    _$setAttribute12(_el$22, "aria-label", linkToTheResultAriaLabel);
                    _$insert4(_el$26, _$createComponent4(EnterIcon, {
                      "class": "docsearch-modal-search-hits-item-trailing-icon"
                    }));
                    _$effect11((_p$) => {
                      var _v$ = hit.index === activeItemIndex(), _v$2 = `docsearch-hit-item-${hit.index}`, _v$3 = !!(hit.index === activeItemIndex()), _v$4 = hit.url || "#", _v$5 = (hit.subcategory || "") + (hit.subcategory && hit.title && " | ") + (hit.title || ""), _v$6 = hit.text || "";
                      _v$ !== _p$.e && _$setAttribute12(_el$21, "aria-selected", _p$.e = _v$);
                      _v$2 !== _p$.t && _$setAttribute12(_el$21, "id", _p$.t = _v$2);
                      _v$3 !== _p$.a && _el$21.classList.toggle("docsearch-modal-search-hits-item--active", _p$.a = _v$3);
                      _v$4 !== _p$.o && _$setAttribute12(_el$22, "href", _p$.o = _v$4);
                      _v$5 !== _p$.i && (_el$24.innerHTML = _p$.i = _v$5);
                      _v$6 !== _p$.n && (_el$25.innerHTML = _p$.n = _v$6);
                      return _p$;
                    }, {
                      e: void 0,
                      t: void 0,
                      a: void 0,
                      o: void 0,
                      i: void 0,
                      n: void 0
                    });
                    return _el$21;
                  })()
                }));
                return _el$18;
              })()
            });
          }
        })];
      }
    }));
    _$insert4(_el$15, _$createComponent4(DocSearchModalFooter, {
      translations
    }));
    return _el$;
  })();
};
function formatHits(receivedHits) {
  const clonedHits = deepClone(receivedHits);
  const hits = clonedHits.map((hit) => {
    if (hit._formatted) {
      const cleanFormatted = replaceNullString(hit._formatted);
      hit._formatted = renameKeysWithLevels(cleanFormatted, "hierarchy_");
    }
    const cleanHit = replaceNullString(hit);
    return renameKeysWithLevels(cleanHit, "hierarchy_");
  });
  const groupedHits = groupBy(hits, "lvl0");
  const formattedHits = Object.entries(groupedHits).map(([k, v]) => v.map((hit) => ({
    category: k,
    subcategory: getHighlightedValue(hit, "lvl1") || k,
    title: compact([getHighlightedValue(hit, "lvl2"), getHighlightedValue(hit, "lvl3"), getHighlightedValue(hit, "lvl4"), getHighlightedValue(hit, "lvl5"), getHighlightedValue(hit, "lvl6")]).join('<span aria-hidden="true"> \u203A </span>'),
    text: getSnippetedValue(hit, "content"),
    url: formatURL(hit)
  }))).flat().map((h, index) => ({
    index,
    ...h
  }));
  return [formattedHits, Object.keys(groupedHits)];
}
function formatURL(hit) {
  const {
    url,
    anchor
  } = hit;
  if (url) {
    const containsAnchor = url.indexOf("#") !== -1;
    if (containsAnchor) return url;
    else if (anchor) return `${hit.url}#${hit.anchor}`;
    return url;
  } else if (anchor) return `#${hit.anchor}`;
  console.warn("no anchor nor url for : ", JSON.stringify(hit));
  return null;
}
_$delegateEvents3(["mousedown", "click"]);

// src/DocSearch.tsx
import { Portal } from "solid-js/web";
var DEFAULT_HOTKEYS = ["ctrl+k", "s", "/"];
var DocSearch = (props) => {
  const {
    environment = window,
    hotKeys = DEFAULT_HOTKEYS
  } = props;
  const [isOpen, setIsOpen] = createSignal3(false);
  const [initialQuery, setInitialQuery] = createSignal3();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onInput = (query) => setInitialQuery(query);
  const onClick = () => {
    const selectedText = window.getSelection();
    if (selectedText) setInitialQuery(selectedText.toString());
    setIsOpen(true);
  };
  useDocSearchHotKeys({
    isOpen,
    onOpen,
    onClose,
    onInput,
    hotKeys
  });
  return [_$createComponent5(DocSearchButton, {
    get translations() {
      return props?.translations?.button;
    },
    hotKeys,
    onClick
  }), _$memo2(() => _$memo2(() => !!isOpen())() && _$createComponent5(Portal, {
    get mount() {
      return environment.document.body;
    },
    get children() {
      return _$createComponent5(DocSearchModal, _$mergeProps(props, {
        get initialQuery() {
          return initialQuery();
        },
        onClose,
        get translations() {
          return props?.translations?.modal;
        }
      }));
    }
  }))];
};

// src/index.tsx
function docsearch(props) {
  const [render_, setRender] = createSignal4(true);
  render(() => _$createComponent6(Show3, {
    get when() {
      return render_();
    },
    get children() {
      return _$createComponent6(DocSearch, props);
    }
  }), typeof props.container === "string" ? (props.environment ?? window).document.querySelector(props.container) : props.container);
  return () => setRender(false);
}
var src_default = docsearch;
export {
  src_default as default,
  docsearch
};
