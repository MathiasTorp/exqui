"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qrcode = __importStar(require("qrcode"));
var styles_1 = __importDefault(require("./styles"));
var BrowserTransport = /** @class */ (function () {
    function BrowserTransport(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.classPrefix = options.classPrefix || 'anchor-link';
        this.injectStyles = !(options.injectStyles === false);
    }
    BrowserTransport.prototype.setupElements = function () {
        var _this = this;
        if (this.injectStyles && !this.styleEl) {
            this.styleEl = document.createElement('style');
            this.styleEl.type = 'text/css';
            var css = styles_1.default.replace(/%prefix%/g, this.classPrefix);
            this.styleEl.appendChild(document.createTextNode(css));
            document.head.appendChild(this.styleEl);
        }
        if (!this.containerEl) {
            this.containerEl = this.createEl();
            this.containerEl.className = this.classPrefix;
            this.containerEl.onclick = function (event) {
                if (event.target === _this.containerEl) {
                    event.stopPropagation();
                    _this.hide();
                    if (_this.activeCancel) {
                        _this.activeRequest = undefined;
                        _this.activeCancel('Modal closed');
                        _this.activeCancel = undefined;
                    }
                }
            };
            document.body.appendChild(this.containerEl);
        }
        if (!this.requestEl) {
            var wrapper = this.createEl({ class: 'inner' });
            this.requestEl = this.createEl({ class: 'request' });
            wrapper.appendChild(this.requestEl);
            this.containerEl.appendChild(wrapper);
        }
    };
    BrowserTransport.prototype.createEl = function (attrs) {
        var e_1, _a;
        if (!attrs)
            attrs = {};
        var el = document.createElement(attrs.tag || 'div');
        if (attrs) {
            try {
                for (var _b = __values(Object.keys(attrs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var attr = _c.value;
                    var value = attrs[attr];
                    switch (attr) {
                        case 'tag':
                            break;
                        case 'text':
                            el.appendChild(document.createTextNode(value));
                            break;
                        case 'class':
                            el.className = this.classPrefix + "-" + value;
                            break;
                        default:
                            el.setAttribute(attr, value);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return el;
    };
    BrowserTransport.prototype.hide = function () {
        if (this.containerEl) {
            this.containerEl.classList.remove(this.classPrefix + "-active");
        }
        this.clearTimers();
    };
    BrowserTransport.prototype.show = function () {
        if (this.containerEl) {
            this.containerEl.classList.add(this.classPrefix + "-active");
        }
    };
    BrowserTransport.prototype.displayRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var sameDeviceRequest, sameDeviceUri, crossDeviceUri, isIdentity, title, subtitle, qrEl, _a, linkEl, linkA, infoEl, infoTitle, infoSubtitle, actionEl, logoEl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.setupElements();
                        sameDeviceRequest = request.clone();
                        sameDeviceRequest.setInfoKey('same_device', true);
                        sameDeviceRequest.setInfoKey('return_path', returnUrl());
                        sameDeviceUri = sameDeviceRequest.encode(true, false);
                        crossDeviceUri = request.encode(true, false);
                        isIdentity = request.isIdentity();
                        title = isIdentity ? 'Login' : 'Sign';
                        subtitle = 'Scan the QR-code with your Anchor app.';
                        qrEl = this.createEl({ class: 'qr' });
                        _a = qrEl;
                        return [4 /*yield*/, qrcode.toString(crossDeviceUri, {
                                margin: 0,
                                errorCorrectionLevel: 'L',
                            })];
                    case 1:
                        _a.innerHTML = _b.sent();
                        linkEl = this.createEl({ class: 'uri' });
                        linkA = this.createEl({
                            tag: 'a',
                            href: crossDeviceUri,
                            text: 'Open Anchor app',
                        });
                        linkA.addEventListener('click', function (event) {
                            event.preventDefault();
                            window.location.href = sameDeviceUri;
                        });
                        linkEl.appendChild(linkA);
                        infoEl = this.createEl({ class: 'info' });
                        infoTitle = this.createEl({ class: 'title', tag: 'span', text: title });
                        infoSubtitle = this.createEl({ class: 'subtitle', tag: 'span', text: subtitle });
                        infoEl.appendChild(infoTitle);
                        infoEl.appendChild(infoSubtitle);
                        actionEl = this.createEl({ class: 'actions' });
                        actionEl.appendChild(qrEl);
                        actionEl.appendChild(linkEl);
                        emptyElement(this.requestEl);
                        logoEl = this.createEl({ class: 'logo' });
                        this.requestEl.appendChild(logoEl);
                        this.requestEl.appendChild(infoEl);
                        this.requestEl.appendChild(actionEl);
                        this.show();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrowserTransport.prototype.onRequest = function (request, cancel) {
        this.activeRequest = request;
        this.activeCancel = cancel;
        this.displayRequest(request).catch(cancel);
    };
    BrowserTransport.prototype.onSessionRequest = function (session, request, cancel) {
        if (session.metadata.sameDevice) {
            request.setInfoKey('return_path', returnUrl());
        }
        if (session.type === 'fallback') {
            this.onRequest(request, cancel);
            if (session.metadata.sameDevice) {
                // trigger directly on a fallback same-device session
                window.location.href = request.encode();
            }
            return;
        }
        this.activeRequest = request;
        this.activeCancel = cancel;
        this.setupElements();
        var timeout = session.metadata.timeout || 60 * 1000 * 2;
        var deviceName = session.metadata.name;
        var start = Date.now();
        var infoTitle = this.createEl({ class: 'title', tag: 'span', text: 'Sign' });
        var updateCountdown = function () {
            var timeLeft = timeout + start - Date.now();
            var timeFormatted = timeLeft > 0 ? new Date(timeLeft).toISOString().substr(14, 5) : '00:00';
            infoTitle.textContent = "Sign - " + timeFormatted;
        };
        this.countdownTimer = setInterval(updateCountdown, 500);
        updateCountdown();
        var infoEl = this.createEl({ class: 'info' });
        infoEl.appendChild(infoTitle);
        var subtitle;
        if (deviceName && deviceName.length > 0) {
            subtitle = "Please open Anchor app on \u201C" + deviceName + "\u201D to review and sign the transaction.";
        }
        else {
            subtitle = 'Please review and sign the transaction in the linked wallet.';
        }
        var infoSubtitle = this.createEl({ class: 'subtitle', tag: 'span', text: subtitle });
        infoEl.appendChild(infoSubtitle);
        emptyElement(this.requestEl);
        var logoEl = this.createEl({ class: 'logo' });
        this.requestEl.appendChild(logoEl);
        this.requestEl.appendChild(infoEl);
        this.show();
        if (isAppleHandheld() && session.metadata.sameDevice) {
            window.location.href = 'anchor://link';
        }
    };
    BrowserTransport.prototype.clearTimers = function () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = undefined;
        }
        if (this.countdownTimer) {
            clearTimeout(this.countdownTimer);
            this.countdownTimer = undefined;
        }
    };
    BrowserTransport.prototype.onSuccess = function (request) {
        var _this = this;
        if (request === this.activeRequest) {
            this.clearTimers();
            this.setupElements();
            var infoEl = this.createEl({ class: 'info' });
            var logoEl = this.createEl({ class: 'logo' });
            logoEl.classList.add('success');
            var infoTitle = this.createEl({ class: 'title', tag: 'span', text: 'Success!' });
            var subtitle = request.isIdentity()
                ? 'Identity signed.'
                : 'Transaction signed.';
            var infoSubtitle = this.createEl({ class: 'subtitle', tag: 'span', text: subtitle });
            infoEl.appendChild(infoTitle);
            infoEl.appendChild(infoSubtitle);
            emptyElement(this.requestEl);
            this.requestEl.appendChild(logoEl);
            this.requestEl.appendChild(infoEl);
            this.show();
            this.closeTimer = setTimeout(function () {
                _this.hide();
            }, 1.5 * 1000);
        }
    };
    BrowserTransport.prototype.onFailure = function (request, error) {
        var _this = this;
        if (request === this.activeRequest) {
            this.clearTimers();
            this.setupElements();
            var infoEl = this.createEl({ class: 'info' });
            var logoEl = this.createEl({ class: 'logo' });
            logoEl.classList.add('error');
            var infoTitle = this.createEl({
                class: 'title',
                tag: 'span',
                text: 'Transaction error',
            });
            var infoSubtitle = this.createEl({
                class: 'subtitle',
                tag: 'span',
                text: error.message || String(error),
            });
            infoEl.appendChild(infoTitle);
            infoEl.appendChild(infoSubtitle);
            emptyElement(this.requestEl);
            this.requestEl.appendChild(logoEl);
            this.requestEl.appendChild(infoEl);
            this.show();
            this.closeTimer = setTimeout(function () {
                _this.hide();
            }, 5 * 1000);
        }
    };
    return BrowserTransport;
}());
exports.default = BrowserTransport;
function emptyElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
var returnUrlAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var returnUrlAlphabetLen = returnUrlAlphabet.length;
/** Generate a return url with a random #fragment so mobile safari will redirect back w/o reload. */
function returnUrl() {
    var rv = window.location.href.split('#')[0] + '#';
    for (var i = 0; i < 8; i++) {
        rv += returnUrlAlphabet.charAt(Math.floor(Math.random() * returnUrlAlphabetLen));
    }
    return rv;
}
function isAppleHandheld() {
    return /iP(ad|od|hone)/i.test(navigator.userAgent);
}
//# sourceMappingURL=index.js.map