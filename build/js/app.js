(() => {
  // src/scripts/cursorController.ts
  var cursorController = () => {
    const cursor = document.querySelector(".cursor");
    const cursorInner = document.querySelector(".cursor2");
    const links = document.querySelectorAll("a");
    if (cursor) {
      cursor.style.display = "none";
    }
    if (cursorInner) {
      cursorInner.style.opacity = "0";
    }
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) {
      document.addEventListener("mousemove", (e2) => {
        if (cursor) {
          cursor.style.display = "block";
        }
        if (cursorInner) {
          cursorInner.style.opacity = "1";
          cursorInner.style.left = `${e2.clientX}px`;
          cursorInner.style.top = `${e2.clientY}px`;
        }
        if (cursor) {
          cursor.style.transform = `translate3d(calc(${e2.clientX}px - 50%), calc(${e2.clientY}px - 50%), 0)`;
        }
      });
      document.addEventListener("mousedown", () => {
        if (cursor) {
          cursor.classList.add("click");
        }
        if (cursorInner) {
          cursorInner.classList.add("cursorinnerhover");
        }
      });
      document.addEventListener("mouseup", () => {
        if (cursor) {
          cursor.classList.remove("click");
        }
        if (cursorInner) {
          cursorInner.classList.remove("cursorinnerhover");
        }
      });
      links.forEach((link) => {
        link.addEventListener("mouseover", () => {
          if (cursor) {
            cursor.classList.add("hover");
          }
        });
        link.addEventListener("mouseleave", () => {
          if (cursor) {
            cursor.classList.remove("hover");
          }
        });
      });
    }
  };

  // src/scripts/preloaderController.ts
  var preloaderController = () => {
    const PRELOADER = document.querySelector(".preloader");
    const BODY = document.querySelector("body");
    const HEADER = document.querySelector(".header__container");
    if (PRELOADER)
      PRELOADER.style.display = "none";
    if (BODY)
      BODY.classList.remove("inactive");
    if (HEADER)
      HEADER.classList.remove("visually-hidden");
  };

  // src/scripts/router/Router.ts
  var Router = class {
    routes = [];
    rootElement;
    currentControllerCleanup = () => {
    };
    constructor(rootElementId) {
      this.rootElement = document.getElementById(rootElementId);
      window.addEventListener("popstate", () => this.loadRoute());
    }
    addRoute(path, templateId, controller) {
      this.routes.push({ path, templateId, controller });
    }
    loadRoute() {
      if (typeof this.currentControllerCleanup === "function") {
        this.currentControllerCleanup();
      }
      const currentPath = window.location.pathname;
      const route = this.routes.find((r2) => r2.path === currentPath);
      if (route) {
        const template = document.getElementById(
          route.templateId
        );
        if (template) {
          this.rootElement.innerHTML = "";
          this.rootElement.appendChild(template.content.cloneNode(true));
          this.currentControllerCleanup = route.controller ? route.controller() : () => {
          };
        }
      } else {
        this.rootElement.innerHTML = "<h1>404 - Page Not Found</h1>";
        this.currentControllerCleanup = () => {
        };
      }
    }
    navigate(path) {
      history.pushState({}, "", path);
      this.loadRoute();
    }
  };
  var Router_default = Router;

  // src/vendor/components/accordion/accordion.js
  var accordionAllInstances = [];
  var Accordion = class {
    constructor(selector, options) {
      let defaultOptions = {
        isOpen: () => {
        },
        isClose: () => {
        },
        speed: 300,
        spoilers: false
        // if don't need to close all accordions when one is open, change to true
      };
      this.all = [];
      this.options = Object.assign(defaultOptions, options);
      this.accordion = document.querySelector(selector);
      if (!this.accordion) {
        console.error(`Accordion element not found for selector: ${selector}`);
        return;
      }
      this.accordion.setAttribute("accord-init", true);
      this.control = this.accordion.querySelector(".accordion__control");
      this.content = this.accordion.querySelector(".accordion__content");
      if (!this.control || !this.content) {
        console.error("Accordion control or content element not found.");
        return;
      }
      this.event();
      accordionAllInstances.push(this);
    }
    event() {
      this.accordion.addEventListener("click", (e2) => {
        this.accordion.classList.toggle("open");
        if (this.accordion.classList.contains("open")) {
          this.open();
        } else {
          this.close(this);
        }
      });
    }
    open() {
      if (this.options.spoilers === false) {
        this.closeAll();
      }
      this.accordion.style.setProperty(
        "--accordion-time",
        `${this.options.speed / 1e3}s`
      );
      this.accordion.classList.add("is-open");
      this.control.setAttribute("aria-expanded", true);
      this.control.setAttribute("aria-hidden", false);
      this.content.style.maxHeight = this.content.scrollHeight + "px";
      this.options.isOpen(this);
    }
    close(el) {
      el.accordion.classList.remove("open");
      el.accordion.classList.remove("is-open");
      el.control.setAttribute("aria-expanded", false);
      el.control.setAttribute("aria-hidden", true);
      el.content.style.maxHeight = null;
      el.options.isClose(this);
    }
    closeAll() {
      if (accordionAllInstances.length > 0) {
        accordionAllInstances.forEach((el) => {
          if (el.accordion.classList.contains("is-open")) {
            el.close(el);
          }
        });
      } else {
        console.warn("No accordion instances found to close.");
      }
    }
    destroy() {
      this.accordion.removeEventListener("click", this.event);
      this.accordion.removeAttribute("accord-init");
      this.all = [];
      const index2 = accordionAllInstances.indexOf(this);
      if (index2 > -1) {
        accordionAllInstances.splice(index2, 1);
      }
    }
  };

  // src/scripts/headerController.ts
  var $body = document.querySelector("body");
  var headerController = () => {
    const $header = document.querySelector(".header__container");
    let $burger;
    let $menu;
    if ($header) {
      $burger = $header.querySelector(".nav-mobile__button");
      $menu = $header.querySelector(".mobile-nav-wrapper");
    }
    if ($burger) {
      $burger.addEventListener("click", () => {
        $header.classList.toggle("is-active");
        if ($menu)
          $menu.classList.toggle("is-active");
        $body.classList.toggle("inactive");
      });
    }
  };

  // src/scripts/pages/about/aboutPageController.ts
  var aboutPageController = () => {
    headerController();
    const accordion1Element = document.querySelector(".accordion-1");
    const accordion2Element = document.querySelector(".accordion-2");
    const accordion3Element = document.querySelector(".accordion-3");
    const accordion1 = accordion1Element ? new Accordion(".accordion-1", { speed: 500, spoilers: false }) : null;
    const accordion2 = accordion2Element ? new Accordion(".accordion-2", { speed: 500, spoilers: false }) : null;
    const accordion3 = accordion3Element ? new Accordion(".accordion-3", { speed: 500, spoilers: false }) : null;
    return () => {
      accordion1?.destroy();
      accordion2?.destroy();
      accordion3?.destroy();
    };
  };

  // node_modules/.pnpm/just-validate@4.3.0/node_modules/just-validate/dist/just-validate.es.js
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var INTEGER_REGEXP = /^-?[0-9]\d*$/;
  var PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  var STRONG_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  var isEmpty = (value) => {
    let newVal = value;
    if (typeof value === "string") {
      newVal = value.trim();
    }
    return !newVal;
  };
  var isEmail = (value) => {
    return EMAIL_REGEXP.test(value);
  };
  var isLengthMoreThanMax = (value, len) => {
    return value.length > len;
  };
  var isLengthLessThanMin = (value, len) => {
    return value.length < len;
  };
  var isNumber = (value) => {
    if (typeof value !== "string") {
      return false;
    }
    return !isNaN(+value) && !isNaN(parseFloat(value));
  };
  var isInteger = (value) => {
    return INTEGER_REGEXP.test(value);
  };
  var isPassword = (value) => {
    return PASSWORD_REGEXP.test(value);
  };
  var isStrongPassword = (value) => {
    return STRONG_PASSWORD_REGEXP.test(value);
  };
  var isNumberMoreThanMax = (value, len) => {
    return value > len;
  };
  var isNumberLessThanMin = (value, len) => {
    return value < len;
  };
  var isInvalidOrEmptyString = (value) => {
    return typeof value !== "string" || value === "";
  };
  var Rules = /* @__PURE__ */ ((Rules22) => {
    Rules22["Required"] = "required";
    Rules22["Email"] = "email";
    Rules22["MinLength"] = "minLength";
    Rules22["MaxLength"] = "maxLength";
    Rules22["Password"] = "password";
    Rules22["Number"] = "number";
    Rules22["Integer"] = "integer";
    Rules22["MaxNumber"] = "maxNumber";
    Rules22["MinNumber"] = "minNumber";
    Rules22["StrongPassword"] = "strongPassword";
    Rules22["CustomRegexp"] = "customRegexp";
    Rules22["MinFilesCount"] = "minFilesCount";
    Rules22["MaxFilesCount"] = "maxFilesCount";
    Rules22["Files"] = "files";
    return Rules22;
  })(Rules || {});
  var GroupRules = /* @__PURE__ */ ((GroupRules2) => {
    GroupRules2["Required"] = "required";
    return GroupRules2;
  })(GroupRules || {});
  var CustomStyleTagIds = /* @__PURE__ */ ((CustomStyleTagIds2) => {
    CustomStyleTagIds2["Label"] = "label";
    CustomStyleTagIds2["LabelArrow"] = "labelArrow";
    return CustomStyleTagIds2;
  })(CustomStyleTagIds || {});
  var defaultDictionary = [
    {
      key: Rules.Required,
      dict: {
        en: "The field is required"
      }
    },
    {
      key: Rules.Email,
      dict: {
        en: "Email has invalid format"
      }
    },
    {
      key: Rules.MaxLength,
      dict: {
        en: "The field must contain a maximum of :value characters"
      }
    },
    {
      key: Rules.MinLength,
      dict: {
        en: "The field must contain a minimum of :value characters"
      }
    },
    {
      key: Rules.Password,
      dict: {
        en: "Password must contain minimum eight characters, at least one letter and one number"
      }
    },
    {
      key: Rules.StrongPassword,
      dict: {
        en: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      }
    },
    {
      key: Rules.Number,
      dict: {
        en: "Value should be a number"
      }
    },
    {
      key: Rules.MaxNumber,
      dict: {
        en: "Number should be less or equal than :value"
      }
    },
    {
      key: Rules.MinNumber,
      dict: {
        en: "Number should be more or equal than :value"
      }
    },
    {
      key: Rules.MinFilesCount,
      dict: {
        en: "Files count should be more or equal than :value"
      }
    },
    {
      key: Rules.MaxFilesCount,
      dict: {
        en: "Files count should be less or equal than :value"
      }
    },
    {
      key: Rules.Files,
      dict: {
        en: "Uploaded files have one or several invalid properties (extension/size/type etc)."
      }
    }
  ];
  var DEFAULT_ERROR_FIELD_MESSAGE = "Value is incorrect";
  var isPromise = (val) => typeof val === "object" && val !== null && "then" in val && typeof val.then === "function";
  var getNodeParents = (el) => {
    let elem = el;
    const els = [];
    while (elem) {
      els.unshift(elem);
      elem = elem.parentNode;
    }
    return els;
  };
  var getClosestParent = (groups, parents2) => {
    const reversedParents = [...parents2].reverse();
    for (let i2 = 0, len = reversedParents.length; i2 < len; ++i2) {
      const parent2 = reversedParents[i2];
      for (const key in groups) {
        const group = groups[key];
        if (group.groupElem === parent2) {
          return [key, group];
        }
      }
    }
    return null;
  };
  var getClassList = (classList) => {
    if (Array.isArray(classList)) {
      return classList.filter((cls) => cls.length > 0);
    }
    if (typeof classList === "string" && classList.trim()) {
      return [...classList.split(" ").filter((cls) => cls.length > 0)];
    }
    return [];
  };
  var isElement = (element) => {
    return element instanceof Element || element instanceof HTMLDocument;
  };
  var errorLabelCss = `.just-validate-error-label[data-tooltip=true]{position:fixed;padding:4px 8px;background:#423f3f;color:#fff;white-space:nowrap;z-index:10;border-radius:4px;transform:translateY(-5px)}.just-validate-error-label[data-tooltip=true]:before{content:'';width:0;height:0;border-left:solid 5px transparent;border-right:solid 5px transparent;border-bottom:solid 5px #423f3f;position:absolute;z-index:3;display:block;bottom:-5px;transform:rotate(180deg);left:calc(50% - 5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]{transform:translateX(-5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]:before{right:-7px;bottom:auto;left:auto;top:calc(50% - 2px);transform:rotate(90deg)}.just-validate-error-label[data-tooltip=true][data-direction=right]{transform:translateX(5px)}.just-validate-error-label[data-tooltip=true][data-direction=right]:before{right:auto;bottom:auto;left:-7px;top:calc(50% - 2px);transform:rotate(-90deg)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]{transform:translateY(5px)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]:before{right:auto;bottom:auto;left:calc(50% - 5px);top:-5px;transform:rotate(0)}`;
  var TOOLTIP_ARROW_HEIGHT = 5;
  var defaultGlobalConfig = {
    errorFieldStyle: {
      color: "#b81111",
      border: "1px solid #B81111"
    },
    errorFieldCssClass: "just-validate-error-field",
    successFieldCssClass: "just-validate-success-field",
    errorLabelStyle: {
      color: "#b81111"
    },
    errorLabelCssClass: "just-validate-error-label",
    successLabelCssClass: "just-validate-success-label",
    focusInvalidField: true,
    lockForm: true,
    testingMode: false,
    validateBeforeSubmitting: false,
    submitFormAutomatically: false
  };
  var JustValidate = class {
    constructor(form, globalConfig, dictLocale) {
      __publicField(this, "form", null);
      __publicField(this, "fields", {});
      __publicField(this, "groupFields", {});
      __publicField(this, "errors", {});
      __publicField(this, "isValid", false);
      __publicField(this, "isSubmitted", false);
      __publicField(this, "globalConfig", defaultGlobalConfig);
      __publicField(this, "errorLabels", {});
      __publicField(this, "successLabels", {});
      __publicField(this, "eventListeners", []);
      __publicField(this, "dictLocale", defaultDictionary);
      __publicField(this, "currentLocale", "en");
      __publicField(this, "customStyleTags", {});
      __publicField(this, "onSuccessCallback");
      __publicField(this, "onFailCallback");
      __publicField(this, "onValidateCallback");
      __publicField(this, "tooltips", []);
      __publicField(this, "lastScrollPosition");
      __publicField(this, "isScrollTick");
      __publicField(this, "fieldIds", /* @__PURE__ */ new Map());
      __publicField(this, "getKeyByFieldSelector", (field) => {
        return this.fieldIds.get(field);
      });
      __publicField(this, "getFieldSelectorByKey", (key) => {
        for (const [fieldSelector, k] of this.fieldIds) {
          if (key === k) {
            return fieldSelector;
          }
        }
        return void 0;
      });
      __publicField(this, "getCompatibleFields", () => {
        const fields = {};
        Object.keys(this.fields).forEach((key) => {
          let newKey = key;
          const fieldSelector = this.getFieldSelectorByKey(key);
          if (typeof fieldSelector === "string") {
            newKey = fieldSelector;
          }
          fields[newKey] = { ...this.fields[key] };
        });
        return fields;
      });
      __publicField(this, "setKeyByFieldSelector", (field) => {
        if (this.fieldIds.has(field)) {
          return this.fieldIds.get(field);
        }
        const key = String(this.fieldIds.size + 1);
        this.fieldIds.set(field, key);
        return key;
      });
      __publicField(this, "refreshAllTooltips", () => {
        this.tooltips.forEach((item) => {
          item.refresh();
        });
      });
      __publicField(this, "handleDocumentScroll", () => {
        this.lastScrollPosition = window.scrollY;
        if (!this.isScrollTick) {
          window.requestAnimationFrame(() => {
            this.refreshAllTooltips();
            this.isScrollTick = false;
          });
          this.isScrollTick = true;
        }
      });
      __publicField(this, "formSubmitHandler", (ev) => {
        ev.preventDefault();
        this.isSubmitted = true;
        this.validateHandler(ev);
      });
      __publicField(this, "handleFieldChange", (target) => {
        let foundKey;
        for (const key in this.fields) {
          const field = this.fields[key];
          if (field.elem === target) {
            foundKey = key;
            break;
          }
        }
        if (!foundKey) {
          return;
        }
        this.fields[foundKey].touched = true;
        this.validateField(foundKey, true);
      });
      __publicField(this, "handleGroupChange", (target) => {
        let foundKey;
        for (const key in this.groupFields) {
          const group = this.groupFields[key];
          if (group.elems.find((elem) => elem === target)) {
            foundKey = key;
            break;
          }
        }
        if (!foundKey) {
          return;
        }
        this.groupFields[foundKey].touched = true;
        this.validateGroup(foundKey, true);
      });
      __publicField(this, "handlerChange", (ev) => {
        if (!ev.target) {
          return;
        }
        this.handleFieldChange(ev.target);
        this.handleGroupChange(ev.target);
        this.renderErrors();
      });
      this.initialize(form, globalConfig, dictLocale);
    }
    initialize(form, globalConfig, dictLocale) {
      this.form = null;
      this.errors = {};
      this.isValid = false;
      this.isSubmitted = false;
      this.globalConfig = defaultGlobalConfig;
      this.errorLabels = {};
      this.successLabels = {};
      this.eventListeners = [];
      this.customStyleTags = {};
      this.tooltips = [];
      this.currentLocale = "en";
      if (typeof form === "string") {
        const elem = document.querySelector(form);
        if (!elem) {
          throw Error(
            `Form with ${form} selector not found! Please check the form selector`
          );
        }
        this.setForm(elem);
      } else if (form instanceof HTMLFormElement) {
        this.setForm(form);
      } else {
        throw Error(
          `Form selector is not valid. Please specify a string selector or a DOM element.`
        );
      }
      this.globalConfig = { ...defaultGlobalConfig, ...globalConfig };
      if (dictLocale) {
        this.dictLocale = [...dictLocale, ...defaultDictionary];
      }
      if (this.isTooltip()) {
        const styleTag = document.createElement("style");
        styleTag.textContent = errorLabelCss;
        this.customStyleTags[CustomStyleTagIds.Label] = document.head.appendChild(styleTag);
        this.addListener("scroll", document, this.handleDocumentScroll);
      }
    }
    getLocalisedString(rule, ruleValue, customMsg) {
      var _a;
      const search = customMsg != null ? customMsg : rule;
      let localisedStr = (_a = this.dictLocale.find((item) => item.key === search)) == null ? void 0 : _a.dict[this.currentLocale];
      if (!localisedStr) {
        if (customMsg) {
          localisedStr = customMsg;
        }
      }
      if (localisedStr && ruleValue !== void 0) {
        switch (rule) {
          case Rules.MaxLength:
          case Rules.MinLength:
          case Rules.MaxNumber:
          case Rules.MinNumber:
          case Rules.MinFilesCount:
          case Rules.MaxFilesCount:
            localisedStr = localisedStr.replace(":value", String(ruleValue));
        }
      }
      return localisedStr || customMsg || DEFAULT_ERROR_FIELD_MESSAGE;
    }
    getFieldErrorMessage(fieldRule, elem) {
      const msg = typeof fieldRule.errorMessage === "function" ? fieldRule.errorMessage(this.getElemValue(elem), this.fields) : fieldRule.errorMessage;
      return this.getLocalisedString(fieldRule.rule, fieldRule.value, msg);
    }
    getFieldSuccessMessage(successMessage, elem) {
      const msg = typeof successMessage === "function" ? successMessage(this.getElemValue(elem), this.fields) : successMessage;
      return this.getLocalisedString(void 0, void 0, msg);
    }
    getGroupErrorMessage(groupRule) {
      return this.getLocalisedString(
        groupRule.rule,
        void 0,
        groupRule.errorMessage
      );
    }
    getGroupSuccessMessage(groupRule) {
      if (!groupRule.successMessage) {
        return void 0;
      }
      return this.getLocalisedString(
        void 0,
        void 0,
        groupRule.successMessage
      );
    }
    setFieldInvalid(key, fieldRule) {
      this.fields[key].isValid = false;
      this.fields[key].errorMessage = this.getFieldErrorMessage(
        fieldRule,
        this.fields[key].elem
      );
    }
    setFieldValid(key, successMessage) {
      this.fields[key].isValid = true;
      if (successMessage !== void 0) {
        this.fields[key].successMessage = this.getFieldSuccessMessage(
          successMessage,
          this.fields[key].elem
        );
      }
    }
    setGroupInvalid(key, groupRule) {
      this.groupFields[key].isValid = false;
      this.groupFields[key].errorMessage = this.getGroupErrorMessage(groupRule);
    }
    setGroupValid(key, groupRule) {
      this.groupFields[key].isValid = true;
      this.groupFields[key].successMessage = this.getGroupSuccessMessage(groupRule);
    }
    getElemValue(elem) {
      switch (elem.type) {
        case "checkbox":
          return elem.checked;
        case "file":
          return elem.files;
        default:
          return elem.value;
      }
    }
    validateGroupRule(key, elems, groupRule) {
      switch (groupRule.rule) {
        case GroupRules.Required: {
          if (elems.every((elem) => !elem.checked)) {
            this.setGroupInvalid(key, groupRule);
          } else {
            this.setGroupValid(key, groupRule);
          }
        }
      }
    }
    validateFieldRule(key, elem, fieldRule, afterInputChanged = false) {
      const ruleValue = fieldRule.value;
      const elemValue = this.getElemValue(elem);
      if (fieldRule.plugin) {
        const result = fieldRule.plugin(
          elemValue,
          this.getCompatibleFields()
        );
        if (!result) {
          this.setFieldInvalid(key, fieldRule);
        }
        return;
      }
      switch (fieldRule.rule) {
        case Rules.Required: {
          if (isEmpty(elemValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.Email: {
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (!isEmail(elemValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.MaxLength: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (typeof ruleValue !== "number") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (isLengthMoreThanMax(elemValue, ruleValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.MinLength: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (typeof ruleValue !== "number") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (isLengthLessThanMin(elemValue, ruleValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.Password: {
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (!isPassword(elemValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.StrongPassword: {
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (!isStrongPassword(elemValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.Number: {
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (!isNumber(elemValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.Integer: {
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          if (!isInteger(elemValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.MaxNumber: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (typeof ruleValue !== "number") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          const num = +elemValue;
          if (Number.isNaN(num) || isNumberMoreThanMax(num, ruleValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.MinNumber: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (typeof ruleValue !== "number") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (isInvalidOrEmptyString(elemValue)) {
            break;
          }
          const num = +elemValue;
          if (Number.isNaN(num) || isNumberLessThanMin(num, ruleValue)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.CustomRegexp: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            return;
          }
          let regexp;
          try {
            regexp = new RegExp(ruleValue);
          } catch (e2) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] should be a valid regexp. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          const str = String(elemValue);
          if (str !== "" && !regexp.test(str)) {
            this.setFieldInvalid(key, fieldRule);
          }
          break;
        }
        case Rules.MinFilesCount: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (typeof ruleValue !== "number") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length < ruleValue) {
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          break;
        }
        case Rules.MaxFilesCount: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (typeof ruleValue !== "number") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length > ruleValue) {
            this.setFieldInvalid(key, fieldRule);
            break;
          }
          break;
        }
        case Rules.Files: {
          if (ruleValue === void 0) {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            return;
          }
          if (typeof ruleValue !== "object") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field should be an object. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            return;
          }
          const filesConfig = ruleValue.files;
          if (typeof filesConfig !== "object") {
            console.error(
              `Value for ${fieldRule.rule} rule for [${key}] field should be an object with files array. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            return;
          }
          const isFilePropsInvalid = (file, fileConfig) => {
            const minSizeInvalid = Number.isFinite(fileConfig.minSize) && file.size < fileConfig.minSize;
            const maxSizeInvalid = Number.isFinite(fileConfig.maxSize) && file.size > fileConfig.maxSize;
            const nameInvalid = Array.isArray(fileConfig.names) && !fileConfig.names.includes(file.name);
            const extInvalid = Array.isArray(fileConfig.extensions) && !fileConfig.extensions.includes(
              file.name.split(".")[file.name.split(".").length - 1]
            );
            const typeInvalid = Array.isArray(fileConfig.types) && !fileConfig.types.includes(file.type);
            return minSizeInvalid || maxSizeInvalid || nameInvalid || extInvalid || typeInvalid;
          };
          if (typeof elemValue === "object" && elemValue !== null) {
            for (let fileIdx = 0, len = elemValue.length; fileIdx < len; ++fileIdx) {
              const file = elemValue.item(fileIdx);
              if (!file) {
                this.setFieldInvalid(key, fieldRule);
                break;
              }
              const filesInvalid = isFilePropsInvalid(file, filesConfig);
              if (filesInvalid) {
                this.setFieldInvalid(key, fieldRule);
                break;
              }
            }
          }
          break;
        }
        default: {
          if (typeof fieldRule.validator !== "function") {
            console.error(
              `Validator for custom rule for [${key}] field should be a function. This field will be always invalid.`
            );
            this.setFieldInvalid(key, fieldRule);
            return;
          }
          const result = fieldRule.validator(
            elemValue,
            this.getCompatibleFields()
          );
          if (typeof result !== "boolean" && typeof result !== "function") {
            console.error(
              `Validator return value for [${key}] field should be boolean or function. It will be cast to boolean.`
            );
          }
          if (typeof result === "function") {
            if (afterInputChanged) {
              this.fields[key].asyncCheckPending = true;
            } else {
              this.fields[key].asyncCheckPending = false;
              const promise = result();
              if (!isPromise(promise)) {
                console.error(
                  `Validator function for custom rule for [${key}] field should return a Promise. This field will be always invalid.`
                );
                this.setFieldInvalid(key, fieldRule);
                return;
              }
              return promise.then((resp) => {
                if (!resp) {
                  this.setFieldInvalid(key, fieldRule);
                }
              }).catch(() => {
                this.setFieldInvalid(key, fieldRule);
              });
            }
          }
          if (!result) {
            this.setFieldInvalid(key, fieldRule);
          }
        }
      }
    }
    isFormValid() {
      let isValid = true;
      for (let i2 = 0, len = Object.values(this.fields).length; i2 < len; ++i2) {
        const item = Object.values(this.fields)[i2];
        if (item.isValid === void 0) {
          isValid = void 0;
          break;
        }
        if (item.isValid === false) {
          isValid = false;
          break;
        }
      }
      for (let i2 = 0, len = Object.values(this.groupFields).length; i2 < len; ++i2) {
        const item = Object.values(this.groupFields)[i2];
        if (item.isValid === void 0) {
          isValid = void 0;
          break;
        }
        if (item.isValid === false) {
          isValid = false;
          break;
        }
      }
      return isValid;
    }
    validateField(key, afterInputChanged = false) {
      var _a;
      const field = this.fields[key];
      field.isValid = true;
      const promises = [];
      [...field.rules].reverse().forEach((rule) => {
        const res = this.validateFieldRule(
          key,
          field.elem,
          rule,
          afterInputChanged
        );
        if (isPromise(res)) {
          promises.push(res);
        }
      });
      if (field.isValid) {
        this.setFieldValid(key, (_a = field.config) == null ? void 0 : _a.successMessage);
      }
      return Promise.allSettled(promises).finally(() => {
        var _a2;
        if (afterInputChanged) {
          (_a2 = this.onValidateCallback) == null ? void 0 : _a2.call(this, {
            isValid: this.isFormValid(),
            isSubmitted: this.isSubmitted,
            fields: this.getCompatibleFields(),
            groups: { ...this.groupFields }
          });
        }
      });
    }
    revalidateField(fieldSelector) {
      if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
        throw Error(
          `Field selector is not valid. Please specify a string selector or a valid DOM element.`
        );
      }
      const key = this.getKeyByFieldSelector(fieldSelector);
      if (!key || !this.fields[key]) {
        console.error(`Field not found. Check the field selector.`);
        return Promise.reject();
      }
      return new Promise((resolve) => {
        this.validateField(key, true).finally(() => {
          this.clearFieldStyle(key);
          this.clearFieldLabel(key);
          this.renderFieldError(key, true);
          resolve(!!this.fields[key].isValid);
        });
      });
    }
    revalidateGroup(groupSelector) {
      if (typeof groupSelector !== "string" && !isElement(groupSelector)) {
        throw Error(
          `Group selector is not valid. Please specify a string selector or a valid DOM element.`
        );
      }
      const key = this.getKeyByFieldSelector(groupSelector);
      if (!key || !this.groupFields[key]) {
        console.error(`Group not found. Check the group selector.`);
        return Promise.reject();
      }
      return new Promise((resolve) => {
        this.validateGroup(key).finally(() => {
          this.clearFieldLabel(key);
          this.renderGroupError(key, true);
          resolve(!!this.groupFields[key].isValid);
        });
      });
    }
    validateGroup(key, afterInputChanged = false) {
      const group = this.groupFields[key];
      const promises = [];
      [...group.rules].reverse().forEach((rule) => {
        const res = this.validateGroupRule(key, group.elems, rule);
        if (isPromise(res)) {
          promises.push(res);
        }
      });
      return Promise.allSettled(promises).finally(() => {
        var _a;
        if (afterInputChanged) {
          (_a = this.onValidateCallback) == null ? void 0 : _a.call(this, {
            isValid: this.isFormValid(),
            isSubmitted: this.isSubmitted,
            fields: this.getCompatibleFields(),
            groups: { ...this.groupFields }
          });
        }
      });
    }
    focusInvalidField() {
      for (const key in this.fields) {
        const field = this.fields[key];
        if (!field.isValid) {
          setTimeout(() => field.elem.focus(), 0);
          break;
        }
      }
    }
    afterSubmitValidation(forceRevalidation = false) {
      this.renderErrors(forceRevalidation);
      if (this.globalConfig.focusInvalidField) {
        this.focusInvalidField();
      }
    }
    validate(forceRevalidation = false) {
      return new Promise((resolve) => {
        const promises = [];
        Object.keys(this.fields).forEach((key) => {
          const promise = this.validateField(key);
          if (isPromise(promise)) {
            promises.push(promise);
          }
        });
        Object.keys(this.groupFields).forEach((key) => {
          const promise = this.validateGroup(key);
          if (isPromise(promise)) {
            promises.push(promise);
          }
        });
        Promise.allSettled(promises).then(() => {
          var _a;
          this.afterSubmitValidation(forceRevalidation);
          (_a = this.onValidateCallback) == null ? void 0 : _a.call(this, {
            isValid: this.isFormValid(),
            isSubmitted: this.isSubmitted,
            fields: this.getCompatibleFields(),
            groups: { ...this.groupFields }
          });
          resolve(!!promises.length);
        });
      });
    }
    revalidate() {
      return new Promise((resolve) => {
        this.validateHandler(void 0, true).finally(() => {
          if (this.globalConfig.focusInvalidField) {
            this.focusInvalidField();
          }
          resolve(this.isValid);
        });
      });
    }
    validateHandler(ev, forceRevalidation = false) {
      if (this.globalConfig.lockForm) {
        this.lockForm();
      }
      return this.validate(forceRevalidation).finally(() => {
        var _a, _b, _c;
        if (this.globalConfig.lockForm) {
          this.unlockForm();
        }
        if (this.isValid) {
          (_a = this.onSuccessCallback) == null ? void 0 : _a.call(this, ev);
          if (this.globalConfig.submitFormAutomatically) {
            (_b = ev == null ? void 0 : ev.currentTarget) == null ? void 0 : _b.submit();
          }
        } else {
          (_c = this.onFailCallback) == null ? void 0 : _c.call(this, this.getCompatibleFields(), this.groupFields);
        }
      });
    }
    setForm(form) {
      this.form = form;
      this.form.setAttribute("novalidate", "novalidate");
      this.removeListener("submit", this.form, this.formSubmitHandler);
      this.addListener("submit", this.form, this.formSubmitHandler);
    }
    addListener(type, elem, handler) {
      elem.addEventListener(type, handler);
      this.eventListeners.push({ type, elem, func: handler });
    }
    removeListener(type, elem, handler) {
      elem.removeEventListener(type, handler);
      this.eventListeners = this.eventListeners.filter(
        (item) => item.type !== type || item.elem !== elem
      );
    }
    addField(fieldSelector, rules, config) {
      if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
        throw Error(
          `Field selector is not valid. Please specify a string selector or a valid DOM element.`
        );
      }
      let elem;
      if (typeof fieldSelector === "string") {
        elem = this.form.querySelector(fieldSelector);
      } else {
        elem = fieldSelector;
      }
      if (!elem) {
        throw Error(
          `Field doesn't exist in the DOM! Please check the field selector.`
        );
      }
      if (!Array.isArray(rules) || !rules.length) {
        throw Error(
          `Rules argument should be an array and should contain at least 1 element.`
        );
      }
      rules.forEach((item) => {
        if (!("rule" in item || "validator" in item || "plugin" in item)) {
          throw Error(
            `Rules argument must contain at least one rule or validator property.`
          );
        }
        if (!item.validator && !item.plugin && (!item.rule || !Object.values(Rules).includes(item.rule))) {
          throw Error(
            `Rule should be one of these types: ${Object.values(Rules).join(
              ", "
            )}. Provided value: ${item.rule}`
          );
        }
      });
      const key = this.setKeyByFieldSelector(fieldSelector);
      this.fields[key] = {
        elem,
        rules,
        isValid: void 0,
        touched: false,
        config
      };
      this.setListeners(elem);
      if (this.isSubmitted || this.globalConfig.validateBeforeSubmitting) {
        this.validateField(key);
      }
      return this;
    }
    removeField(fieldSelector) {
      if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) {
        throw Error(
          `Field selector is not valid. Please specify a string selector or a valid DOM element.`
        );
      }
      const key = this.getKeyByFieldSelector(fieldSelector);
      if (!key || !this.fields[key]) {
        console.error(`Field not found. Check the field selector.`);
        return this;
      }
      const type = this.getListenerType(this.fields[key].elem.type);
      this.removeListener(type, this.fields[key].elem, this.handlerChange);
      this.clearErrors();
      delete this.fields[key];
      return this;
    }
    removeGroup(group) {
      if (typeof group !== "string") {
        throw Error(
          `Group selector is not valid. Please specify a string selector.`
        );
      }
      const key = this.getKeyByFieldSelector(group);
      if (!key || !this.groupFields[key]) {
        console.error(`Group not found. Check the group selector.`);
        return this;
      }
      this.groupFields[key].elems.forEach((elem) => {
        const type = this.getListenerType(elem.type);
        this.removeListener(type, elem, this.handlerChange);
      });
      this.clearErrors();
      delete this.groupFields[key];
      return this;
    }
    addRequiredGroup(groupField, errorMessage, config, successMessage) {
      if (typeof groupField !== "string" && !isElement(groupField)) {
        throw Error(
          `Group selector is not valid. Please specify a string selector or a valid DOM element.`
        );
      }
      let elem;
      if (typeof groupField === "string") {
        elem = this.form.querySelector(groupField);
      } else {
        elem = groupField;
      }
      if (!elem) {
        throw Error(`Group selector not found! Please check the group selector.`);
      }
      const inputs = elem.querySelectorAll("input");
      const childrenInputs = Array.from(inputs).filter((input) => {
        const parent2 = getClosestParent(this.groupFields, getNodeParents(input));
        if (!parent2) {
          return true;
        }
        return parent2[1].elems.find((elem2) => elem2 !== input);
      });
      const key = this.setKeyByFieldSelector(groupField);
      this.groupFields[key] = {
        rules: [
          {
            rule: GroupRules.Required,
            errorMessage,
            successMessage
          }
        ],
        groupElem: elem,
        elems: childrenInputs,
        touched: false,
        isValid: void 0,
        config
      };
      inputs.forEach((input) => {
        this.setListeners(input);
      });
      return this;
    }
    getListenerType(type) {
      switch (type) {
        case "checkbox":
        case "select-one":
        case "file":
        case "radio": {
          return "change";
        }
        default: {
          return "input";
        }
      }
    }
    setListeners(elem) {
      const type = this.getListenerType(elem.type);
      this.removeListener(type, elem, this.handlerChange);
      this.addListener(type, elem, this.handlerChange);
    }
    clearFieldLabel(key) {
      var _a, _b;
      (_a = this.errorLabels[key]) == null ? void 0 : _a.remove();
      (_b = this.successLabels[key]) == null ? void 0 : _b.remove();
    }
    clearFieldStyle(key) {
      var _a, _b, _c, _d;
      const field = this.fields[key];
      const errorStyle = ((_a = field.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
      Object.keys(errorStyle).forEach((key2) => {
        field.elem.style[key2] = "";
      });
      const successStyle = ((_b = field.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
      Object.keys(successStyle).forEach((key2) => {
        field.elem.style[key2] = "";
      });
      field.elem.classList.remove(
        ...getClassList(
          ((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
        ),
        ...getClassList(
          ((_d = field.config) == null ? void 0 : _d.successFieldCssClass) || this.globalConfig.successFieldCssClass
        )
      );
    }
    clearErrors() {
      var _a, _b;
      Object.keys(this.errorLabels).forEach(
        (key) => this.errorLabels[key].remove()
      );
      Object.keys(this.successLabels).forEach(
        (key) => this.successLabels[key].remove()
      );
      for (const key in this.fields) {
        this.clearFieldStyle(key);
      }
      for (const key in this.groupFields) {
        const group = this.groupFields[key];
        const errorStyle = ((_a = group.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
        Object.keys(errorStyle).forEach((key2) => {
          group.elems.forEach((elem) => {
            var _a2;
            elem.style[key2] = "";
            elem.classList.remove(
              ...getClassList(
                ((_a2 = group.config) == null ? void 0 : _a2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
              )
            );
          });
        });
        const successStyle = ((_b = group.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
        Object.keys(successStyle).forEach((key2) => {
          group.elems.forEach((elem) => {
            var _a2;
            elem.style[key2] = "";
            elem.classList.remove(
              ...getClassList(
                ((_a2 = group.config) == null ? void 0 : _a2.successFieldCssClass) || this.globalConfig.successFieldCssClass
              )
            );
          });
        });
      }
      this.tooltips = [];
    }
    isTooltip() {
      return !!this.globalConfig.tooltip;
    }
    lockForm() {
      const elems = this.form.querySelectorAll(
        "input, textarea, button, select"
      );
      for (let i2 = 0, len = elems.length; i2 < len; ++i2) {
        elems[i2].setAttribute(
          "data-just-validate-fallback-disabled",
          elems[i2].disabled ? "true" : "false"
        );
        elems[i2].setAttribute("disabled", "disabled");
        elems[i2].style.pointerEvents = "none";
        elems[i2].style.webkitFilter = "grayscale(100%)";
        elems[i2].style.filter = "grayscale(100%)";
      }
    }
    unlockForm() {
      const elems = this.form.querySelectorAll(
        "input, textarea, button, select"
      );
      for (let i2 = 0, len = elems.length; i2 < len; ++i2) {
        if (elems[i2].getAttribute("data-just-validate-fallback-disabled") !== "true") {
          elems[i2].removeAttribute("disabled");
        }
        elems[i2].style.pointerEvents = "";
        elems[i2].style.webkitFilter = "";
        elems[i2].style.filter = "";
      }
    }
    renderTooltip(elem, errorLabel, position) {
      var _a;
      const { top, left, width, height } = elem.getBoundingClientRect();
      const errorLabelRect = errorLabel.getBoundingClientRect();
      const pos = position || ((_a = this.globalConfig.tooltip) == null ? void 0 : _a.position);
      switch (pos) {
        case "left": {
          errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
          errorLabel.style.left = `${left - errorLabelRect.width - TOOLTIP_ARROW_HEIGHT}px`;
          break;
        }
        case "top": {
          errorLabel.style.top = `${top - errorLabelRect.height - TOOLTIP_ARROW_HEIGHT}px`;
          errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
          break;
        }
        case "right": {
          errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
          errorLabel.style.left = `${left + width + TOOLTIP_ARROW_HEIGHT}px`;
          break;
        }
        case "bottom": {
          errorLabel.style.top = `${top + height + TOOLTIP_ARROW_HEIGHT}px`;
          errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
          break;
        }
      }
      errorLabel.dataset.direction = pos;
      const refresh = () => {
        this.renderTooltip(elem, errorLabel, position);
      };
      return {
        refresh
      };
    }
    createErrorLabelElem(key, errorMessage, config) {
      const errorLabel = document.createElement("div");
      errorLabel.innerHTML = errorMessage;
      const customErrorLabelStyle = this.isTooltip() ? config == null ? void 0 : config.errorLabelStyle : (config == null ? void 0 : config.errorLabelStyle) || this.globalConfig.errorLabelStyle;
      Object.assign(errorLabel.style, customErrorLabelStyle);
      errorLabel.classList.add(
        ...getClassList(
          (config == null ? void 0 : config.errorLabelCssClass) || this.globalConfig.errorLabelCssClass
        ),
        "just-validate-error-label"
      );
      if (this.isTooltip()) {
        errorLabel.dataset.tooltip = "true";
      }
      if (this.globalConfig.testingMode) {
        errorLabel.dataset.testId = `error-label-${key}`;
      }
      this.errorLabels[key] = errorLabel;
      return errorLabel;
    }
    createSuccessLabelElem(key, successMessage, config) {
      if (successMessage === void 0) {
        return null;
      }
      const successLabel = document.createElement("div");
      successLabel.innerHTML = successMessage;
      const customSuccessLabelStyle = (config == null ? void 0 : config.successLabelStyle) || this.globalConfig.successLabelStyle;
      Object.assign(successLabel.style, customSuccessLabelStyle);
      successLabel.classList.add(
        ...getClassList(
          (config == null ? void 0 : config.successLabelCssClass) || this.globalConfig.successLabelCssClass
        ),
        "just-validate-success-label"
      );
      if (this.globalConfig.testingMode) {
        successLabel.dataset.testId = `success-label-${key}`;
      }
      this.successLabels[key] = successLabel;
      return successLabel;
    }
    renderErrorsContainer(label, errorsContainer) {
      const container = errorsContainer || this.globalConfig.errorsContainer;
      if (typeof container === "string") {
        const elem = this.form.querySelector(container);
        if (elem) {
          elem.appendChild(label);
          return true;
        } else {
          console.error(
            `Error container with ${container} selector not found. Errors will be rendered as usual`
          );
        }
      }
      if (container instanceof Element) {
        container.appendChild(label);
        return true;
      }
      if (container !== void 0) {
        console.error(
          `Error container not found. It should be a string or existing Element. Errors will be rendered as usual`
        );
      }
      return false;
    }
    renderGroupLabel(elem, label, errorsContainer, isSuccess) {
      if (!isSuccess) {
        const renderedInErrorsContainer = this.renderErrorsContainer(
          label,
          errorsContainer
        );
        if (renderedInErrorsContainer) {
          return;
        }
      }
      elem.appendChild(label);
    }
    renderFieldLabel(elem, label, errorsContainer, isSuccess) {
      var _a, _b, _c, _d, _e, _f, _g;
      if (!isSuccess) {
        const renderedInErrorsContainer = this.renderErrorsContainer(
          label,
          errorsContainer
        );
        if (renderedInErrorsContainer) {
          return;
        }
      }
      if (elem.type === "checkbox" || elem.type === "radio") {
        const labelElem = document.querySelector(
          `label[for="${elem.getAttribute("id")}"]`
        );
        if (((_b = (_a = elem.parentElement) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) === "label") {
          (_d = (_c = elem.parentElement) == null ? void 0 : _c.parentElement) == null ? void 0 : _d.appendChild(label);
        } else if (labelElem) {
          (_e = labelElem.parentElement) == null ? void 0 : _e.appendChild(label);
        } else {
          (_f = elem.parentElement) == null ? void 0 : _f.appendChild(label);
        }
      } else {
        (_g = elem.parentElement) == null ? void 0 : _g.appendChild(label);
      }
    }
    showLabels(fields, isError) {
      Object.keys(fields).forEach((fieldName, i2) => {
        const error = fields[fieldName];
        const key = this.getKeyByFieldSelector(fieldName);
        if (!key || !this.fields[key]) {
          console.error(`Field not found. Check the field selector.`);
          return;
        }
        const field = this.fields[key];
        field.isValid = !isError;
        this.clearFieldStyle(key);
        this.clearFieldLabel(key);
        this.renderFieldError(key, false, error);
        if (i2 === 0 && this.globalConfig.focusInvalidField) {
          setTimeout(() => field.elem.focus(), 0);
        }
      });
    }
    showErrors(fields) {
      if (typeof fields !== "object") {
        throw Error(
          "[showErrors]: Errors should be an object with key: value format"
        );
      }
      this.showLabels(fields, true);
    }
    showSuccessLabels(fields) {
      if (typeof fields !== "object") {
        throw Error(
          "[showSuccessLabels]: Labels should be an object with key: value format"
        );
      }
      this.showLabels(fields, false);
    }
    renderFieldError(key, forced = false, message) {
      var _a, _b, _c, _d, _e, _f;
      const field = this.fields[key];
      if (field.isValid === false) {
        this.isValid = false;
      }
      if (field.isValid === void 0 || !forced && !this.isSubmitted && !field.touched && message === void 0) {
        return;
      }
      if (field.isValid) {
        if (!field.asyncCheckPending) {
          const successLabel = this.createSuccessLabelElem(
            key,
            message !== void 0 ? message : field.successMessage,
            field.config
          );
          if (successLabel) {
            this.renderFieldLabel(
              field.elem,
              successLabel,
              (_a = field.config) == null ? void 0 : _a.errorsContainer,
              true
            );
          }
          field.elem.classList.add(
            ...getClassList(
              ((_b = field.config) == null ? void 0 : _b.successFieldCssClass) || this.globalConfig.successFieldCssClass
            )
          );
        }
        return;
      }
      field.elem.classList.add(
        ...getClassList(
          ((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
        )
      );
      const errorLabel = this.createErrorLabelElem(
        key,
        message !== void 0 ? message : field.errorMessage,
        field.config
      );
      this.renderFieldLabel(
        field.elem,
        errorLabel,
        (_d = field.config) == null ? void 0 : _d.errorsContainer
      );
      if (this.isTooltip()) {
        this.tooltips.push(
          this.renderTooltip(
            field.elem,
            errorLabel,
            (_f = (_e = field.config) == null ? void 0 : _e.tooltip) == null ? void 0 : _f.position
          )
        );
      }
    }
    renderGroupError(key, force = true) {
      var _a, _b, _c, _d;
      const group = this.groupFields[key];
      if (group.isValid === false) {
        this.isValid = false;
      }
      if (group.isValid === void 0 || !force && !this.isSubmitted && !group.touched) {
        return;
      }
      if (group.isValid) {
        group.elems.forEach((elem) => {
          var _a2, _b2;
          Object.assign(
            elem.style,
            ((_a2 = group.config) == null ? void 0 : _a2.successFieldStyle) || this.globalConfig.successFieldStyle
          );
          elem.classList.add(
            ...getClassList(
              ((_b2 = group.config) == null ? void 0 : _b2.successFieldCssClass) || this.globalConfig.successFieldCssClass
            )
          );
        });
        const successLabel = this.createSuccessLabelElem(
          key,
          group.successMessage,
          group.config
        );
        if (successLabel) {
          this.renderGroupLabel(
            group.groupElem,
            successLabel,
            (_a = group.config) == null ? void 0 : _a.errorsContainer,
            true
          );
        }
        return;
      }
      this.isValid = false;
      group.elems.forEach((elem) => {
        var _a2, _b2;
        Object.assign(
          elem.style,
          ((_a2 = group.config) == null ? void 0 : _a2.errorFieldStyle) || this.globalConfig.errorFieldStyle
        );
        elem.classList.add(
          ...getClassList(
            ((_b2 = group.config) == null ? void 0 : _b2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass
          )
        );
      });
      const errorLabel = this.createErrorLabelElem(
        key,
        group.errorMessage,
        group.config
      );
      this.renderGroupLabel(
        group.groupElem,
        errorLabel,
        (_b = group.config) == null ? void 0 : _b.errorsContainer
      );
      if (this.isTooltip()) {
        this.tooltips.push(
          this.renderTooltip(
            group.groupElem,
            errorLabel,
            (_d = (_c = group.config) == null ? void 0 : _c.tooltip) == null ? void 0 : _d.position
          )
        );
      }
    }
    renderErrors(forceRevalidation = false) {
      if (!this.isSubmitted && !forceRevalidation && !this.globalConfig.validateBeforeSubmitting) {
        return;
      }
      this.clearErrors();
      this.isValid = true;
      for (const key in this.groupFields) {
        this.renderGroupError(key);
      }
      for (const key in this.fields) {
        this.renderFieldError(key);
      }
    }
    destroy() {
      this.eventListeners.forEach((event2) => {
        this.removeListener(event2.type, event2.elem, event2.func);
      });
      Object.keys(this.customStyleTags).forEach((key) => {
        this.customStyleTags[key].remove();
      });
      this.clearErrors();
      if (this.globalConfig.lockForm) {
        this.unlockForm();
      }
    }
    refresh() {
      this.destroy();
      if (!this.form) {
        console.error("Cannot initialize the library! Form is not defined");
      } else {
        this.initialize(this.form, this.globalConfig);
        Object.keys(this.fields).forEach((key) => {
          const fieldSelector = this.getFieldSelectorByKey(key);
          if (fieldSelector) {
            this.addField(
              fieldSelector,
              [...this.fields[key].rules],
              this.fields[key].config
            );
          }
        });
      }
    }
    setCurrentLocale(locale) {
      if (typeof locale !== "string" && locale !== void 0) {
        console.error("Current locale should be a string");
        return;
      }
      this.currentLocale = locale;
      if (this.isSubmitted) {
        this.validate();
      }
    }
    onSuccess(callback) {
      this.onSuccessCallback = callback;
      return this;
    }
    onFail(callback) {
      this.onFailCallback = callback;
      return this;
    }
    onValidate(callback) {
      this.onValidateCallback = callback;
      return this;
    }
  };

  // src/scripts/pages/contacts/contactsPageController.ts
  var contactsPageController = () => {
    headerController();
    const $FORM = document.querySelector(".form");
    const $formButton = document.querySelector(".form__button");
    let VALIDATE = null;
    if ($FORM) {
      VALIDATE = new JustValidate(".form", {
        errorFieldCssClass: "is-invalid",
        focusInvalidField: false,
        lockForm: true,
        validateBeforeSubmitting: true
      });
      VALIDATE.addField("#text", [
        { rule: "minLength", value: 10 },
        { rule: "required", errorMessage: "This field is required" },
        { rule: "maxLength", value: 300 }
      ]).addField("#email", [
        { rule: "required", errorMessage: "This field is required" },
        {
          rule: "email",
          errorMessage: "Please enter a valid email address"
        }
      ]).addField("#checkbox", [
        { rule: "required", errorMessage: "This field is required" }
      ]).onSuccess(async (event2) => {
        if (event2)
          event2.preventDefault();
        if ($formButton)
          $formButton.classList.add("is-loading");
        try {
          await new Promise((resolve) => setTimeout(resolve, 2e3));
          showSuccessMessage();
        } catch (error) {
          showErrorMessage();
        } finally {
          if ($formButton)
            $formButton.classList.remove("is-loading");
        }
      });
    }
    return () => {
      if (VALIDATE) {
        VALIDATE.destroy();
      }
    };
  };
  function showSuccessMessage() {
    alert("Form submitted successfully!");
  }
  function showErrorMessage() {
    alert("Error submitting form!");
  }

  // node_modules/.pnpm/ssr-window@4.0.2/node_modules/ssr-window/ssr-window.esm.js
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  // node_modules/.pnpm/dom7@4.0.6/node_modules/dom7/dom7.esm.js
  function makeReactive(obj) {
    const proto = obj.__proto__;
    Object.defineProperty(obj, "__proto__", {
      get() {
        return proto;
      },
      set(value) {
        proto.__proto__ = value;
      }
    });
  }
  var Dom7 = class extends Array {
    constructor(items) {
      if (typeof items === "number") {
        super(items);
      } else {
        super(...items || []);
        makeReactive(this);
      }
    }
  };
  function arrayFlat(arr = []) {
    const res = [];
    arr.forEach((el) => {
      if (Array.isArray(el)) {
        res.push(...arrayFlat(el));
      } else {
        res.push(el);
      }
    });
    return res;
  }
  function arrayFilter(arr, callback) {
    return Array.prototype.filter.call(arr, callback);
  }
  function arrayUnique(arr) {
    const uniqueArray = [];
    for (let i2 = 0; i2 < arr.length; i2 += 1) {
      if (uniqueArray.indexOf(arr[i2]) === -1)
        uniqueArray.push(arr[i2]);
    }
    return uniqueArray;
  }
  function qsa(selector, context) {
    if (typeof selector !== "string") {
      return [selector];
    }
    const a2 = [];
    const res = context.querySelectorAll(selector);
    for (let i2 = 0; i2 < res.length; i2 += 1) {
      a2.push(res[i2]);
    }
    return a2;
  }
  function $(selector, context) {
    const window2 = getWindow();
    const document2 = getDocument();
    let arr = [];
    if (!context && selector instanceof Dom7) {
      return selector;
    }
    if (!selector) {
      return new Dom7(arr);
    }
    if (typeof selector === "string") {
      const html2 = selector.trim();
      if (html2.indexOf("<") >= 0 && html2.indexOf(">") >= 0) {
        let toCreate = "div";
        if (html2.indexOf("<li") === 0)
          toCreate = "ul";
        if (html2.indexOf("<tr") === 0)
          toCreate = "tbody";
        if (html2.indexOf("<td") === 0 || html2.indexOf("<th") === 0)
          toCreate = "tr";
        if (html2.indexOf("<tbody") === 0)
          toCreate = "table";
        if (html2.indexOf("<option") === 0)
          toCreate = "select";
        const tempParent = document2.createElement(toCreate);
        tempParent.innerHTML = html2;
        for (let i2 = 0; i2 < tempParent.childNodes.length; i2 += 1) {
          arr.push(tempParent.childNodes[i2]);
        }
      } else {
        arr = qsa(selector.trim(), context || document2);
      }
    } else if (selector.nodeType || selector === window2 || selector === document2) {
      arr.push(selector);
    } else if (Array.isArray(selector)) {
      if (selector instanceof Dom7)
        return selector;
      arr = selector;
    }
    return new Dom7(arrayUnique(arr));
  }
  $.fn = Dom7.prototype;
  function addClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    this.forEach((el) => {
      el.classList.add(...classNames);
    });
    return this;
  }
  function removeClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    this.forEach((el) => {
      el.classList.remove(...classNames);
    });
    return this;
  }
  function toggleClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    this.forEach((el) => {
      classNames.forEach((className) => {
        el.classList.toggle(className);
      });
    });
  }
  function hasClass(...classes) {
    const classNames = arrayFlat(classes.map((c) => c.split(" ")));
    return arrayFilter(this, (el) => {
      return classNames.filter((className) => el.classList.contains(className)).length > 0;
    }).length > 0;
  }
  function attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === "string") {
      if (this[0])
        return this[0].getAttribute(attrs);
      return void 0;
    }
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      if (arguments.length === 2) {
        this[i2].setAttribute(attrs, value);
      } else {
        for (const attrName in attrs) {
          this[i2][attrName] = attrs[attrName];
          this[i2].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  function removeAttr(attr2) {
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      this[i2].removeAttribute(attr2);
    }
    return this;
  }
  function transform(transform2) {
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      this[i2].style.transform = transform2;
    }
    return this;
  }
  function transition(duration) {
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      this[i2].style.transitionDuration = typeof duration !== "string" ? `${duration}ms` : duration;
    }
    return this;
  }
  function on(...args) {
    let [eventType, targetSelector, listener, capture] = args;
    if (typeof args[1] === "function") {
      [eventType, listener, capture] = args;
      targetSelector = void 0;
    }
    if (!capture)
      capture = false;
    function handleLiveEvent(e2) {
      const target = e2.target;
      if (!target)
        return;
      const eventData = e2.target.dom7EventData || [];
      if (eventData.indexOf(e2) < 0) {
        eventData.unshift(e2);
      }
      if ($(target).is(targetSelector))
        listener.apply(target, eventData);
      else {
        const parents2 = $(target).parents();
        for (let k = 0; k < parents2.length; k += 1) {
          if ($(parents2[k]).is(targetSelector))
            listener.apply(parents2[k], eventData);
        }
      }
    }
    function handleEvent(e2) {
      const eventData = e2 && e2.target ? e2.target.dom7EventData || [] : [];
      if (eventData.indexOf(e2) < 0) {
        eventData.unshift(e2);
      }
      listener.apply(this, eventData);
    }
    const events2 = eventType.split(" ");
    let j;
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      const el = this[i2];
      if (!targetSelector) {
        for (j = 0; j < events2.length; j += 1) {
          const event2 = events2[j];
          if (!el.dom7Listeners)
            el.dom7Listeners = {};
          if (!el.dom7Listeners[event2])
            el.dom7Listeners[event2] = [];
          el.dom7Listeners[event2].push({
            listener,
            proxyListener: handleEvent
          });
          el.addEventListener(event2, handleEvent, capture);
        }
      } else {
        for (j = 0; j < events2.length; j += 1) {
          const event2 = events2[j];
          if (!el.dom7LiveListeners)
            el.dom7LiveListeners = {};
          if (!el.dom7LiveListeners[event2])
            el.dom7LiveListeners[event2] = [];
          el.dom7LiveListeners[event2].push({
            listener,
            proxyListener: handleLiveEvent
          });
          el.addEventListener(event2, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off(...args) {
    let [eventType, targetSelector, listener, capture] = args;
    if (typeof args[1] === "function") {
      [eventType, listener, capture] = args;
      targetSelector = void 0;
    }
    if (!capture)
      capture = false;
    const events2 = eventType.split(" ");
    for (let i2 = 0; i2 < events2.length; i2 += 1) {
      const event2 = events2[i2];
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        let handlers;
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event2];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event2];
        }
        if (handlers && handlers.length) {
          for (let k = handlers.length - 1; k >= 0; k -= 1) {
            const handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event2, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event2, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event2, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function trigger(...args) {
    const window2 = getWindow();
    const events2 = args[0].split(" ");
    const eventData = args[1];
    for (let i2 = 0; i2 < events2.length; i2 += 1) {
      const event2 = events2[i2];
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        if (window2.CustomEvent) {
          const evt = new window2.CustomEvent(event2, {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
          el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
          el.dispatchEvent(evt);
          el.dom7EventData = [];
          delete el.dom7EventData;
        }
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    const dom = this;
    function fireCallBack(e2) {
      if (e2.target !== this)
        return;
      callback.call(this, e2);
      dom.off("transitionend", fireCallBack);
    }
    if (callback) {
      dom.on("transitionend", fireCallBack);
    }
    return this;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        const styles2 = this.styles();
        return this[0].offsetWidth + parseFloat(styles2.getPropertyValue("margin-right")) + parseFloat(styles2.getPropertyValue("margin-left"));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        const styles2 = this.styles();
        return this[0].offsetHeight + parseFloat(styles2.getPropertyValue("margin-top")) + parseFloat(styles2.getPropertyValue("margin-bottom"));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      const window2 = getWindow();
      const document2 = getDocument();
      const el = this[0];
      const box = el.getBoundingClientRect();
      const body = document2.body;
      const clientTop = el.clientTop || body.clientTop || 0;
      const clientLeft = el.clientLeft || body.clientLeft || 0;
      const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
      const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
      };
    }
    return null;
  }
  function styles() {
    const window2 = getWindow();
    if (this[0])
      return window2.getComputedStyle(this[0], null);
    return {};
  }
  function css(props, value) {
    const window2 = getWindow();
    let i2;
    if (arguments.length === 1) {
      if (typeof props === "string") {
        if (this[0])
          return window2.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        for (i2 = 0; i2 < this.length; i2 += 1) {
          for (const prop in props) {
            this[i2].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === "string") {
      for (i2 = 0; i2 < this.length; i2 += 1) {
        this[i2].style[props] = value;
      }
      return this;
    }
    return this;
  }
  function each(callback) {
    if (!callback)
      return this;
    this.forEach((el, index2) => {
      callback.apply(el, [el, index2]);
    });
    return this;
  }
  function filter(callback) {
    const result = arrayFilter(this, callback);
    return $(result);
  }
  function html(html2) {
    if (typeof html2 === "undefined") {
      return this[0] ? this[0].innerHTML : null;
    }
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      this[i2].innerHTML = html2;
    }
    return this;
  }
  function text(text2) {
    if (typeof text2 === "undefined") {
      return this[0] ? this[0].textContent.trim() : null;
    }
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      this[i2].textContent = text2;
    }
    return this;
  }
  function is(selector) {
    const window2 = getWindow();
    const document2 = getDocument();
    const el = this[0];
    let compareWith;
    let i2;
    if (!el || typeof selector === "undefined")
      return false;
    if (typeof selector === "string") {
      if (el.matches)
        return el.matches(selector);
      if (el.webkitMatchesSelector)
        return el.webkitMatchesSelector(selector);
      if (el.msMatchesSelector)
        return el.msMatchesSelector(selector);
      compareWith = $(selector);
      for (i2 = 0; i2 < compareWith.length; i2 += 1) {
        if (compareWith[i2] === el)
          return true;
      }
      return false;
    }
    if (selector === document2) {
      return el === document2;
    }
    if (selector === window2) {
      return el === window2;
    }
    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i2 = 0; i2 < compareWith.length; i2 += 1) {
        if (compareWith[i2] === el)
          return true;
      }
      return false;
    }
    return false;
  }
  function index() {
    let child = this[0];
    let i2;
    if (child) {
      i2 = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i2 += 1;
      }
      return i2;
    }
    return void 0;
  }
  function eq(index2) {
    if (typeof index2 === "undefined")
      return this;
    const length = this.length;
    if (index2 > length - 1) {
      return $([]);
    }
    if (index2 < 0) {
      const returnIndex = length + index2;
      if (returnIndex < 0)
        return $([]);
      return $([this[returnIndex]]);
    }
    return $([this[index2]]);
  }
  function append(...els) {
    let newChild;
    const document2 = getDocument();
    for (let k = 0; k < els.length; k += 1) {
      newChild = els[k];
      for (let i2 = 0; i2 < this.length; i2 += 1) {
        if (typeof newChild === "string") {
          const tempDiv = document2.createElement("div");
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i2].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (let j = 0; j < newChild.length; j += 1) {
            this[i2].appendChild(newChild[j]);
          }
        } else {
          this[i2].appendChild(newChild);
        }
      }
    }
    return this;
  }
  function prepend(newChild) {
    const document2 = getDocument();
    let i2;
    let j;
    for (i2 = 0; i2 < this.length; i2 += 1) {
      if (typeof newChild === "string") {
        const tempDiv = document2.createElement("div");
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i2].insertBefore(tempDiv.childNodes[j], this[i2].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i2].insertBefore(newChild[j], this[i2].childNodes[0]);
        }
      } else {
        this[i2].insertBefore(newChild, this[i2].childNodes[0]);
      }
    }
    return this;
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return $([this[0].nextElementSibling]);
        }
        return $([]);
      }
      if (this[0].nextElementSibling)
        return $([this[0].nextElementSibling]);
      return $([]);
    }
    return $([]);
  }
  function nextAll(selector) {
    const nextEls = [];
    let el = this[0];
    if (!el)
      return $([]);
    while (el.nextElementSibling) {
      const next2 = el.nextElementSibling;
      if (selector) {
        if ($(next2).is(selector))
          nextEls.push(next2);
      } else
        nextEls.push(next2);
      el = next2;
    }
    return $(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      const el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return $([el.previousElementSibling]);
        }
        return $([]);
      }
      if (el.previousElementSibling)
        return $([el.previousElementSibling]);
      return $([]);
    }
    return $([]);
  }
  function prevAll(selector) {
    const prevEls = [];
    let el = this[0];
    if (!el)
      return $([]);
    while (el.previousElementSibling) {
      const prev2 = el.previousElementSibling;
      if (selector) {
        if ($(prev2).is(selector))
          prevEls.push(prev2);
      } else
        prevEls.push(prev2);
      el = prev2;
    }
    return $(prevEls);
  }
  function parent(selector) {
    const parents2 = [];
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      if (this[i2].parentNode !== null) {
        if (selector) {
          if ($(this[i2].parentNode).is(selector))
            parents2.push(this[i2].parentNode);
        } else {
          parents2.push(this[i2].parentNode);
        }
      }
    }
    return $(parents2);
  }
  function parents(selector) {
    const parents2 = [];
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      let parent2 = this[i2].parentNode;
      while (parent2) {
        if (selector) {
          if ($(parent2).is(selector))
            parents2.push(parent2);
        } else {
          parents2.push(parent2);
        }
        parent2 = parent2.parentNode;
      }
    }
    return $(parents2);
  }
  function closest(selector) {
    let closest2 = this;
    if (typeof selector === "undefined") {
      return $([]);
    }
    if (!closest2.is(selector)) {
      closest2 = closest2.parents(selector).eq(0);
    }
    return closest2;
  }
  function find(selector) {
    const foundElements = [];
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      const found = this[i2].querySelectorAll(selector);
      for (let j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return $(foundElements);
  }
  function children(selector) {
    const children2 = [];
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      const childNodes = this[i2].children;
      for (let j = 0; j < childNodes.length; j += 1) {
        if (!selector || $(childNodes[j]).is(selector)) {
          children2.push(childNodes[j]);
        }
      }
    }
    return $(children2);
  }
  function remove() {
    for (let i2 = 0; i2 < this.length; i2 += 1) {
      if (this[i2].parentNode)
        this[i2].parentNode.removeChild(this[i2]);
    }
    return this;
  }
  var noTrigger = "resize scroll".split(" ");
  function shortcut(name) {
    function eventHandler(...args) {
      if (typeof args[0] === "undefined") {
        for (let i2 = 0; i2 < this.length; i2 += 1) {
          if (noTrigger.indexOf(name) < 0) {
            if (name in this[i2])
              this[i2][name]();
            else {
              $(this[i2]).trigger(name);
            }
          }
        }
        return this;
      }
      return this.on(name, ...args);
    }
    return eventHandler;
  }
  var click = shortcut("click");
  var blur = shortcut("blur");
  var focus = shortcut("focus");
  var focusin = shortcut("focusin");
  var focusout = shortcut("focusout");
  var keyup = shortcut("keyup");
  var keydown = shortcut("keydown");
  var keypress = shortcut("keypress");
  var submit = shortcut("submit");
  var change = shortcut("change");
  var mousedown = shortcut("mousedown");
  var mousemove = shortcut("mousemove");
  var mouseup = shortcut("mouseup");
  var mouseenter = shortcut("mouseenter");
  var mouseleave = shortcut("mouseleave");
  var mouseout = shortcut("mouseout");
  var mouseover = shortcut("mouseover");
  var touchstart = shortcut("touchstart");
  var touchend = shortcut("touchend");
  var touchmove = shortcut("touchmove");
  var resize = shortcut("resize");
  var scroll = shortcut("scroll");

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/shared/dom.js
  var Methods = {
    addClass,
    removeClass,
    hasClass,
    toggleClass,
    attr,
    removeAttr,
    transform,
    transition,
    on,
    off,
    trigger,
    transitionEnd,
    outerWidth,
    outerHeight,
    styles,
    offset,
    css,
    each,
    html,
    text,
    is,
    index,
    eq,
    append,
    prepend,
    next,
    nextAll,
    prev,
    prevAll,
    parent,
    parents,
    closest,
    find,
    children,
    filter,
    remove
  };
  Object.keys(Methods).forEach((methodName) => {
    Object.defineProperty($.fn, methodName, {
      value: Methods[methodName],
      writable: true
    });
  });
  var dom_default = $;

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/shared/utils.js
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e2) {
      }
      try {
        delete object[key];
      } catch (e2) {
      }
    });
  }
  function nextTick(callback, delay = 0) {
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis = "x") {
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el, null);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a2) => a2.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o2) {
    return typeof o2 === "object" && o2 !== null && o2.constructor && Object.prototype.toString.call(o2).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend2(...args) {
    const to = Object(args[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i2 = 1; i2 < args.length; i2 += 1) {
      const nextSource = args[i2];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll({
    swiper,
    targetPosition,
    side
  }) {
    const window2 = getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = (/* @__PURE__ */ new Date()).getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/shared/get-support.js
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch),
      passiveListener: function checkPassiveListener() {
        let supportsPassive = false;
        try {
          const opts = Object.defineProperty({}, "passive", {
            // eslint-disable-next-line
            get() {
              supportsPassive = true;
            }
          });
          window2.addEventListener("testPassiveListener", null, opts);
        } catch (e2) {
        }
        return supportsPassive;
      }(),
      gestures: function checkGestures() {
        return "ongesturestart" in window2;
      }()
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/shared/get-device.js
  var deviceCached;
  function calcDevice({
    userAgent
  } = {}) {
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides = {}) {
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/shared/get-browser.js
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    return {
      isSafari: isSafari(),
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/modules/resize/resize.js
  function Resize({
    swiper,
    on: on2,
    emit
  }) {
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach(({
            contentBoxSize,
            contentRect,
            target
          }) => {
            if (target && target !== swiper.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("orientationchange");
    };
    on2("init", () => {
      if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on2("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/modules/observer/observer.js
  function Observer({
    swiper,
    extendParams,
    on: on2,
    emit
  }) {
    const observers = [];
    const window2 = getWindow();
    const attach = (target, options = {}) => {
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: typeof options.childList === "undefined" ? true : options.childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper.params.observer)
        return;
      if (swiper.params.observeParents) {
        const containerParents = swiper.$el.parents();
        for (let i2 = 0; i2 < containerParents.length; i2 += 1) {
          attach(containerParents[i2]);
        }
      }
      attach(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren
      });
      attach(swiper.$wrapperEl[0], {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on2("init", init);
    on2("destroy", destroy);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events-emitter.js
  var events_emitter_default = {
    on(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self.eventsListeners[event2])
          self.eventsListeners[event2] = [];
        self.eventsListeners[event2][method](handler);
      });
      return self;
    },
    once(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      function onceHandler(...args) {
        self.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsAnyListeners)
        return self;
      const index2 = self.eventsAnyListeners.indexOf(handler);
      if (index2 >= 0) {
        self.eventsAnyListeners.splice(index2, 1);
      }
      return self;
    },
    off(events2, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event2] = [];
        } else if (self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler, index2) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event2].splice(index2, 1);
            }
          });
        }
      });
      return self;
    },
    emit(...args) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      let events2;
      let data;
      let context;
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event2, ...data]);
          });
        }
        if (self.eventsListeners && self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateSize.js
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const $el = swiper.$el;
    if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }
    width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
    height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateSlides.js
  function updateSlides() {
    const swiper = this;
    function getDirectionLabel(property) {
      if (swiper.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
    }
    const params = swiper.params;
    const {
      $wrapperEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index2 = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    }
    swiper.virtualSize = -spaceBetween;
    if (rtl)
      slides.css({
        marginLeft: "",
        marginBottom: "",
        marginTop: ""
      });
    else
      slides.css({
        marginRight: "",
        marginBottom: "",
        marginTop: ""
      });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
    if (gridEnabled) {
      swiper.grid.initSlides(slidesLength);
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i2 = 0; i2 < slidesLength; i2 += 1) {
      slideSize = 0;
      const slide = slides.eq(i2);
      if (gridEnabled) {
        swiper.grid.updateSlide(i2, slide, slidesLength, getDirectionLabel);
      }
      if (slide.css("display") === "none")
        continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i2].style[getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide[0]);
        const currentTransform = slide[0].style.transform;
        const currentWebKitTransform = slide[0].style.webkitTransform;
        if (currentTransform) {
          slide[0].style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide[0];
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slides[i2]) {
          slides[i2].style[getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i2]) {
        slides[i2].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i2 !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i2 === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index2 % params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index2 - Math.min(swiper.params.slidesPerGroupSkip, index2)) % swiper.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index2 += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      $wrapperEl.css({
        width: `${swiper.virtualSize + params.spaceBetween}px`
      });
    }
    if (params.setWrapperSize) {
      $wrapperEl.css({
        [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
      });
    }
    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
    }
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i2 = 0; i2 < snapGrid.length; i2 += 1) {
        let slidesGridItem = snapGrid[i2];
        if (params.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (params.spaceBetween !== 0) {
      const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
      slides.filter((_, slideIndex) => {
        if (!params.cssMode)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).css({
        [key]: `${spaceBetween}px`
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      const maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map((snap) => {
        if (snap < 0)
          return -offsetBefore;
        if (snap > maxSnap)
          return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow)
        swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.$el.addClass(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.$el.removeClass(backFaceHiddenClass);
      }
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateAutoHeight.js
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i2;
    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    const getSlideByIndex = (index2) => {
      if (isVirtual) {
        return swiper.slides.filter((el) => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index2)[0];
      }
      return swiper.slides.eq(index2)[0];
    };
    if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || dom_default([])).each((slide) => {
          activeSlides.push(slide);
        });
      } else {
        for (i2 = 0; i2 < Math.ceil(swiper.params.slidesPerView); i2 += 1) {
          const index2 = swiper.activeIndex + i2;
          if (index2 > swiper.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index2));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    }
    for (i2 = 0; i2 < activeSlides.length; i2 += 1) {
      if (typeof activeSlides[i2] !== "undefined") {
        const height = activeSlides[i2].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper.$wrapperEl.css("height", `${newHeight}px`);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateSlidesOffset.js
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    for (let i2 = 0; i2 < slides.length; i2 += 1) {
      slides[i2].swiperSlideOffset = swiper.isHorizontal() ? slides[i2].offsetLeft : slides[i2].offsetTop;
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateSlidesProgress.js
  function updateSlidesProgress(translate = this && this.translate || 0) {
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate;
    if (rtl)
      offsetCenter = translate;
    slides.removeClass(params.slideVisibleClass);
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    for (let i2 = 0; i2 < slides.length; i2 += 1) {
      const slide = slides[i2];
      let slideOffset = slide.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i2];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide);
        swiper.visibleSlidesIndexes.push(i2);
        slides.eq(i2).addClass(params.slideVisibleClass);
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
      slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
    swiper.visibleSlides = dom_default(swiper.visibleSlides);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateProgress.js
  function updateProgress(translate) {
    const swiper = this;
    if (typeof translate === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Object.assign(swiper, {
      progress,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
      swiper.updateSlidesProgress(translate);
    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit("fromEdge");
    }
    swiper.emit("progress", progress);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateSlidesClasses.js
  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params,
      $wrapperEl,
      activeIndex,
      realIndex
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
    let activeSlide;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
    } else {
      activeSlide = slides.eq(activeIndex);
    }
    activeSlide.addClass(params.slideActiveClass);
    if (params.loop) {
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
      }
    }
    let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
      }
    }
    swiper.emitSlidesClasses();
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateActiveIndex.js
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      slidesGrid,
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    if (typeof activeIndex === "undefined") {
      for (let i2 = 0; i2 < slidesGrid.length; i2 += 1) {
        if (typeof slidesGrid[i2 + 1] !== "undefined") {
          if (translate >= slidesGrid[i2] && translate < slidesGrid[i2 + 1] - (slidesGrid[i2 + 1] - slidesGrid[i2]) / 2) {
            activeIndex = i2;
          } else if (translate >= slidesGrid[i2] && translate < slidesGrid[i2 + 1]) {
            activeIndex = i2 + 1;
          }
        } else if (translate >= slidesGrid[i2]) {
          activeIndex = i2;
        }
      }
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === "undefined")
          activeIndex = 0;
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      return;
    }
    const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
    Object.assign(swiper, {
      snapIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit("slideChange");
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/updateClickedSlide.js
  function updateClickedSlide(e2) {
    const swiper = this;
    const params = swiper.params;
    const slide = dom_default(e2).closest(`.${params.slideClass}`)[0];
    let slideFound = false;
    let slideIndex;
    if (slide) {
      for (let i2 = 0; i2 < swiper.slides.length; i2 += 1) {
        if (swiper.slides[i2] === slide) {
          slideFound = true;
          slideIndex = i2;
          break;
        }
      }
    }
    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(dom_default(slide).attr("data-swiper-slide-index"), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/update/index.js
  var update_default = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/translate/getTranslate.js
  function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
    const swiper = this;
    const {
      params,
      rtlTranslate: rtl,
      translate,
      $wrapperEl
    } = swiper;
    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }
    if (params.cssMode) {
      return translate;
    }
    let currentTranslate = getTranslate($wrapperEl[0], axis);
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/translate/setTranslate.js
  function setTranslate(translate, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      $wrapperEl,
      wrapperEl,
      progress
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }
    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }
    swiper.emit("setTranslate", swiper.translate, byController);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/translate/minTranslate.js
  function minTranslate() {
    return -this.snapGrid[0];
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/translate/maxTranslate.js
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/translate/translateTo.js
  function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
    const swiper = this;
    const {
      params,
      wrapperEl
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper.minTranslate();
    const maxTranslate2 = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate;
    swiper.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd3(e2) {
            if (!swiper || swiper.destroyed)
              return;
            if (e2.target !== this)
              return;
            swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }
        swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/translate/index.js
  var translate_default = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/transition/setTransition.js
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }
    swiper.emit("setTransition", duration, byController);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/transition/transitionEmit.js
  function transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step
  }) {
    const {
      activeIndex,
      previousIndex
    } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/transition/transitionStart.js
  function transitionStart(runCallbacks = true, direction) {
    const swiper = this;
    const {
      params
    } = swiper;
    if (params.cssMode)
      return;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start"
    });
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/transition/transitionEnd.js
  function transitionEnd2(runCallbacks = true, direction) {
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.animating = false;
    if (params.cssMode)
      return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End"
    });
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/transition/index.js
  var transition_default = {
    setTransition,
    transitionStart,
    transitionEnd: transitionEnd2
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slideTo.js
  function slideTo(index2 = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
    if (typeof index2 !== "number" && typeof index2 !== "string") {
      throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index2}] given.`);
    }
    if (typeof index2 === "string") {
      const indexAsNumber = parseInt(index2, 10);
      const isValidNumber = isFinite(indexAsNumber);
      if (!isValidNumber) {
        throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index2}] given.`);
      }
      index2 = indexAsNumber;
    }
    const swiper = this;
    let slideIndex = index2;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
      return false;
    }
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i2 = 0; i2 < slidesGrid.length; i2 += 1) {
        const normalizedTranslate = -Math.floor(translate * 100);
        const normalizedGrid = Math.floor(slidesGrid[i2] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i2 + 1] * 100);
        if (typeof slidesGrid[i2 + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i2;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i2 + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i2;
        }
      }
    }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex)
          return false;
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit("beforeSlideChangeStart");
    }
    swiper.updateProgress(translate);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper.setTranslate(translate);
      }
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t2 = rtl ? translate : -translate;
      if (speed === 0) {
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t2;
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._swiperImmediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t2,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t2,
          behavior: "smooth"
        });
      }
      return true;
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd3(e2) {
          if (!swiper || swiper.destroyed)
            return;
          if (e2.target !== this)
            return;
          swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
      swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
    }
    return true;
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slideToLoop.js
  function slideToLoop(index2 = 0, speed = this.params.speed, runCallbacks = true, internal) {
    if (typeof index2 === "string") {
      const indexAsNumber = parseInt(index2, 10);
      const isValidNumber = isFinite(indexAsNumber);
      if (!isValidNumber) {
        throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index2}] given.`);
      }
      index2 = indexAsNumber;
    }
    const swiper = this;
    let newIndex = index2;
    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }
    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slideNext.js
  function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    const {
      animating,
      enabled,
      params
    } = swiper;
    if (!enabled)
      return swiper;
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    if (params.loop) {
      if (animating && params.loopPreventsSlide)
        return false;
      swiper.loopFix();
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slidePrev.js
  function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    const {
      params,
      animating,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled)
      return swiper;
    if (params.loop) {
      if (animating && params.loopPreventsSlide)
        return false;
      swiper.loopFix();
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    const translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper.isBeginning) {
      const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slideReset.js
  function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
    const swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slideToClosest.js
  function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
    const swiper = this;
    let index2 = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index2);
    const snapIndex = skip + Math.floor((index2 - skip) / swiper.params.slidesPerGroup);
    const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    if (translate >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
        index2 += swiper.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index2 -= swiper.params.slidesPerGroup;
      }
    }
    index2 = Math.max(index2, 0);
    index2 = Math.min(index2, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index2, speed, runCallbacks, internal);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/slideToClickedSlide.js
  function slideToClickedSlide() {
    const swiper = this;
    const {
      params,
      $wrapperEl
    } = swiper;
    const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;
    if (params.loop) {
      if (swiper.animating)
        return;
      realIndex = parseInt(dom_default(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/slide/index.js
  var slide_default = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/loop/loopCreate.js
  function loopCreate() {
    const swiper = this;
    const document2 = getDocument();
    const {
      params,
      $wrapperEl
    } = swiper;
    const $selector = $wrapperEl.children().length > 0 ? dom_default($wrapperEl.children()[0].parentNode) : $wrapperEl;
    $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
    let slides = $selector.children(`.${params.slideClass}`);
    if (params.loopFillGroupWithBlank) {
      const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (let i2 = 0; i2 < blankSlidesNum; i2 += 1) {
          const blankNode = dom_default(document2.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
          $selector.append(blankNode);
        }
        slides = $selector.children(`.${params.slideClass}`);
      }
    }
    if (params.slidesPerView === "auto" && !params.loopedSlides)
      params.loopedSlides = slides.length;
    swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) {
      swiper.loopedSlides = slides.length;
    }
    const prependSlides = [];
    const appendSlides = [];
    slides.each((el, index2) => {
      const slide = dom_default(el);
      slide.attr("data-swiper-slide-index", index2);
    });
    for (let i2 = 0; i2 < swiper.loopedSlides; i2 += 1) {
      const index2 = i2 - Math.floor(i2 / slides.length) * slides.length;
      appendSlides.push(slides.eq(index2)[0]);
      prependSlides.unshift(slides.eq(slides.length - index2 - 1)[0]);
    }
    for (let i2 = 0; i2 < appendSlides.length; i2 += 1) {
      $selector.append(dom_default(appendSlides[i2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (let i2 = prependSlides.length - 1; i2 >= 0; i2 -= 1) {
      $selector.prepend(dom_default(prependSlides[i2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/loop/loopFix.js
  function loopFix() {
    const swiper = this;
    swiper.emit("beforeLoopFix");
    const {
      activeIndex,
      slides,
      loopedSlides,
      allowSlidePrev,
      allowSlideNext,
      snapGrid,
      rtlTranslate: rtl
    } = swiper;
    let newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    const snapTranslate = -snapGrid[activeIndex];
    const diff = snapTranslate - swiper.getTranslate();
    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      const slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if (activeIndex >= slides.length - loopedSlides) {
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      const slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/loop/loopDestroy.js
  function loopDestroy() {
    const swiper = this;
    const {
      $wrapperEl,
      params,
      slides
    } = swiper;
    $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
    slides.removeAttr("data-swiper-slide-index");
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/loop/index.js
  var loop_default = {
    loopCreate,
    loopFix,
    loopDestroy
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/grab-cursor/setGrabCursor.js
  function setGrabCursor(moving) {
    const swiper = this;
    if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
      return;
    const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/grab-cursor/unsetGrabCursor.js
  function unsetGrabCursor() {
    const swiper = this;
    if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }
    swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/grab-cursor/index.js
  var grab_cursor_default = {
    setGrabCursor,
    unsetGrabCursor
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/onTouchStart.js
  function closestElement(selector, base = this) {
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function onTouchStart(event2) {
    const swiper = this;
    const document2 = getDocument();
    const window2 = getWindow();
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }
    let e2 = event2;
    if (e2.originalEvent)
      e2 = e2.originalEvent;
    let $targetEl = dom_default(e2.target);
    if (params.touchEventsTarget === "wrapper") {
      if (!$targetEl.closest(swiper.wrapperEl).length)
        return;
    }
    data.isTouchEvent = e2.type === "touchstart";
    if (!data.isTouchEvent && "which" in e2 && e2.which === 3)
      return;
    if (!data.isTouchEvent && "button" in e2 && e2.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = event2.composedPath ? event2.composedPath() : event2.path;
    if (swipingClassHasValue && e2.target && e2.target.shadowRoot && eventPath) {
      $targetEl = dom_default(eventPath[0]);
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e2.target && e2.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0])
        return;
    }
    touches.currentX = e2.type === "touchstart" ? e2.targetTouches[0].pageX : e2.pageX;
    touches.currentY = e2.type === "touchstart" ? e2.targetTouches[0].pageY : e2.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
      } else {
        return;
      }
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params.threshold > 0)
      data.allowThresholdMove = false;
    if (e2.type !== "touchstart") {
      let preventDefault = true;
      if ($targetEl.is(data.focusableElements)) {
        preventDefault = false;
        if ($targetEl[0].nodeName === "SELECT") {
          data.isTouched = false;
        }
      }
      if (document2.activeElement && dom_default(document2.activeElement).is(data.focusableElements) && document2.activeElement !== $targetEl[0]) {
        document2.activeElement.blur();
      }
      const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
      if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
        e2.preventDefault();
      }
    }
    if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
      swiper.freeMode.onTouchStart();
    }
    swiper.emit("touchStart", e2);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/onTouchMove.js
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper;
    if (!enabled)
      return;
    let e2 = event2;
    if (e2.originalEvent)
      e2 = e2.originalEvent;
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e2);
      }
      return;
    }
    if (data.isTouchEvent && e2.type !== "touchmove")
      return;
    const targetTouch = e2.type === "touchmove" && e2.targetTouches && (e2.targetTouches[0] || e2.changedTouches[0]);
    const pageX = e2.type === "touchmove" ? targetTouch.pageX : e2.pageX;
    const pageY = e2.type === "touchmove" ? targetTouch.pageY : e2.pageY;
    if (e2.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!dom_default(e2.target).is(data.focusableElements)) {
        swiper.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }
    if (data.isTouchEvent && document2.activeElement) {
      if (e2.target === document2.activeElement && dom_default(e2.target).is(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e2);
    }
    if (e2.targetTouches && e2.targetTouches.length > 1)
      return;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e2);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode && e2.cancelable) {
      e2.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e2.stopPropagation();
    }
    if (!data.isMoved) {
      if (params.loop && !params.cssMode) {
        swiper.loopFix();
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit("sliderFirstMove", e2);
    }
    swiper.emit("sliderMove", e2);
    data.isMoved = true;
    let diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl)
      diff = -diff;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance)
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance)
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
    }
    if (disableParentSwiper) {
      e2.preventedByNestedSwiper = true;
    }
    if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode)
      return;
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    }
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/onTouchEnd.js
  function onTouchEnd(event2) {
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper;
    if (!enabled)
      return;
    let e2 = event2;
    if (e2.originalEvent)
      e2 = e2.originalEvent;
    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e2);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e2.path || e2.composedPath && e2.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e2.target);
      swiper.emit("tap click", e2);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e2);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper.destroyed)
        swiper.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (swiper.params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (let i2 = 0; i2 < slidesGrid.length; i2 += i2 < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i2 < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i2 + increment2] !== "undefined") {
        if (currentPos >= slidesGrid[i2] && currentPos < slidesGrid[i2 + increment2]) {
          stopIndex = i2;
          groupSize = slidesGrid[i2 + increment2] - slidesGrid[i2];
        }
      } else if (currentPos >= slidesGrid[i2]) {
        stopIndex = i2;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper.navigation && (e2.target === swiper.navigation.nextEl || e2.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e2.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/onResize.js
  function onResize() {
    const swiper = this;
    const {
      params,
      el
    } = swiper;
    if (el && el.offsetWidth === 0)
      return;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/onClick.js
  function onClick(e2) {
    const swiper = this;
    if (!swiper.enabled)
      return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks)
        e2.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e2.stopPropagation();
        e2.stopImmediatePropagation();
      }
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/onScroll.js
  function onScroll() {
    const swiper = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled)
      return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    if (swiper.translate === 0)
      swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }
    swiper.emit("setTranslate", swiper.translate, false);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/events/index.js
  var dummyEventAttached = false;
  function dummyEventListener() {
  }
  var events = (swiper, method) => {
    const document2 = getDocument();
    const {
      params,
      touchEvents,
      el,
      wrapperEl,
      device,
      support: support2
    } = swiper;
    const capture = !!params.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    if (!support2.touch) {
      el[domMethod](touchEvents.start, swiper.onTouchStart, false);
      document2[domMethod](touchEvents.move, swiper.onTouchMove, capture);
      document2[domMethod](touchEvents.end, swiper.onTouchEnd, false);
    } else {
      const passiveListener = touchEvents.start === "touchstart" && support2.passiveListener && params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
      el[domMethod](touchEvents.move, swiper.onTouchMove, support2.passiveListener ? {
        passive: false,
        capture
      } : capture);
      el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
      if (touchEvents.cancel) {
        el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
      }
    }
    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper.onScroll);
    }
    if (params.updateOnWindowResize) {
      swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper[swiperMethod]("observerUpdate", onResize, true);
    }
  };
  function attachEvents() {
    const swiper = this;
    const document2 = getDocument();
    const {
      params,
      support: support2
    } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    if (support2.touch && !dummyEventAttached) {
      document2.addEventListener("touchstart", dummyEventListener);
      dummyEventAttached = true;
    }
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  var events_default = {
    attachEvents,
    detachEvents
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/breakpoints/setBreakpoint.js
  var isGridEnabled = (swiper, params) => {
    return swiper.grid && params.grid && params.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper = this;
    const {
      activeIndex,
      initialized,
      loopedSlides = 0,
      params,
      $el
    } = swiper;
    const breakpoints = params.breakpoints;
    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0)
      return;
    const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      $el.addClass(`${params.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        $el.addClass(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    if (directionChanged && initialized) {
      swiper.changeDirection();
    }
    extend2(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
    }
    swiper.emit("breakpoint", breakpointParams);
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/breakpoints/getBreakpoint.js
  function getBreakpoint(breakpoints, base = "window", containerEl) {
    if (!breakpoints || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a2, b) => parseInt(a2.value, 10) - parseInt(b.value, 10));
    for (let i2 = 0; i2 < points.length; i2 += 1) {
      const {
        point,
        value
      } = points[i2];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/breakpoints/index.js
  var breakpoints_default = {
    setBreakpoint,
    getBreakpoint
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/classes/addClasses.js
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params,
      rtl,
      $el,
      device,
      support: support2
    } = swiper;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "pointer-events": !support2.touch
    }, {
      "free-mode": swiper.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    $el.addClass([...classNames].join(" "));
    swiper.emitContainerClasses();
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/classes/removeClasses.js
  function removeClasses() {
    const swiper = this;
    const {
      $el,
      classNames
    } = swiper;
    $el.removeClass(classNames.join(" "));
    swiper.emitContainerClasses();
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/classes/index.js
  var classes_default = {
    addClasses,
    removeClasses
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/images/loadImage.js
  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    const window2 = getWindow();
    let image;
    function onReady() {
      if (callback)
        callback();
    }
    const isPicture = dom_default(imageEl).parent("picture")[0];
    if (!isPicture && (!imageEl.complete || !checkForComplete)) {
      if (src) {
        image = new window2.Image();
        image.onload = onReady;
        image.onerror = onReady;
        if (sizes) {
          image.sizes = sizes;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      onReady();
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/images/preloadImages.js
  function preloadImages() {
    const swiper = this;
    swiper.imagesToLoad = swiper.$el.find("img");
    function onReady() {
      if (typeof swiper === "undefined" || swiper === null || !swiper || swiper.destroyed)
        return;
      if (swiper.imagesLoaded !== void 0)
        swiper.imagesLoaded += 1;
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady)
          swiper.update();
        swiper.emit("imagesReady");
      }
    }
    for (let i2 = 0; i2 < swiper.imagesToLoad.length; i2 += 1) {
      const imageEl = swiper.imagesToLoad[i2];
      swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
    }
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/images/index.js
  var images_default = {
    loadImage,
    preloadImages
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/check-overflow/index.js
  function checkOverflow() {
    const swiper = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }
    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }
    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }
  var check_overflow_default = {
    checkOverflow
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/defaults.js
  var defaults_default = {
    init: true,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: void 0,
    breakpointsBase: "window",
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopedSlidesLimit: true,
    loopFillGroupWithBlank: false,
    loopPreventsSlide: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: "swiper-",
    // NEW
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/moduleExtendParams.js
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj = {}) {
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend2(allModulesParams, obj);
        return;
      }
      if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
        params[moduleParamName] = {
          auto: true
        };
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend2(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false
        };
      extend2(allModulesParams, obj);
    };
  }

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/core/core.js
  var prototypes = {
    eventsEmitter: events_emitter_default,
    update: update_default,
    translate: translate_default,
    transition: transition_default,
    slide: slide_default,
    loop: loop_default,
    grabCursor: grab_cursor_default,
    events: events_default,
    breakpoints: breakpoints_default,
    checkOverflow: check_overflow_default,
    classes: classes_default,
    images: images_default
  };
  var extendedDefaults = {};
  var Swiper = class _Swiper {
    constructor(...args) {
      let el;
      let params;
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params = args[0];
      } else {
        [el, params] = args;
      }
      if (!params)
        params = {};
      params = extend2({}, params);
      if (el && !params.el)
        params.el = el;
      if (params.el && dom_default(params.el).length > 1) {
        const swipers = [];
        dom_default(params.el).each((containerEl) => {
          const newParams = extend2({}, params, {
            el: containerEl
          });
          swipers.push(new _Swiper(newParams));
        });
        return swipers;
      }
      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];
      if (params.modules && Array.isArray(params.modules)) {
        swiper.modules.push(...params.modules);
      }
      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper)
        });
      });
      const swiperParams = extend2({}, defaults_default, allModulesParams);
      swiper.params = extend2({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend2({}, swiper.params);
      swiper.passedParams = extend2({}, params);
      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }
      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      }
      swiper.$ = dom_default;
      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        // Classes
        classNames: [],
        // Slides
        slides: dom_default(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical() {
          return swiper.params.direction === "vertical";
        },
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: function touchEvents() {
          const touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
          const desktop = ["pointerdown", "pointermove", "pointerup"];
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3]
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2]
          };
          return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }(),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          // Form elements to match
          focusableElements: swiper.params.focusableElements,
          // Last click time
          lastClickTime: now(),
          clickTimeout: void 0,
          // Velocities
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper.emit("_swiper");
      if (swiper.params.init) {
        swiper.init();
      }
      return swiper;
    }
    enable() {
      const swiper = this;
      if (swiper.enabled)
        return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit("enable");
    }
    disable() {
      const swiper = this;
      if (!swiper.enabled)
        return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const cls = swiper.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper = this;
      if (swiper.destroyed)
        return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el)
        return;
      const updates = [];
      swiper.slides.each((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view = "current", exact = false) {
      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper;
      let spv = 1;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex].swiperSlideSize;
        let breakLoop;
        for (let i2 = activeIndex + 1; i2 < slides.length; i2 += 1) {
          if (slides[i2] && !breakLoop) {
            slideSize += slides[i2].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
        for (let i2 = activeIndex - 1; i2 >= 0; i2 -= 1) {
          if (slides[i2] && !breakLoop) {
            slideSize += slides[i2].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i2 = activeIndex + 1; i2 < slides.length; i2 += 1) {
            const slideInView = exact ? slidesGrid[i2] + slidesSizesGrid[i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i2] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i2 = activeIndex - 1; i2 >= 0; i2 -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i2] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed)
        return;
      const {
        snapGrid,
        params
      } = swiper;
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      let translated;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
        setTranslate2();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === "auto" || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit("update");
    }
    changeDirection(newDirection, needUpdate = true) {
      const swiper = this;
      const currentDirection = swiper.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper;
      }
      swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.each((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate)
        swiper.update();
      return swiper;
    }
    changeLanguageDirection(direction) {
      const swiper = this;
      if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
        return;
      swiper.rtl = direction === "rtl";
      swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
      if (swiper.rtl) {
        swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "rtl";
      } else {
        swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "ltr";
      }
      swiper.update();
    }
    mount(el) {
      const swiper = this;
      if (swiper.mounted)
        return true;
      const $el = dom_default(el || swiper.params.el);
      el = $el[0];
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      const getWrapperSelector = () => {
        return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = dom_default(el.shadowRoot.querySelector(getWrapperSelector()));
          res.children = (options) => $el.children(options);
          return res;
        }
        if (!$el.children) {
          return dom_default($el).children(getWrapperSelector());
        }
        return $el.children(getWrapperSelector());
      };
      let $wrapperEl = getWrapper();
      if ($wrapperEl.length === 0 && swiper.params.createElements) {
        const document2 = getDocument();
        const wrapper = document2.createElement("div");
        $wrapperEl = dom_default(wrapper);
        wrapper.className = swiper.params.wrapperClass;
        $el.append(wrapper);
        $el.children(`.${swiper.params.slideClass}`).each((slideEl) => {
          $wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        $el,
        el,
        $wrapperEl,
        wrapperEl: $wrapperEl[0],
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
        rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
        wrongRTL: $wrapperEl.css("display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper = this;
      if (swiper.initialized)
        return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false)
        return swiper;
      swiper.emit("beforeInit");
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.addClasses();
      if (swiper.params.loop) {
        swiper.loopCreate();
      }
      swiper.updateSize();
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }
      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }
      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }
      swiper.attachEvents();
      swiper.initialized = true;
      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }
    destroy(deleteInstance = true, cleanStyles = true) {
      const swiper = this;
      const {
        params,
        $el,
        $wrapperEl,
        slides
      } = swiper;
      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }
      swiper.emit("beforeDestroy");
      swiper.initialized = false;
      swiper.detachEvents();
      if (params.loop) {
        swiper.loopDestroy();
      }
      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr("style");
        $wrapperEl.removeAttr("style");
        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
        }
      }
      swiper.emit("destroy");
      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        deleteProps(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend2(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults_default;
    }
    static installModule(mod) {
      if (!_Swiper.prototype.__modules__)
        _Swiper.prototype.__modules__ = [];
      const modules = _Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => _Swiper.installModule(m));
        return _Swiper;
      }
      _Swiper.installModule(module);
      return _Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);
  var core_default = Swiper;

  // node_modules/.pnpm/swiper@8.4.7/node_modules/swiper/modules/autoplay/autoplay.js
  function Autoplay({
    swiper,
    extendParams,
    on: on2,
    emit
  }) {
    let timeout;
    swiper.autoplay = {
      running: false,
      paused: false
    };
    extendParams({
      autoplay: {
        enabled: false,
        delay: 3e3,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
        pauseOnMouseEnter: false
      }
    });
    function run() {
      if (!swiper.size) {
        swiper.autoplay.running = false;
        swiper.autoplay.paused = false;
        return;
      }
      const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      let delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr("data-swiper-autoplay")) {
        delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
      }
      clearTimeout(timeout);
      timeout = nextTick(() => {
        let autoplayResult;
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
            emit("autoplay");
          } else if (!swiper.isBeginning) {
            autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
            emit("autoplay");
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            emit("autoplay");
          } else {
            stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper.isEnd) {
          autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
          emit("autoplay");
        } else {
          stop();
        }
        if (swiper.params.cssMode && swiper.autoplay.running)
          run();
        else if (autoplayResult === false) {
          run();
        }
      }, delay);
    }
    function start() {
      if (typeof timeout !== "undefined")
        return false;
      if (swiper.autoplay.running)
        return false;
      swiper.autoplay.running = true;
      emit("autoplayStart");
      run();
      return true;
    }
    function stop() {
      if (!swiper.autoplay.running)
        return false;
      if (typeof timeout === "undefined")
        return false;
      if (timeout) {
        clearTimeout(timeout);
        timeout = void 0;
      }
      swiper.autoplay.running = false;
      emit("autoplayStop");
      return true;
    }
    function pause(speed) {
      if (!swiper.autoplay.running)
        return;
      if (swiper.autoplay.paused)
        return;
      if (timeout)
        clearTimeout(timeout);
      swiper.autoplay.paused = true;
      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        run();
      } else {
        ["transitionend", "webkitTransitionEnd"].forEach((event2) => {
          swiper.$wrapperEl[0].addEventListener(event2, onTransitionEnd);
        });
      }
    }
    function onVisibilityChange() {
      const document2 = getDocument();
      if (document2.visibilityState === "hidden" && swiper.autoplay.running) {
        pause();
      }
      if (document2.visibilityState === "visible" && swiper.autoplay.paused) {
        run();
        swiper.autoplay.paused = false;
      }
    }
    function onTransitionEnd(e2) {
      if (!swiper || swiper.destroyed || !swiper.$wrapperEl)
        return;
      if (e2.target !== swiper.$wrapperEl[0])
        return;
      ["transitionend", "webkitTransitionEnd"].forEach((event2) => {
        swiper.$wrapperEl[0].removeEventListener(event2, onTransitionEnd);
      });
      swiper.autoplay.paused = false;
      if (!swiper.autoplay.running) {
        stop();
      } else {
        run();
      }
    }
    function onMouseEnter() {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        emit("autoplayPause");
        pause();
      }
      ["transitionend", "webkitTransitionEnd"].forEach((event2) => {
        swiper.$wrapperEl[0].removeEventListener(event2, onTransitionEnd);
      });
    }
    function onMouseLeave() {
      if (swiper.params.autoplay.disableOnInteraction) {
        return;
      }
      swiper.autoplay.paused = false;
      emit("autoplayResume");
      run();
    }
    function attachMouseEvents() {
      if (swiper.params.autoplay.pauseOnMouseEnter) {
        swiper.$el.on("mouseenter", onMouseEnter);
        swiper.$el.on("mouseleave", onMouseLeave);
      }
    }
    function detachMouseEvents() {
      swiper.$el.off("mouseenter", onMouseEnter);
      swiper.$el.off("mouseleave", onMouseLeave);
    }
    on2("init", () => {
      if (swiper.params.autoplay.enabled) {
        start();
        const document2 = getDocument();
        document2.addEventListener("visibilitychange", onVisibilityChange);
        attachMouseEvents();
      }
    });
    on2("beforeTransitionStart", (_s, speed, internal) => {
      if (swiper.autoplay.running) {
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.pause(speed);
        } else {
          stop();
        }
      }
    });
    on2("sliderFirstMove", () => {
      if (swiper.autoplay.running) {
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
        } else {
          pause();
        }
      }
    });
    on2("touchEnd", () => {
      if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
        run();
      }
    });
    on2("destroy", () => {
      detachMouseEvents();
      if (swiper.autoplay.running) {
        stop();
      }
      const document2 = getDocument();
      document2.removeEventListener("visibilitychange", onVisibilityChange);
    });
    Object.assign(swiper.autoplay, {
      pause,
      run,
      start,
      stop
    });
  }

  // src/scripts/pages/home/homePageController.ts
  core_default.use([Autoplay]);
  var homePageController = () => {
    headerController();
    const heroGallerySlider = new core_default(".hero-gallery", {
      speed: 2500,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 3e3,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          spaceBetween: 60
        }
      }
    });
    return () => {
      if (heroGallerySlider) {
        heroGallerySlider.destroy(true, true);
      }
    };
  };

  // node_modules/.pnpm/micromodal@0.4.10/node_modules/micromodal/dist/micromodal.es.js
  function e(e2, t2) {
    for (var o2 = 0; o2 < t2.length; o2++) {
      var n2 = t2[o2];
      n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(e2, n2.key, n2);
    }
  }
  function t(e2) {
    return function(e3) {
      if (Array.isArray(e3))
        return o(e3);
    }(e2) || function(e3) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e3))
        return Array.from(e3);
    }(e2) || function(e3, t2) {
      if (!e3)
        return;
      if ("string" == typeof e3)
        return o(e3, t2);
      var n2 = Object.prototype.toString.call(e3).slice(8, -1);
      "Object" === n2 && e3.constructor && (n2 = e3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(e3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return o(e3, t2);
    }(e2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function o(e2, t2) {
    (null == t2 || t2 > e2.length) && (t2 = e2.length);
    for (var o2 = 0, n2 = new Array(t2); o2 < t2; o2++)
      n2[o2] = e2[o2];
    return n2;
  }
  var n;
  var i;
  var a;
  var r;
  var s;
  var l = (n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], i = function() {
    function o2(e2) {
      var n2 = e2.targetModal, i3 = e2.triggers, a3 = void 0 === i3 ? [] : i3, r3 = e2.onShow, s2 = void 0 === r3 ? function() {
      } : r3, l2 = e2.onClose, c = void 0 === l2 ? function() {
      } : l2, d = e2.openTrigger, u = void 0 === d ? "data-micromodal-trigger" : d, f = e2.closeTrigger, h = void 0 === f ? "data-micromodal-close" : f, v = e2.openClass, g = void 0 === v ? "is-open" : v, m = e2.disableScroll, b = void 0 !== m && m, y = e2.disableFocus, p = void 0 !== y && y, w = e2.awaitCloseAnimation, E = void 0 !== w && w, k = e2.awaitOpenAnimation, M = void 0 !== k && k, A = e2.debugMode, C = void 0 !== A && A;
      !function(e3, t2) {
        if (!(e3 instanceof t2))
          throw new TypeError("Cannot call a class as a function");
      }(this, o2), this.modal = document.getElementById(n2), this.config = { debugMode: C, disableScroll: b, openTrigger: u, closeTrigger: h, openClass: g, onShow: s2, onClose: c, awaitCloseAnimation: E, awaitOpenAnimation: M, disableFocus: p }, a3.length > 0 && this.registerTriggers.apply(this, t(a3)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
    }
    var i2, a2, r2;
    return i2 = o2, (a2 = [{ key: "registerTriggers", value: function() {
      for (var e2 = this, t2 = arguments.length, o3 = new Array(t2), n2 = 0; n2 < t2; n2++)
        o3[n2] = arguments[n2];
      o3.filter(Boolean).forEach(function(t3) {
        t3.addEventListener("click", function(t4) {
          return e2.showModal(t4);
        });
      });
    } }, { key: "showModal", value: function() {
      var e2 = this, t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
        var o3 = function t3() {
          e2.modal.removeEventListener("animationend", t3, false), e2.setFocusToFirstNode();
        };
        this.modal.addEventListener("animationend", o3, false);
      } else
        this.setFocusToFirstNode();
      this.config.onShow(this.modal, this.activeElement, t2);
    } }, { key: "closeModal", value: function() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t2 = this.modal;
      if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e2), this.config.awaitCloseAnimation) {
        var o3 = this.config.openClass;
        this.modal.addEventListener("animationend", function e3() {
          t2.classList.remove(o3), t2.removeEventListener("animationend", e3, false);
        }, false);
      } else
        t2.classList.remove(this.config.openClass);
    } }, { key: "closeModalById", value: function(e2) {
      this.modal = document.getElementById(e2), this.modal && this.closeModal();
    } }, { key: "scrollBehaviour", value: function(e2) {
      if (this.config.disableScroll) {
        var t2 = document.querySelector("body");
        switch (e2) {
          case "enable":
            Object.assign(t2.style, { overflow: "" });
            break;
          case "disable":
            Object.assign(t2.style, { overflow: "hidden" });
        }
      }
    } }, { key: "addEventListeners", value: function() {
      this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
    } }, { key: "removeEventListeners", value: function() {
      this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
    } }, { key: "onClick", value: function(e2) {
      (e2.target.hasAttribute(this.config.closeTrigger) || e2.target.parentNode.hasAttribute(this.config.closeTrigger)) && (e2.preventDefault(), e2.stopPropagation(), this.closeModal(e2));
    } }, { key: "onKeydown", value: function(e2) {
      27 === e2.keyCode && this.closeModal(e2), 9 === e2.keyCode && this.retainFocus(e2);
    } }, { key: "getFocusableNodes", value: function() {
      var e2 = this.modal.querySelectorAll(n);
      return Array.apply(void 0, t(e2));
    } }, { key: "setFocusToFirstNode", value: function() {
      var e2 = this;
      if (!this.config.disableFocus) {
        var t2 = this.getFocusableNodes();
        if (0 !== t2.length) {
          var o3 = t2.filter(function(t3) {
            return !t3.hasAttribute(e2.config.closeTrigger);
          });
          o3.length > 0 && o3[0].focus(), 0 === o3.length && t2[0].focus();
        }
      }
    } }, { key: "retainFocus", value: function(e2) {
      var t2 = this.getFocusableNodes();
      if (0 !== t2.length)
        if (t2 = t2.filter(function(e3) {
          return null !== e3.offsetParent;
        }), this.modal.contains(document.activeElement)) {
          var o3 = t2.indexOf(document.activeElement);
          e2.shiftKey && 0 === o3 && (t2[t2.length - 1].focus(), e2.preventDefault()), !e2.shiftKey && t2.length > 0 && o3 === t2.length - 1 && (t2[0].focus(), e2.preventDefault());
        } else
          t2[0].focus();
    } }]) && e(i2.prototype, a2), r2 && e(i2, r2), o2;
  }(), a = null, r = function(e2) {
    if (!document.getElementById(e2))
      return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(e2, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e2, '"></div>')), false;
  }, s = function(e2, t2) {
    if (function(e3) {
      e3.length <= 0 && (console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
    }(e2), !t2)
      return true;
    for (var o2 in t2)
      r(o2);
    return true;
  }, { init: function(e2) {
    var o2 = Object.assign({}, { openTrigger: "data-micromodal-trigger" }, e2), n2 = t(document.querySelectorAll("[".concat(o2.openTrigger, "]"))), r2 = function(e3, t2) {
      var o3 = [];
      return e3.forEach(function(e4) {
        var n3 = e4.attributes[t2].value;
        void 0 === o3[n3] && (o3[n3] = []), o3[n3].push(e4);
      }), o3;
    }(n2, o2.openTrigger);
    if (true !== o2.debugMode || false !== s(n2, r2))
      for (var l2 in r2) {
        var c = r2[l2];
        o2.targetModal = l2, o2.triggers = t(c), a = new i(o2);
      }
  }, show: function(e2, t2) {
    var o2 = t2 || {};
    o2.targetModal = e2, true === o2.debugMode && false === r(e2) || (a && a.removeEventListeners(), (a = new i(o2)).showModal());
  }, close: function(e2) {
    e2 ? a.closeModalById(e2) : a.closeModal();
  } });
  "undefined" != typeof window && (window.MicroModal = l);
  var micromodal_es_default = l;

  // src/scripts/pages/jobs/jobsPageController.ts
  core_default.use([Autoplay]);
  var jobsPageController = () => {
    headerController();
    micromodal_es_default.init();
    const jobsSlider = new core_default(".jobs-slider", {
      speed: 5e3,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 3e3,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        }
      }
    });
    const popupSlider = new core_default(".popup__slider", {
      speed: 3e4,
      loop: true,
      autoHeight: true,
      slidesPerView: 1.2,
      autoplay: {
        delay: 1e3,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          direction: "vertical",
          slidesPerView: "auto"
        }
      }
    });
    return () => {
      jobsSlider.destroy(true, true);
      popupSlider.destroy(true, true);
    };
  };

  // src/scripts/pages/services/servicesPageController.ts
  var slideSelector = ".services-slider__wrapper";
  var servicesPageController = () => {
    headerController();
    const root1 = document.querySelector(".ss-1");
    const root2 = document.querySelector(".ss-2");
    if (root1) {
      const slide1 = root1.querySelector(slideSelector);
      if (slide1) {
        root1.appendChild(slide1.cloneNode(true));
      }
    }
    if (root2) {
      const slide2 = root2.querySelector(slideSelector);
      if (slide2) {
        root2.appendChild(slide2.cloneNode(true));
      }
    }
  };

  // src/scripts/router/addRoutes.ts
  var addRoutes = (router2) => {
    router2.addRoute("/build/", "home-page", homePageController);
    router2.addRoute("/about", "about-page", aboutPageController);
    router2.addRoute("/services", "services-page", servicesPageController);
    router2.addRoute("/nft", "nft-page");
    router2.addRoute("/jobs", "jobs-page", jobsPageController);
    router2.addRoute("/contacts", "contacts-page", contactsPageController);
  };

  // src/scripts/router/linksHandler.ts
  var linksHandler = (router2) => {
    document.addEventListener("click", (event2) => {
      const target = event2.target;
      if (target.tagName === "A" && target.hasAttribute("data-link")) {
        event2.preventDefault();
        const path = target.getAttribute("href");
        if (path) {
          router2.navigate(path);
        }
      }
    });
  };

  // src/app.ts
  var router = new Router_default("root");
  addRoutes(router);
  router.loadRoute();
  linksHandler(router);
  document.addEventListener("DOMContentLoaded", () => {
    preloaderController();
    cursorController();
  });
})();
