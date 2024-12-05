
; (function (d) {
    d.flexslider = function (h, k) {
        var a = d(h), c = d.extend({}, d.flexslider.defaults, k), e = c.namespace, o = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, s = o ? "touchend" : "click", l = "vertical" === c.direction, m = c.reverse, i = 0 < c.itemWidth, p = "fade" === c.animation, r = "" !== c.asNavFor, f = {}; d.data(h, "flexslider", a); f = {
            init: function () {
                a.animating = !1; a.currentSlide = c.startAt; a.animatingTo = a.currentSlide; a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last; a.containerSelector = c.selector.substr(0,
                    c.selector.search(" ")); a.slides = d(c.selector, a); a.container = d(a.containerSelector, a); a.count = a.slides.length; a.syncExists = 0 < d(c.sync).length; "slide" === c.animation && (c.animation = "swing"); a.prop = l ? "top" : "marginLeft"; a.args = {}; a.manualPause = !1; a.transitions = !c.video && !p && c.useCSS && function () {
                        var b = document.createElement("div"), c = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], d; for (d in c) if (b.style[c[d]] !== void 0) {
                            a.pfx = c[d].replace("Perspective", "").toLowerCase();
                            a.prop = "-" + a.pfx + "-transform"; return true
                        } return false
                    }(); "" !== c.controlsContainer && (a.controlsContainer = 0 < d(c.controlsContainer).length && d(c.controlsContainer)); "" !== c.manualControls && (a.manualControls = 0 < d(c.manualControls).length && d(c.manualControls)); c.randomize && (a.slides.sort(function () { return Math.round(Math.random()) - 0.5 }), a.container.empty().append(a.slides)); a.doMath(); r && f.asNav.setup(); a.setup("init"); c.controlNav && f.controlNav.setup(); c.directionNav && f.directionNav.setup(); c.keyboard &&
                        (1 === d(a.containerSelector).length || c.multipleKeyboard) && d(document).bind("keyup", function (b) { b = b.keyCode; if (!a.animating && (b === 39 || b === 37)) { b = b === 39 ? a.getTarget("next") : b === 37 ? a.getTarget("prev") : false; a.flexAnimate(b, c.pauseOnAction) } }); c.mousewheel && a.bind("mousewheel", function (b, g) { b.preventDefault(); var d = g < 0 ? a.getTarget("next") : a.getTarget("prev"); a.flexAnimate(d, c.pauseOnAction) }); c.pausePlay && f.pausePlay.setup(); c.slideshow && (c.pauseOnHover && a.hover(function () { a.pause() }, function () {
                            a.manualPause ||
                            a.play()
                        }), 0 < c.initDelay ? setTimeout(a.play, c.initDelay) : a.play()); o && c.touch && f.touch(); (!p || p && c.smoothHeight) && d(window).bind("resize focus", f.resize); setTimeout(function () { c.start(a) }, 200)
            }, asNav: {
                setup: function () {
                    a.asNav = !0; a.animatingTo = Math.floor(a.currentSlide / a.move); a.currentItem = a.currentSlide; a.slides.removeClass(e + "active-slide").eq(a.currentItem).addClass(e + "active-slide"); a.slides.click(function (b) {
                        b.preventDefault(); var b = d(this), g = b.index(); !d(c.asNavFor).data("flexslider").animating &&
                            !b.hasClass("active") && (a.direction = a.currentItem < g ? "next" : "prev", a.flexAnimate(g, c.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () { a.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging() }, setupPaging: function () {
                    var b = 1, g; a.controlNavScaffold = d('<ol class="' + e + "control-nav " + e + ("thumbnails" === c.controlNav ? "control-thumbs" : "control-paging") + '"></ol>'); if (1 < a.pagingCount) for (var q = 0; q < a.pagingCount; q++)g = "thumbnails" === c.controlNav ? '<img src="' + a.slides.eq(q).attr("data-thumb") +
                        '"/>' : "<a>" + b + "</a>", a.controlNavScaffold.append("<li>" + g + "</li>"), b++; a.controlsContainer ? d(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold); f.controlNav.set(); f.controlNav.active(); a.controlNavScaffold.delegate("a, img", s, function (b) { b.preventDefault(); var b = d(this), g = a.controlNav.index(b); b.hasClass(e + "active") || (a.direction = g > a.currentSlide ? "next" : "prev", a.flexAnimate(g, c.pauseOnAction)) }); o && a.controlNavScaffold.delegate("a", "click touchstart", function (a) { a.preventDefault() })
                },
                setupManual: function () { a.controlNav = a.manualControls; f.controlNav.active(); a.controlNav.live(s, function (b) { b.preventDefault(); var b = d(this), g = a.controlNav.index(b); b.hasClass(e + "active") || (g > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(g, c.pauseOnAction)) }); o && a.controlNav.live("click touchstart", function (a) { a.preventDefault() }) }, set: function () { a.controlNav = d("." + e + "control-nav li " + ("thumbnails" === c.controlNav ? "img" : "a"), a.controlsContainer ? a.controlsContainer : a) }, active: function () {
                    a.controlNav.removeClass(e +
                        "active").eq(a.animatingTo).addClass(e + "active")
                }, update: function (b, c) { 1 < a.pagingCount && "add" === b ? a.controlNavScaffold.append(d("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(c).closest("li").remove(); f.controlNav.set(); 1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(c, b) : f.controlNav.active() }
            }, directionNav: {
                setup: function () {
                    var b = d('<ul class="' + e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + c.prevText + '</a></li><li><a class="' +
                        e + 'next" href="#">' + c.nextText + "</a></li></ul>"); a.controlsContainer ? (d(a.controlsContainer).append(b), a.directionNav = d("." + e + "direction-nav li a", a.controlsContainer)) : (a.append(b), a.directionNav = d("." + e + "direction-nav li a", a)); f.directionNav.update(); a.directionNav.bind(s, function (b) { b.preventDefault(); b = d(this).hasClass(e + "next") ? a.getTarget("next") : a.getTarget("prev"); a.flexAnimate(b, c.pauseOnAction) }); o && a.directionNav.bind("click touchstart", function (a) { a.preventDefault() })
                }, update: function () {
                    var b =
                        e + "disabled"; c.animationLoop || (1 === a.pagingCount ? a.directionNav.addClass(b) : 0 === a.animatingTo ? a.directionNav.removeClass(b).filter("." + e + "prev").addClass(b) : a.animatingTo === a.last ? a.directionNav.removeClass(b).filter("." + e + "next").addClass(b) : a.directionNav.removeClass(b))
                }
            }, pausePlay: {
                setup: function () {
                    var b = d('<div class="' + e + 'pauseplay"><a></a></div>'); a.controlsContainer ? (a.controlsContainer.append(b), a.pausePlay = d("." + e + "pauseplay a", a.controlsContainer)) : (a.append(b), a.pausePlay = d("." + e + "pauseplay a",
                        a)); f.pausePlay.update(c.slideshow ? e + "pause" : e + "play"); a.pausePlay.bind(s, function (b) { b.preventDefault(); if (d(this).hasClass(e + "pause")) { a.pause(); a.manualPause = true } else { a.play(); a.manualPause = false } }); o && a.pausePlay.bind("click touchstart", function (a) { a.preventDefault() })
                }, update: function (b) { "play" === b ? a.pausePlay.removeClass(e + "pause").addClass(e + "play").text(c.playText) : a.pausePlay.removeClass(e + "play").addClass(e + "pause").text(c.pauseText) }
            }, touch: function () {
                function b(b) {
                    j = l ? d - b.touches[0].pageY :
                        d - b.touches[0].pageX; o = l ? Math.abs(j) < Math.abs(b.touches[0].pageX - e) : Math.abs(j) < Math.abs(b.touches[0].pageY - e); if (!o || 500 < Number(new Date) - k) b.preventDefault(), !p && a.transitions && (c.animationLoop || (j /= 0 === a.currentSlide && 0 > j || a.currentSlide === a.last && 0 < j ? Math.abs(j) / n + 2 : 1), a.setProps(f + j, "setTouch"))
                } function g() {
                    if (a.animatingTo === a.currentSlide && !o && null !== j) {
                        var i = m ? -j : j, l = 0 < i ? a.getTarget("next") : a.getTarget("prev"); a.canAdvance(l) && (550 > Number(new Date) - k && 20 < Math.abs(i) || Math.abs(i) > n / 2) ? a.flexAnimate(l,
                            c.pauseOnAction) : a.flexAnimate(a.currentSlide, c.pauseOnAction, !0)
                    } h.removeEventListener("touchmove", b, !1); h.removeEventListener("touchend", g, !1); f = j = e = d = null
                } var d, e, f, n, j, k, o = !1; h.addEventListener("touchstart", function (j) {
                    a.animating ? j.preventDefault() : 1 === j.touches.length && (a.pause(), n = l ? a.h : a.w, k = Number(new Date), f = i && m && a.animatingTo === a.last ? 0 : i && m ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : i && a.currentSlide === a.last ? a.limit : i ? (a.itemW + c.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide +
                        a.cloneOffset) * n : (a.currentSlide + a.cloneOffset) * n, d = l ? j.touches[0].pageY : j.touches[0].pageX, e = l ? j.touches[0].pageX : j.touches[0].pageY, h.addEventListener("touchmove", b, !1), h.addEventListener("touchend", g, !1))
                }, !1)
            }, resize: function () {
                !a.animating && a.is(":visible") && (i || a.doMath(), p ? f.smoothHeight() : i ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : l ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (c.smoothHeight && f.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW,
                    "setTotal")))
            }, smoothHeight: function (b) { if (!l || p) { var c = p ? a : a.viewport; b ? c.animate({ height: a.slides.eq(a.animatingTo).height() }, b) : c.height(a.slides.eq(a.animatingTo).height()) } }, sync: function (b) { var g = d(c.sync).data("flexslider"), e = a.animatingTo; switch (b) { case "animate": g.flexAnimate(e, c.pauseOnAction, !1, !0); break; case "play": !g.playing && !g.asNav && g.play(); break; case "pause": g.pause() } }
        }; a.flexAnimate = function (b, g, q, h, k) {
            if (!a.animating && (a.canAdvance(b) || q) && a.is(":visible")) {
                if (r && h) if (q = d(c.asNavFor).data("flexslider"),
                    a.atEnd = 0 === b || b === a.count - 1, q.flexAnimate(b, !0, !1, !0, k), a.direction = a.currentItem < b ? "next" : "prev", q.direction = a.direction, Math.ceil((b + 1) / a.visible) - 1 !== a.currentSlide && 0 !== b) a.currentItem = b, a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), b = Math.floor(b / a.visible); else return a.currentItem = b, a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), !1; a.animating = !0; a.animatingTo = b; c.before(a); g && a.pause(); a.syncExists && !k && f.sync("animate"); c.controlNav && f.controlNav.active();
                i || a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"); a.atEnd = 0 === b || b === a.last; c.directionNav && f.directionNav.update(); b === a.last && (c.end(a), c.animationLoop || a.pause()); if (p) a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed, c.easing), a.slides.eq(b).fadeIn(c.animationSpeed, c.easing, a.wrapup); else {
                    var n = l ? a.slides.filter(":first").height() : a.computedW; i ? (b = c.itemWidth > a.w ? 2 * c.itemMargin : c.itemMargin, b = (a.itemW + b) * a.move * a.animatingTo, b = b > a.limit && 1 !== a.visible ? a.limit : b) : b =
                        0 === a.currentSlide && b === a.count - 1 && c.animationLoop && "next" !== a.direction ? m ? (a.count + a.cloneOffset) * n : 0 : a.currentSlide === a.last && 0 === b && c.animationLoop && "prev" !== a.direction ? m ? 0 : (a.count + 1) * n : m ? (a.count - 1 - b + a.cloneOffset) * n : (b + a.cloneOffset) * n; a.setProps(b, "", c.animationSpeed); if (a.transitions) { if (!c.animationLoop || !a.atEnd) a.animating = !1, a.currentSlide = a.animatingTo; a.container.unbind("webkitTransitionEnd transitionend"); a.container.bind("webkitTransitionEnd transitionend", function () { a.wrapup(n) }) } else a.container.animate(a.args,
                            c.animationSpeed, c.easing, function () { a.wrapup(n) })
                } c.smoothHeight && f.smoothHeight(c.animationSpeed)
            }
        }; a.wrapup = function (b) { !p && !i && (0 === a.currentSlide && a.animatingTo === a.last && c.animationLoop ? a.setProps(b, "jumpEnd") : a.currentSlide === a.last && (0 === a.animatingTo && c.animationLoop) && a.setProps(b, "jumpStart")); a.animating = !1; a.currentSlide = a.animatingTo; c.after(a) }; a.animateSlides = function () { a.animating || a.flexAnimate(a.getTarget("next")) }; a.pause = function () {
            clearInterval(a.animatedSlides); a.playing = !1;
            c.pausePlay && f.pausePlay.update("play"); a.syncExists && f.sync("pause")
        }; a.play = function () { a.animatedSlides = setInterval(a.animateSlides, c.slideshowSpeed); a.playing = !0; c.pausePlay && f.pausePlay.update("pause"); a.syncExists && f.sync("play") }; a.canAdvance = function (b) {
            var d = r ? a.pagingCount - 1 : a.last; return r && 0 === a.currentItem && b === a.pagingCount - 1 && "next" !== a.direction ? !1 : b === a.currentSlide && !r ? !1 : c.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && b === d && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === d && 0 ===
                b && "next" === a.direction ? !1 : !0
        }; a.getTarget = function (b) { a.direction = b; return "next" === b ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1 }; a.setProps = function (b, d, e) {
            var f = function () {
                var e = b ? b : (a.itemW + c.itemMargin) * a.move * a.animatingTo; return -1 * function () {
                    if (i) return "setTouch" === d ? b : m && a.animatingTo === a.last ? 0 : m ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit : e; switch (d) {
                        case "setTotal": return m ? (a.count - 1 - a.currentSlide + a.cloneOffset) *
                            b : (a.currentSlide + a.cloneOffset) * b; case "setTouch": return b; case "jumpEnd": return m ? b : a.count * b; case "jumpStart": return m ? a.count * b : b; default: return b
                    }
                }() + "px"
            }(); a.transitions && (f = l ? "translate3d(0," + f + ",0)" : "translate3d(" + f + ",0,0)", e = void 0 !== e ? e / 1E3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", e)); a.args[a.prop] = f; (a.transitions || void 0 === e) && a.container.css(a.args)
        }; a.setup = function (b) {
            if (p) a.slides.css({ width: "100%", "float": "left", marginRight: "-100%", position: "relative" }), "init" ===
                b && a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed, c.easing), c.smoothHeight && f.smoothHeight(); else {
                    var g, h; "init" === b && (a.viewport = d('<div class="flex-viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, m && (h = d.makeArray(a.slides).reverse(), a.slides = d(h), a.container.empty().append(a.slides))); c.animationLoop && !i && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== b && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));
                a.newSlides = d(c.selector, a); g = m ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset; l && !i ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () { a.newSlides.css({ display: "block" }); a.doMath(); a.viewport.height(a.h); a.setProps(g * a.h, "init") }, "init" === b ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(g * a.computedW, "init"), setTimeout(function () {
                    a.doMath(); a.newSlides.css({
                        width: a.computedW, "float": "left",
                        display: "block"
                    }); c.smoothHeight && f.smoothHeight()
                }, "init" === b ? 100 : 0))
            } i || a.slides.removeClass(e + "active-slide").eq(a.currentSlide).addClass(e + "active-slide")
        }; a.doMath = function () {
            var b = a.slides.first(), d = c.itemMargin, e = c.minItems, f = c.maxItems; a.w = a.width(); a.h = b.height(); a.boxPadding = b.outerWidth() - b.width(); i ? (a.itemT = c.itemWidth + d, a.minW = e ? e * a.itemT : a.w, a.maxW = f ? f * a.itemT : a.w, a.itemW = a.minW > a.w ? (a.w - d * e) / e : a.maxW < a.w ? (a.w - d * f) / f : c.itemWidth > a.w ? a.w : c.itemWidth, a.visible = Math.floor(a.w / (a.itemW +
                d)), a.move = 0 < c.move && c.move < a.visible ? c.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : c.itemWidth > a.w ? (a.itemW + 2 * d) * a.count - a.w - d : (a.itemW + d) * a.count - a.w) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1); a.computedW = a.itemW - a.boxPadding
        }; a.update = function (b, d) {
            a.doMath(); i || (b < a.currentSlide ? a.currentSlide += 1 : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1), a.animatingTo = a.currentSlide); if (c.controlNav && !a.manualControls) if ("add" ===
                d && !i || a.pagingCount > a.controlNav.length) f.controlNav.update("add"); else if ("remove" === d && !i || a.pagingCount < a.controlNav.length) i && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), f.controlNav.update("remove", a.last); c.directionNav && f.directionNav.update()
        }; a.addSlide = function (b, e) {
            var f = d(b); a.count += 1; a.last = a.count - 1; l && m ? void 0 !== e ? a.slides.eq(a.count - e).after(f) : a.container.prepend(f) : void 0 !== e ? a.slides.eq(e).before(f) : a.container.append(f); a.update(e, "add"); a.slides = d(c.selector +
                ":not(.clone)", a); a.setup(); c.added(a)
        }; a.removeSlide = function (b) { var e = isNaN(b) ? a.slides.index(d(b)) : b; a.count -= 1; a.last = a.count - 1; isNaN(b) ? d(b, a.slides).remove() : l && m ? a.slides.eq(a.last).remove() : a.slides.eq(b).remove(); a.doMath(); a.update(e, "remove"); a.slides = d(c.selector + ":not(.clone)", a); a.setup(); c.removed(a) }; f.init()
    }; d.flexslider.defaults = {
        namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0,
        slideshow: !0, slideshowSpeed: 7E3, animationSpeed: 600, initDelay: 0, randomize: !1, pauseOnAction: !0, pauseOnHover: !1, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "", nextText: "", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 0, maxItems: 0, move: 0, start: function () { }, before: function () { }, after: function () { }, end: function () { }, added: function () { },
        removed: function () { }
    }; d.fn.flexslider = function (h) {
        h = h || {}; if ("object" === typeof h) return this.each(function () { var a = d(this), c = a.find(h.selector ? h.selector : ".slides > li"); 1 === c.length ? (c.fadeIn(400), h.start && h.start(a)) : void 0 === a.data("flexslider") && new d.flexslider(this, h) }); var k = d(this).data("flexslider"); switch (h) {
            case "play": k.play(); break; case "pause": k.pause(); break; case "next": k.flexAnimate(k.getTarget("next"), !0); break; case "prev": case "previous": k.flexAnimate(k.getTarget("prev"), !0); break;
            default: "number" === typeof h && k.flexAnimate(h, !0)
        }
    }
})(jQuery);

/* FlexSlider é um plugin jQuery que facilita a criação de sliders responsivos para exibir imagens e conteúdo em sites. Seus principais recursos incluem:

Animações: Suporte para animações de "fade" e "slide".
Navegação: Controles de navegação (próximo/anterior) e indicadores de páginas.
Responsividade: Adapta-se a diferentes tamanhos de tela.
Controle de Reprodução: Permite iniciar ou pausar a reprodução automática.
Eventos: Ações específicas podem ser acionadas em diferentes interações.
Como Usar
Inclua as dependências: Adicione jQuery e os arquivos do FlexSlider no seu HTML.
Estrutura HTML: Crie a estrutura básica do slider com uma lista de slides.
Inicialize o FlexSlider: Adicione um script para configurar e inicializar o slider.
Personalização
O FlexSlider é altamente configurável, com opções como:

animation: tipo de animação (fade ou slide).
slideshow: ativa ou desativa a reprodução automática.
slideshowSpeed: velocidade da transição entre slides.
animationSpeed: velocidade da animação ao mudar de slide.
controlNav e directionNav: habilitam os controles de navegação.
Exemplo Completo
Um exemplo básico de implementação inclui a estrutura HTML para os slides e um script para inicializar o FlexSlider. */




!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery) }(function (a) { "use strict"; function b(a) { if (a instanceof Date) return a; if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a); throw new Error("Couldn't cast `" + a + "` to a date object.") } function c(a) { var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"); return new RegExp(b) } function d(a) { return function (b) { var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi); if (d) for (var f = 0, g = d.length; f < g; ++f) { var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), j = c(h[0]), k = h[1] || "", l = h[3] || "", m = null; h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString())) } return b = b.replace(/%%/, "%") } } function e(a, b) { var c = "s", d = ""; return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d } var f = [], g = [], h = { precision: 100, elapse: !1, defer: !1 }; g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|")); var i = { Y: "years", m: "months", n: "daysToMonth", d: "daysToWeek", w: "weeks", W: "weeksToMonth", H: "hours", M: "minutes", S: "seconds", D: "totalDays", I: "totalHours", N: "totalMinutes", T: "totalSeconds" }, j = function (b, c, d) { this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start() }; a.extend(j.prototype, { start: function () { null !== this.interval && clearInterval(this.interval); var a = this; this.update(), this.interval = setInterval(function () { a.update.call(a) }, this.options.precision) }, stop: function () { clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped") }, toggle: function () { this.interval ? this.stop() : this.start() }, pause: function () { this.stop() }, resume: function () { this.start() }, remove: function () { this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance }, setFinalDate: function (a) { this.finalDate = b(a) }, update: function () { if (0 === this.$el.closest("html").length) return void this.remove(); var a, b = new Date; return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void (this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = { seconds: this.totalSecsLeft % 60, minutes: Math.floor(this.totalSecsLeft / 60) % 60, hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24, days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368), weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7), weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4, months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368), years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()), totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24), totalHours: Math.floor(this.totalSecsLeft / 60 / 60), totalMinutes: Math.floor(this.totalSecsLeft / 60), totalSeconds: this.totalSecsLeft }, void (this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))) }, dispatchEvent: function (b) { var c = a.Event(b + ".countdown"); c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c) } }), a.fn.countdown = function () { var b = Array.prototype.slice.call(arguments, 0); return this.each(function () { var c = a(this).data("countdown-instance"); if (void 0 !== c) { var d = f[c], e = b[0]; j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e)) } else new j(this, b[0], b[1]) }) } });

/* Conversão de Datas:

A função b(a) converte strings ou números em objetos Date, lançando um erro se a conversão falhar.
Expressões Regulares:

A função c(a) cria uma expressão regular para encontrar e substituir partes da string.
Substituição de Marcadores:

A função d(a) substitui placeholders na string por valores do contador, como anos e meses.
Determinação de Unidades:

A função e(a, b) retorna a unidade de tempo apropriada com base na diferença de tempo.
Classe do Contador:

A classe j representa o contador, com métodos para iniciar, parar, pausar, retomar e atualizar a contagem, além de gerenciar eventos.
Extensão jQuery:

a.fn.countdown permite criar e gerenciar contadores em elementos DOM, chamando métodos ou criando novas instâncias conforme necessário.
Uso
O código permite que desenvolvedores implementem contadores regressivos em páginas da web, personalizando a exibição do tempo restante e respondendo a eventos como atualizações e término do contador. */



// Easing JS //
!function (n) { "function" == typeof define && define.amd ? define(["jquery"], function (e) { return n(e) }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery) }(function (n) { function e(n) { var e = 7.5625, t = 2.75; return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375 } n.easing.jswing = n.easing.swing; var t = Math.pow, u = Math.sqrt, r = Math.sin, i = Math.cos, a = Math.PI, c = 1.70158, o = 1.525 * c, s = 2 * a / 3, f = 2 * a / 4.5; n.extend(n.easing, { def: "easeOutQuad", swing: function (e) { return n.easing[n.easing.def](e) }, easeInQuad: function (n) { return n * n }, easeOutQuad: function (n) { return 1 - (1 - n) * (1 - n) }, easeInOutQuad: function (n) { return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2 }, easeInCubic: function (n) { return n * n * n }, easeOutCubic: function (n) { return 1 - t(1 - n, 3) }, easeInOutCubic: function (n) { return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2 }, easeInQuart: function (n) { return n * n * n * n }, easeOutQuart: function (n) { return 1 - t(1 - n, 4) }, easeInOutQuart: function (n) { return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2 }, easeInQuint: function (n) { return n * n * n * n * n }, easeOutQuint: function (n) { return 1 - t(1 - n, 5) }, easeInOutQuint: function (n) { return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2 }, easeInSine: function (n) { return 1 - i(n * a / 2) }, easeOutSine: function (n) { return r(n * a / 2) }, easeInOutSine: function (n) { return -(i(a * n) - 1) / 2 }, easeInExpo: function (n) { return 0 === n ? 0 : t(2, 10 * n - 10) }, easeOutExpo: function (n) { return 1 === n ? 1 : 1 - t(2, -10 * n) }, easeInOutExpo: function (n) { return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2 }, easeInCirc: function (n) { return 1 - u(1 - t(n, 2)) }, easeOutCirc: function (n) { return u(1 - t(n - 1, 2)) }, easeInOutCirc: function (n) { return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2 }, easeInElastic: function (n) { return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s) }, easeOutElastic: function (n) { return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1 }, easeInOutElastic: function (n) { return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1 }, easeInBack: function (n) { return (c + 1) * n * n * n - c * n * n }, easeOutBack: function (n) { return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2) }, easeInOutBack: function (n) { return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2 }, easeInBounce: function (n) { return 1 - e(1 - n) }, easeOutBounce: e, easeInOutBounce: function (n) { return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2 } }) });

/* Este código em JavaScript implementa funções de easing, que controlam a velocidade de transições em animações. As principais funções incluem:

easeIn: Começa devagar e acelera.
easeOut: Começa rápido e desacelera.
easeInOut: Combina os dois, começando devagar, acelerando e depois desacelerando.
Essas funções estão implementadas em diferentes graus matemáticos, como quadrático (Quad), cúbico (Cubic), quártico (Quart), quintico (Quint), e também com variações como senoidal (Sine), exponencial (Expo), circular (Circ), elástico (Elastic) e bounce (quicar). Elas criam transições mais naturais e realistas, ajustando a velocidade de forma suave em animações. */




!function (l, o, e) { "use strict"; l.fn.scrollUp = function (o) { l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o)) }, l.fn.scrollUp.init = function (r) { var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r), f = !1; switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", { id: p.scrollName, href: "#top" }), p.scrollTitle && d.attr("title", p.scrollTitle), d.appendTo("body"), p.scrollImg || p.scrollTrigger || d.html(p.scrollText), d.css({ display: "none", position: "fixed", zIndex: p.zIndex }), p.activeOverlay && l("<div/>", { id: p.scrollName + "-active" }).css({ position: "absolute", top: p.scrollDistance + "px", width: "100%", borderTop: "1px dotted" + p.activeOverlay, zIndex: p.zIndex }).appendTo("body"), p.animation) { case "fade": s = "fadeIn", t = "fadeOut", c = p.animationSpeed; break; case "slide": s = "slideDown", t = "slideUp", c = p.animationSpeed; break; default: s = "show", t = "hide", c = 0 }i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance, n = l(o).scroll(function () { l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1) }), p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0, d.click(function (o) { o.preventDefault(), l("html, body").animate({ scrollTop: a }, p.scrollSpeed, p.easingType) }) }, l.fn.scrollUp.defaults = { scrollName: "scrollUp", scrollDistance: 300, scrollFrom: "top", scrollSpeed: 300, easingType: "linear", animation: "fade", animationSpeed: 200, scrollTrigger: !1, scrollTarget: !1, scrollText: "Scroll to top", scrollTitle: !1, scrollImg: !1, activeOverlay: !1, zIndex: 2147483647 }, l.fn.scrollUp.destroy = function (r) { l.removeData(e.body, "scrollUp"), l("#" + l.fn.scrollUp.settings.scrollName).remove(), l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(), l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r) }, l.scrollUp = l.fn.scrollUp }(jQuery, window, document);

/* Inicialização do Plugin (l.fn.scrollUp):

Verifica se o plugin já foi inicializado. Se não, inicializa chamando l.fn.scrollUp.init(o).
Configuração Inicial (l.fn.scrollUp.init):

Combina as configurações padrão com as personalizadas.
Cria um elemento de gatilho para rolagem para cima (link ou botão).
Define estilos (como posição e z-index) para o elemento.
Adiciona um overlay ativo se especificado.
Configura a animação (fade ou slide) e define o comportamento do elemento de gatilho ao ser clicado, que rola suavemente para o alvo definido.
Configurações Padrão (l.fn.scrollUp.defaults):

Contém valores padrão como nome do elemento, distância para ativação, velocidade de rolagem, e tipo de animação.
Destruição do Plugin (l.fn.scrollUp.destroy):

Remove os dados associados ao plugin e o elemento de gatilho do DOM, além de desativar o evento de scroll.
Essencialmente, esse código fornece uma funcionalidade de rolagem suave para o topo da página quando um botão ou link é clicado, com várias opções de configuração. */