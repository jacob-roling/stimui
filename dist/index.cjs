var $15sZk$hotwiredstimulus = require("@hotwired/stimulus");
var $15sZk$tabbable = require("tabbable");
var $15sZk$vuereactivity = require("@vue/reactivity");
var $15sZk$floatinguidom = require("@floating-ui/dom");


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "registerComponents", () => $af87fa11b55d7ba6$export$e73a9d346ce244ee);

/**
 * A Stimulus utility
 * @typedef {(number|string)} Util
 */ // This code is a minimal adaptation of @alpinejs/focus for use with @hotwired/stimulus
// See https://github.com/alpinejs/alpine/blob/main/packages/focus/src/index.js for the original code
// Copyright © 2019-2021 Caleb Porzio and contributors
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

let $8242b5998bd8a162$var$lastFocused = null;
let $8242b5998bd8a162$var$currentFocused = null;
window.addEventListener("focusin", ()=>{
    $8242b5998bd8a162$var$lastFocused = $8242b5998bd8a162$var$currentFocused;
    $8242b5998bd8a162$var$currentFocused = document.activeElement;
}, {
    once: true
});
class $8242b5998bd8a162$export$766c876d58dec02e {
    constructor(el){
        this.__within = el;
        this.__noscroll = false;
        this.__wrapAround = false;
    }
    within(el) {
        this.__within = el;
        return this;
    }
    withoutScrolling() {
        this.__noscroll = true;
        return this;
    }
    noscroll() {
        this.__noscroll = true;
        return this;
    }
    withWrapAround() {
        this.__wrapAround = true;
        return this;
    }
    wrap() {
        return this.withWrapAround();
    }
    focusable(el) {
        return (0, $15sZk$tabbable.isFocusable)(el);
    }
    previouslyFocused() {
        return $8242b5998bd8a162$var$lastFocused;
    }
    lastFocused() {
        return $8242b5998bd8a162$var$lastFocused;
    }
    focused() {
        return $8242b5998bd8a162$var$currentFocused;
    }
    focusables() {
        if (Array.isArray(this.__within)) return this.__within;
        return (0, $15sZk$tabbable.focusable)(this.__within, {
            displayCheck: "none"
        });
    }
    all() {
        return this.focusables();
    }
    isFirst(el) {
        let els = this.all();
        return els[0] && els[0].isSameNode(el);
    }
    isLast(el) {
        let els = this.all();
        return els.length && els.slice(-1)[0].isSameNode(el);
    }
    getFirst() {
        return this.all()[0];
    }
    getLast() {
        return this.all().slice(-1)[0];
    }
    getNext() {
        let list = this.all();
        let current = document.activeElement;
        // Can't find currently focusable HTMLElement in list.
        if (list.indexOf(current) === -1) return;
        // This is the last HTMLElement in the list and we want to wrap around.
        if (this.__wrapAround && list.indexOf(current) === list.length - 1) return list[0];
        return list[list.indexOf(current) + 1];
    }
    getPrevious() {
        let list = this.all();
        let current = document.activeElement;
        // Can't find currently focusable HTMLElement in list.
        if (list.indexOf(current) === -1) return;
        // This is the first HTMLElement in the list and we want to wrap around.
        if (this.__wrapAround && list.indexOf(current) === 0) return list.slice(-1)[0];
        return list[list.indexOf(current) - 1];
    }
    first() {
        this.focus(this.getFirst());
    }
    last() {
        this.focus(this.getLast());
    }
    next() {
        this.focus(this.getNext());
    }
    previous() {
        this.focus(this.getPrevious());
    }
    prev() {
        return this.previous();
    }
    focus(el) {
        if (!el) return;
        setTimeout(()=>{
            if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
            el.focus({
                preventScroll: this.__noscroll
            });
        });
    }
}
function $8242b5998bd8a162$export$f8168d8dd8fd66e6(element) {
    return new $8242b5998bd8a162$export$766c876d58dec02e(element);
}
function $8242b5998bd8a162$var$setInert(el) {
    let undos = [];
    $8242b5998bd8a162$var$crawlSiblingsUp(el, (sibling)=>{
        let cache = sibling.hasAttribute("aria-hidden");
        sibling.setAttribute("aria-hidden", "true");
        undos.push(()=>cache || sibling.removeAttribute("aria-hidden"));
    });
    return ()=>{
        while(undos.length)undos.pop()();
    };
}
function $8242b5998bd8a162$var$crawlSiblingsUp(el, callback) {
    if (el.isSameNode(document.body) || !el.parentNode) return;
    Array.from(el.parentNode.children).forEach((sibling)=>{
        if (sibling.isSameNode(el)) $8242b5998bd8a162$var$crawlSiblingsUp(el.parentNode, callback);
        else callback(sibling);
    });
}
function $8242b5998bd8a162$var$disableScrolling() {
    let overflow = document.documentElement.style.overflow;
    let paddingRight = document.documentElement.style.paddingRight;
    let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    return ()=>{
        document.documentElement.style.overflow = overflow;
        document.documentElement.style.paddingRight = paddingRight;
    };
}


function $31ce666712cb6b73$export$3ec6e0c16b571c32() {
    const id = Math.random().toString(36).slice(2, 6);
    return (string)=>`${string}-${id}`;
}




class $a5d5245eb2c20ecf$export$2e2bcd8739ae039 extends (0, $15sZk$hotwiredstimulus.Controller) {
    static targets = [
        "button",
        "panel"
    ];
    static values = {
        requireFocus: {
            type: Boolean,
            default: true
        }
    };
    initialize() {
        this.abortController = new AbortController();
        this.id = (0, $31ce666712cb6b73$export$3ec6e0c16b571c32)();
    }
    connect() {
        this.abortController = new AbortController();
        this.buttonTarget.setAttribute("aria-controls", this.panelTarget.id);
        if (this.requireFocusValue) this.element.addEventListener("focusout", this.focusout.bind(this), {
            signal: this.abortController.signal
        });
    }
    /**
   * @param {KeyboardEvent} event
   */ keydown(event) {
        switch(event.code){
            case "Space":
                event.preventDefault();
                this.toggle();
                break;
            case "Enter":
                event.preventDefault();
                this.toggle();
                break;
        }
    }
    /**
   * @param {FocusEvent} event
   */ focusout(event) {
        if (event.relatedTarget && !this.element.contains(event.relatedTarget)) this.close();
    }
    toggle() {
        if (this.buttonTarget.hasAttribute("aria-expanded") && this.buttonTarget.getAttribute("aria-expanded") !== "false") return this.close();
        this.open();
    }
    open() {
        this.buttonTarget.setAttribute("aria-expanded", "true");
        this.panelTarget.setAttribute("data-expanded", "true");
        this.dispatch("open");
    }
    close() {
        this.buttonTarget.setAttribute("aria-expanded", "false");
        this.panelTarget.removeAttribute("data-expanded");
        this.dispatch("close");
    }
    buttonTargetConnected(button) {
        button.addEventListener("click", this.toggle.bind(this), {
            signal: this.abortController.signal
        });
        button.addEventListener("keydown", this.keydown.bind(this), {
            signal: this.abortController.signal
        });
    }
    panelTargetConnected(panel) {
        if (!panel.hasAttribute("id")) panel.setAttribute("id", this.id("panel"));
    }
    disconnect() {
        this.abortController.abort();
    }
}




class $21507afd949ad379$export$2e2bcd8739ae039 extends (0, $15sZk$hotwiredstimulus.Controller) {
    static values = {
        mixed: {
            type: Boolean,
            default: false
        }
    };
    connect() {
        this.abortController = new AbortController();
        this.element.addEventListener("click", this.toggle.bind(this), {
            signal: this.abortController.signal
        });
        this.element.addEventListener("keydown", this.keydown.bind(this), {
            signal: this.abortController.signal
        });
        this.element.setAttribute("role", "checkbox");
        this.element.setAttribute("tabindex", "0");
        this.ariaChecked = (0, $15sZk$vuereactivity.ref)(this.element.getAttribute("aria-checked") ?? "false");
        (0, $15sZk$vuereactivity.effect)(()=>{
            this.element.setAttribute("aria-checked", this.ariaChecked.value);
        });
    }
    toggle() {
        switch(this.ariaChecked.value){
            case "true":
                this.ariaChecked.value = "false";
                break;
            case "false":
                if (this.mixedValue) this.ariaChecked.value = "mixed";
                else this.ariaChecked.value = "true";
                break;
            case "mixed":
                this.ariaChecked.value = "true";
                break;
        }
    }
    keydown(event) {
        switch(event.code){
            case "Space":
                event.preventDefault();
                this.toggle();
                break;
            case "Enter":
                event.preventDefault();
                this.toggle();
                break;
        }
    }
    disconnect() {
        this.abortController.abort();
    }
}



const $9ba86cc0085170e6$var$VISIBLE_TOASTS_AMOUNT = 3;
const $9ba86cc0085170e6$var$SWIPE_THRESHOLD = 20;
const $9ba86cc0085170e6$var$VELOCITY_THRESHHOLD = 0.11;
const $9ba86cc0085170e6$var$TOAST_LIFETIME = 4000;
const $9ba86cc0085170e6$var$TIME_BEFORE_UNMOUNT = 200;
const $9ba86cc0085170e6$var$COLLAPSE_DEBOUNCE_TIME = 100;
const $9ba86cc0085170e6$var$GAP = 14;
class $9ba86cc0085170e6$export$2e2bcd8739ae039 extends (0, $15sZk$hotwiredstimulus.Controller) {
    static targets = [
        "section",
        "list",
        "item"
    ];
    initialize() {
        this.listObserver = new MutationObserver(this.updateList.bind(this));
        this.dismissTimeouts = [];
    }
    /**
   * @param {HTMLElement} element
   */ itemTargetConnected(element) {
        element.setAttribute("aria-live", "polite");
        element.setAttribute("aria-atomic", "true");
        element.setAttribute("role", "status");
        element.setAttribute("tabindex", "0");
        element.setAttribute("data-visible", "");
    }
    /**
   * @param {HTMLElement} element
   */ sectionTargetConnected(element) {
        element.setAttribute("aria-label", "Notifications alt+T");
        element.setAttribute("tabindex", "-1");
    }
    /**
   * @param {HTMLElement} element
   */ listTargetConnected(element) {
        element.setAttribute("tabindex", "-1");
        element.style.setProperty("--gap", `${$9ba86cc0085170e6$var$GAP}px`);
        this.listObserver.observe(element, {
            childList: true,
            subtree: true
        });
    }
    expand() {
        while(this.dismissTimeouts.length > 0)clearTimeout(this.dismissTimeouts.pop());
        clearTimeout(this.collapseTimeout);
        Array.from(this.listTarget.children).forEach((toast)=>{
            toast.setAttribute("data-expanded", "");
        });
    }
    collapse() {
        this.collapseTimeout = setTimeout(()=>{
            Array.from(this.listTarget.children).forEach((toast, index)=>{
                toast.removeAttribute("data-expanded");
                this.dismissTimeouts.push(setTimeout(()=>{
                    this.dismiss(toast);
                }, $9ba86cc0085170e6$var$TOAST_LIFETIME + index * 500));
            });
        }, $9ba86cc0085170e6$var$COLLAPSE_DEBOUNCE_TIME);
    }
    swipeStart(toast, event) {
        toast.setAttribute("data-swiping", "");
        toast.setPointerCapture(event.pointerId);
        this.pointerStart = event;
        this.pointerStart.time = new Date().getTime();
    }
    swipeMove(toast, event) {
        if (this.pointerStart) {
            this.swipeAmount = -Math.min(this.pointerStart.y - event.y, 0);
            toast.style.setProperty("--swipe-amount", `${this.swipeAmount}px`);
        }
    }
    swipeEnd(toast, event) {
        toast.removeAttribute("data-swiping");
        toast.releasePointerCapture(event.pointerId);
        const timeTaken = new Date().getTime() - this.pointerStart.time;
        const velocity = this.swipeAmount / timeTaken;
        toast.style.setProperty("--swipe-amount", "0px");
        if (this.swipeAmount >= $9ba86cc0085170e6$var$SWIPE_THRESHOLD || velocity >= $9ba86cc0085170e6$var$VELOCITY_THRESHHOLD) this.dismiss(toast);
    }
    /**
   * @param {HTMLElement} element
   */ dismiss(toast) {
        toast.removeEventListener("pointerdown", this.swipeStart.bind(this, toast));
        toast.removeEventListener("pointermove", this.swipeMove.bind(this, toast));
        toast.removeEventListener("pointerup", this.swipeEnd.bind(this, toast));
        toast.removeEventListener("pointerenter", this.expand.bind(this));
        toast.removeEventListener("pointerleave", this.collapse.bind(this));
        toast.removeAttribute("data-mounted");
        setTimeout(()=>{
            toast.remove();
        }, $9ba86cc0085170e6$var$TIME_BEFORE_UNMOUNT);
    }
    updateList(records) {
        for (const record of records){
            if (record.addedNodes.length > 0) {
                // Toast added to the list
                /**
         * @type {HTMLElement}
         */ const frontToast = Array.from(record.addedNodes).filter((node)=>node.nodeType === Node.ELEMENT_NODE)[0];
                this.dismissTimeouts.push(setTimeout(()=>{
                    this.dismiss(frontToast);
                }, $9ba86cc0085170e6$var$TOAST_LIFETIME));
                frontToast.addEventListener("pointerdown", this.swipeStart.bind(this, frontToast));
                frontToast.addEventListener("pointermove", this.swipeMove.bind(this, frontToast));
                frontToast.addEventListener("pointerup", this.swipeEnd.bind(this, frontToast));
                frontToast.addEventListener("pointerenter", this.expand.bind(this));
                frontToast.addEventListener("pointerleave", this.collapse.bind(this));
                // const dismissTimeout = setTimeout(() => {
                //   this.dismiss(frontToast);
                //   clearTimeout(dismissTimeout);
                // }, TOAST_LIFETIME);
                const frontToastRect = frontToast.getBoundingClientRect();
                let offset = 0;
                requestAnimationFrame(()=>{
                    setTimeout(()=>{
                        frontToast.setAttribute("data-mounted", "");
                    });
                });
                frontToast.style.setProperty("--initial-height", `${frontToastRect.height}px`);
                for(let i = this.listTarget.children.length - 1; i >= 0; i--){
                    const toast = this.listTarget.children[i];
                    toast.removeAttribute("data-front");
                    if (i < this.listTarget.children.length - $9ba86cc0085170e6$var$VISIBLE_TOASTS_AMOUNT) toast.removeAttribute("data-visible");
                    toast.style.setProperty("--toasts-before", this.listTarget.children.length - i - 1);
                    toast.style.setProperty("--front-height", `${frontToastRect.height}px`);
                    toast.style.setProperty("--offset", `${offset + $9ba86cc0085170e6$var$GAP * (this.listTarget.children.length - i - 1)}px`);
                    offset += parseInt(getComputedStyle(toast).getPropertyValue("--initial-height").slice(0, -2));
                    toast.style.setProperty("--z-index", i);
                }
                frontToast.setAttribute("data-front", "");
            }
            if (record.removedNodes.length > 0 && this.listTarget.children.length > 0) {
                // Toast removed from the list
                /**
         * @type {HTMLElement}
         */ const frontToast = this.listTarget.children[this.listTarget.children.length - 1];
                const frontToastRect = frontToast.getBoundingClientRect();
                let offset = 0;
                for(let i = this.listTarget.children.length - 1; i >= 0; i--){
                    const toast = this.listTarget.children[i];
                    toast.removeAttribute("data-front");
                    if (i < this.listTarget.children.length - $9ba86cc0085170e6$var$VISIBLE_TOASTS_AMOUNT) toast.removeAttribute("data-visible");
                    toast.style.setProperty("--toasts-before", this.listTarget.children.length - i - 1);
                    toast.style.setProperty("--front-height", `${frontToastRect.height}px`);
                    toast.style.setProperty("--offset", `${offset + $9ba86cc0085170e6$var$GAP * (this.listTarget.children.length - i - 1)}px`);
                    offset += parseInt(getComputedStyle(toast).getPropertyValue("--initial-height").slice(0, -2));
                    toast.style.setProperty("--z-index", i);
                }
                frontToast.setAttribute("data-front", "");
            }
        }
    }
    show({ params: { id: id } }) {
        const template = document.getElementById(id);
        const itemFragment = template.content.cloneNode(true);
        this.listTarget.appendChild(itemFragment);
    }
    disconnect() {
        this.listObserver.disconnect();
    }
}




class $124f640f097e3bdc$export$2e2bcd8739ae039 extends (0, $15sZk$hotwiredstimulus.Controller) {
    static targets = [
        "anchor",
        "popover"
    ];
    static values = {
        placement: {
            type: String,
            default: "bottom"
        }
    };
    connect() {
        const popoverStyle = getComputedStyle(popover);
        const offsetValue = parseInt(popoverStyle.getPropertyValue("--popover-offset"));
        const paddingValue = parseInt(popoverStyle.getPropertyValue("--popover-padding"));
        this.cleanup = (0, $15sZk$floatinguidom.autoUpdate)(this.anchorTarget, this.popoverTarget, ()=>{
            (0, $15sZk$floatinguidom.computePosition)(this.anchorTarget, this.popoverTarget, {
                placement: this.placementValue,
                middleware: [
                    (0, $15sZk$floatinguidom.offset)(offsetValue),
                    (0, $15sZk$floatinguidom.flip)({
                        padding: paddingValue
                    }),
                    (0, $15sZk$floatinguidom.shift)({
                        padding: paddingValue
                    })
                ]
            }).then(({ x: x, y: y })=>{
                Object.assign(this.popoverTarget.style, {
                    left: `${x}px`,
                    top: `${y}px`
                });
            });
        });
    }
    disconnect() {
        if (this.cleanup) this.cleanup();
    }
}




class $a664f3c44d68388c$export$2e2bcd8739ae039 extends (0, $15sZk$hotwiredstimulus.Controller) {
    connect() {
        this.children = (0, $15sZk$tabbable.focusable)(this.element);
    // this.within = el;
    // this.noscroll = false;
    // this.wrapAround = false;
    }
    /**
   *
   * @param {Event} event
   */ focus(event) {
        console.log(event);
    // event.target.focus();
    }
    /**
   *
   * @param {Event} event
   */ next(event) {
        console.log(event);
    }
}





class $5c603e2cf2e2ac2c$export$2e2bcd8739ae039 extends (0, $15sZk$hotwiredstimulus.Controller) {
    static targets = [
        "list",
        "tab",
        "panel"
    ];
    static values = {
        manual: Boolean
    };
    initialize() {
        this.abortController = new AbortController();
        this.id = (0, $31ce666712cb6b73$export$3ec6e0c16b571c32)();
        this.selected = (0, $15sZk$vuereactivity.ref)(null);
        this.tabsConnected = 0;
        this.panelsConnected = 0;
        this.animationTimer;
        this.dispose = (0, $15sZk$vuereactivity.effect)(()=>{
            if (this.selected.value) {
                this.tabTargets.forEach((tab)=>{
                    if (tab.getAttribute("aria-controls") === this.selected.value) {
                        tab.setAttribute("aria-selected", "true");
                        tab.removeAttribute("tabindex");
                    // this.moveIndicator(tab);
                    } else {
                        tab.setAttribute("aria-selected", "false");
                        tab.setAttribute("tabindex", "-1");
                    }
                });
                this.panelTargets.forEach((panel)=>{
                    if (panel.id === this.selected.value) panel.setAttribute("data-tabs-selected", "true");
                    else panel.removeAttribute("data-tabs-selected");
                });
            }
        });
    }
    select(tab) {
        this.selected.value = tab.getAttribute("aria-controls");
    }
    keydown(event) {
        event.preventDefault();
        let next = null;
        switch(event.code){
            case "ArrowLeft":
                next = this.listFocus.wrap().getPrevious();
                if (next) {
                    if (!this.manualValue) this.select(next);
                    this.listFocus.focus(next);
                }
                break;
            case "ArrowRight":
                next = this.listFocus.wrap().getNext();
                if (next) {
                    if (!this.manualValue) this.select(next);
                    this.listFocus.focus(next);
                }
                break;
            case "Home":
                next = this.listFocus.getFirst();
                if (next) {
                    if (!this.manualValue) this.select(next);
                    this.listFocus.focus(next);
                }
                break;
            case "End":
                next = this.listFocus.getLast();
                if (next) {
                    if (!this.manualValue) this.select(next);
                    this.listFocus.focus(next);
                }
                break;
        }
    }
    listTargetConnected(list) {
        list.setAttribute("role", "tablist");
        list.addEventListener("keydown", this.keydown.bind(this), {
            signal: this.abortController.signal
        });
        this.listFocus = (0, $8242b5998bd8a162$export$f8168d8dd8fd66e6)(list);
    }
    listTargetDisconnected(list) {
        list.removeEventListener("keydown", this.keydown.bind(this));
    }
    tabTargetConnected(tab) {
        tab.setAttribute("id", this.id(`tab-${this.tabsConnected}`));
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", this.id(`panel-${this.tabsConnected}`));
        tab.addEventListener("click", this.select.bind(this, tab), {
            signal: this.abortController.signal
        });
        this.tabsConnected++;
    }
    tabTargetDisconnected(tab) {
        tab.removeEventListener("click", this.select.bind(this, tab));
    }
    panelTargetConnected(panel) {
        panel.setAttribute("id", this.id(`panel-${this.panelsConnected}`));
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("tabindex", "0");
        panel.setAttribute("aria-labelledby", this.id(`tab-${this.panelsConnected}`));
        if (!!panel.hasAttribute("data-tabs-selected")) this.selected.value = panel.id;
        this.panelsConnected++;
    }
    disconnect() {
        this.abortController.abort();
        this.dispose();
    }
} // const right = oldTab.offsetLeft < newTab.offsetLeft;
 // let transitionWidth = null;
 // if (right) {
 //   transitionWidth =
 //     newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
 // } else {
 //   transitionWidth =
 //     oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
 //   this.listTarget.style.setProperty("--_left", newTab.offsetLeft + "px");
 // }
 // this.listTarget.style.setProperty(
 //   "--_width",
 //   transitionWidth / this.listTarget.offsetWidth
 // );
 // clearTimeout(this.animationTimer);
 // this.animationTimer = setTimeout(() => {
 // }, 120);


function $af87fa11b55d7ba6$export$e73a9d346ce244ee(stimulusApplication) {
    stimulusApplication.register("disclosure", (0, $a5d5245eb2c20ecf$export$2e2bcd8739ae039));
    stimulusApplication.register("checkbox", (0, $21507afd949ad379$export$2e2bcd8739ae039));
    stimulusApplication.register("toast", (0, $9ba86cc0085170e6$export$2e2bcd8739ae039));
    stimulusApplication.register("popover", (0, $124f640f097e3bdc$export$2e2bcd8739ae039));
    stimulusApplication.register("focus", (0, $a664f3c44d68388c$export$2e2bcd8739ae039));
    stimulusApplication.register("tabs", (0, $5c603e2cf2e2ac2c$export$2e2bcd8739ae039));
}


//# sourceMappingURL=index.cjs.map
