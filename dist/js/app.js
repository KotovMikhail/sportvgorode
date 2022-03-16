/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      637: (e, t, n) => {
        var r, i, o;
        (i = [n(755)]),
          (r = function (e) {
            "use strict";
            var t = e(document),
              n = e(window),
              r = "selectric",
              i =
                "Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel",
              o = ".sl",
              s = ["a", "e", "i", "o", "u", "n", "c", "y"],
              a = [
                /[\xE0-\xE5]/g,
                /[\xE8-\xEB]/g,
                /[\xEC-\xEF]/g,
                /[\xF2-\xF6]/g,
                /[\xF9-\xFC]/g,
                /[\xF1]/g,
                /[\xE7]/g,
                /[\xFD-\xFF]/g,
              ],
              l = function (t, n) {
                var r = this;
                (r.element = t),
                  (r.$element = e(t)),
                  (r.state = {
                    multiple: !!r.$element.attr("multiple"),
                    enabled: !1,
                    opened: !1,
                    currValue: -1,
                    selectedIdx: -1,
                    highlightedIdx: -1,
                  }),
                  (r.eventTriggers = {
                    open: r.open,
                    close: r.close,
                    destroy: r.destroy,
                    refresh: r.refresh,
                    init: r.init,
                  }),
                  r.init(n);
              };
            (l.prototype = {
              utils: {
                isMobile: function () {
                  return /android|ip(hone|od|ad)/i.test(navigator.userAgent);
                },
                escapeRegExp: function (e) {
                  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                },
                replaceDiacritics: function (e) {
                  for (var t = a.length; t--; )
                    e = e.toLowerCase().replace(a[t], s[t]);
                  return e;
                },
                format: function (e) {
                  var t = arguments;
                  return ("" + e).replace(
                    /\{(?:(\d+)|(\w+))\}/g,
                    function (e, n, r) {
                      return r && t[1] ? t[1][r] : t[n];
                    }
                  );
                },
                nextEnabledItem: function (e, t) {
                  for (; e[(t = (t + 1) % e.length)].disabled; );
                  return t;
                },
                previousEnabledItem: function (e, t) {
                  for (; e[(t = (t > 0 ? t : e.length) - 1)].disabled; );
                  return t;
                },
                toDash: function (e) {
                  return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
                },
                triggerCallback: function (t, n) {
                  var i = n.element,
                    o = n.options["on" + t],
                    s = [i].concat([].slice.call(arguments).slice(1));
                  e.isFunction(o) && o.apply(i, s),
                    e(i).trigger(r + "-" + this.toDash(t), s);
                },
                arrayToClassname: function (t) {
                  var n = e.grep(t, function (e) {
                    return !!e;
                  });
                  return e.trim(n.join(" "));
                },
              },
              init: function (t) {
                var n = this;
                if (
                  ((n.options = e.extend(
                    !0,
                    {},
                    e.fn[r].defaults,
                    n.options,
                    t
                  )),
                  n.utils.triggerCallback("BeforeInit", n),
                  n.destroy(!0),
                  n.options.disableOnMobile && n.utils.isMobile())
                )
                  n.disableOnMobile = !0;
                else {
                  n.classes = n.getClassNames();
                  var i = e("<input/>", {
                      class: n.classes.input,
                      readonly: n.utils.isMobile(),
                    }),
                    o = e("<div/>", { class: n.classes.items, tabindex: -1 }),
                    s = e("<div/>", { class: n.classes.scroll }),
                    a = e("<div/>", {
                      class: n.classes.prefix,
                      html: n.options.arrowButtonMarkup,
                    }),
                    l = e("<span/>", { class: "label" }),
                    u = n.$element
                      .wrap("<div/>")
                      .parent()
                      .append(a.prepend(l), o, i),
                    c = e("<div/>", { class: n.classes.hideselect });
                  (n.elements = {
                    input: i,
                    items: o,
                    itemsScroll: s,
                    wrapper: a,
                    label: l,
                    outerWrapper: u,
                  }),
                    n.options.nativeOnMobile &&
                      n.utils.isMobile() &&
                      ((n.elements.input = void 0),
                      c.addClass(n.classes.prefix + "-is-native"),
                      n.$element.on("change", function () {
                        n.refresh();
                      })),
                    n.$element.on(n.eventTriggers).wrap(c),
                    (n.originalTabindex = n.$element.prop("tabindex")),
                    n.$element.prop("tabindex", -1),
                    n.populate(),
                    n.activate(),
                    n.utils.triggerCallback("Init", n);
                }
              },
              activate: function () {
                var e = this,
                  t = e.elements.items
                    .closest(":visible")
                    .children(":hidden")
                    .addClass(e.classes.tempshow),
                  n = e.$element.width();
                t.removeClass(e.classes.tempshow),
                  e.utils.triggerCallback("BeforeActivate", e),
                  e.elements.outerWrapper.prop(
                    "class",
                    e.utils.arrayToClassname([
                      e.classes.wrapper,
                      e.$element
                        .prop("class")
                        .replace(/\S+/g, e.classes.prefix + "-$&"),
                      e.options.responsive ? e.classes.responsive : "",
                    ])
                  ),
                  e.options.inheritOriginalWidth &&
                    n > 0 &&
                    e.elements.outerWrapper.width(n),
                  e.unbindEvents(),
                  e.$element.prop("disabled")
                    ? (e.elements.outerWrapper.addClass(e.classes.disabled),
                      e.elements.input && e.elements.input.prop("disabled", !0))
                    : ((e.state.enabled = !0),
                      e.elements.outerWrapper.removeClass(e.classes.disabled),
                      (e.$li = e.elements.items.removeAttr("style").find("li")),
                      e.bindEvents()),
                  e.utils.triggerCallback("Activate", e);
              },
              getClassNames: function () {
                var t = this,
                  n = t.options.customClass,
                  r = {};
                return (
                  e.each(i.split(" "), function (e, i) {
                    var o = n.prefix + i;
                    r[i.toLowerCase()] = n.camelCase ? o : t.utils.toDash(o);
                  }),
                  (r.prefix = n.prefix),
                  r
                );
              },
              setLabel: function () {
                var t = this,
                  n = t.options.labelBuilder;
                if (t.state.multiple) {
                  var r = e.isArray(t.state.currValue)
                    ? t.state.currValue
                    : [t.state.currValue];
                  r = 0 === r.length ? [0] : r;
                  var i = e.map(r, function (n) {
                    return e.grep(t.lookupItems, function (e) {
                      return e.index === n;
                    })[0];
                  });
                  (i = e.grep(i, function (t) {
                    return i.length > 1 || 0 === i.length
                      ? "" !== e.trim(t.value)
                      : t;
                  })),
                    (i = e.map(i, function (r) {
                      return e.isFunction(n) ? n(r) : t.utils.format(n, r);
                    })),
                    t.options.multiple.maxLabelEntries &&
                      (i.length >= t.options.multiple.maxLabelEntries + 1
                        ? (i = i.slice(
                            0,
                            t.options.multiple.maxLabelEntries
                          )).push(
                            e.isFunction(n)
                              ? n({ text: "..." })
                              : t.utils.format(n, { text: "..." })
                          )
                        : i.slice(i.length - 1)),
                    t.elements.label.html(i.join(t.options.multiple.separator));
                } else {
                  var o = t.lookupItems[t.state.currValue];
                  t.elements.label.html(
                    e.isFunction(n) ? n(o) : t.utils.format(n, o)
                  );
                }
              },
              populate: function () {
                var t = this,
                  n = t.$element.children(),
                  r = t.$element.find("option"),
                  i = r.filter(":selected"),
                  o = r.index(i),
                  s = 0,
                  a = t.state.multiple ? [] : 0;
                i.length > 1 &&
                  t.state.multiple &&
                  ((o = []),
                  i.each(function () {
                    o.push(e(this).index());
                  })),
                  (t.state.currValue = ~o ? o : a),
                  (t.state.selectedIdx = t.state.currValue),
                  (t.state.highlightedIdx = t.state.currValue),
                  (t.items = []),
                  (t.lookupItems = []),
                  n.length &&
                    (n.each(function (n) {
                      var r = e(this);
                      if (r.is("optgroup")) {
                        var i = {
                          element: r,
                          label: r.prop("label"),
                          groupDisabled: r.prop("disabled"),
                          items: [],
                        };
                        r.children().each(function (n) {
                          var r = e(this);
                          (i.items[n] = t.getItemData(
                            s,
                            r,
                            i.groupDisabled || r.prop("disabled")
                          )),
                            (t.lookupItems[s] = i.items[n]),
                            s++;
                        }),
                          (t.items[n] = i);
                      } else (t.items[n] = t.getItemData(s, r, r.prop("disabled"))), (t.lookupItems[s] = t.items[n]), s++;
                    }),
                    t.setLabel(),
                    t.elements.items.append(
                      t.elements.itemsScroll.html(t.getItemsMarkup(t.items))
                    ));
              },
              getItemData: function (t, n, r) {
                var i = this;
                return {
                  index: t,
                  element: n,
                  value: n.val(),
                  className: n.prop("class"),
                  text: n.html(),
                  slug: e.trim(i.utils.replaceDiacritics(n.html())),
                  alt: n.attr("data-alt"),
                  selected: n.prop("selected"),
                  disabled: r,
                };
              },
              getItemsMarkup: function (t) {
                var n = this,
                  r = "<ul>";
                return (
                  e.isFunction(n.options.listBuilder) &&
                    n.options.listBuilder &&
                    (t = n.options.listBuilder(t)),
                  e.each(t, function (t, i) {
                    void 0 !== i.label
                      ? ((r += n.utils.format(
                          '<ul class="{1}"><li class="{2}">{3}</li>',
                          n.utils.arrayToClassname([
                            n.classes.group,
                            i.groupDisabled ? "disabled" : "",
                            i.element.prop("class"),
                          ]),
                          n.classes.grouplabel,
                          i.element.prop("label")
                        )),
                        e.each(i.items, function (e, t) {
                          r += n.getItemMarkup(t.index, t);
                        }),
                        (r += "</ul>"))
                      : (r += n.getItemMarkup(i.index, i));
                  }),
                  r + "</ul>"
                );
              },
              getItemMarkup: function (t, n) {
                var r = this,
                  i = r.options.optionsItemBuilder,
                  o = {
                    value: n.value,
                    text: n.text,
                    slug: n.slug,
                    index: n.index,
                  };
                return r.utils.format(
                  '<li data-index="{1}" class="{2}">{3}</li>',
                  t,
                  r.utils.arrayToClassname([
                    n.className,
                    t === r.items.length - 1 ? "last" : "",
                    n.disabled ? "disabled" : "",
                    n.selected ? "selected" : "",
                  ]),
                  e.isFunction(i)
                    ? r.utils.format(i(n, this.$element, t), n)
                    : r.utils.format(i, o)
                );
              },
              unbindEvents: function () {
                var e = this;
                e.elements.wrapper
                  .add(e.$element)
                  .add(e.elements.outerWrapper)
                  .add(e.elements.input)
                  .off(o);
              },
              bindEvents: function () {
                var t = this;
                t.elements.outerWrapper.on(
                  "mouseenter" + o + " mouseleave" + o,
                  function (n) {
                    e(this).toggleClass(
                      t.classes.hover,
                      "mouseenter" === n.type
                    ),
                      t.options.openOnHover &&
                        (clearTimeout(t.closeTimer),
                        "mouseleave" === n.type
                          ? (t.closeTimer = setTimeout(
                              e.proxy(t.close, t),
                              t.options.hoverIntentTimeout
                            ))
                          : t.open());
                  }
                ),
                  t.elements.wrapper.on("click" + o, function (e) {
                    t.state.opened ? t.close() : t.open(e);
                  }),
                  (t.options.nativeOnMobile && t.utils.isMobile()) ||
                    (t.$element.on("focus" + o, function () {
                      t.elements.input.focus();
                    }),
                    t.elements.input
                      .prop({ tabindex: t.originalTabindex, disabled: !1 })
                      .on("keydown" + o, e.proxy(t.handleKeys, t))
                      .on("focusin" + o, function (e) {
                        t.elements.outerWrapper.addClass(t.classes.focus),
                          t.elements.input.one("blur", function () {
                            t.elements.input.blur();
                          }),
                          t.options.openOnFocus && !t.state.opened && t.open(e);
                      })
                      .on("focusout" + o, function () {
                        t.elements.outerWrapper.removeClass(t.classes.focus);
                      })
                      .on("input propertychange", function () {
                        var n = t.elements.input.val(),
                          r = new RegExp("^" + t.utils.escapeRegExp(n), "i");
                        clearTimeout(t.resetStr),
                          (t.resetStr = setTimeout(function () {
                            t.elements.input.val("");
                          }, t.options.keySearchTimeout)),
                          n.length &&
                            e.each(t.items, function (e, n) {
                              if (!n.disabled)
                                if (r.test(n.text) || r.test(n.slug))
                                  t.highlight(e);
                                else if (n.alt)
                                  for (
                                    var i = n.alt.split("|"), o = 0;
                                    o < i.length && i[o];
                                    o++
                                  )
                                    if (r.test(i[o].trim()))
                                      return void t.highlight(e);
                            });
                      })),
                  t.$li.on({
                    mousedown: function (e) {
                      e.preventDefault(), e.stopPropagation();
                    },
                    click: function () {
                      return t.select(e(this).data("index")), !1;
                    },
                  });
              },
              handleKeys: function (t) {
                var n = this,
                  r = t.which,
                  i = n.options.keys,
                  o = e.inArray(r, i.previous) > -1,
                  s = e.inArray(r, i.next) > -1,
                  a = e.inArray(r, i.select) > -1,
                  l = e.inArray(r, i.open) > -1,
                  u = n.state.highlightedIdx,
                  c = (o && 0 === u) || (s && u + 1 === n.items.length),
                  p = 0;
                if (((13 !== r && 32 !== r) || t.preventDefault(), o || s)) {
                  if (!n.options.allowWrap && c) return;
                  o && (p = n.utils.previousEnabledItem(n.lookupItems, u)),
                    s && (p = n.utils.nextEnabledItem(n.lookupItems, u)),
                    n.highlight(p);
                }
                if (a && n.state.opened)
                  return (
                    n.select(u),
                    void (
                      (n.state.multiple && n.options.multiple.keepMenuOpen) ||
                      n.close()
                    )
                  );
                l && !n.state.opened && n.open();
              },
              refresh: function () {
                var e = this;
                e.populate(),
                  e.activate(),
                  e.utils.triggerCallback("Refresh", e);
              },
              setOptionsDimensions: function () {
                var e = this,
                  t = e.elements.items
                    .closest(":visible")
                    .children(":hidden")
                    .addClass(e.classes.tempshow),
                  n = e.options.maxHeight,
                  r = e.elements.items.outerWidth(),
                  i =
                    e.elements.wrapper.outerWidth() -
                    (r - e.elements.items.width());
                !e.options.expandToItemText || i > r
                  ? (e.finalWidth = i)
                  : (e.elements.items.css("overflow", "scroll"),
                    e.elements.outerWrapper.width(9e4),
                    (e.finalWidth = e.elements.items.width()),
                    e.elements.items.css("overflow", ""),
                    e.elements.outerWrapper.width("")),
                  e.elements.items.width(e.finalWidth).height() > n &&
                    e.elements.items.height(n),
                  t.removeClass(e.classes.tempshow);
              },
              isInViewport: function () {
                var e = this;
                if (!0 === e.options.forceRenderAbove)
                  e.elements.outerWrapper.addClass(e.classes.above);
                else if (!0 === e.options.forceRenderBelow)
                  e.elements.outerWrapper.addClass(e.classes.below);
                else {
                  var t = n.scrollTop(),
                    r = n.height(),
                    i = e.elements.outerWrapper.offset().top,
                    o =
                      i +
                        e.elements.outerWrapper.outerHeight() +
                        e.itemsHeight <=
                      t + r,
                    s = i - e.itemsHeight > t,
                    a = !o && s,
                    l = !a;
                  e.elements.outerWrapper.toggleClass(e.classes.above, a),
                    e.elements.outerWrapper.toggleClass(e.classes.below, l);
                }
              },
              detectItemVisibility: function (t) {
                var n = this,
                  r = n.$li.filter("[data-index]");
                n.state.multiple &&
                  ((t = e.isArray(t) && 0 === t.length ? 0 : t),
                  (t = e.isArray(t) ? Math.min.apply(Math, t) : t));
                var i = r.eq(t).outerHeight(),
                  o = r[t].offsetTop,
                  s = n.elements.itemsScroll.scrollTop(),
                  a = o + 2 * i;
                n.elements.itemsScroll.scrollTop(
                  a > s + n.itemsHeight
                    ? a - n.itemsHeight
                    : o - i < s
                    ? o - i
                    : s
                );
              },
              open: function (n) {
                var i = this;
                if (i.options.nativeOnMobile && i.utils.isMobile()) return !1;
                i.utils.triggerCallback("BeforeOpen", i),
                  n &&
                    (n.preventDefault(),
                    i.options.stopPropagation && n.stopPropagation()),
                  i.state.enabled &&
                    (i.setOptionsDimensions(),
                    e("." + i.classes.hideselect, "." + i.classes.open)
                      .children()
                      [r]("close"),
                    (i.state.opened = !0),
                    (i.itemsHeight = i.elements.items.outerHeight()),
                    (i.itemsInnerHeight = i.elements.items.height()),
                    i.elements.outerWrapper.addClass(i.classes.open),
                    i.elements.input.val(""),
                    n && "focusin" !== n.type && i.elements.input.focus(),
                    setTimeout(function () {
                      t.on("click" + o, e.proxy(i.close, i)).on(
                        "scroll" + o,
                        e.proxy(i.isInViewport, i)
                      );
                    }, 1),
                    i.isInViewport(),
                    i.options.preventWindowScroll &&
                      t.on(
                        "mousewheel" + o + " DOMMouseScroll" + o,
                        "." + i.classes.scroll,
                        function (t) {
                          var n = t.originalEvent,
                            r = e(this).scrollTop(),
                            o = 0;
                          "detail" in n && (o = -1 * n.detail),
                            "wheelDelta" in n && (o = n.wheelDelta),
                            "wheelDeltaY" in n && (o = n.wheelDeltaY),
                            "deltaY" in n && (o = -1 * n.deltaY),
                            ((r === this.scrollHeight - i.itemsInnerHeight &&
                              o < 0) ||
                              (0 === r && o > 0)) &&
                              t.preventDefault();
                        }
                      ),
                    i.detectItemVisibility(i.state.selectedIdx),
                    i.highlight(i.state.multiple ? -1 : i.state.selectedIdx),
                    i.utils.triggerCallback("Open", i));
              },
              close: function () {
                var e = this;
                e.utils.triggerCallback("BeforeClose", e),
                  t.off(o),
                  e.elements.outerWrapper.removeClass(e.classes.open),
                  (e.state.opened = !1),
                  e.utils.triggerCallback("Close", e);
              },
              change: function () {
                var t = this;
                t.utils.triggerCallback("BeforeChange", t),
                  t.state.multiple
                    ? (e.each(t.lookupItems, function (e) {
                        (t.lookupItems[e].selected = !1),
                          t.$element.find("option").prop("selected", !1);
                      }),
                      e.each(t.state.selectedIdx, function (e, n) {
                        (t.lookupItems[n].selected = !0),
                          t.$element.find("option").eq(n).prop("selected", !0);
                      }),
                      (t.state.currValue = t.state.selectedIdx),
                      t.setLabel(),
                      t.utils.triggerCallback("Change", t))
                    : t.state.currValue !== t.state.selectedIdx &&
                      (t.$element
                        .prop(
                          "selectedIndex",
                          (t.state.currValue = t.state.selectedIdx)
                        )
                        .data("value", t.lookupItems[t.state.selectedIdx].text),
                      t.setLabel(),
                      t.utils.triggerCallback("Change", t));
              },
              highlight: function (e) {
                var t = this,
                  n = t.$li.filter("[data-index]").removeClass("highlighted");
                t.utils.triggerCallback("BeforeHighlight", t),
                  void 0 === e ||
                    -1 === e ||
                    t.lookupItems[e].disabled ||
                    (n.eq((t.state.highlightedIdx = e)).addClass("highlighted"),
                    t.detectItemVisibility(e),
                    t.utils.triggerCallback("Highlight", t));
              },
              select: function (t) {
                var n = this,
                  r = n.$li.filter("[data-index]");
                if (
                  (n.utils.triggerCallback("BeforeSelect", n, t),
                  void 0 !== t && -1 !== t && !n.lookupItems[t].disabled)
                ) {
                  if (n.state.multiple) {
                    n.state.selectedIdx = e.isArray(n.state.selectedIdx)
                      ? n.state.selectedIdx
                      : [n.state.selectedIdx];
                    var i = e.inArray(t, n.state.selectedIdx);
                    -1 !== i
                      ? n.state.selectedIdx.splice(i, 1)
                      : n.state.selectedIdx.push(t),
                      r
                        .removeClass("selected")
                        .filter(function (t) {
                          return -1 !== e.inArray(t, n.state.selectedIdx);
                        })
                        .addClass("selected");
                  } else
                    r.removeClass("selected")
                      .eq((n.state.selectedIdx = t))
                      .addClass("selected");
                  (n.state.multiple && n.options.multiple.keepMenuOpen) ||
                    n.close(),
                    n.change(),
                    n.utils.triggerCallback("Select", n, t);
                }
              },
              destroy: function (e) {
                var t = this;
                t.state &&
                  t.state.enabled &&
                  (t.elements.items
                    .add(t.elements.wrapper)
                    .add(t.elements.input)
                    .remove(),
                  e || t.$element.removeData(r).removeData("value"),
                  t.$element
                    .prop("tabindex", t.originalTabindex)
                    .off(o)
                    .off(t.eventTriggers)
                    .unwrap()
                    .unwrap(),
                  (t.state.enabled = !1));
              },
            }),
              (e.fn[r] = function (t) {
                return this.each(function () {
                  var n = e.data(this, r);
                  n && !n.disableOnMobile
                    ? "string" == typeof t && n[t]
                      ? n[t]()
                      : n.init(t)
                    : e.data(this, r, new l(this, t));
                });
              }),
              (e.fn[r].defaults = {
                onChange: function (t) {
                  e(t).change();
                },
                maxHeight: 300,
                keySearchTimeout: 500,
                arrowButtonMarkup: '<b class="button">&#x25be;</b>',
                disableOnMobile: !1,
                nativeOnMobile: !0,
                openOnFocus: !0,
                openOnHover: !1,
                hoverIntentTimeout: 500,
                expandToItemText: !1,
                responsive: !1,
                preventWindowScroll: !0,
                inheritOriginalWidth: !1,
                allowWrap: !0,
                forceRenderAbove: !1,
                forceRenderBelow: !1,
                stopPropagation: !0,
                optionsItemBuilder: "{text}",
                labelBuilder: "{text}",
                listBuilder: !1,
                keys: {
                  previous: [37, 38],
                  next: [39, 40],
                  select: [9, 13, 27],
                  open: [13, 32, 37, 38, 39, 40],
                  close: [9, 27],
                },
                customClass: { prefix: r, camelCase: !1 },
                multiple: {
                  separator: ", ",
                  keepMenuOpen: !0,
                  maxLabelEntries: !1,
                },
              });
          }),
          void 0 === (o = "function" == typeof r ? r.apply(t, i) : r) ||
            (e.exports = o);
      },
      755: function (e, t) {
        var n;
        !(function (t, n) {
          "use strict";
          "object" == typeof e.exports
            ? (e.exports = t.document
                ? n(t, !0)
                : function (e) {
                    if (!e.document)
                      throw new Error(
                        "jQuery requires a window with a document"
                      );
                    return n(e);
                  })
            : n(t);
        })("undefined" != typeof window ? window : this, function (r, i) {
          "use strict";
          var o = [],
            s = Object.getPrototypeOf,
            a = o.slice,
            l = o.flat
              ? function (e) {
                  return o.flat.call(e);
                }
              : function (e) {
                  return o.concat.apply([], e);
                },
            u = o.push,
            c = o.indexOf,
            p = {},
            f = p.toString,
            d = p.hasOwnProperty,
            h = d.toString,
            g = h.call(Object),
            m = {},
            v = function (e) {
              return "function" == typeof e && "number" != typeof e.nodeType;
            },
            y = function (e) {
              return null != e && e === e.window;
            },
            x = r.document,
            b = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function w(e, t, n) {
            var r,
              i,
              o = (n = n || x).createElement("script");
            if (((o.text = e), t))
              for (r in b)
                (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
                  o.setAttribute(r, i);
            n.head.appendChild(o).parentNode.removeChild(o);
          }
          function C(e) {
            return null == e
              ? e + ""
              : "object" == typeof e || "function" == typeof e
              ? p[f.call(e)] || "object"
              : typeof e;
          }
          var T = "3.5.1",
            k = function (e, t) {
              return new k.fn.init(e, t);
            };
          function E(e) {
            var t = !!e && "length" in e && e.length,
              n = C(e);
            return (
              !v(e) &&
              !y(e) &&
              ("array" === n ||
                0 === t ||
                ("number" == typeof t && t > 0 && t - 1 in e))
            );
          }
          (k.fn = k.prototype =
            {
              jquery: T,
              constructor: k,
              length: 0,
              toArray: function () {
                return a.call(this);
              },
              get: function (e) {
                return null == e
                  ? a.call(this)
                  : e < 0
                  ? this[e + this.length]
                  : this[e];
              },
              pushStack: function (e) {
                var t = k.merge(this.constructor(), e);
                return (t.prevObject = this), t;
              },
              each: function (e) {
                return k.each(this, e);
              },
              map: function (e) {
                return this.pushStack(
                  k.map(this, function (t, n) {
                    return e.call(t, n, t);
                  })
                );
              },
              slice: function () {
                return this.pushStack(a.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              even: function () {
                return this.pushStack(
                  k.grep(this, function (e, t) {
                    return (t + 1) % 2;
                  })
                );
              },
              odd: function () {
                return this.pushStack(
                  k.grep(this, function (e, t) {
                    return t % 2;
                  })
                );
              },
              eq: function (e) {
                var t = this.length,
                  n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: u,
              sort: o.sort,
              splice: o.splice,
            }),
            (k.extend = k.fn.extend =
              function () {
                var e,
                  t,
                  n,
                  r,
                  i,
                  o,
                  s = arguments[0] || {},
                  a = 1,
                  l = arguments.length,
                  u = !1;
                for (
                  "boolean" == typeof s &&
                    ((u = s), (s = arguments[a] || {}), a++),
                    "object" == typeof s || v(s) || (s = {}),
                    a === l && ((s = this), a--);
                  a < l;
                  a++
                )
                  if (null != (e = arguments[a]))
                    for (t in e)
                      (r = e[t]),
                        "__proto__" !== t &&
                          s !== r &&
                          (u &&
                          r &&
                          (k.isPlainObject(r) || (i = Array.isArray(r)))
                            ? ((n = s[t]),
                              (o =
                                i && !Array.isArray(n)
                                  ? []
                                  : i || k.isPlainObject(n)
                                  ? n
                                  : {}),
                              (i = !1),
                              (s[t] = k.extend(u, o, r)))
                            : void 0 !== r && (s[t] = r));
                return s;
              }),
            k.extend({
              expando: "jQuery" + (T + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isPlainObject: function (e) {
                var t, n;
                return (
                  !(!e || "[object Object]" !== f.call(e)) &&
                  (!(t = s(e)) ||
                    ("function" ==
                      typeof (n = d.call(t, "constructor") && t.constructor) &&
                      h.call(n) === g))
                );
              },
              isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
              },
              globalEval: function (e, t, n) {
                w(e, { nonce: t && t.nonce }, n);
              },
              each: function (e, t) {
                var n,
                  r = 0;
                if (E(e))
                  for (
                    n = e.length;
                    r < n && !1 !== t.call(e[r], r, e[r]);
                    r++
                  );
                else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                return e;
              },
              makeArray: function (e, t) {
                var n = t || [];
                return (
                  null != e &&
                    (E(Object(e))
                      ? k.merge(n, "string" == typeof e ? [e] : e)
                      : u.call(n, e)),
                  n
                );
              },
              inArray: function (e, t, n) {
                return null == t ? -1 : c.call(t, e, n);
              },
              merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                  e[i++] = t[r];
                return (e.length = i), e;
              },
              grep: function (e, t, n) {
                for (var r = [], i = 0, o = e.length, s = !n; i < o; i++)
                  !t(e[i], i) !== s && r.push(e[i]);
                return r;
              },
              map: function (e, t, n) {
                var r,
                  i,
                  o = 0,
                  s = [];
                if (E(e))
                  for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && s.push(i);
                else for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
                return l(s);
              },
              guid: 1,
              support: m,
            }),
            "function" == typeof Symbol &&
              (k.fn[Symbol.iterator] = o[Symbol.iterator]),
            k.each(
              "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
              ),
              function (e, t) {
                p["[object " + t + "]"] = t.toLowerCase();
              }
            );
          var A = (function (e) {
            var t,
              n,
              r,
              i,
              o,
              s,
              a,
              l,
              u,
              c,
              p,
              f,
              d,
              h,
              g,
              m,
              v,
              y,
              x,
              b = "sizzle" + 1 * new Date(),
              w = e.document,
              C = 0,
              T = 0,
              k = le(),
              E = le(),
              A = le(),
              S = le(),
              D = function (e, t) {
                return e === t && (p = !0), 0;
              },
              N = {}.hasOwnProperty,
              j = [],
              L = j.pop,
              I = j.push,
              q = j.push,
              H = j.slice,
              O = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                  if (e[n] === t) return n;
                return -1;
              },
              M =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              W = "[\\x20\\t\\r\\n\\f]",
              R =
                "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
              P =
                "\\[[\\x20\\t\\r\\n\\f]*(" +
                R +
                ")(?:" +
                W +
                "*([*^$|!~]?=)" +
                W +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                R +
                "))|)" +
                W +
                "*\\]",
              $ =
                ":(" +
                R +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                P +
                ")*)|.*)\\)|)",
              B = new RegExp(W + "+", "g"),
              F = new RegExp(
                "^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
                "g"
              ),
              _ = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
              V = new RegExp(
                "^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"
              ),
              z = new RegExp(W + "|>"),
              U = new RegExp($),
              X = new RegExp("^" + R + "$"),
              Y = {
                ID: new RegExp("^#(" + R + ")"),
                CLASS: new RegExp("^\\.(" + R + ")"),
                TAG: new RegExp("^(" + R + "|[*])"),
                ATTR: new RegExp("^" + P),
                PSEUDO: new RegExp("^" + $),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                  "i"
                ),
                bool: new RegExp("^(?:" + M + ")$", "i"),
                needsContext: new RegExp(
                  "^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
                  "i"
                ),
              },
              G = /HTML$/i,
              Q = /^(?:input|select|textarea|button)$/i,
              J = /^h\d$/i,
              K = /^[^{]+\{\s*\[native \w/,
              Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              ee = /[+~]/,
              te = new RegExp(
                "\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])",
                "g"
              ),
              ne = function (e, t) {
                var n = "0x" + e.slice(1) - 65536;
                return (
                  t ||
                  (n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode(
                        (n >> 10) | 55296,
                        (1023 & n) | 56320
                      ))
                );
              },
              re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              ie = function (e, t) {
                return t
                  ? "\0" === e
                    ? "�"
                    : e.slice(0, -1) +
                      "\\" +
                      e.charCodeAt(e.length - 1).toString(16) +
                      " "
                  : "\\" + e;
              },
              oe = function () {
                f();
              },
              se = be(
                function (e) {
                  return (
                    !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                  );
                },
                { dir: "parentNode", next: "legend" }
              );
            try {
              q.apply((j = H.call(w.childNodes)), w.childNodes),
                j[w.childNodes.length].nodeType;
            } catch (e) {
              q = {
                apply: j.length
                  ? function (e, t) {
                      I.apply(e, H.call(t));
                    }
                  : function (e, t) {
                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                      e.length = n - 1;
                    },
              };
            }
            function ae(e, t, r, i) {
              var o,
                a,
                u,
                c,
                p,
                h,
                v,
                y = t && t.ownerDocument,
                w = t ? t.nodeType : 9;
              if (
                ((r = r || []),
                "string" != typeof e || !e || (1 !== w && 9 !== w && 11 !== w))
              )
                return r;
              if (!i && (f(t), (t = t || d), g)) {
                if (11 !== w && (p = Z.exec(e)))
                  if ((o = p[1])) {
                    if (9 === w) {
                      if (!(u = t.getElementById(o))) return r;
                      if (u.id === o) return r.push(u), r;
                    } else if (
                      y &&
                      (u = y.getElementById(o)) &&
                      x(t, u) &&
                      u.id === o
                    )
                      return r.push(u), r;
                  } else {
                    if (p[2]) return q.apply(r, t.getElementsByTagName(e)), r;
                    if (
                      (o = p[3]) &&
                      n.getElementsByClassName &&
                      t.getElementsByClassName
                    )
                      return q.apply(r, t.getElementsByClassName(o)), r;
                  }
                if (
                  n.qsa &&
                  !S[e + " "] &&
                  (!m || !m.test(e)) &&
                  (1 !== w || "object" !== t.nodeName.toLowerCase())
                ) {
                  if (((v = e), (y = t), 1 === w && (z.test(e) || V.test(e)))) {
                    for (
                      ((y = (ee.test(e) && ve(t.parentNode)) || t) === t &&
                        n.scope) ||
                        ((c = t.getAttribute("id"))
                          ? (c = c.replace(re, ie))
                          : t.setAttribute("id", (c = b))),
                        a = (h = s(e)).length;
                      a--;

                    )
                      h[a] = (c ? "#" + c : ":scope") + " " + xe(h[a]);
                    v = h.join(",");
                  }
                  try {
                    return q.apply(r, y.querySelectorAll(v)), r;
                  } catch (t) {
                    S(e, !0);
                  } finally {
                    c === b && t.removeAttribute("id");
                  }
                }
              }
              return l(e.replace(F, "$1"), t, r, i);
            }
            function le() {
              var e = [];
              return function t(n, i) {
                return (
                  e.push(n + " ") > r.cacheLength && delete t[e.shift()],
                  (t[n + " "] = i)
                );
              };
            }
            function ue(e) {
              return (e[b] = !0), e;
            }
            function ce(e) {
              var t = d.createElement("fieldset");
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function pe(e, t) {
              for (var n = e.split("|"), i = n.length; i--; )
                r.attrHandle[n[i]] = t;
            }
            function fe(e, t) {
              var n = t && e,
                r =
                  n &&
                  1 === e.nodeType &&
                  1 === t.nodeType &&
                  e.sourceIndex - t.sourceIndex;
              if (r) return r;
              if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
              return e ? 1 : -1;
            }
            function de(e) {
              return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e;
              };
            }
            function he(e) {
              return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
              };
            }
            function ge(e) {
              return function (t) {
                return "form" in t
                  ? t.parentNode && !1 === t.disabled
                    ? "label" in t
                      ? "label" in t.parentNode
                        ? t.parentNode.disabled === e
                        : t.disabled === e
                      : t.isDisabled === e ||
                        (t.isDisabled !== !e && se(t) === e)
                    : t.disabled === e
                  : "label" in t && t.disabled === e;
              };
            }
            function me(e) {
              return ue(function (t) {
                return (
                  (t = +t),
                  ue(function (n, r) {
                    for (var i, o = e([], n.length, t), s = o.length; s--; )
                      n[(i = o[s])] && (n[i] = !(r[i] = n[i]));
                  })
                );
              });
            }
            function ve(e) {
              return e && void 0 !== e.getElementsByTagName && e;
            }
            for (t in ((n = ae.support = {}),
            (o = ae.isXML =
              function (e) {
                var t = e.namespaceURI,
                  n = (e.ownerDocument || e).documentElement;
                return !G.test(t || (n && n.nodeName) || "HTML");
              }),
            (f = ae.setDocument =
              function (e) {
                var t,
                  i,
                  s = e ? e.ownerDocument || e : w;
                return s != d && 9 === s.nodeType && s.documentElement
                  ? ((h = (d = s).documentElement),
                    (g = !o(d)),
                    w != d &&
                      (i = d.defaultView) &&
                      i.top !== i &&
                      (i.addEventListener
                        ? i.addEventListener("unload", oe, !1)
                        : i.attachEvent && i.attachEvent("onunload", oe)),
                    (n.scope = ce(function (e) {
                      return (
                        h.appendChild(e).appendChild(d.createElement("div")),
                        void 0 !== e.querySelectorAll &&
                          !e.querySelectorAll(":scope fieldset div").length
                      );
                    })),
                    (n.attributes = ce(function (e) {
                      return (e.className = "i"), !e.getAttribute("className");
                    })),
                    (n.getElementsByTagName = ce(function (e) {
                      return (
                        e.appendChild(d.createComment("")),
                        !e.getElementsByTagName("*").length
                      );
                    })),
                    (n.getElementsByClassName = K.test(
                      d.getElementsByClassName
                    )),
                    (n.getById = ce(function (e) {
                      return (
                        (h.appendChild(e).id = b),
                        !d.getElementsByName || !d.getElementsByName(b).length
                      );
                    })),
                    n.getById
                      ? ((r.filter.ID = function (e) {
                          var t = e.replace(te, ne);
                          return function (e) {
                            return e.getAttribute("id") === t;
                          };
                        }),
                        (r.find.ID = function (e, t) {
                          if (void 0 !== t.getElementById && g) {
                            var n = t.getElementById(e);
                            return n ? [n] : [];
                          }
                        }))
                      : ((r.filter.ID = function (e) {
                          var t = e.replace(te, ne);
                          return function (e) {
                            var n =
                              void 0 !== e.getAttributeNode &&
                              e.getAttributeNode("id");
                            return n && n.value === t;
                          };
                        }),
                        (r.find.ID = function (e, t) {
                          if (void 0 !== t.getElementById && g) {
                            var n,
                              r,
                              i,
                              o = t.getElementById(e);
                            if (o) {
                              if (
                                (n = o.getAttributeNode("id")) &&
                                n.value === e
                              )
                                return [o];
                              for (
                                i = t.getElementsByName(e), r = 0;
                                (o = i[r++]);

                              )
                                if (
                                  (n = o.getAttributeNode("id")) &&
                                  n.value === e
                                )
                                  return [o];
                            }
                            return [];
                          }
                        })),
                    (r.find.TAG = n.getElementsByTagName
                      ? function (e, t) {
                          return void 0 !== t.getElementsByTagName
                            ? t.getElementsByTagName(e)
                            : n.qsa
                            ? t.querySelectorAll(e)
                            : void 0;
                        }
                      : function (e, t) {
                          var n,
                            r = [],
                            i = 0,
                            o = t.getElementsByTagName(e);
                          if ("*" === e) {
                            for (; (n = o[i++]); )
                              1 === n.nodeType && r.push(n);
                            return r;
                          }
                          return o;
                        }),
                    (r.find.CLASS =
                      n.getElementsByClassName &&
                      function (e, t) {
                        if (void 0 !== t.getElementsByClassName && g)
                          return t.getElementsByClassName(e);
                      }),
                    (v = []),
                    (m = []),
                    (n.qsa = K.test(d.querySelectorAll)) &&
                      (ce(function (e) {
                        var t;
                        (h.appendChild(e).innerHTML =
                          "<a id='" +
                          b +
                          "'></a><select id='" +
                          b +
                          "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                          e.querySelectorAll("[msallowcapture^='']").length &&
                            m.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"),
                          e.querySelectorAll("[selected]").length ||
                            m.push(
                              "\\[[\\x20\\t\\r\\n\\f]*(?:value|" + M + ")"
                            ),
                          e.querySelectorAll("[id~=" + b + "-]").length ||
                            m.push("~="),
                          (t = d.createElement("input")).setAttribute(
                            "name",
                            ""
                          ),
                          e.appendChild(t),
                          e.querySelectorAll("[name='']").length ||
                            m.push(
                              "\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"
                            ),
                          e.querySelectorAll(":checked").length ||
                            m.push(":checked"),
                          e.querySelectorAll("a#" + b + "+*").length ||
                            m.push(".#.+[+~]"),
                          e.querySelectorAll("\\\f"),
                          m.push("[\\r\\n\\f]");
                      }),
                      ce(function (e) {
                        e.innerHTML =
                          "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = d.createElement("input");
                        t.setAttribute("type", "hidden"),
                          e.appendChild(t).setAttribute("name", "D"),
                          e.querySelectorAll("[name=d]").length &&
                            m.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="),
                          2 !== e.querySelectorAll(":enabled").length &&
                            m.push(":enabled", ":disabled"),
                          (h.appendChild(e).disabled = !0),
                          2 !== e.querySelectorAll(":disabled").length &&
                            m.push(":enabled", ":disabled"),
                          e.querySelectorAll("*,:x"),
                          m.push(",.*:");
                      })),
                    (n.matchesSelector = K.test(
                      (y =
                        h.matches ||
                        h.webkitMatchesSelector ||
                        h.mozMatchesSelector ||
                        h.oMatchesSelector ||
                        h.msMatchesSelector)
                    )) &&
                      ce(function (e) {
                        (n.disconnectedMatch = y.call(e, "*")),
                          y.call(e, "[s!='']:x"),
                          v.push("!=", $);
                      }),
                    (m = m.length && new RegExp(m.join("|"))),
                    (v = v.length && new RegExp(v.join("|"))),
                    (t = K.test(h.compareDocumentPosition)),
                    (x =
                      t || K.test(h.contains)
                        ? function (e, t) {
                            var n = 9 === e.nodeType ? e.documentElement : e,
                              r = t && t.parentNode;
                            return (
                              e === r ||
                              !(
                                !r ||
                                1 !== r.nodeType ||
                                !(n.contains
                                  ? n.contains(r)
                                  : e.compareDocumentPosition &&
                                    16 & e.compareDocumentPosition(r))
                              )
                            );
                          }
                        : function (e, t) {
                            if (t)
                              for (; (t = t.parentNode); )
                                if (t === e) return !0;
                            return !1;
                          }),
                    (D = t
                      ? function (e, t) {
                          if (e === t) return (p = !0), 0;
                          var r =
                            !e.compareDocumentPosition -
                            !t.compareDocumentPosition;
                          return (
                            r ||
                            (1 &
                              (r =
                                (e.ownerDocument || e) == (t.ownerDocument || t)
                                  ? e.compareDocumentPosition(t)
                                  : 1) ||
                            (!n.sortDetached &&
                              t.compareDocumentPosition(e) === r)
                              ? e == d || (e.ownerDocument == w && x(w, e))
                                ? -1
                                : t == d || (t.ownerDocument == w && x(w, t))
                                ? 1
                                : c
                                ? O(c, e) - O(c, t)
                                : 0
                              : 4 & r
                              ? -1
                              : 1)
                          );
                        }
                      : function (e, t) {
                          if (e === t) return (p = !0), 0;
                          var n,
                            r = 0,
                            i = e.parentNode,
                            o = t.parentNode,
                            s = [e],
                            a = [t];
                          if (!i || !o)
                            return e == d
                              ? -1
                              : t == d
                              ? 1
                              : i
                              ? -1
                              : o
                              ? 1
                              : c
                              ? O(c, e) - O(c, t)
                              : 0;
                          if (i === o) return fe(e, t);
                          for (n = e; (n = n.parentNode); ) s.unshift(n);
                          for (n = t; (n = n.parentNode); ) a.unshift(n);
                          for (; s[r] === a[r]; ) r++;
                          return r
                            ? fe(s[r], a[r])
                            : s[r] == w
                            ? -1
                            : a[r] == w
                            ? 1
                            : 0;
                        }),
                    d)
                  : d;
              }),
            (ae.matches = function (e, t) {
              return ae(e, null, null, t);
            }),
            (ae.matchesSelector = function (e, t) {
              if (
                (f(e),
                n.matchesSelector &&
                  g &&
                  !S[t + " "] &&
                  (!v || !v.test(t)) &&
                  (!m || !m.test(t)))
              )
                try {
                  var r = y.call(e, t);
                  if (
                    r ||
                    n.disconnectedMatch ||
                    (e.document && 11 !== e.document.nodeType)
                  )
                    return r;
                } catch (e) {
                  S(t, !0);
                }
              return ae(t, d, null, [e]).length > 0;
            }),
            (ae.contains = function (e, t) {
              return (e.ownerDocument || e) != d && f(e), x(e, t);
            }),
            (ae.attr = function (e, t) {
              (e.ownerDocument || e) != d && f(e);
              var i = r.attrHandle[t.toLowerCase()],
                o =
                  i && N.call(r.attrHandle, t.toLowerCase())
                    ? i(e, t, !g)
                    : void 0;
              return void 0 !== o
                ? o
                : n.attributes || !g
                ? e.getAttribute(t)
                : (o = e.getAttributeNode(t)) && o.specified
                ? o.value
                : null;
            }),
            (ae.escape = function (e) {
              return (e + "").replace(re, ie);
            }),
            (ae.error = function (e) {
              throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            (ae.uniqueSort = function (e) {
              var t,
                r = [],
                i = 0,
                o = 0;
              if (
                ((p = !n.detectDuplicates),
                (c = !n.sortStable && e.slice(0)),
                e.sort(D),
                p)
              ) {
                for (; (t = e[o++]); ) t === e[o] && (i = r.push(o));
                for (; i--; ) e.splice(r[i], 1);
              }
              return (c = null), e;
            }),
            (i = ae.getText =
              function (e) {
                var t,
                  n = "",
                  r = 0,
                  o = e.nodeType;
                if (o) {
                  if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e);
                  } else if (3 === o || 4 === o) return e.nodeValue;
                } else for (; (t = e[r++]); ) n += i(t);
                return n;
              }),
            (r = ae.selectors =
              {
                cacheLength: 50,
                createPseudo: ue,
                match: Y,
                attrHandle: {},
                find: {},
                relative: {
                  ">": { dir: "parentNode", first: !0 },
                  " ": { dir: "parentNode" },
                  "+": { dir: "previousSibling", first: !0 },
                  "~": { dir: "previousSibling" },
                },
                preFilter: {
                  ATTR: function (e) {
                    return (
                      (e[1] = e[1].replace(te, ne)),
                      (e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne)),
                      "~=" === e[2] && (e[3] = " " + e[3] + " "),
                      e.slice(0, 4)
                    );
                  },
                  CHILD: function (e) {
                    return (
                      (e[1] = e[1].toLowerCase()),
                      "nth" === e[1].slice(0, 3)
                        ? (e[3] || ae.error(e[0]),
                          (e[4] = +(e[4]
                            ? e[5] + (e[6] || 1)
                            : 2 * ("even" === e[3] || "odd" === e[3]))),
                          (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                        : e[3] && ae.error(e[0]),
                      e
                    );
                  },
                  PSEUDO: function (e) {
                    var t,
                      n = !e[6] && e[2];
                    return Y.CHILD.test(e[0])
                      ? null
                      : (e[3]
                          ? (e[2] = e[4] || e[5] || "")
                          : n &&
                            U.test(n) &&
                            (t = s(n, !0)) &&
                            (t = n.indexOf(")", n.length - t) - n.length) &&
                            ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                        e.slice(0, 3));
                  },
                },
                filter: {
                  TAG: function (e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return "*" === e
                      ? function () {
                          return !0;
                        }
                      : function (e) {
                          return e.nodeName && e.nodeName.toLowerCase() === t;
                        };
                  },
                  CLASS: function (e) {
                    var t = k[e + " "];
                    return (
                      t ||
                      ((t = new RegExp(
                        "(^|[\\x20\\t\\r\\n\\f])" + e + "(" + W + "|$)"
                      )) &&
                        k(e, function (e) {
                          return t.test(
                            ("string" == typeof e.className && e.className) ||
                              (void 0 !== e.getAttribute &&
                                e.getAttribute("class")) ||
                              ""
                          );
                        }))
                    );
                  },
                  ATTR: function (e, t, n) {
                    return function (r) {
                      var i = ae.attr(r, e);
                      return null == i
                        ? "!=" === t
                        : !t ||
                            ((i += ""),
                            "=" === t
                              ? i === n
                              : "!=" === t
                              ? i !== n
                              : "^=" === t
                              ? n && 0 === i.indexOf(n)
                              : "*=" === t
                              ? n && i.indexOf(n) > -1
                              : "$=" === t
                              ? n && i.slice(-n.length) === n
                              : "~=" === t
                              ? (" " + i.replace(B, " ") + " ").indexOf(n) > -1
                              : "|=" === t &&
                                (i === n ||
                                  i.slice(0, n.length + 1) === n + "-"));
                    };
                  },
                  CHILD: function (e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                      s = "last" !== e.slice(-4),
                      a = "of-type" === t;
                    return 1 === r && 0 === i
                      ? function (e) {
                          return !!e.parentNode;
                        }
                      : function (t, n, l) {
                          var u,
                            c,
                            p,
                            f,
                            d,
                            h,
                            g = o !== s ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            v = a && t.nodeName.toLowerCase(),
                            y = !l && !a,
                            x = !1;
                          if (m) {
                            if (o) {
                              for (; g; ) {
                                for (f = t; (f = f[g]); )
                                  if (
                                    a
                                      ? f.nodeName.toLowerCase() === v
                                      : 1 === f.nodeType
                                  )
                                    return !1;
                                h = g = "only" === e && !h && "nextSibling";
                              }
                              return !0;
                            }
                            if (
                              ((h = [s ? m.firstChild : m.lastChild]), s && y)
                            ) {
                              for (
                                x =
                                  (d =
                                    (u =
                                      (c =
                                        (p = (f = m)[b] || (f[b] = {}))[
                                          f.uniqueID
                                        ] || (p[f.uniqueID] = {}))[e] ||
                                      [])[0] === C && u[1]) && u[2],
                                  f = d && m.childNodes[d];
                                (f =
                                  (++d && f && f[g]) || (x = d = 0) || h.pop());

                              )
                                if (1 === f.nodeType && ++x && f === t) {
                                  c[e] = [C, d, x];
                                  break;
                                }
                            } else if (
                              (y &&
                                (x = d =
                                  (u =
                                    (c =
                                      (p = (f = t)[b] || (f[b] = {}))[
                                        f.uniqueID
                                      ] || (p[f.uniqueID] = {}))[e] ||
                                    [])[0] === C && u[1]),
                              !1 === x)
                            )
                              for (
                                ;
                                (f =
                                  (++d && f && f[g]) ||
                                  (x = d = 0) ||
                                  h.pop()) &&
                                ((a
                                  ? f.nodeName.toLowerCase() !== v
                                  : 1 !== f.nodeType) ||
                                  !++x ||
                                  (y &&
                                    ((c =
                                      (p = f[b] || (f[b] = {}))[f.uniqueID] ||
                                      (p[f.uniqueID] = {}))[e] = [C, x]),
                                  f !== t));

                              );
                            return (x -= i) === r || (x % r == 0 && x / r >= 0);
                          }
                        };
                  },
                  PSEUDO: function (e, t) {
                    var n,
                      i =
                        r.pseudos[e] ||
                        r.setFilters[e.toLowerCase()] ||
                        ae.error("unsupported pseudo: " + e);
                    return i[b]
                      ? i(t)
                      : i.length > 1
                      ? ((n = [e, e, "", t]),
                        r.setFilters.hasOwnProperty(e.toLowerCase())
                          ? ue(function (e, n) {
                              for (var r, o = i(e, t), s = o.length; s--; )
                                e[(r = O(e, o[s]))] = !(n[r] = o[s]);
                            })
                          : function (e) {
                              return i(e, 0, n);
                            })
                      : i;
                  },
                },
                pseudos: {
                  not: ue(function (e) {
                    var t = [],
                      n = [],
                      r = a(e.replace(F, "$1"));
                    return r[b]
                      ? ue(function (e, t, n, i) {
                          for (
                            var o, s = r(e, null, i, []), a = e.length;
                            a--;

                          )
                            (o = s[a]) && (e[a] = !(t[a] = o));
                        })
                      : function (e, i, o) {
                          return (
                            (t[0] = e),
                            r(t, null, o, n),
                            (t[0] = null),
                            !n.pop()
                          );
                        };
                  }),
                  has: ue(function (e) {
                    return function (t) {
                      return ae(e, t).length > 0;
                    };
                  }),
                  contains: ue(function (e) {
                    return (
                      (e = e.replace(te, ne)),
                      function (t) {
                        return (t.textContent || i(t)).indexOf(e) > -1;
                      }
                    );
                  }),
                  lang: ue(function (e) {
                    return (
                      X.test(e || "") || ae.error("unsupported lang: " + e),
                      (e = e.replace(te, ne).toLowerCase()),
                      function (t) {
                        var n;
                        do {
                          if (
                            (n = g
                              ? t.lang
                              : t.getAttribute("xml:lang") ||
                                t.getAttribute("lang"))
                          )
                            return (
                              (n = n.toLowerCase()) === e ||
                              0 === n.indexOf(e + "-")
                            );
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                      }
                    );
                  }),
                  target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                  },
                  root: function (e) {
                    return e === h;
                  },
                  focus: function (e) {
                    return (
                      e === d.activeElement &&
                      (!d.hasFocus || d.hasFocus()) &&
                      !!(e.type || e.href || ~e.tabIndex)
                    );
                  },
                  enabled: ge(!1),
                  disabled: ge(!0),
                  checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return (
                      ("input" === t && !!e.checked) ||
                      ("option" === t && !!e.selected)
                    );
                  },
                  selected: function (e) {
                    return (
                      e.parentNode && e.parentNode.selectedIndex,
                      !0 === e.selected
                    );
                  },
                  empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                      if (e.nodeType < 6) return !1;
                    return !0;
                  },
                  parent: function (e) {
                    return !r.pseudos.empty(e);
                  },
                  header: function (e) {
                    return J.test(e.nodeName);
                  },
                  input: function (e) {
                    return Q.test(e.nodeName);
                  },
                  button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return (
                      ("input" === t && "button" === e.type) || "button" === t
                    );
                  },
                  text: function (e) {
                    var t;
                    return (
                      "input" === e.nodeName.toLowerCase() &&
                      "text" === e.type &&
                      (null == (t = e.getAttribute("type")) ||
                        "text" === t.toLowerCase())
                    );
                  },
                  first: me(function () {
                    return [0];
                  }),
                  last: me(function (e, t) {
                    return [t - 1];
                  }),
                  eq: me(function (e, t, n) {
                    return [n < 0 ? n + t : n];
                  }),
                  even: me(function (e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e;
                  }),
                  odd: me(function (e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e;
                  }),
                  lt: me(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; )
                      e.push(r);
                    return e;
                  }),
                  gt: me(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                    return e;
                  }),
                },
              }),
            (r.pseudos.nth = r.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              r.pseudos[t] = de(t);
            for (t in { submit: !0, reset: !0 }) r.pseudos[t] = he(t);
            function ye() {}
            function xe(e) {
              for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
              return r;
            }
            function be(e, t, n) {
              var r = t.dir,
                i = t.next,
                o = i || r,
                s = n && "parentNode" === o,
                a = T++;
              return t.first
                ? function (t, n, i) {
                    for (; (t = t[r]); )
                      if (1 === t.nodeType || s) return e(t, n, i);
                    return !1;
                  }
                : function (t, n, l) {
                    var u,
                      c,
                      p,
                      f = [C, a];
                    if (l) {
                      for (; (t = t[r]); )
                        if ((1 === t.nodeType || s) && e(t, n, l)) return !0;
                    } else
                      for (; (t = t[r]); )
                        if (1 === t.nodeType || s)
                          if (
                            ((c =
                              (p = t[b] || (t[b] = {}))[t.uniqueID] ||
                              (p[t.uniqueID] = {})),
                            i && i === t.nodeName.toLowerCase())
                          )
                            t = t[r] || t;
                          else {
                            if ((u = c[o]) && u[0] === C && u[1] === a)
                              return (f[2] = u[2]);
                            if (((c[o] = f), (f[2] = e(t, n, l)))) return !0;
                          }
                    return !1;
                  };
            }
            function we(e) {
              return e.length > 1
                ? function (t, n, r) {
                    for (var i = e.length; i--; ) if (!e[i](t, n, r)) return !1;
                    return !0;
                  }
                : e[0];
            }
            function Ce(e, t, n, r, i) {
              for (
                var o, s = [], a = 0, l = e.length, u = null != t;
                a < l;
                a++
              )
                (o = e[a]) &&
                  ((n && !n(o, r, i)) || (s.push(o), u && t.push(a)));
              return s;
            }
            function Te(e, t, n, r, i, o) {
              return (
                r && !r[b] && (r = Te(r)),
                i && !i[b] && (i = Te(i, o)),
                ue(function (o, s, a, l) {
                  var u,
                    c,
                    p,
                    f = [],
                    d = [],
                    h = s.length,
                    g =
                      o ||
                      (function (e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++)
                          ae(e, t[r], n);
                        return n;
                      })(t || "*", a.nodeType ? [a] : a, []),
                    m = !e || (!o && t) ? g : Ce(g, f, e, a, l),
                    v = n ? (i || (o ? e : h || r) ? [] : s) : m;
                  if ((n && n(m, v, a, l), r))
                    for (u = Ce(v, d), r(u, [], a, l), c = u.length; c--; )
                      (p = u[c]) && (v[d[c]] = !(m[d[c]] = p));
                  if (o) {
                    if (i || e) {
                      if (i) {
                        for (u = [], c = v.length; c--; )
                          (p = v[c]) && u.push((m[c] = p));
                        i(null, (v = []), u, l);
                      }
                      for (c = v.length; c--; )
                        (p = v[c]) &&
                          (u = i ? O(o, p) : f[c]) > -1 &&
                          (o[u] = !(s[u] = p));
                    }
                  } else (v = Ce(v === s ? v.splice(h, v.length) : v)), i ? i(null, s, v, l) : q.apply(s, v);
                })
              );
            }
            function ke(e) {
              for (
                var t,
                  n,
                  i,
                  o = e.length,
                  s = r.relative[e[0].type],
                  a = s || r.relative[" "],
                  l = s ? 1 : 0,
                  c = be(
                    function (e) {
                      return e === t;
                    },
                    a,
                    !0
                  ),
                  p = be(
                    function (e) {
                      return O(t, e) > -1;
                    },
                    a,
                    !0
                  ),
                  f = [
                    function (e, n, r) {
                      var i =
                        (!s && (r || n !== u)) ||
                        ((t = n).nodeType ? c(e, n, r) : p(e, n, r));
                      return (t = null), i;
                    },
                  ];
                l < o;
                l++
              )
                if ((n = r.relative[e[l].type])) f = [be(we(f), n)];
                else {
                  if ((n = r.filter[e[l].type].apply(null, e[l].matches))[b]) {
                    for (i = ++l; i < o && !r.relative[e[i].type]; i++);
                    return Te(
                      l > 1 && we(f),
                      l > 1 &&
                        xe(
                          e
                            .slice(0, l - 1)
                            .concat({ value: " " === e[l - 2].type ? "*" : "" })
                        ).replace(F, "$1"),
                      n,
                      l < i && ke(e.slice(l, i)),
                      i < o && ke((e = e.slice(i))),
                      i < o && xe(e)
                    );
                  }
                  f.push(n);
                }
              return we(f);
            }
            return (
              (ye.prototype = r.filters = r.pseudos),
              (r.setFilters = new ye()),
              (s = ae.tokenize =
                function (e, t) {
                  var n,
                    i,
                    o,
                    s,
                    a,
                    l,
                    u,
                    c = E[e + " "];
                  if (c) return t ? 0 : c.slice(0);
                  for (a = e, l = [], u = r.preFilter; a; ) {
                    for (s in ((n && !(i = _.exec(a))) ||
                      (i && (a = a.slice(i[0].length) || a), l.push((o = []))),
                    (n = !1),
                    (i = V.exec(a)) &&
                      ((n = i.shift()),
                      o.push({ value: n, type: i[0].replace(F, " ") }),
                      (a = a.slice(n.length))),
                    r.filter))
                      !(i = Y[s].exec(a)) ||
                        (u[s] && !(i = u[s](i))) ||
                        ((n = i.shift()),
                        o.push({ value: n, type: s, matches: i }),
                        (a = a.slice(n.length)));
                    if (!n) break;
                  }
                  return t ? a.length : a ? ae.error(e) : E(e, l).slice(0);
                }),
              (a = ae.compile =
                function (e, t) {
                  var n,
                    i = [],
                    o = [],
                    a = A[e + " "];
                  if (!a) {
                    for (t || (t = s(e)), n = t.length; n--; )
                      (a = ke(t[n]))[b] ? i.push(a) : o.push(a);
                    (a = A(
                      e,
                      (function (e, t) {
                        var n = t.length > 0,
                          i = e.length > 0,
                          o = function (o, s, a, l, c) {
                            var p,
                              h,
                              m,
                              v = 0,
                              y = "0",
                              x = o && [],
                              b = [],
                              w = u,
                              T = o || (i && r.find.TAG("*", c)),
                              k = (C += null == w ? 1 : Math.random() || 0.1),
                              E = T.length;
                            for (
                              c && (u = s == d || s || c);
                              y !== E && null != (p = T[y]);
                              y++
                            ) {
                              if (i && p) {
                                for (
                                  h = 0,
                                    s ||
                                      p.ownerDocument == d ||
                                      (f(p), (a = !g));
                                  (m = e[h++]);

                                )
                                  if (m(p, s || d, a)) {
                                    l.push(p);
                                    break;
                                  }
                                c && (C = k);
                              }
                              n && ((p = !m && p) && v--, o && x.push(p));
                            }
                            if (((v += y), n && y !== v)) {
                              for (h = 0; (m = t[h++]); ) m(x, b, s, a);
                              if (o) {
                                if (v > 0)
                                  for (; y--; )
                                    x[y] || b[y] || (b[y] = L.call(l));
                                b = Ce(b);
                              }
                              q.apply(l, b),
                                c &&
                                  !o &&
                                  b.length > 0 &&
                                  v + t.length > 1 &&
                                  ae.uniqueSort(l);
                            }
                            return c && ((C = k), (u = w)), x;
                          };
                        return n ? ue(o) : o;
                      })(o, i)
                    )),
                      (a.selector = e);
                  }
                  return a;
                }),
              (l = ae.select =
                function (e, t, n, i) {
                  var o,
                    l,
                    u,
                    c,
                    p,
                    f = "function" == typeof e && e,
                    d = !i && s((e = f.selector || e));
                  if (((n = n || []), 1 === d.length)) {
                    if (
                      (l = d[0] = d[0].slice(0)).length > 2 &&
                      "ID" === (u = l[0]).type &&
                      9 === t.nodeType &&
                      g &&
                      r.relative[l[1].type]
                    ) {
                      if (
                        !(t = (r.find.ID(u.matches[0].replace(te, ne), t) ||
                          [])[0])
                      )
                        return n;
                      f && (t = t.parentNode),
                        (e = e.slice(l.shift().value.length));
                    }
                    for (
                      o = Y.needsContext.test(e) ? 0 : l.length;
                      o-- && ((u = l[o]), !r.relative[(c = u.type)]);

                    )
                      if (
                        (p = r.find[c]) &&
                        (i = p(
                          u.matches[0].replace(te, ne),
                          (ee.test(l[0].type) && ve(t.parentNode)) || t
                        ))
                      ) {
                        if ((l.splice(o, 1), !(e = i.length && xe(l))))
                          return q.apply(n, i), n;
                        break;
                      }
                  }
                  return (
                    (f || a(e, d))(
                      i,
                      t,
                      !g,
                      n,
                      !t || (ee.test(e) && ve(t.parentNode)) || t
                    ),
                    n
                  );
                }),
              (n.sortStable = b.split("").sort(D).join("") === b),
              (n.detectDuplicates = !!p),
              f(),
              (n.sortDetached = ce(function (e) {
                return (
                  1 & e.compareDocumentPosition(d.createElement("fieldset"))
                );
              })),
              ce(function (e) {
                return (
                  (e.innerHTML = "<a href='#'></a>"),
                  "#" === e.firstChild.getAttribute("href")
                );
              }) ||
                pe("type|href|height|width", function (e, t, n) {
                  if (!n)
                    return e.getAttribute(
                      t,
                      "type" === t.toLowerCase() ? 1 : 2
                    );
                }),
              (n.attributes &&
                ce(function (e) {
                  return (
                    (e.innerHTML = "<input/>"),
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
                  );
                })) ||
                pe("value", function (e, t, n) {
                  if (!n && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue;
                }),
              ce(function (e) {
                return null == e.getAttribute("disabled");
              }) ||
                pe(M, function (e, t, n) {
                  var r;
                  if (!n)
                    return !0 === e[t]
                      ? t.toLowerCase()
                      : (r = e.getAttributeNode(t)) && r.specified
                      ? r.value
                      : null;
                }),
              ae
            );
          })(r);
          (k.find = A),
            (k.expr = A.selectors),
            (k.expr[":"] = k.expr.pseudos),
            (k.uniqueSort = k.unique = A.uniqueSort),
            (k.text = A.getText),
            (k.isXMLDoc = A.isXML),
            (k.contains = A.contains),
            (k.escapeSelector = A.escape);
          var S = function (e, t, n) {
              for (
                var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;

              )
                if (1 === e.nodeType) {
                  if (i && k(e).is(n)) break;
                  r.push(e);
                }
              return r;
            },
            D = function (e, t) {
              for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
              return n;
            },
            N = k.expr.match.needsContext;
          function j(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          }
          var L =
            /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function I(e, t, n) {
            return v(t)
              ? k.grep(e, function (e, r) {
                  return !!t.call(e, r, e) !== n;
                })
              : t.nodeType
              ? k.grep(e, function (e) {
                  return (e === t) !== n;
                })
              : "string" != typeof t
              ? k.grep(e, function (e) {
                  return c.call(t, e) > -1 !== n;
                })
              : k.filter(t, e, n);
          }
          (k.filter = function (e, t, n) {
            var r = t[0];
            return (
              n && (e = ":not(" + e + ")"),
              1 === t.length && 1 === r.nodeType
                ? k.find.matchesSelector(r, e)
                  ? [r]
                  : []
                : k.find.matches(
                    e,
                    k.grep(t, function (e) {
                      return 1 === e.nodeType;
                    })
                  )
            );
          }),
            k.fn.extend({
              find: function (e) {
                var t,
                  n,
                  r = this.length,
                  i = this;
                if ("string" != typeof e)
                  return this.pushStack(
                    k(e).filter(function () {
                      for (t = 0; t < r; t++)
                        if (k.contains(i[t], this)) return !0;
                    })
                  );
                for (n = this.pushStack([]), t = 0; t < r; t++)
                  k.find(e, i[t], n);
                return r > 1 ? k.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(I(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(I(this, e || [], !0));
              },
              is: function (e) {
                return !!I(
                  this,
                  "string" == typeof e && N.test(e) ? k(e) : e || [],
                  !1
                ).length;
              },
            });
          var q,
            H = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((k.fn.init = function (e, t, n) {
            var r, i;
            if (!e) return this;
            if (((n = n || q), "string" == typeof e)) {
              if (
                !(r =
                  "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
                    ? [null, e, null]
                    : H.exec(e)) ||
                (!r[1] && t)
              )
                return !t || t.jquery
                  ? (t || n).find(e)
                  : this.constructor(t).find(e);
              if (r[1]) {
                if (
                  ((t = t instanceof k ? t[0] : t),
                  k.merge(
                    this,
                    k.parseHTML(
                      r[1],
                      t && t.nodeType ? t.ownerDocument || t : x,
                      !0
                    )
                  ),
                  L.test(r[1]) && k.isPlainObject(t))
                )
                  for (r in t) v(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this;
              }
              return (
                (i = x.getElementById(r[2])) &&
                  ((this[0] = i), (this.length = 1)),
                this
              );
            }
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : v(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e(k)
              : k.makeArray(e, this);
          }).prototype = k.fn),
            (q = k(x));
          var O = /^(?:parents|prev(?:Until|All))/,
            M = { children: !0, contents: !0, next: !0, prev: !0 };
          function W(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          k.fn.extend({
            has: function (e) {
              var t = k(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++)
                  if (k.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                r = 0,
                i = this.length,
                o = [],
                s = "string" != typeof e && k(e);
              if (!N.test(e))
                for (; r < i; r++)
                  for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (s
                        ? s.index(n) > -1
                        : 1 === n.nodeType && k.find.matchesSelector(n, e))
                    ) {
                      o.push(n);
                      break;
                    }
              return this.pushStack(o.length > 1 ? k.uniqueSort(o) : o);
            },
            index: function (e) {
              return e
                ? "string" == typeof e
                  ? c.call(k(e), this[0])
                  : c.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (e, t) {
              return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))));
            },
            addBack: function (e) {
              return this.add(
                null == e ? this.prevObject : this.prevObject.filter(e)
              );
            },
          }),
            k.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return S(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                  return S(e, "parentNode", n);
                },
                next: function (e) {
                  return W(e, "nextSibling");
                },
                prev: function (e) {
                  return W(e, "previousSibling");
                },
                nextAll: function (e) {
                  return S(e, "nextSibling");
                },
                prevAll: function (e) {
                  return S(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                  return S(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                  return S(e, "previousSibling", n);
                },
                siblings: function (e) {
                  return D((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return D(e.firstChild);
                },
                contents: function (e) {
                  return null != e.contentDocument && s(e.contentDocument)
                    ? e.contentDocument
                    : (j(e, "template") && (e = e.content || e),
                      k.merge([], e.childNodes));
                },
              },
              function (e, t) {
                k.fn[e] = function (n, r) {
                  var i = k.map(this, t, n);
                  return (
                    "Until" !== e.slice(-5) && (r = n),
                    r && "string" == typeof r && (i = k.filter(r, i)),
                    this.length > 1 &&
                      (M[e] || k.uniqueSort(i), O.test(e) && i.reverse()),
                    this.pushStack(i)
                  );
                };
              }
            );
          var R = /[^\x20\t\r\n\f]+/g;
          function P(e) {
            return e;
          }
          function $(e) {
            throw e;
          }
          function B(e, t, n, r) {
            var i;
            try {
              e && v((i = e.promise))
                ? i.call(e).done(t).fail(n)
                : e && v((i = e.then))
                ? i.call(e, t, n)
                : t.apply(void 0, [e].slice(r));
            } catch (e) {
              n.apply(void 0, [e]);
            }
          }
          (k.Callbacks = function (e) {
            e =
              "string" == typeof e
                ? (function (e) {
                    var t = {};
                    return (
                      k.each(e.match(R) || [], function (e, n) {
                        t[n] = !0;
                      }),
                      t
                    );
                  })(e)
                : k.extend({}, e);
            var t,
              n,
              r,
              i,
              o = [],
              s = [],
              a = -1,
              l = function () {
                for (i = i || e.once, r = t = !0; s.length; a = -1)
                  for (n = s.shift(); ++a < o.length; )
                    !1 === o[a].apply(n[0], n[1]) &&
                      e.stopOnFalse &&
                      ((a = o.length), (n = !1));
                e.memory || (n = !1), (t = !1), i && (o = n ? [] : "");
              },
              u = {
                add: function () {
                  return (
                    o &&
                      (n && !t && ((a = o.length - 1), s.push(n)),
                      (function t(n) {
                        k.each(n, function (n, r) {
                          v(r)
                            ? (e.unique && u.has(r)) || o.push(r)
                            : r && r.length && "string" !== C(r) && t(r);
                        });
                      })(arguments),
                      n && !t && l()),
                    this
                  );
                },
                remove: function () {
                  return (
                    k.each(arguments, function (e, t) {
                      for (var n; (n = k.inArray(t, o, n)) > -1; )
                        o.splice(n, 1), n <= a && a--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? k.inArray(e, o) > -1 : o.length > 0;
                },
                empty: function () {
                  return o && (o = []), this;
                },
                disable: function () {
                  return (i = s = []), (o = n = ""), this;
                },
                disabled: function () {
                  return !o;
                },
                lock: function () {
                  return (i = s = []), n || t || (o = n = ""), this;
                },
                locked: function () {
                  return !!i;
                },
                fireWith: function (e, n) {
                  return (
                    i ||
                      ((n = [e, (n = n || []).slice ? n.slice() : n]),
                      s.push(n),
                      t || l()),
                    this
                  );
                },
                fire: function () {
                  return u.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!r;
                },
              };
            return u;
          }),
            k.extend({
              Deferred: function (e) {
                var t = [
                    [
                      "notify",
                      "progress",
                      k.Callbacks("memory"),
                      k.Callbacks("memory"),
                      2,
                    ],
                    [
                      "resolve",
                      "done",
                      k.Callbacks("once memory"),
                      k.Callbacks("once memory"),
                      0,
                      "resolved",
                    ],
                    [
                      "reject",
                      "fail",
                      k.Callbacks("once memory"),
                      k.Callbacks("once memory"),
                      1,
                      "rejected",
                    ],
                  ],
                  n = "pending",
                  i = {
                    state: function () {
                      return n;
                    },
                    always: function () {
                      return o.done(arguments).fail(arguments), this;
                    },
                    catch: function (e) {
                      return i.then(null, e);
                    },
                    pipe: function () {
                      var e = arguments;
                      return k
                        .Deferred(function (n) {
                          k.each(t, function (t, r) {
                            var i = v(e[r[4]]) && e[r[4]];
                            o[r[1]](function () {
                              var e = i && i.apply(this, arguments);
                              e && v(e.promise)
                                ? e
                                    .promise()
                                    .progress(n.notify)
                                    .done(n.resolve)
                                    .fail(n.reject)
                                : n[r[0] + "With"](this, i ? [e] : arguments);
                            });
                          }),
                            (e = null);
                        })
                        .promise();
                    },
                    then: function (e, n, i) {
                      var o = 0;
                      function s(e, t, n, i) {
                        return function () {
                          var a = this,
                            l = arguments,
                            u = function () {
                              var r, u;
                              if (!(e < o)) {
                                if ((r = n.apply(a, l)) === t.promise())
                                  throw new TypeError(
                                    "Thenable self-resolution"
                                  );
                                (u =
                                  r &&
                                  ("object" == typeof r ||
                                    "function" == typeof r) &&
                                  r.then),
                                  v(u)
                                    ? i
                                      ? u.call(r, s(o, t, P, i), s(o, t, $, i))
                                      : (o++,
                                        u.call(
                                          r,
                                          s(o, t, P, i),
                                          s(o, t, $, i),
                                          s(o, t, P, t.notifyWith)
                                        ))
                                    : (n !== P && ((a = void 0), (l = [r])),
                                      (i || t.resolveWith)(a, l));
                              }
                            },
                            c = i
                              ? u
                              : function () {
                                  try {
                                    u();
                                  } catch (r) {
                                    k.Deferred.exceptionHook &&
                                      k.Deferred.exceptionHook(r, c.stackTrace),
                                      e + 1 >= o &&
                                        (n !== $ && ((a = void 0), (l = [r])),
                                        t.rejectWith(a, l));
                                  }
                                };
                          e
                            ? c()
                            : (k.Deferred.getStackHook &&
                                (c.stackTrace = k.Deferred.getStackHook()),
                              r.setTimeout(c));
                        };
                      }
                      return k
                        .Deferred(function (r) {
                          t[0][3].add(s(0, r, v(i) ? i : P, r.notifyWith)),
                            t[1][3].add(s(0, r, v(e) ? e : P)),
                            t[2][3].add(s(0, r, v(n) ? n : $));
                        })
                        .promise();
                    },
                    promise: function (e) {
                      return null != e ? k.extend(e, i) : i;
                    },
                  },
                  o = {};
                return (
                  k.each(t, function (e, r) {
                    var s = r[2],
                      a = r[5];
                    (i[r[1]] = s.add),
                      a &&
                        s.add(
                          function () {
                            n = a;
                          },
                          t[3 - e][2].disable,
                          t[3 - e][3].disable,
                          t[0][2].lock,
                          t[0][3].lock
                        ),
                      s.add(r[3].fire),
                      (o[r[0]] = function () {
                        return (
                          o[r[0] + "With"](
                            this === o ? void 0 : this,
                            arguments
                          ),
                          this
                        );
                      }),
                      (o[r[0] + "With"] = s.fireWith);
                  }),
                  i.promise(o),
                  e && e.call(o, o),
                  o
                );
              },
              when: function (e) {
                var t = arguments.length,
                  n = t,
                  r = Array(n),
                  i = a.call(arguments),
                  o = k.Deferred(),
                  s = function (e) {
                    return function (n) {
                      (r[e] = this),
                        (i[e] = arguments.length > 1 ? a.call(arguments) : n),
                        --t || o.resolveWith(r, i);
                    };
                  };
                if (
                  t <= 1 &&
                  (B(e, o.done(s(n)).resolve, o.reject, !t),
                  "pending" === o.state() || v(i[n] && i[n].then))
                )
                  return o.then();
                for (; n--; ) B(i[n], s(n), o.reject);
                return o.promise();
              },
            });
          var F = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (k.Deferred.exceptionHook = function (e, t) {
            r.console &&
              r.console.warn &&
              e &&
              F.test(e.name) &&
              r.console.warn(
                "jQuery.Deferred exception: " + e.message,
                e.stack,
                t
              );
          }),
            (k.readyException = function (e) {
              r.setTimeout(function () {
                throw e;
              });
            });
          var _ = k.Deferred();
          function V() {
            x.removeEventListener("DOMContentLoaded", V),
              r.removeEventListener("load", V),
              k.ready();
          }
          (k.fn.ready = function (e) {
            return (
              _.then(e).catch(function (e) {
                k.readyException(e);
              }),
              this
            );
          }),
            k.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (!0 === e ? --k.readyWait : k.isReady) ||
                  ((k.isReady = !0),
                  (!0 !== e && --k.readyWait > 0) || _.resolveWith(x, [k]));
              },
            }),
            (k.ready.then = _.then),
            "complete" === x.readyState ||
            ("loading" !== x.readyState && !x.documentElement.doScroll)
              ? r.setTimeout(k.ready)
              : (x.addEventListener("DOMContentLoaded", V),
                r.addEventListener("load", V));
          var z = function (e, t, n, r, i, o, s) {
              var a = 0,
                l = e.length,
                u = null == n;
              if ("object" === C(n))
                for (a in ((i = !0), n)) z(e, t, a, n[a], !0, o, s);
              else if (
                void 0 !== r &&
                ((i = !0),
                v(r) || (s = !0),
                u &&
                  (s
                    ? (t.call(e, r), (t = null))
                    : ((u = t),
                      (t = function (e, t, n) {
                        return u.call(k(e), n);
                      }))),
                t)
              )
                for (; a < l; a++)
                  t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
              return i ? e : u ? t.call(e) : l ? t(e[0], n) : o;
            },
            U = /^-ms-/,
            X = /-([a-z])/g;
          function Y(e, t) {
            return t.toUpperCase();
          }
          function G(e) {
            return e.replace(U, "ms-").replace(X, Y);
          }
          var Q = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
          };
          function J() {
            this.expando = k.expando + J.uid++;
          }
          (J.uid = 1),
            (J.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return (
                  t ||
                    ((t = {}),
                    Q(e) &&
                      (e.nodeType
                        ? (e[this.expando] = t)
                        : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0,
                          }))),
                  t
                );
              },
              set: function (e, t, n) {
                var r,
                  i = this.cache(e);
                if ("string" == typeof t) i[G(t)] = n;
                else for (r in t) i[G(r)] = t[r];
                return i;
              },
              get: function (e, t) {
                return void 0 === t
                  ? this.cache(e)
                  : e[this.expando] && e[this.expando][G(t)];
              },
              access: function (e, t, n) {
                return void 0 === t ||
                  (t && "string" == typeof t && void 0 === n)
                  ? this.get(e, t)
                  : (this.set(e, t, n), void 0 !== n ? n : t);
              },
              remove: function (e, t) {
                var n,
                  r = e[this.expando];
                if (void 0 !== r) {
                  if (void 0 !== t) {
                    n = (t = Array.isArray(t)
                      ? t.map(G)
                      : (t = G(t)) in r
                      ? [t]
                      : t.match(R) || []).length;
                    for (; n--; ) delete r[t[n]];
                  }
                  (void 0 === t || k.isEmptyObject(r)) &&
                    (e.nodeType
                      ? (e[this.expando] = void 0)
                      : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !k.isEmptyObject(t);
              },
            });
          var K = new J(),
            Z = new J(),
            ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            te = /[A-Z]/g;
          function ne(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
              if (
                ((r = "data-" + t.replace(te, "-$&").toLowerCase()),
                "string" == typeof (n = e.getAttribute(r)))
              ) {
                try {
                  n = (function (e) {
                    return (
                      "true" === e ||
                      ("false" !== e &&
                        ("null" === e
                          ? null
                          : e === +e + ""
                          ? +e
                          : ee.test(e)
                          ? JSON.parse(e)
                          : e))
                    );
                  })(n);
                } catch (e) {}
                Z.set(e, t, n);
              } else n = void 0;
            return n;
          }
          k.extend({
            hasData: function (e) {
              return Z.hasData(e) || K.hasData(e);
            },
            data: function (e, t, n) {
              return Z.access(e, t, n);
            },
            removeData: function (e, t) {
              Z.remove(e, t);
            },
            _data: function (e, t, n) {
              return K.access(e, t, n);
            },
            _removeData: function (e, t) {
              K.remove(e, t);
            },
          }),
            k.fn.extend({
              data: function (e, t) {
                var n,
                  r,
                  i,
                  o = this[0],
                  s = o && o.attributes;
                if (void 0 === e) {
                  if (
                    this.length &&
                    ((i = Z.get(o)),
                    1 === o.nodeType && !K.get(o, "hasDataAttrs"))
                  ) {
                    for (n = s.length; n--; )
                      s[n] &&
                        0 === (r = s[n].name).indexOf("data-") &&
                        ((r = G(r.slice(5))), ne(o, r, i[r]));
                    K.set(o, "hasDataAttrs", !0);
                  }
                  return i;
                }
                return "object" == typeof e
                  ? this.each(function () {
                      Z.set(this, e);
                    })
                  : z(
                      this,
                      function (t) {
                        var n;
                        if (o && void 0 === t)
                          return void 0 !== (n = Z.get(o, e)) ||
                            void 0 !== (n = ne(o, e))
                            ? n
                            : void 0;
                        this.each(function () {
                          Z.set(this, e, t);
                        });
                      },
                      null,
                      t,
                      arguments.length > 1,
                      null,
                      !0
                    );
              },
              removeData: function (e) {
                return this.each(function () {
                  Z.remove(this, e);
                });
              },
            }),
            k.extend({
              queue: function (e, t, n) {
                var r;
                if (e)
                  return (
                    (t = (t || "fx") + "queue"),
                    (r = K.get(e, t)),
                    n &&
                      (!r || Array.isArray(n)
                        ? (r = K.access(e, t, k.makeArray(n)))
                        : r.push(n)),
                    r || []
                  );
              },
              dequeue: function (e, t) {
                t = t || "fx";
                var n = k.queue(e, t),
                  r = n.length,
                  i = n.shift(),
                  o = k._queueHooks(e, t);
                "inprogress" === i && ((i = n.shift()), r--),
                  i &&
                    ("fx" === t && n.unshift("inprogress"),
                    delete o.stop,
                    i.call(
                      e,
                      function () {
                        k.dequeue(e, t);
                      },
                      o
                    )),
                  !r && o && o.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                  K.get(e, n) ||
                  K.access(e, n, {
                    empty: k.Callbacks("once memory").add(function () {
                      K.remove(e, [t + "queue", n]);
                    }),
                  })
                );
              },
            }),
            k.fn.extend({
              queue: function (e, t) {
                var n = 2;
                return (
                  "string" != typeof e && ((t = e), (e = "fx"), n--),
                  arguments.length < n
                    ? k.queue(this[0], e)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                        var n = k.queue(this, e, t);
                        k._queueHooks(this, e),
                          "fx" === e &&
                            "inprogress" !== n[0] &&
                            k.dequeue(this, e);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  k.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || "fx", []);
              },
              promise: function (e, t) {
                var n,
                  r = 1,
                  i = k.Deferred(),
                  o = this,
                  s = this.length,
                  a = function () {
                    --r || i.resolveWith(o, [o]);
                  };
                for (
                  "string" != typeof e && ((t = e), (e = void 0)),
                    e = e || "fx";
                  s--;

                )
                  (n = K.get(o[s], e + "queueHooks")) &&
                    n.empty &&
                    (r++, n.empty.add(a));
                return a(), i.promise(t);
              },
            });
          var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
            oe = ["Top", "Right", "Bottom", "Left"],
            se = x.documentElement,
            ae = function (e) {
              return k.contains(e.ownerDocument, e);
            },
            le = { composed: !0 };
          se.getRootNode &&
            (ae = function (e) {
              return (
                k.contains(e.ownerDocument, e) ||
                e.getRootNode(le) === e.ownerDocument
              );
            });
          var ue = function (e, t) {
            return (
              "none" === (e = t || e).style.display ||
              ("" === e.style.display &&
                ae(e) &&
                "none" === k.css(e, "display"))
            );
          };
          function ce(e, t, n, r) {
            var i,
              o,
              s = 20,
              a = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return k.css(e, t, "");
                  },
              l = a(),
              u = (n && n[3]) || (k.cssNumber[t] ? "" : "px"),
              c =
                e.nodeType &&
                (k.cssNumber[t] || ("px" !== u && +l)) &&
                ie.exec(k.css(e, t));
            if (c && c[3] !== u) {
              for (l /= 2, u = u || c[3], c = +l || 1; s--; )
                k.style(e, t, c + u),
                  (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
                  (c /= o);
              (c *= 2), k.style(e, t, c + u), (n = n || []);
            }
            return (
              n &&
                ((c = +c || +l || 0),
                (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = u), (r.start = c), (r.end = i))),
              i
            );
          }
          var pe = {};
          function fe(e) {
            var t,
              n = e.ownerDocument,
              r = e.nodeName,
              i = pe[r];
            return (
              i ||
              ((t = n.body.appendChild(n.createElement(r))),
              (i = k.css(t, "display")),
              t.parentNode.removeChild(t),
              "none" === i && (i = "block"),
              (pe[r] = i),
              i)
            );
          }
          function de(e, t) {
            for (var n, r, i = [], o = 0, s = e.length; o < s; o++)
              (r = e[o]).style &&
                ((n = r.style.display),
                t
                  ? ("none" === n &&
                      ((i[o] = K.get(r, "display") || null),
                      i[o] || (r.style.display = "")),
                    "" === r.style.display && ue(r) && (i[o] = fe(r)))
                  : "none" !== n && ((i[o] = "none"), K.set(r, "display", n)));
            for (o = 0; o < s; o++) null != i[o] && (e[o].style.display = i[o]);
            return e;
          }
          k.fn.extend({
            show: function () {
              return de(this, !0);
            },
            hide: function () {
              return de(this);
            },
            toggle: function (e) {
              return "boolean" == typeof e
                ? e
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    ue(this) ? k(this).show() : k(this).hide();
                  });
            },
          });
          var he,
            ge,
            me = /^(?:checkbox|radio)$/i,
            ve = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            ye = /^$|^module$|\/(?:java|ecma)script/i;
          (he = x.createDocumentFragment().appendChild(x.createElement("div"))),
            (ge = x.createElement("input")).setAttribute("type", "radio"),
            ge.setAttribute("checked", "checked"),
            ge.setAttribute("name", "t"),
            he.appendChild(ge),
            (m.checkClone = he.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (he.innerHTML = "<textarea>x</textarea>"),
            (m.noCloneChecked = !!he.cloneNode(!0).lastChild.defaultValue),
            (he.innerHTML = "<option></option>"),
            (m.option = !!he.lastChild);
          var xe = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
          };
          function be(e, t) {
            var n;
            return (
              (n =
                void 0 !== e.getElementsByTagName
                  ? e.getElementsByTagName(t || "*")
                  : void 0 !== e.querySelectorAll
                  ? e.querySelectorAll(t || "*")
                  : []),
              void 0 === t || (t && j(e, t)) ? k.merge([e], n) : n
            );
          }
          function we(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              K.set(e[n], "globalEval", !t || K.get(t[n], "globalEval"));
          }
          (xe.tbody = xe.tfoot = xe.colgroup = xe.caption = xe.thead),
            (xe.th = xe.td),
            m.option ||
              (xe.optgroup = xe.option =
                [1, "<select multiple='multiple'>", "</select>"]);
          var Ce = /<|&#?\w+;/;
          function Te(e, t, n, r, i) {
            for (
              var o,
                s,
                a,
                l,
                u,
                c,
                p = t.createDocumentFragment(),
                f = [],
                d = 0,
                h = e.length;
              d < h;
              d++
            )
              if ((o = e[d]) || 0 === o)
                if ("object" === C(o)) k.merge(f, o.nodeType ? [o] : o);
                else if (Ce.test(o)) {
                  for (
                    s = s || p.appendChild(t.createElement("div")),
                      a = (ve.exec(o) || ["", ""])[1].toLowerCase(),
                      l = xe[a] || xe._default,
                      s.innerHTML = l[1] + k.htmlPrefilter(o) + l[2],
                      c = l[0];
                    c--;

                  )
                    s = s.lastChild;
                  k.merge(f, s.childNodes),
                    ((s = p.firstChild).textContent = "");
                } else f.push(t.createTextNode(o));
            for (p.textContent = "", d = 0; (o = f[d++]); )
              if (r && k.inArray(o, r) > -1) i && i.push(o);
              else if (
                ((u = ae(o)),
                (s = be(p.appendChild(o), "script")),
                u && we(s),
                n)
              )
                for (c = 0; (o = s[c++]); ) ye.test(o.type || "") && n.push(o);
            return p;
          }
          var ke = /^key/,
            Ee = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Ae = /^([^.]*)(?:\.(.+)|)/;
          function Se() {
            return !0;
          }
          function De() {
            return !1;
          }
          function Ne(e, t) {
            return (
              (e ===
                (function () {
                  try {
                    return x.activeElement;
                  } catch (e) {}
                })()) ==
              ("focus" === t)
            );
          }
          function je(e, t, n, r, i, o) {
            var s, a;
            if ("object" == typeof t) {
              for (a in ("string" != typeof n && ((r = r || n), (n = void 0)),
              t))
                je(e, a, n, r, t[a], o);
              return e;
            }
            if (
              (null == r && null == i
                ? ((i = n), (r = n = void 0))
                : null == i &&
                  ("string" == typeof n
                    ? ((i = r), (r = void 0))
                    : ((i = r), (r = n), (n = void 0))),
              !1 === i)
            )
              i = De;
            else if (!i) return e;
            return (
              1 === o &&
                ((s = i),
                (i = function (e) {
                  return k().off(e), s.apply(this, arguments);
                }),
                (i.guid = s.guid || (s.guid = k.guid++))),
              e.each(function () {
                k.event.add(this, t, i, r, n);
              })
            );
          }
          function Le(e, t, n) {
            n
              ? (K.set(e, t, !1),
                k.event.add(e, t, {
                  namespace: !1,
                  handler: function (e) {
                    var r,
                      i,
                      o = K.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                      if (o.length)
                        (k.event.special[t] || {}).delegateType &&
                          e.stopPropagation();
                      else if (
                        ((o = a.call(arguments)),
                        K.set(this, t, o),
                        (r = n(this, t)),
                        this[t](),
                        o !== (i = K.get(this, t)) || r
                          ? K.set(this, t, !1)
                          : (i = {}),
                        o !== i)
                      )
                        return (
                          e.stopImmediatePropagation(),
                          e.preventDefault(),
                          i.value
                        );
                    } else
                      o.length &&
                        (K.set(this, t, {
                          value: k.event.trigger(
                            k.extend(o[0], k.Event.prototype),
                            o.slice(1),
                            this
                          ),
                        }),
                        e.stopImmediatePropagation());
                  },
                }))
              : void 0 === K.get(e, t) && k.event.add(e, t, Se);
          }
          (k.event = {
            global: {},
            add: function (e, t, n, r, i) {
              var o,
                s,
                a,
                l,
                u,
                c,
                p,
                f,
                d,
                h,
                g,
                m = K.get(e);
              if (Q(e))
                for (
                  n.handler && ((n = (o = n).handler), (i = o.selector)),
                    i && k.find.matchesSelector(se, i),
                    n.guid || (n.guid = k.guid++),
                    (l = m.events) || (l = m.events = Object.create(null)),
                    (s = m.handle) ||
                      (s = m.handle =
                        function (t) {
                          return void 0 !== k && k.event.triggered !== t.type
                            ? k.event.dispatch.apply(e, arguments)
                            : void 0;
                        }),
                    u = (t = (t || "").match(R) || [""]).length;
                  u--;

                )
                  (d = g = (a = Ae.exec(t[u]) || [])[1]),
                    (h = (a[2] || "").split(".").sort()),
                    d &&
                      ((p = k.event.special[d] || {}),
                      (d = (i ? p.delegateType : p.bindType) || d),
                      (p = k.event.special[d] || {}),
                      (c = k.extend(
                        {
                          type: d,
                          origType: g,
                          data: r,
                          handler: n,
                          guid: n.guid,
                          selector: i,
                          needsContext: i && k.expr.match.needsContext.test(i),
                          namespace: h.join("."),
                        },
                        o
                      )),
                      (f = l[d]) ||
                        (((f = l[d] = []).delegateCount = 0),
                        (p.setup && !1 !== p.setup.call(e, r, h, s)) ||
                          (e.addEventListener && e.addEventListener(d, s))),
                      p.add &&
                        (p.add.call(e, c),
                        c.handler.guid || (c.handler.guid = n.guid)),
                      i ? f.splice(f.delegateCount++, 0, c) : f.push(c),
                      (k.event.global[d] = !0));
            },
            remove: function (e, t, n, r, i) {
              var o,
                s,
                a,
                l,
                u,
                c,
                p,
                f,
                d,
                h,
                g,
                m = K.hasData(e) && K.get(e);
              if (m && (l = m.events)) {
                for (u = (t = (t || "").match(R) || [""]).length; u--; )
                  if (
                    ((d = g = (a = Ae.exec(t[u]) || [])[1]),
                    (h = (a[2] || "").split(".").sort()),
                    d)
                  ) {
                    for (
                      p = k.event.special[d] || {},
                        f =
                          l[(d = (r ? p.delegateType : p.bindType) || d)] || [],
                        a =
                          a[2] &&
                          new RegExp(
                            "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"
                          ),
                        s = o = f.length;
                      o--;

                    )
                      (c = f[o]),
                        (!i && g !== c.origType) ||
                          (n && n.guid !== c.guid) ||
                          (a && !a.test(c.namespace)) ||
                          (r &&
                            r !== c.selector &&
                            ("**" !== r || !c.selector)) ||
                          (f.splice(o, 1),
                          c.selector && f.delegateCount--,
                          p.remove && p.remove.call(e, c));
                    s &&
                      !f.length &&
                      ((p.teardown && !1 !== p.teardown.call(e, h, m.handle)) ||
                        k.removeEvent(e, d, m.handle),
                      delete l[d]);
                  } else for (d in l) k.event.remove(e, d + t[u], n, r, !0);
                k.isEmptyObject(l) && K.remove(e, "handle events");
              }
            },
            dispatch: function (e) {
              var t,
                n,
                r,
                i,
                o,
                s,
                a = new Array(arguments.length),
                l = k.event.fix(e),
                u =
                  (K.get(this, "events") || Object.create(null))[l.type] || [],
                c = k.event.special[l.type] || {};
              for (a[0] = l, t = 1; t < arguments.length; t++)
                a[t] = arguments[t];
              if (
                ((l.delegateTarget = this),
                !c.preDispatch || !1 !== c.preDispatch.call(this, l))
              ) {
                for (
                  s = k.event.handlers.call(this, l, u), t = 0;
                  (i = s[t++]) && !l.isPropagationStopped();

                )
                  for (
                    l.currentTarget = i.elem, n = 0;
                    (o = i.handlers[n++]) && !l.isImmediatePropagationStopped();

                  )
                    (l.rnamespace &&
                      !1 !== o.namespace &&
                      !l.rnamespace.test(o.namespace)) ||
                      ((l.handleObj = o),
                      (l.data = o.data),
                      void 0 !==
                        (r = (
                          (k.event.special[o.origType] || {}).handle ||
                          o.handler
                        ).apply(i.elem, a)) &&
                        !1 === (l.result = r) &&
                        (l.preventDefault(), l.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, l), l.result;
              }
            },
            handlers: function (e, t) {
              var n,
                r,
                i,
                o,
                s,
                a = [],
                l = t.delegateCount,
                u = e.target;
              if (l && u.nodeType && !("click" === e.type && e.button >= 1))
                for (; u !== this; u = u.parentNode || this)
                  if (
                    1 === u.nodeType &&
                    ("click" !== e.type || !0 !== u.disabled)
                  ) {
                    for (o = [], s = {}, n = 0; n < l; n++)
                      void 0 === s[(i = (r = t[n]).selector + " ")] &&
                        (s[i] = r.needsContext
                          ? k(i, this).index(u) > -1
                          : k.find(i, this, null, [u]).length),
                        s[i] && o.push(r);
                    o.length && a.push({ elem: u, handlers: o });
                  }
              return (
                (u = this),
                l < t.length && a.push({ elem: u, handlers: t.slice(l) }),
                a
              );
            },
            addProp: function (e, t) {
              Object.defineProperty(k.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: v(t)
                  ? function () {
                      if (this.originalEvent) return t(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[e];
                    },
                set: function (t) {
                  Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t,
                  });
                },
              });
            },
            fix: function (e) {
              return e[k.expando] ? e : new k.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (e) {
                  var t = this || e;
                  return (
                    me.test(t.type) &&
                      t.click &&
                      j(t, "input") &&
                      Le(t, "click", Se),
                    !1
                  );
                },
                trigger: function (e) {
                  var t = this || e;
                  return (
                    me.test(t.type) &&
                      t.click &&
                      j(t, "input") &&
                      Le(t, "click"),
                    !0
                  );
                },
                _default: function (e) {
                  var t = e.target;
                  return (
                    (me.test(t.type) &&
                      t.click &&
                      j(t, "input") &&
                      K.get(t, "click")) ||
                    j(t, "a")
                  );
                },
              },
              beforeunload: {
                postDispatch: function (e) {
                  void 0 !== e.result &&
                    e.originalEvent &&
                    (e.originalEvent.returnValue = e.result);
                },
              },
            },
          }),
            (k.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            (k.Event = function (e, t) {
              if (!(this instanceof k.Event)) return new k.Event(e, t);
              e && e.type
                ? ((this.originalEvent = e),
                  (this.type = e.type),
                  (this.isDefaultPrevented =
                    e.defaultPrevented ||
                    (void 0 === e.defaultPrevented && !1 === e.returnValue)
                      ? Se
                      : De),
                  (this.target =
                    e.target && 3 === e.target.nodeType
                      ? e.target.parentNode
                      : e.target),
                  (this.currentTarget = e.currentTarget),
                  (this.relatedTarget = e.relatedTarget))
                : (this.type = e),
                t && k.extend(this, t),
                (this.timeStamp = (e && e.timeStamp) || Date.now()),
                (this[k.expando] = !0);
            }),
            (k.Event.prototype = {
              constructor: k.Event,
              isDefaultPrevented: De,
              isPropagationStopped: De,
              isImmediatePropagationStopped: De,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = Se),
                  e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = Se),
                  e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = Se),
                  e && !this.isSimulated && e.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            k.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (e) {
                  var t = e.button;
                  return null == e.which && ke.test(e.type)
                    ? null != e.charCode
                      ? e.charCode
                      : e.keyCode
                    : !e.which && void 0 !== t && Ee.test(e.type)
                    ? 1 & t
                      ? 1
                      : 2 & t
                      ? 3
                      : 4 & t
                      ? 2
                      : 0
                    : e.which;
                },
              },
              k.event.addProp
            ),
            k.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
              k.event.special[e] = {
                setup: function () {
                  return Le(this, e, Ne), !1;
                },
                trigger: function () {
                  return Le(this, e), !0;
                },
                delegateType: t,
              };
            }),
            k.each(
              {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
              },
              function (e, t) {
                k.event.special[e] = {
                  delegateType: t,
                  bindType: t,
                  handle: function (e) {
                    var n,
                      r = this,
                      i = e.relatedTarget,
                      o = e.handleObj;
                    return (
                      (i && (i === r || k.contains(r, i))) ||
                        ((e.type = o.origType),
                        (n = o.handler.apply(this, arguments)),
                        (e.type = t)),
                      n
                    );
                  },
                };
              }
            ),
            k.fn.extend({
              on: function (e, t, n, r) {
                return je(this, e, t, n, r);
              },
              one: function (e, t, n, r) {
                return je(this, e, t, n, r, 1);
              },
              off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)
                  return (
                    (r = e.handleObj),
                    k(e.delegateTarget).off(
                      r.namespace ? r.origType + "." + r.namespace : r.origType,
                      r.selector,
                      r.handler
                    ),
                    this
                  );
                if ("object" == typeof e) {
                  for (i in e) this.off(i, t, e[i]);
                  return this;
                }
                return (
                  (!1 !== t && "function" != typeof t) ||
                    ((n = t), (t = void 0)),
                  !1 === n && (n = De),
                  this.each(function () {
                    k.event.remove(this, e, n, t);
                  })
                );
              },
            });
          var Ie = /<script|<style|<link/i,
            qe = /checked\s*(?:[^=]|=\s*.checked.)/i,
            He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          function Oe(e, t) {
            return (
              (j(e, "table") &&
                j(11 !== t.nodeType ? t : t.firstChild, "tr") &&
                k(e).children("tbody")[0]) ||
              e
            );
          }
          function Me(e) {
            return (
              (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e
            );
          }
          function We(e) {
            return (
              "true/" === (e.type || "").slice(0, 5)
                ? (e.type = e.type.slice(5))
                : e.removeAttribute("type"),
              e
            );
          }
          function Re(e, t) {
            var n, r, i, o, s, a;
            if (1 === t.nodeType) {
              if (K.hasData(e) && (a = K.get(e).events))
                for (i in (K.remove(t, "handle events"), a))
                  for (n = 0, r = a[i].length; n < r; n++)
                    k.event.add(t, i, a[i][n]);
              Z.hasData(e) &&
                ((o = Z.access(e)), (s = k.extend({}, o)), Z.set(t, s));
            }
          }
          function Pe(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && me.test(e.type)
              ? (t.checked = e.checked)
              : ("input" !== n && "textarea" !== n) ||
                (t.defaultValue = e.defaultValue);
          }
          function $e(e, t, n, r) {
            t = l(t);
            var i,
              o,
              s,
              a,
              u,
              c,
              p = 0,
              f = e.length,
              d = f - 1,
              h = t[0],
              g = v(h);
            if (
              g ||
              (f > 1 && "string" == typeof h && !m.checkClone && qe.test(h))
            )
              return e.each(function (i) {
                var o = e.eq(i);
                g && (t[0] = h.call(this, i, o.html())), $e(o, t, n, r);
              });
            if (
              f &&
              ((o = (i = Te(t, e[0].ownerDocument, !1, e, r)).firstChild),
              1 === i.childNodes.length && (i = o),
              o || r)
            ) {
              for (a = (s = k.map(be(i, "script"), Me)).length; p < f; p++)
                (u = i),
                  p !== d &&
                    ((u = k.clone(u, !0, !0)),
                    a && k.merge(s, be(u, "script"))),
                  n.call(e[p], u, p);
              if (a)
                for (
                  c = s[s.length - 1].ownerDocument, k.map(s, We), p = 0;
                  p < a;
                  p++
                )
                  (u = s[p]),
                    ye.test(u.type || "") &&
                      !K.access(u, "globalEval") &&
                      k.contains(c, u) &&
                      (u.src && "module" !== (u.type || "").toLowerCase()
                        ? k._evalUrl &&
                          !u.noModule &&
                          k._evalUrl(
                            u.src,
                            { nonce: u.nonce || u.getAttribute("nonce") },
                            c
                          )
                        : w(u.textContent.replace(He, ""), u, c));
            }
            return e;
          }
          function Be(e, t, n) {
            for (
              var r, i = t ? k.filter(t, e) : e, o = 0;
              null != (r = i[o]);
              o++
            )
              n || 1 !== r.nodeType || k.cleanData(be(r)),
                r.parentNode &&
                  (n && ae(r) && we(be(r, "script")),
                  r.parentNode.removeChild(r));
            return e;
          }
          k.extend({
            htmlPrefilter: function (e) {
              return e;
            },
            clone: function (e, t, n) {
              var r,
                i,
                o,
                s,
                a = e.cloneNode(!0),
                l = ae(e);
              if (
                !(
                  m.noCloneChecked ||
                  (1 !== e.nodeType && 11 !== e.nodeType) ||
                  k.isXMLDoc(e)
                )
              )
                for (s = be(a), r = 0, i = (o = be(e)).length; r < i; r++)
                  Pe(o[r], s[r]);
              if (t)
                if (n)
                  for (
                    o = o || be(e), s = s || be(a), r = 0, i = o.length;
                    r < i;
                    r++
                  )
                    Re(o[r], s[r]);
                else Re(e, a);
              return (
                (s = be(a, "script")).length > 0 &&
                  we(s, !l && be(e, "script")),
                a
              );
            },
            cleanData: function (e) {
              for (
                var t, n, r, i = k.event.special, o = 0;
                void 0 !== (n = e[o]);
                o++
              )
                if (Q(n)) {
                  if ((t = n[K.expando])) {
                    if (t.events)
                      for (r in t.events)
                        i[r]
                          ? k.event.remove(n, r)
                          : k.removeEvent(n, r, t.handle);
                    n[K.expando] = void 0;
                  }
                  n[Z.expando] && (n[Z.expando] = void 0);
                }
            },
          }),
            k.fn.extend({
              detach: function (e) {
                return Be(this, e, !0);
              },
              remove: function (e) {
                return Be(this, e);
              },
              text: function (e) {
                return z(
                  this,
                  function (e) {
                    return void 0 === e
                      ? k.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = e);
                        });
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              append: function () {
                return $e(this, arguments, function (e) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Oe(this, e).appendChild(e);
                });
              },
              prepend: function () {
                return $e(this, arguments, function (e) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var t = Oe(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return $e(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return $e(this, arguments, function (e) {
                  this.parentNode &&
                    this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                  1 === e.nodeType &&
                    (k.cleanData(be(e, !1)), (e.textContent = ""));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return k.clone(this, e, t);
                  })
                );
              },
              html: function (e) {
                return z(
                  this,
                  function (e) {
                    var t = this[0] || {},
                      n = 0,
                      r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if (
                      "string" == typeof e &&
                      !Ie.test(e) &&
                      !xe[(ve.exec(e) || ["", ""])[1].toLowerCase()]
                    ) {
                      e = k.htmlPrefilter(e);
                      try {
                        for (; n < r; n++)
                          1 === (t = this[n] || {}).nodeType &&
                            (k.cleanData(be(t, !1)), (t.innerHTML = e));
                        t = 0;
                      } catch (e) {}
                    }
                    t && this.empty().append(e);
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              replaceWith: function () {
                var e = [];
                return $e(
                  this,
                  arguments,
                  function (t) {
                    var n = this.parentNode;
                    k.inArray(this, e) < 0 &&
                      (k.cleanData(be(this)), n && n.replaceChild(t, this));
                  },
                  e
                );
              },
            }),
            k.each(
              {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
              },
              function (e, t) {
                k.fn[e] = function (e) {
                  for (
                    var n, r = [], i = k(e), o = i.length - 1, s = 0;
                    s <= o;
                    s++
                  )
                    (n = s === o ? this : this.clone(!0)),
                      k(i[s])[t](n),
                      u.apply(r, n.get());
                  return this.pushStack(r);
                };
              }
            );
          var Fe = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
            _e = function (e) {
              var t = e.ownerDocument.defaultView;
              return (t && t.opener) || (t = r), t.getComputedStyle(e);
            },
            Ve = function (e, t, n) {
              var r,
                i,
                o = {};
              for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
              for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
              return r;
            },
            ze = new RegExp(oe.join("|"), "i");
          function Ue(e, t, n) {
            var r,
              i,
              o,
              s,
              a = e.style;
            return (
              (n = n || _e(e)) &&
                ("" !== (s = n.getPropertyValue(t) || n[t]) ||
                  ae(e) ||
                  (s = k.style(e, t)),
                !m.pixelBoxStyles() &&
                  Fe.test(s) &&
                  ze.test(t) &&
                  ((r = a.width),
                  (i = a.minWidth),
                  (o = a.maxWidth),
                  (a.minWidth = a.maxWidth = a.width = s),
                  (s = n.width),
                  (a.width = r),
                  (a.minWidth = i),
                  (a.maxWidth = o))),
              void 0 !== s ? s + "" : s
            );
          }
          function Xe(e, t) {
            return {
              get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function e() {
              if (c) {
                (u.style.cssText =
                  "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                  (c.style.cssText =
                    "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                  se.appendChild(u).appendChild(c);
                var e = r.getComputedStyle(c);
                (n = "1%" !== e.top),
                  (l = 12 === t(e.marginLeft)),
                  (c.style.right = "60%"),
                  (s = 36 === t(e.right)),
                  (i = 36 === t(e.width)),
                  (c.style.position = "absolute"),
                  (o = 12 === t(c.offsetWidth / 3)),
                  se.removeChild(u),
                  (c = null);
              }
            }
            function t(e) {
              return Math.round(parseFloat(e));
            }
            var n,
              i,
              o,
              s,
              a,
              l,
              u = x.createElement("div"),
              c = x.createElement("div");
            c.style &&
              ((c.style.backgroundClip = "content-box"),
              (c.cloneNode(!0).style.backgroundClip = ""),
              (m.clearCloneStyle = "content-box" === c.style.backgroundClip),
              k.extend(m, {
                boxSizingReliable: function () {
                  return e(), i;
                },
                pixelBoxStyles: function () {
                  return e(), s;
                },
                pixelPosition: function () {
                  return e(), n;
                },
                reliableMarginLeft: function () {
                  return e(), l;
                },
                scrollboxSize: function () {
                  return e(), o;
                },
                reliableTrDimensions: function () {
                  var e, t, n, i;
                  return (
                    null == a &&
                      ((e = x.createElement("table")),
                      (t = x.createElement("tr")),
                      (n = x.createElement("div")),
                      (e.style.cssText = "position:absolute;left:-11111px"),
                      (t.style.height = "1px"),
                      (n.style.height = "9px"),
                      se.appendChild(e).appendChild(t).appendChild(n),
                      (i = r.getComputedStyle(t)),
                      (a = parseInt(i.height) > 3),
                      se.removeChild(e)),
                    a
                  );
                },
              }));
          })();
          var Ye = ["Webkit", "Moz", "ms"],
            Ge = x.createElement("div").style,
            Qe = {};
          function Je(e) {
            var t = k.cssProps[e] || Qe[e];
            return (
              t ||
              (e in Ge
                ? e
                : (Qe[e] =
                    (function (e) {
                      for (
                        var t = e[0].toUpperCase() + e.slice(1), n = Ye.length;
                        n--;

                      )
                        if ((e = Ye[n] + t) in Ge) return e;
                    })(e) || e))
            );
          }
          var Ke = /^(none|table(?!-c[ea]).+)/,
            Ze = /^--/,
            et = {
              position: "absolute",
              visibility: "hidden",
              display: "block",
            },
            tt = { letterSpacing: "0", fontWeight: "400" };
          function nt(e, t, n) {
            var r = ie.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
          }
          function rt(e, t, n, r, i, o) {
            var s = "width" === t ? 1 : 0,
              a = 0,
              l = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; s < 4; s += 2)
              "margin" === n && (l += k.css(e, n + oe[s], !0, i)),
                r
                  ? ("content" === n &&
                      (l -= k.css(e, "padding" + oe[s], !0, i)),
                    "margin" !== n &&
                      (l -= k.css(e, "border" + oe[s] + "Width", !0, i)))
                  : ((l += k.css(e, "padding" + oe[s], !0, i)),
                    "padding" !== n
                      ? (l += k.css(e, "border" + oe[s] + "Width", !0, i))
                      : (a += k.css(e, "border" + oe[s] + "Width", !0, i)));
            return (
              !r &&
                o >= 0 &&
                (l +=
                  Math.max(
                    0,
                    Math.ceil(
                      e["offset" + t[0].toUpperCase() + t.slice(1)] -
                        o -
                        l -
                        a -
                        0.5
                    )
                  ) || 0),
              l
            );
          }
          function it(e, t, n) {
            var r = _e(e),
              i =
                (!m.boxSizingReliable() || n) &&
                "border-box" === k.css(e, "boxSizing", !1, r),
              o = i,
              s = Ue(e, t, r),
              a = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Fe.test(s)) {
              if (!n) return s;
              s = "auto";
            }
            return (
              ((!m.boxSizingReliable() && i) ||
                (!m.reliableTrDimensions() && j(e, "tr")) ||
                "auto" === s ||
                (!parseFloat(s) && "inline" === k.css(e, "display", !1, r))) &&
                e.getClientRects().length &&
                ((i = "border-box" === k.css(e, "boxSizing", !1, r)),
                (o = a in e) && (s = e[a])),
              (s = parseFloat(s) || 0) +
                rt(e, t, n || (i ? "border" : "content"), o, r, s) +
                "px"
            );
          }
          function ot(e, t, n, r, i) {
            return new ot.prototype.init(e, t, n, r, i);
          }
          k.extend({
            cssHooks: {
              opacity: {
                get: function (e, t) {
                  if (t) {
                    var n = Ue(e, "opacity");
                    return "" === n ? "1" : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              columnCount: !0,
              fillOpacity: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              gridArea: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnStart: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowStart: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
            },
            cssProps: {},
            style: function (e, t, n, r) {
              if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                  o,
                  s,
                  a = G(t),
                  l = Ze.test(t),
                  u = e.style;
                if (
                  (l || (t = Je(a)),
                  (s = k.cssHooks[t] || k.cssHooks[a]),
                  void 0 === n)
                )
                  return s && "get" in s && void 0 !== (i = s.get(e, !1, r))
                    ? i
                    : u[t];
                "string" === (o = typeof n) &&
                  (i = ie.exec(n)) &&
                  i[1] &&
                  ((n = ce(e, t, i)), (o = "number")),
                  null != n &&
                    n == n &&
                    ("number" !== o ||
                      l ||
                      (n += (i && i[3]) || (k.cssNumber[a] ? "" : "px")),
                    m.clearCloneStyle ||
                      "" !== n ||
                      0 !== t.indexOf("background") ||
                      (u[t] = "inherit"),
                    (s && "set" in s && void 0 === (n = s.set(e, n, r))) ||
                      (l ? u.setProperty(t, n) : (u[t] = n)));
              }
            },
            css: function (e, t, n, r) {
              var i,
                o,
                s,
                a = G(t);
              return (
                Ze.test(t) || (t = Je(a)),
                (s = k.cssHooks[t] || k.cssHooks[a]) &&
                  "get" in s &&
                  (i = s.get(e, !0, n)),
                void 0 === i && (i = Ue(e, t, r)),
                "normal" === i && t in tt && (i = tt[t]),
                "" === n || n
                  ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
                  : i
              );
            },
          }),
            k.each(["height", "width"], function (e, t) {
              k.cssHooks[t] = {
                get: function (e, n, r) {
                  if (n)
                    return !Ke.test(k.css(e, "display")) ||
                      (e.getClientRects().length &&
                        e.getBoundingClientRect().width)
                      ? it(e, t, r)
                      : Ve(e, et, function () {
                          return it(e, t, r);
                        });
                },
                set: function (e, n, r) {
                  var i,
                    o = _e(e),
                    s = !m.scrollboxSize() && "absolute" === o.position,
                    a =
                      (s || r) && "border-box" === k.css(e, "boxSizing", !1, o),
                    l = r ? rt(e, t, r, a, o) : 0;
                  return (
                    a &&
                      s &&
                      (l -= Math.ceil(
                        e["offset" + t[0].toUpperCase() + t.slice(1)] -
                          parseFloat(o[t]) -
                          rt(e, t, "border", !1, o) -
                          0.5
                      )),
                    l &&
                      (i = ie.exec(n)) &&
                      "px" !== (i[3] || "px") &&
                      ((e.style[t] = n), (n = k.css(e, t))),
                    nt(0, n, l)
                  );
                },
              };
            }),
            (k.cssHooks.marginLeft = Xe(m.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(Ue(e, "marginLeft")) ||
                    e.getBoundingClientRect().left -
                      Ve(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + "px"
                );
            })),
            k.each(
              { margin: "", padding: "", border: "Width" },
              function (e, t) {
                (k.cssHooks[e + t] = {
                  expand: function (n) {
                    for (
                      var r = 0,
                        i = {},
                        o = "string" == typeof n ? n.split(" ") : [n];
                      r < 4;
                      r++
                    )
                      i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
                    return i;
                  },
                }),
                  "margin" !== e && (k.cssHooks[e + t].set = nt);
              }
            ),
            k.fn.extend({
              css: function (e, t) {
                return z(
                  this,
                  function (e, t, n) {
                    var r,
                      i,
                      o = {},
                      s = 0;
                    if (Array.isArray(t)) {
                      for (r = _e(e), i = t.length; s < i; s++)
                        o[t[s]] = k.css(e, t[s], !1, r);
                      return o;
                    }
                    return void 0 !== n ? k.style(e, t, n) : k.css(e, t);
                  },
                  e,
                  t,
                  arguments.length > 1
                );
              },
            }),
            (k.Tween = ot),
            (ot.prototype = {
              constructor: ot,
              init: function (e, t, n, r, i, o) {
                (this.elem = e),
                  (this.prop = n),
                  (this.easing = i || k.easing._default),
                  (this.options = t),
                  (this.start = this.now = this.cur()),
                  (this.end = r),
                  (this.unit = o || (k.cssNumber[n] ? "" : "px"));
              },
              cur: function () {
                var e = ot.propHooks[this.prop];
                return e && e.get
                  ? e.get(this)
                  : ot.propHooks._default.get(this);
              },
              run: function (e) {
                var t,
                  n = ot.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = t =
                        k.easing[this.easing](
                          e,
                          this.options.duration * e,
                          0,
                          1,
                          this.options.duration
                        ))
                    : (this.pos = t = e),
                  (this.now = (this.end - this.start) * t + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : ot.propHooks._default.set(this),
                  this
                );
              },
            }),
            (ot.prototype.init.prototype = ot.prototype),
            (ot.propHooks = {
              _default: {
                get: function (e) {
                  var t;
                  return 1 !== e.elem.nodeType ||
                    (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                    ? e.elem[e.prop]
                    : (t = k.css(e.elem, e.prop, "")) && "auto" !== t
                    ? t
                    : 0;
                },
                set: function (e) {
                  k.fx.step[e.prop]
                    ? k.fx.step[e.prop](e)
                    : 1 !== e.elem.nodeType ||
                      (!k.cssHooks[e.prop] && null == e.elem.style[Je(e.prop)])
                    ? (e.elem[e.prop] = e.now)
                    : k.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }),
            (ot.propHooks.scrollTop = ot.propHooks.scrollLeft =
              {
                set: function (e) {
                  e.elem.nodeType &&
                    e.elem.parentNode &&
                    (e.elem[e.prop] = e.now);
                },
              }),
            (k.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: "swing",
            }),
            (k.fx = ot.prototype.init),
            (k.fx.step = {});
          var st,
            at,
            lt = /^(?:toggle|show|hide)$/,
            ut = /queueHooks$/;
          function ct() {
            at &&
              (!1 === x.hidden && r.requestAnimationFrame
                ? r.requestAnimationFrame(ct)
                : r.setTimeout(ct, k.fx.interval),
              k.fx.tick());
          }
          function pt() {
            return (
              r.setTimeout(function () {
                st = void 0;
              }),
              (st = Date.now())
            );
          }
          function ft(e, t) {
            var n,
              r = 0,
              i = { height: e };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
              i["margin" + (n = oe[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i;
          }
          function dt(e, t, n) {
            for (
              var r,
                i = (ht.tweeners[t] || []).concat(ht.tweeners["*"]),
                o = 0,
                s = i.length;
              o < s;
              o++
            )
              if ((r = i[o].call(n, t, e))) return r;
          }
          function ht(e, t, n) {
            var r,
              i,
              o = 0,
              s = ht.prefilters.length,
              a = k.Deferred().always(function () {
                delete l.elem;
              }),
              l = function () {
                if (i) return !1;
                for (
                  var t = st || pt(),
                    n = Math.max(0, u.startTime + u.duration - t),
                    r = 1 - (n / u.duration || 0),
                    o = 0,
                    s = u.tweens.length;
                  o < s;
                  o++
                )
                  u.tweens[o].run(r);
                return (
                  a.notifyWith(e, [u, r, n]),
                  r < 1 && s
                    ? n
                    : (s || a.notifyWith(e, [u, 1, 0]),
                      a.resolveWith(e, [u]),
                      !1)
                );
              },
              u = a.promise({
                elem: e,
                props: k.extend({}, t),
                opts: k.extend(
                  !0,
                  { specialEasing: {}, easing: k.easing._default },
                  n
                ),
                originalProperties: t,
                originalOptions: n,
                startTime: st || pt(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                  var r = k.Tween(
                    e,
                    u.opts,
                    t,
                    n,
                    u.opts.specialEasing[t] || u.opts.easing
                  );
                  return u.tweens.push(r), r;
                },
                stop: function (t) {
                  var n = 0,
                    r = t ? u.tweens.length : 0;
                  if (i) return this;
                  for (i = !0; n < r; n++) u.tweens[n].run(1);
                  return (
                    t
                      ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t]))
                      : a.rejectWith(e, [u, t]),
                    this
                  );
                },
              }),
              c = u.props;
            for (
              !(function (e, t) {
                var n, r, i, o, s;
                for (n in e)
                  if (
                    ((i = t[(r = G(n))]),
                    (o = e[n]),
                    Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
                    n !== r && ((e[r] = o), delete e[n]),
                    (s = k.cssHooks[r]) && ("expand" in s))
                  )
                    for (n in ((o = s.expand(o)), delete e[r], o))
                      (n in e) || ((e[n] = o[n]), (t[n] = i));
                  else t[r] = i;
              })(c, u.opts.specialEasing);
              o < s;
              o++
            )
              if ((r = ht.prefilters[o].call(u, e, c, u.opts)))
                return (
                  v(r.stop) &&
                    (k._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)),
                  r
                );
            return (
              k.map(c, dt, u),
              v(u.opts.start) && u.opts.start.call(e, u),
              u
                .progress(u.opts.progress)
                .done(u.opts.done, u.opts.complete)
                .fail(u.opts.fail)
                .always(u.opts.always),
              k.fx.timer(
                k.extend(l, { elem: e, anim: u, queue: u.opts.queue })
              ),
              u
            );
          }
          (k.Animation = k.extend(ht, {
            tweeners: {
              "*": [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return ce(n.elem, e, ie.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              v(e) ? ((t = e), (e = ["*"])) : (e = e.match(R));
              for (var n, r = 0, i = e.length; r < i; r++)
                (n = e[r]),
                  (ht.tweeners[n] = ht.tweeners[n] || []),
                  ht.tweeners[n].unshift(t);
            },
            prefilters: [
              function (e, t, n) {
                var r,
                  i,
                  o,
                  s,
                  a,
                  l,
                  u,
                  c,
                  p = "width" in t || "height" in t,
                  f = this,
                  d = {},
                  h = e.style,
                  g = e.nodeType && ue(e),
                  m = K.get(e, "fxshow");
                for (r in (n.queue ||
                  (null == (s = k._queueHooks(e, "fx")).unqueued &&
                    ((s.unqueued = 0),
                    (a = s.empty.fire),
                    (s.empty.fire = function () {
                      s.unqueued || a();
                    })),
                  s.unqueued++,
                  f.always(function () {
                    f.always(function () {
                      s.unqueued--, k.queue(e, "fx").length || s.empty.fire();
                    });
                  })),
                t))
                  if (((i = t[r]), lt.test(i))) {
                    if (
                      (delete t[r],
                      (o = o || "toggle" === i),
                      i === (g ? "hide" : "show"))
                    ) {
                      if ("show" !== i || !m || void 0 === m[r]) continue;
                      g = !0;
                    }
                    d[r] = (m && m[r]) || k.style(e, r);
                  }
                if ((l = !k.isEmptyObject(t)) || !k.isEmptyObject(d))
                  for (r in (p &&
                    1 === e.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (u = m && m.display) && (u = K.get(e, "display")),
                    "none" === (c = k.css(e, "display")) &&
                      (u
                        ? (c = u)
                        : (de([e], !0),
                          (u = e.style.display || u),
                          (c = k.css(e, "display")),
                          de([e]))),
                    ("inline" === c || ("inline-block" === c && null != u)) &&
                      "none" === k.css(e, "float") &&
                      (l ||
                        (f.done(function () {
                          h.display = u;
                        }),
                        null == u &&
                          ((c = h.display), (u = "none" === c ? "" : c))),
                      (h.display = "inline-block"))),
                  n.overflow &&
                    ((h.overflow = "hidden"),
                    f.always(function () {
                      (h.overflow = n.overflow[0]),
                        (h.overflowX = n.overflow[1]),
                        (h.overflowY = n.overflow[2]);
                    })),
                  (l = !1),
                  d))
                    l ||
                      (m
                        ? "hidden" in m && (g = m.hidden)
                        : (m = K.access(e, "fxshow", { display: u })),
                      o && (m.hidden = !g),
                      g && de([e], !0),
                      f.done(function () {
                        for (r in (g || de([e]), K.remove(e, "fxshow"), d))
                          k.style(e, r, d[r]);
                      })),
                      (l = dt(g ? m[r] : 0, r, f)),
                      r in m ||
                        ((m[r] = l.start),
                        g && ((l.end = l.start), (l.start = 0)));
              },
            ],
            prefilter: function (e, t) {
              t ? ht.prefilters.unshift(e) : ht.prefilters.push(e);
            },
          })),
            (k.speed = function (e, t, n) {
              var r =
                e && "object" == typeof e
                  ? k.extend({}, e)
                  : {
                      complete: n || (!n && t) || (v(e) && e),
                      duration: e,
                      easing: (n && t) || (t && !v(t) && t),
                    };
              return (
                k.fx.off
                  ? (r.duration = 0)
                  : "number" != typeof r.duration &&
                    (r.duration in k.fx.speeds
                      ? (r.duration = k.fx.speeds[r.duration])
                      : (r.duration = k.fx.speeds._default)),
                (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
                (r.old = r.complete),
                (r.complete = function () {
                  v(r.old) && r.old.call(this),
                    r.queue && k.dequeue(this, r.queue);
                }),
                r
              );
            }),
            k.fn.extend({
              fadeTo: function (e, t, n, r) {
                return this.filter(ue)
                  .css("opacity", 0)
                  .show()
                  .end()
                  .animate({ opacity: t }, e, n, r);
              },
              animate: function (e, t, n, r) {
                var i = k.isEmptyObject(e),
                  o = k.speed(t, n, r),
                  s = function () {
                    var t = ht(this, k.extend({}, e), o);
                    (i || K.get(this, "finish")) && t.stop(!0);
                  };
                return (
                  (s.finish = s),
                  i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
                );
              },
              stop: function (e, t, n) {
                var r = function (e) {
                  var t = e.stop;
                  delete e.stop, t(n);
                };
                return (
                  "string" != typeof e && ((n = t), (t = e), (e = void 0)),
                  t && this.queue(e || "fx", []),
                  this.each(function () {
                    var t = !0,
                      i = null != e && e + "queueHooks",
                      o = k.timers,
                      s = K.get(this);
                    if (i) s[i] && s[i].stop && r(s[i]);
                    else
                      for (i in s) s[i] && s[i].stop && ut.test(i) && r(s[i]);
                    for (i = o.length; i--; )
                      o[i].elem !== this ||
                        (null != e && o[i].queue !== e) ||
                        (o[i].anim.stop(n), (t = !1), o.splice(i, 1));
                    (!t && n) || k.dequeue(this, e);
                  })
                );
              },
              finish: function (e) {
                return (
                  !1 !== e && (e = e || "fx"),
                  this.each(function () {
                    var t,
                      n = K.get(this),
                      r = n[e + "queue"],
                      i = n[e + "queueHooks"],
                      o = k.timers,
                      s = r ? r.length : 0;
                    for (
                      n.finish = !0,
                        k.queue(this, e, []),
                        i && i.stop && i.stop.call(this, !0),
                        t = o.length;
                      t--;

                    )
                      o[t].elem === this &&
                        o[t].queue === e &&
                        (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < s; t++)
                      r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            k.each(["toggle", "show", "hide"], function (e, t) {
              var n = k.fn[t];
              k.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e
                  ? n.apply(this, arguments)
                  : this.animate(ft(t, !0), e, r, i);
              };
            }),
            k.each(
              {
                slideDown: ft("show"),
                slideUp: ft("hide"),
                slideToggle: ft("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
              },
              function (e, t) {
                k.fn[e] = function (e, n, r) {
                  return this.animate(t, e, n, r);
                };
              }
            ),
            (k.timers = []),
            (k.fx.tick = function () {
              var e,
                t = 0,
                n = k.timers;
              for (st = Date.now(); t < n.length; t++)
                (e = n[t])() || n[t] !== e || n.splice(t--, 1);
              n.length || k.fx.stop(), (st = void 0);
            }),
            (k.fx.timer = function (e) {
              k.timers.push(e), k.fx.start();
            }),
            (k.fx.interval = 13),
            (k.fx.start = function () {
              at || ((at = !0), ct());
            }),
            (k.fx.stop = function () {
              at = null;
            }),
            (k.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (k.fn.delay = function (e, t) {
              return (
                (e = (k.fx && k.fx.speeds[e]) || e),
                (t = t || "fx"),
                this.queue(t, function (t, n) {
                  var i = r.setTimeout(t, e);
                  n.stop = function () {
                    r.clearTimeout(i);
                  };
                })
              );
            }),
            (function () {
              var e = x.createElement("input"),
                t = x
                  .createElement("select")
                  .appendChild(x.createElement("option"));
              (e.type = "checkbox"),
                (m.checkOn = "" !== e.value),
                (m.optSelected = t.selected),
                ((e = x.createElement("input")).value = "t"),
                (e.type = "radio"),
                (m.radioValue = "t" === e.value);
            })();
          var gt,
            mt = k.expr.attrHandle;
          k.fn.extend({
            attr: function (e, t) {
              return z(this, k.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
              return this.each(function () {
                k.removeAttr(this, e);
              });
            },
          }),
            k.extend({
              attr: function (e, t, n) {
                var r,
                  i,
                  o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                  return void 0 === e.getAttribute
                    ? k.prop(e, t, n)
                    : ((1 === o && k.isXMLDoc(e)) ||
                        (i =
                          k.attrHooks[t.toLowerCase()] ||
                          (k.expr.match.bool.test(t) ? gt : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void k.removeAttr(e, t)
                          : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                          ? r
                          : (e.setAttribute(t, n + ""), n)
                        : i && "get" in i && null !== (r = i.get(e, t))
                        ? r
                        : null == (r = k.find.attr(e, t))
                        ? void 0
                        : r);
              },
              attrHooks: {
                type: {
                  set: function (e, t) {
                    if (!m.radioValue && "radio" === t && j(e, "input")) {
                      var n = e.value;
                      return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                  },
                },
              },
              removeAttr: function (e, t) {
                var n,
                  r = 0,
                  i = t && t.match(R);
                if (i && 1 === e.nodeType)
                  for (; (n = i[r++]); ) e.removeAttribute(n);
              },
            }),
            (gt = {
              set: function (e, t, n) {
                return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            k.each(k.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var n = mt[t] || k.find.attr;
              mt[t] = function (e, t, r) {
                var i,
                  o,
                  s = t.toLowerCase();
                return (
                  r ||
                    ((o = mt[s]),
                    (mt[s] = i),
                    (i = null != n(e, t, r) ? s : null),
                    (mt[s] = o)),
                  i
                );
              };
            });
          var vt = /^(?:input|select|textarea|button)$/i,
            yt = /^(?:a|area)$/i;
          function xt(e) {
            return (e.match(R) || []).join(" ");
          }
          function bt(e) {
            return (e.getAttribute && e.getAttribute("class")) || "";
          }
          function wt(e) {
            return Array.isArray(e)
              ? e
              : ("string" == typeof e && e.match(R)) || [];
          }
          k.fn.extend({
            prop: function (e, t) {
              return z(this, k.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[k.propFix[e] || e];
              });
            },
          }),
            k.extend({
              prop: function (e, t, n) {
                var r,
                  i,
                  o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                  return (
                    (1 === o && k.isXMLDoc(e)) ||
                      ((t = k.propFix[t] || t), (i = k.propHooks[t])),
                    void 0 !== n
                      ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                        ? r
                        : (e[t] = n)
                      : i && "get" in i && null !== (r = i.get(e, t))
                      ? r
                      : e[t]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (e) {
                    var t = k.find.attr(e, "tabindex");
                    return t
                      ? parseInt(t, 10)
                      : vt.test(e.nodeName) || (yt.test(e.nodeName) && e.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: "htmlFor", class: "className" },
            }),
            m.optSelected ||
              (k.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t &&
                    (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            k.each(
              [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
              ],
              function () {
                k.propFix[this.toLowerCase()] = this;
              }
            ),
            k.fn.extend({
              addClass: function (e) {
                var t,
                  n,
                  r,
                  i,
                  o,
                  s,
                  a,
                  l = 0;
                if (v(e))
                  return this.each(function (t) {
                    k(this).addClass(e.call(this, t, bt(this)));
                  });
                if ((t = wt(e)).length)
                  for (; (n = this[l++]); )
                    if (
                      ((i = bt(n)), (r = 1 === n.nodeType && " " + xt(i) + " "))
                    ) {
                      for (s = 0; (o = t[s++]); )
                        r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                      i !== (a = xt(r)) && n.setAttribute("class", a);
                    }
                return this;
              },
              removeClass: function (e) {
                var t,
                  n,
                  r,
                  i,
                  o,
                  s,
                  a,
                  l = 0;
                if (v(e))
                  return this.each(function (t) {
                    k(this).removeClass(e.call(this, t, bt(this)));
                  });
                if (!arguments.length) return this.attr("class", "");
                if ((t = wt(e)).length)
                  for (; (n = this[l++]); )
                    if (
                      ((i = bt(n)), (r = 1 === n.nodeType && " " + xt(i) + " "))
                    ) {
                      for (s = 0; (o = t[s++]); )
                        for (; r.indexOf(" " + o + " ") > -1; )
                          r = r.replace(" " + o + " ", " ");
                      i !== (a = xt(r)) && n.setAttribute("class", a);
                    }
                return this;
              },
              toggleClass: function (e, t) {
                var n = typeof e,
                  r = "string" === n || Array.isArray(e);
                return "boolean" == typeof t && r
                  ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                  : v(e)
                  ? this.each(function (n) {
                      k(this).toggleClass(e.call(this, n, bt(this), t), t);
                    })
                  : this.each(function () {
                      var t, i, o, s;
                      if (r)
                        for (i = 0, o = k(this), s = wt(e); (t = s[i++]); )
                          o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                      else
                        (void 0 !== e && "boolean" !== n) ||
                          ((t = bt(this)) && K.set(this, "__className__", t),
                          this.setAttribute &&
                            this.setAttribute(
                              "class",
                              t || !1 === e
                                ? ""
                                : K.get(this, "__className__") || ""
                            ));
                    });
              },
              hasClass: function (e) {
                var t,
                  n,
                  r = 0;
                for (t = " " + e + " "; (n = this[r++]); )
                  if (
                    1 === n.nodeType &&
                    (" " + xt(bt(n)) + " ").indexOf(t) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var Ct = /\r/g;
          k.fn.extend({
            val: function (e) {
              var t,
                n,
                r,
                i = this[0];
              return arguments.length
                ? ((r = v(e)),
                  this.each(function (n) {
                    var i;
                    1 === this.nodeType &&
                      (null == (i = r ? e.call(this, n, k(this).val()) : e)
                        ? (i = "")
                        : "number" == typeof i
                        ? (i += "")
                        : Array.isArray(i) &&
                          (i = k.map(i, function (e) {
                            return null == e ? "" : e + "";
                          })),
                      ((t =
                        k.valHooks[this.type] ||
                        k.valHooks[this.nodeName.toLowerCase()]) &&
                        "set" in t &&
                        void 0 !== t.set(this, i, "value")) ||
                        (this.value = i));
                  }))
                : i
                ? (t =
                    k.valHooks[i.type] ||
                    k.valHooks[i.nodeName.toLowerCase()]) &&
                  "get" in t &&
                  void 0 !== (n = t.get(i, "value"))
                  ? n
                  : "string" == typeof (n = i.value)
                  ? n.replace(Ct, "")
                  : null == n
                  ? ""
                  : n
                : void 0;
            },
          }),
            k.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = k.find.attr(e, "value");
                    return null != t ? t : xt(k.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      r,
                      i = e.options,
                      o = e.selectedIndex,
                      s = "select-one" === e.type,
                      a = s ? null : [],
                      l = s ? o + 1 : i.length;
                    for (r = o < 0 ? l : s ? o : 0; r < l; r++)
                      if (
                        ((n = i[r]).selected || r === o) &&
                        !n.disabled &&
                        (!n.parentNode.disabled || !j(n.parentNode, "optgroup"))
                      ) {
                        if (((t = k(n).val()), s)) return t;
                        a.push(t);
                      }
                    return a;
                  },
                  set: function (e, t) {
                    for (
                      var n, r, i = e.options, o = k.makeArray(t), s = i.length;
                      s--;

                    )
                      ((r = i[s]).selected =
                        k.inArray(k.valHooks.option.get(r), o) > -1) &&
                        (n = !0);
                    return n || (e.selectedIndex = -1), o;
                  },
                },
              },
            }),
            k.each(["radio", "checkbox"], function () {
              (k.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t))
                    return (e.checked = k.inArray(k(e).val(), t) > -1);
                },
              }),
                m.checkOn ||
                  (k.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                  });
            }),
            (m.focusin = "onfocusin" in r);
          var Tt = /^(?:focusinfocus|focusoutblur)$/,
            kt = function (e) {
              e.stopPropagation();
            };
          k.extend(k.event, {
            trigger: function (e, t, n, i) {
              var o,
                s,
                a,
                l,
                u,
                c,
                p,
                f,
                h = [n || x],
                g = d.call(e, "type") ? e.type : e,
                m = d.call(e, "namespace") ? e.namespace.split(".") : [];
              if (
                ((s = f = a = n = n || x),
                3 !== n.nodeType &&
                  8 !== n.nodeType &&
                  !Tt.test(g + k.event.triggered) &&
                  (g.indexOf(".") > -1 &&
                    ((m = g.split(".")), (g = m.shift()), m.sort()),
                  (u = g.indexOf(":") < 0 && "on" + g),
                  ((e = e[k.expando]
                    ? e
                    : new k.Event(g, "object" == typeof e && e)).isTrigger = i
                    ? 2
                    : 3),
                  (e.namespace = m.join(".")),
                  (e.rnamespace = e.namespace
                    ? new RegExp(
                        "(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      )
                    : null),
                  (e.result = void 0),
                  e.target || (e.target = n),
                  (t = null == t ? [e] : k.makeArray(t, [e])),
                  (p = k.event.special[g] || {}),
                  i || !p.trigger || !1 !== p.trigger.apply(n, t)))
              ) {
                if (!i && !p.noBubble && !y(n)) {
                  for (
                    l = p.delegateType || g,
                      Tt.test(l + g) || (s = s.parentNode);
                    s;
                    s = s.parentNode
                  )
                    h.push(s), (a = s);
                  a === (n.ownerDocument || x) &&
                    h.push(a.defaultView || a.parentWindow || r);
                }
                for (o = 0; (s = h[o++]) && !e.isPropagationStopped(); )
                  (f = s),
                    (e.type = o > 1 ? l : p.bindType || g),
                    (c =
                      (K.get(s, "events") || Object.create(null))[e.type] &&
                      K.get(s, "handle")) && c.apply(s, t),
                    (c = u && s[u]) &&
                      c.apply &&
                      Q(s) &&
                      ((e.result = c.apply(s, t)),
                      !1 === e.result && e.preventDefault());
                return (
                  (e.type = g),
                  i ||
                    e.isDefaultPrevented() ||
                    (p._default && !1 !== p._default.apply(h.pop(), t)) ||
                    !Q(n) ||
                    (u &&
                      v(n[g]) &&
                      !y(n) &&
                      ((a = n[u]) && (n[u] = null),
                      (k.event.triggered = g),
                      e.isPropagationStopped() && f.addEventListener(g, kt),
                      n[g](),
                      e.isPropagationStopped() && f.removeEventListener(g, kt),
                      (k.event.triggered = void 0),
                      a && (n[u] = a))),
                  e.result
                );
              }
            },
            simulate: function (e, t, n) {
              var r = k.extend(new k.Event(), n, { type: e, isSimulated: !0 });
              k.event.trigger(r, null, t);
            },
          }),
            k.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  k.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return k.event.trigger(e, t, n, !0);
              },
            }),
            m.focusin ||
              k.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                var n = function (e) {
                  k.event.simulate(t, e.target, k.event.fix(e));
                };
                k.event.special[t] = {
                  setup: function () {
                    var r = this.ownerDocument || this.document || this,
                      i = K.access(r, t);
                    i || r.addEventListener(e, n, !0),
                      K.access(r, t, (i || 0) + 1);
                  },
                  teardown: function () {
                    var r = this.ownerDocument || this.document || this,
                      i = K.access(r, t) - 1;
                    i
                      ? K.access(r, t, i)
                      : (r.removeEventListener(e, n, !0), K.remove(r, t));
                  },
                };
              });
          var Et = r.location,
            At = { guid: Date.now() },
            St = /\?/;
          k.parseXML = function (e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
              t = new r.DOMParser().parseFromString(e, "text/xml");
            } catch (e) {
              t = void 0;
            }
            return (
              (t && !t.getElementsByTagName("parsererror").length) ||
                k.error("Invalid XML: " + e),
              t
            );
          };
          var Dt = /\[\]$/,
            Nt = /\r?\n/g,
            jt = /^(?:submit|button|image|reset|file)$/i,
            Lt = /^(?:input|select|textarea|keygen)/i;
          function It(e, t, n, r) {
            var i;
            if (Array.isArray(t))
              k.each(t, function (t, i) {
                n || Dt.test(e)
                  ? r(e, i)
                  : It(
                      e +
                        "[" +
                        ("object" == typeof i && null != i ? t : "") +
                        "]",
                      i,
                      n,
                      r
                    );
              });
            else if (n || "object" !== C(t)) r(e, t);
            else for (i in t) It(e + "[" + i + "]", t[i], n, r);
          }
          (k.param = function (e, t) {
            var n,
              r = [],
              i = function (e, t) {
                var n = v(t) ? t() : t;
                r[r.length] =
                  encodeURIComponent(e) +
                  "=" +
                  encodeURIComponent(null == n ? "" : n);
              };
            if (null == e) return "";
            if (Array.isArray(e) || (e.jquery && !k.isPlainObject(e)))
              k.each(e, function () {
                i(this.name, this.value);
              });
            else for (n in e) It(n, e[n], t, i);
            return r.join("&");
          }),
            k.fn.extend({
              serialize: function () {
                return k.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = k.prop(this, "elements");
                  return e ? k.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return (
                      this.name &&
                      !k(this).is(":disabled") &&
                      Lt.test(this.nodeName) &&
                      !jt.test(e) &&
                      (this.checked || !me.test(e))
                    );
                  })
                  .map(function (e, t) {
                    var n = k(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? k.map(n, function (e) {
                          return { name: t.name, value: e.replace(Nt, "\r\n") };
                        })
                      : { name: t.name, value: n.replace(Nt, "\r\n") };
                  })
                  .get();
              },
            });
          var qt = /%20/g,
            Ht = /#.*$/,
            Ot = /([?&])_=[^&]*/,
            Mt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Wt = /^(?:GET|HEAD)$/,
            Rt = /^\/\//,
            Pt = {},
            $t = {},
            Bt = "*/".concat("*"),
            Ft = x.createElement("a");
          function _t(e) {
            return function (t, n) {
              "string" != typeof t && ((n = t), (t = "*"));
              var r,
                i = 0,
                o = t.toLowerCase().match(R) || [];
              if (v(n))
                for (; (r = o[i++]); )
                  "+" === r[0]
                    ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n))
                    : (e[r] = e[r] || []).push(n);
            };
          }
          function Vt(e, t, n, r) {
            var i = {},
              o = e === $t;
            function s(a) {
              var l;
              return (
                (i[a] = !0),
                k.each(e[a] || [], function (e, a) {
                  var u = a(t, n, r);
                  return "string" != typeof u || o || i[u]
                    ? o
                      ? !(l = u)
                      : void 0
                    : (t.dataTypes.unshift(u), s(u), !1);
                }),
                l
              );
            }
            return s(t.dataTypes[0]) || (!i["*"] && s("*"));
          }
          function zt(e, t) {
            var n,
              r,
              i = k.ajaxSettings.flatOptions || {};
            for (n in t)
              void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && k.extend(!0, e, r), e;
          }
          (Ft.href = Et.href),
            k.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: Et.href,
                type: "GET",
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    Et.protocol
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                  "*": Bt,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: "responseXML",
                  text: "responseText",
                  json: "responseJSON",
                },
                converters: {
                  "* text": String,
                  "text html": !0,
                  "text json": JSON.parse,
                  "text xml": k.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (e, t) {
                return t ? zt(zt(e, k.ajaxSettings), t) : zt(k.ajaxSettings, e);
              },
              ajaxPrefilter: _t(Pt),
              ajaxTransport: _t($t),
              ajax: function (e, t) {
                "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                var n,
                  i,
                  o,
                  s,
                  a,
                  l,
                  u,
                  c,
                  p,
                  f,
                  d = k.ajaxSetup({}, t),
                  h = d.context || d,
                  g = d.context && (h.nodeType || h.jquery) ? k(h) : k.event,
                  m = k.Deferred(),
                  v = k.Callbacks("once memory"),
                  y = d.statusCode || {},
                  b = {},
                  w = {},
                  C = "canceled",
                  T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (u) {
                        if (!s)
                          for (s = {}; (t = Mt.exec(o)); )
                            s[t[1].toLowerCase() + " "] = (
                              s[t[1].toLowerCase() + " "] || []
                            ).concat(t[2]);
                        t = s[e.toLowerCase() + " "];
                      }
                      return null == t ? null : t.join(", ");
                    },
                    getAllResponseHeaders: function () {
                      return u ? o : null;
                    },
                    setRequestHeader: function (e, t) {
                      return (
                        null == u &&
                          ((e = w[e.toLowerCase()] = w[e.toLowerCase()] || e),
                          (b[e] = t)),
                        this
                      );
                    },
                    overrideMimeType: function (e) {
                      return null == u && (d.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (u) T.always(e[T.status]);
                        else for (t in e) y[t] = [y[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || C;
                      return n && n.abort(t), E(0, t), this;
                    },
                  };
                if (
                  (m.promise(T),
                  (d.url = ((e || d.url || Et.href) + "").replace(
                    Rt,
                    Et.protocol + "//"
                  )),
                  (d.type = t.method || t.type || d.method || d.type),
                  (d.dataTypes = (d.dataType || "*").toLowerCase().match(R) || [
                    "",
                  ]),
                  null == d.crossDomain)
                ) {
                  l = x.createElement("a");
                  try {
                    (l.href = d.url),
                      (l.href = l.href),
                      (d.crossDomain =
                        Ft.protocol + "//" + Ft.host !=
                        l.protocol + "//" + l.host);
                  } catch (e) {
                    d.crossDomain = !0;
                  }
                }
                if (
                  (d.data &&
                    d.processData &&
                    "string" != typeof d.data &&
                    (d.data = k.param(d.data, d.traditional)),
                  Vt(Pt, d, t, T),
                  u)
                )
                  return T;
                for (p in ((c = k.event && d.global) &&
                  0 == k.active++ &&
                  k.event.trigger("ajaxStart"),
                (d.type = d.type.toUpperCase()),
                (d.hasContent = !Wt.test(d.type)),
                (i = d.url.replace(Ht, "")),
                d.hasContent
                  ? d.data &&
                    d.processData &&
                    0 ===
                      (d.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) &&
                    (d.data = d.data.replace(qt, "+"))
                  : ((f = d.url.slice(i.length)),
                    d.data &&
                      (d.processData || "string" == typeof d.data) &&
                      ((i += (St.test(i) ? "&" : "?") + d.data), delete d.data),
                    !1 === d.cache &&
                      ((i = i.replace(Ot, "$1")),
                      (f = (St.test(i) ? "&" : "?") + "_=" + At.guid++ + f)),
                    (d.url = i + f)),
                d.ifModified &&
                  (k.lastModified[i] &&
                    T.setRequestHeader("If-Modified-Since", k.lastModified[i]),
                  k.etag[i] && T.setRequestHeader("If-None-Match", k.etag[i])),
                ((d.data && d.hasContent && !1 !== d.contentType) ||
                  t.contentType) &&
                  T.setRequestHeader("Content-Type", d.contentType),
                T.setRequestHeader(
                  "Accept",
                  d.dataTypes[0] && d.accepts[d.dataTypes[0]]
                    ? d.accepts[d.dataTypes[0]] +
                        ("*" !== d.dataTypes[0] ? ", " + Bt + "; q=0.01" : "")
                    : d.accepts["*"]
                ),
                d.headers))
                  T.setRequestHeader(p, d.headers[p]);
                if (d.beforeSend && (!1 === d.beforeSend.call(h, T, d) || u))
                  return T.abort();
                if (
                  ((C = "abort"),
                  v.add(d.complete),
                  T.done(d.success),
                  T.fail(d.error),
                  (n = Vt($t, d, t, T)))
                ) {
                  if (
                    ((T.readyState = 1), c && g.trigger("ajaxSend", [T, d]), u)
                  )
                    return T;
                  d.async &&
                    d.timeout > 0 &&
                    (a = r.setTimeout(function () {
                      T.abort("timeout");
                    }, d.timeout));
                  try {
                    (u = !1), n.send(b, E);
                  } catch (e) {
                    if (u) throw e;
                    E(-1, e);
                  }
                } else E(-1, "No Transport");
                function E(e, t, s, l) {
                  var p,
                    f,
                    x,
                    b,
                    w,
                    C = t;
                  u ||
                    ((u = !0),
                    a && r.clearTimeout(a),
                    (n = void 0),
                    (o = l || ""),
                    (T.readyState = e > 0 ? 4 : 0),
                    (p = (e >= 200 && e < 300) || 304 === e),
                    s &&
                      (b = (function (e, t, n) {
                        for (
                          var r, i, o, s, a = e.contents, l = e.dataTypes;
                          "*" === l[0];

                        )
                          l.shift(),
                            void 0 === r &&
                              (r =
                                e.mimeType ||
                                t.getResponseHeader("Content-Type"));
                        if (r)
                          for (i in a)
                            if (a[i] && a[i].test(r)) {
                              l.unshift(i);
                              break;
                            }
                        if (l[0] in n) o = l[0];
                        else {
                          for (i in n) {
                            if (!l[0] || e.converters[i + " " + l[0]]) {
                              o = i;
                              break;
                            }
                            s || (s = i);
                          }
                          o = o || s;
                        }
                        if (o) return o !== l[0] && l.unshift(o), n[o];
                      })(d, T, s)),
                    !p &&
                      k.inArray("script", d.dataTypes) > -1 &&
                      (d.converters["text script"] = function () {}),
                    (b = (function (e, t, n, r) {
                      var i,
                        o,
                        s,
                        a,
                        l,
                        u = {},
                        c = e.dataTypes.slice();
                      if (c[1])
                        for (s in e.converters)
                          u[s.toLowerCase()] = e.converters[s];
                      for (o = c.shift(); o; )
                        if (
                          (e.responseFields[o] && (n[e.responseFields[o]] = t),
                          !l &&
                            r &&
                            e.dataFilter &&
                            (t = e.dataFilter(t, e.dataType)),
                          (l = o),
                          (o = c.shift()))
                        )
                          if ("*" === o) o = l;
                          else if ("*" !== l && l !== o) {
                            if (!(s = u[l + " " + o] || u["* " + o]))
                              for (i in u)
                                if (
                                  (a = i.split(" "))[1] === o &&
                                  (s = u[l + " " + a[0]] || u["* " + a[0]])
                                ) {
                                  !0 === s
                                    ? (s = u[i])
                                    : !0 !== u[i] &&
                                      ((o = a[0]), c.unshift(a[1]));
                                  break;
                                }
                            if (!0 !== s)
                              if (s && e.throws) t = s(t);
                              else
                                try {
                                  t = s(t);
                                } catch (e) {
                                  return {
                                    state: "parsererror",
                                    error: s
                                      ? e
                                      : "No conversion from " + l + " to " + o,
                                  };
                                }
                          }
                      return { state: "success", data: t };
                    })(d, b, T, p)),
                    p
                      ? (d.ifModified &&
                          ((w = T.getResponseHeader("Last-Modified")) &&
                            (k.lastModified[i] = w),
                          (w = T.getResponseHeader("etag")) && (k.etag[i] = w)),
                        204 === e || "HEAD" === d.type
                          ? (C = "nocontent")
                          : 304 === e
                          ? (C = "notmodified")
                          : ((C = b.state), (f = b.data), (p = !(x = b.error))))
                      : ((x = C),
                        (!e && C) || ((C = "error"), e < 0 && (e = 0))),
                    (T.status = e),
                    (T.statusText = (t || C) + ""),
                    p
                      ? m.resolveWith(h, [f, C, T])
                      : m.rejectWith(h, [T, C, x]),
                    T.statusCode(y),
                    (y = void 0),
                    c &&
                      g.trigger(p ? "ajaxSuccess" : "ajaxError", [
                        T,
                        d,
                        p ? f : x,
                      ]),
                    v.fireWith(h, [T, C]),
                    c &&
                      (g.trigger("ajaxComplete", [T, d]),
                      --k.active || k.event.trigger("ajaxStop")));
                }
                return T;
              },
              getJSON: function (e, t, n) {
                return k.get(e, t, n, "json");
              },
              getScript: function (e, t) {
                return k.get(e, void 0, t, "script");
              },
            }),
            k.each(["get", "post"], function (e, t) {
              k[t] = function (e, n, r, i) {
                return (
                  v(n) && ((i = i || r), (r = n), (n = void 0)),
                  k.ajax(
                    k.extend(
                      { url: e, type: t, dataType: i, data: n, success: r },
                      k.isPlainObject(e) && e
                    )
                  )
                );
              };
            }),
            k.ajaxPrefilter(function (e) {
              var t;
              for (t in e.headers)
                "content-type" === t.toLowerCase() &&
                  (e.contentType = e.headers[t] || "");
            }),
            (k._evalUrl = function (e, t, n) {
              return k.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (e) {
                  k.globalEval(e, t, n);
                },
              });
            }),
            k.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (v(e) && (e = e.call(this[0])),
                    (t = k(e, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t
                      .map(function () {
                        for (var e = this; e.firstElementChild; )
                          e = e.firstElementChild;
                        return e;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (e) {
                return v(e)
                  ? this.each(function (t) {
                      k(this).wrapInner(e.call(this, t));
                    })
                  : this.each(function () {
                      var t = k(this),
                        n = t.contents();
                      n.length ? n.wrapAll(e) : t.append(e);
                    });
              },
              wrap: function (e) {
                var t = v(e);
                return this.each(function (n) {
                  k(this).wrapAll(t ? e.call(this, n) : e);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not("body")
                    .each(function () {
                      k(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (k.expr.pseudos.hidden = function (e) {
              return !k.expr.pseudos.visible(e);
            }),
            (k.expr.pseudos.visible = function (e) {
              return !!(
                e.offsetWidth ||
                e.offsetHeight ||
                e.getClientRects().length
              );
            }),
            (k.ajaxSettings.xhr = function () {
              try {
                return new r.XMLHttpRequest();
              } catch (e) {}
            });
          var Ut = { 0: 200, 1223: 204 },
            Xt = k.ajaxSettings.xhr();
          (m.cors = !!Xt && "withCredentials" in Xt),
            (m.ajax = Xt = !!Xt),
            k.ajaxTransport(function (e) {
              var t, n;
              if (m.cors || (Xt && !e.crossDomain))
                return {
                  send: function (i, o) {
                    var s,
                      a = e.xhr();
                    if (
                      (a.open(e.type, e.url, e.async, e.username, e.password),
                      e.xhrFields)
                    )
                      for (s in e.xhrFields) a[s] = e.xhrFields[s];
                    for (s in (e.mimeType &&
                      a.overrideMimeType &&
                      a.overrideMimeType(e.mimeType),
                    e.crossDomain ||
                      i["X-Requested-With"] ||
                      (i["X-Requested-With"] = "XMLHttpRequest"),
                    i))
                      a.setRequestHeader(s, i[s]);
                    (t = function (e) {
                      return function () {
                        t &&
                          ((t =
                            n =
                            a.onload =
                            a.onerror =
                            a.onabort =
                            a.ontimeout =
                            a.onreadystatechange =
                              null),
                          "abort" === e
                            ? a.abort()
                            : "error" === e
                            ? "number" != typeof a.status
                              ? o(0, "error")
                              : o(a.status, a.statusText)
                            : o(
                                Ut[a.status] || a.status,
                                a.statusText,
                                "text" !== (a.responseType || "text") ||
                                  "string" != typeof a.responseText
                                  ? { binary: a.response }
                                  : { text: a.responseText },
                                a.getAllResponseHeaders()
                              ));
                      };
                    }),
                      (a.onload = t()),
                      (n = a.onerror = a.ontimeout = t("error")),
                      void 0 !== a.onabort
                        ? (a.onabort = n)
                        : (a.onreadystatechange = function () {
                            4 === a.readyState &&
                              r.setTimeout(function () {
                                t && n();
                              });
                          }),
                      (t = t("abort"));
                    try {
                      a.send((e.hasContent && e.data) || null);
                    } catch (e) {
                      if (t) throw e;
                    }
                  },
                  abort: function () {
                    t && t();
                  },
                };
            }),
            k.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            k.ajaxSetup({
              accepts: {
                script:
                  "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                "text script": function (e) {
                  return k.globalEval(e), e;
                },
              },
            }),
            k.ajaxPrefilter("script", function (e) {
              void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET");
            }),
            k.ajaxTransport("script", function (e) {
              var t, n;
              if (e.crossDomain || e.scriptAttrs)
                return {
                  send: function (r, i) {
                    (t = k("<script>")
                      .attr(e.scriptAttrs || {})
                      .prop({ charset: e.scriptCharset, src: e.url })
                      .on(
                        "load error",
                        (n = function (e) {
                          t.remove(),
                            (n = null),
                            e && i("error" === e.type ? 404 : 200, e.type);
                        })
                      )),
                      x.head.appendChild(t[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
            });
          var Yt,
            Gt = [],
            Qt = /(=)\?(?=&|$)|\?\?/;
          k.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var e = Gt.pop() || k.expando + "_" + At.guid++;
              return (this[e] = !0), e;
            },
          }),
            k.ajaxPrefilter("json jsonp", function (e, t, n) {
              var i,
                o,
                s,
                a =
                  !1 !== e.jsonp &&
                  (Qt.test(e.url)
                    ? "url"
                    : "string" == typeof e.data &&
                      0 ===
                        (e.contentType || "").indexOf(
                          "application/x-www-form-urlencoded"
                        ) &&
                      Qt.test(e.data) &&
                      "data");
              if (a || "jsonp" === e.dataTypes[0])
                return (
                  (i = e.jsonpCallback =
                    v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                  a
                    ? (e[a] = e[a].replace(Qt, "$1" + i))
                    : !1 !== e.jsonp &&
                      (e.url +=
                        (St.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
                  (e.converters["script json"] = function () {
                    return s || k.error(i + " was not called"), s[0];
                  }),
                  (e.dataTypes[0] = "json"),
                  (o = r[i]),
                  (r[i] = function () {
                    s = arguments;
                  }),
                  n.always(function () {
                    void 0 === o ? k(r).removeProp(i) : (r[i] = o),
                      e[i] && ((e.jsonpCallback = t.jsonpCallback), Gt.push(i)),
                      s && v(o) && o(s[0]),
                      (s = o = void 0);
                  }),
                  "script"
                );
            }),
            (m.createHTMLDocument =
              (((Yt = x.implementation.createHTMLDocument("").body).innerHTML =
                "<form></form><form></form>"),
              2 === Yt.childNodes.length)),
            (k.parseHTML = function (e, t, n) {
              return "string" != typeof e
                ? []
                : ("boolean" == typeof t && ((n = t), (t = !1)),
                  t ||
                    (m.createHTMLDocument
                      ? (((r = (t =
                          x.implementation.createHTMLDocument(
                            ""
                          )).createElement("base")).href = x.location.href),
                        t.head.appendChild(r))
                      : (t = x)),
                  (o = !n && []),
                  (i = L.exec(e))
                    ? [t.createElement(i[1])]
                    : ((i = Te([e], t, o)),
                      o && o.length && k(o).remove(),
                      k.merge([], i.childNodes)));
              var r, i, o;
            }),
            (k.fn.load = function (e, t, n) {
              var r,
                i,
                o,
                s = this,
                a = e.indexOf(" ");
              return (
                a > -1 && ((r = xt(e.slice(a))), (e = e.slice(0, a))),
                v(t)
                  ? ((n = t), (t = void 0))
                  : t && "object" == typeof t && (i = "POST"),
                s.length > 0 &&
                  k
                    .ajax({
                      url: e,
                      type: i || "GET",
                      dataType: "html",
                      data: t,
                    })
                    .done(function (e) {
                      (o = arguments),
                        s.html(
                          r ? k("<div>").append(k.parseHTML(e)).find(r) : e
                        );
                    })
                    .always(
                      n &&
                        function (e, t) {
                          s.each(function () {
                            n.apply(this, o || [e.responseText, t, e]);
                          });
                        }
                    ),
                this
              );
            }),
            (k.expr.pseudos.animated = function (e) {
              return k.grep(k.timers, function (t) {
                return e === t.elem;
              }).length;
            }),
            (k.offset = {
              setOffset: function (e, t, n) {
                var r,
                  i,
                  o,
                  s,
                  a,
                  l,
                  u = k.css(e, "position"),
                  c = k(e),
                  p = {};
                "static" === u && (e.style.position = "relative"),
                  (a = c.offset()),
                  (o = k.css(e, "top")),
                  (l = k.css(e, "left")),
                  ("absolute" === u || "fixed" === u) &&
                  (o + l).indexOf("auto") > -1
                    ? ((s = (r = c.position()).top), (i = r.left))
                    : ((s = parseFloat(o) || 0), (i = parseFloat(l) || 0)),
                  v(t) && (t = t.call(e, n, k.extend({}, a))),
                  null != t.top && (p.top = t.top - a.top + s),
                  null != t.left && (p.left = t.left - a.left + i),
                  "using" in t
                    ? t.using.call(e, p)
                    : ("number" == typeof p.top && (p.top += "px"),
                      "number" == typeof p.left && (p.left += "px"),
                      c.css(p));
              },
            }),
            k.fn.extend({
              offset: function (e) {
                if (arguments.length)
                  return void 0 === e
                    ? this
                    : this.each(function (t) {
                        k.offset.setOffset(this, e, t);
                      });
                var t,
                  n,
                  r = this[0];
                return r
                  ? r.getClientRects().length
                    ? ((t = r.getBoundingClientRect()),
                      (n = r.ownerDocument.defaultView),
                      {
                        top: t.top + n.pageYOffset,
                        left: t.left + n.pageXOffset,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var e,
                    t,
                    n,
                    r = this[0],
                    i = { top: 0, left: 0 };
                  if ("fixed" === k.css(r, "position"))
                    t = r.getBoundingClientRect();
                  else {
                    for (
                      t = this.offset(),
                        n = r.ownerDocument,
                        e = r.offsetParent || n.documentElement;
                      e &&
                      (e === n.body || e === n.documentElement) &&
                      "static" === k.css(e, "position");

                    )
                      e = e.parentNode;
                    e &&
                      e !== r &&
                      1 === e.nodeType &&
                      (((i = k(e).offset()).top += k.css(
                        e,
                        "borderTopWidth",
                        !0
                      )),
                      (i.left += k.css(e, "borderLeftWidth", !0)));
                  }
                  return {
                    top: t.top - i.top - k.css(r, "marginTop", !0),
                    left: t.left - i.left - k.css(r, "marginLeft", !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var e = this.offsetParent;
                    e && "static" === k.css(e, "position");

                  )
                    e = e.offsetParent;
                  return e || se;
                });
              },
            }),
            k.each(
              { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
              function (e, t) {
                var n = "pageYOffset" === t;
                k.fn[e] = function (r) {
                  return z(
                    this,
                    function (e, r, i) {
                      var o;
                      if (
                        (y(e)
                          ? (o = e)
                          : 9 === e.nodeType && (o = e.defaultView),
                        void 0 === i)
                      )
                        return o ? o[t] : e[r];
                      o
                        ? o.scrollTo(
                            n ? o.pageXOffset : i,
                            n ? i : o.pageYOffset
                          )
                        : (e[r] = i);
                    },
                    e,
                    r,
                    arguments.length
                  );
                };
              }
            ),
            k.each(["top", "left"], function (e, t) {
              k.cssHooks[t] = Xe(m.pixelPosition, function (e, n) {
                if (n)
                  return (
                    (n = Ue(e, t)), Fe.test(n) ? k(e).position()[t] + "px" : n
                  );
              });
            }),
            k.each({ Height: "height", Width: "width" }, function (e, t) {
              k.each(
                { padding: "inner" + e, content: t, "": "outer" + e },
                function (n, r) {
                  k.fn[r] = function (i, o) {
                    var s = arguments.length && (n || "boolean" != typeof i),
                      a = n || (!0 === i || !0 === o ? "margin" : "border");
                    return z(
                      this,
                      function (t, n, i) {
                        var o;
                        return y(t)
                          ? 0 === r.indexOf("outer")
                            ? t["inner" + e]
                            : t.document.documentElement["client" + e]
                          : 9 === t.nodeType
                          ? ((o = t.documentElement),
                            Math.max(
                              t.body["scroll" + e],
                              o["scroll" + e],
                              t.body["offset" + e],
                              o["offset" + e],
                              o["client" + e]
                            ))
                          : void 0 === i
                          ? k.css(t, n, a)
                          : k.style(t, n, i, a);
                      },
                      t,
                      s ? i : void 0,
                      s
                    );
                  };
                }
              );
            }),
            k.each(
              [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
              ],
              function (e, t) {
                k.fn[t] = function (e) {
                  return this.on(t, e);
                };
              }
            ),
            k.fn.extend({
              bind: function (e, t, n) {
                return this.on(e, null, t, n);
              },
              unbind: function (e, t) {
                return this.off(e, null, t);
              },
              delegate: function (e, t, n, r) {
                return this.on(t, e, n, r);
              },
              undelegate: function (e, t, n) {
                return 1 === arguments.length
                  ? this.off(e, "**")
                  : this.off(t, e || "**", n);
              },
              hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
              },
            }),
            k.each(
              "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                " "
              ),
              function (e, t) {
                k.fn[t] = function (e, n) {
                  return arguments.length > 0
                    ? this.on(t, null, e, n)
                    : this.trigger(t);
                };
              }
            );
          var Jt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          (k.proxy = function (e, t) {
            var n, r, i;
            if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), v(e)))
              return (
                (r = a.call(arguments, 2)),
                (i = function () {
                  return e.apply(t || this, r.concat(a.call(arguments)));
                }),
                (i.guid = e.guid = e.guid || k.guid++),
                i
              );
          }),
            (k.holdReady = function (e) {
              e ? k.readyWait++ : k.ready(!0);
            }),
            (k.isArray = Array.isArray),
            (k.parseJSON = JSON.parse),
            (k.nodeName = j),
            (k.isFunction = v),
            (k.isWindow = y),
            (k.camelCase = G),
            (k.type = C),
            (k.now = Date.now),
            (k.isNumeric = function (e) {
              var t = k.type(e);
              return (
                ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
              );
            }),
            (k.trim = function (e) {
              return null == e ? "" : (e + "").replace(Jt, "");
            }),
            void 0 ===
              (n = function () {
                return k;
              }.apply(t, [])) || (e.exports = n);
          var Kt = r.jQuery,
            Zt = r.$;
          return (
            (k.noConflict = function (e) {
              return (
                r.$ === k && (r.$ = Zt),
                e && r.jQuery === k && (r.jQuery = Kt),
                k
              );
            }),
            void 0 === i && (r.jQuery = r.$ = k),
            k
          );
        });
      },
    },
    t = {};
  function n(r) {
    var i = t[r];
    if (void 0 !== i) return i.exports;
    var o = (t[r] = { exports: {} });
    return e[r].call(o.exports, o, o.exports, n), o.exports;
  }
  (() => {
    "use strict";
    let e = !1;
    setTimeout(() => {
      if (e) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    var t = n(755);
    n(637);
    t(function () {
      t("select").selectric({
        arrowButtonMarkup:
          '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      });
    }),
      t(function () {
        t("select2").selectric({
          arrowButtonMarkup:
            '<svg class="arrow" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#C4C4C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        });
      }),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      });
  })();
})();
