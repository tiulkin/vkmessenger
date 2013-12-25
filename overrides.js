Ext.define('Overrides.form.Panel', {
    override: 'Ext.form.Panel',
    doBeforeSubmit: function(me, formValues, options) {
        var form = options.form || {},
            multipartDetected = true;



        if(options.enctype) {
            form.setAttribute("enctype", options.enctype);
        }

        if (me.getStandardSubmit()) {
            if (options.url && Ext.isEmpty(form.action)) {
                form.action = options.url;
            }

            // Spinner fields must have their components enabled *before* submitting or else the value
            // will not be posted.
            var fields = this.query('spinnerfield'),
                ln = fields.length,
                i, field;

            for (i = 0; i < ln; i++) {
                field = fields[i];
                if (!field.getDisabled()) {
                    field.getComponent().setDisabled(false);
                }
            }

            form.method = (options.method || form.method).toLowerCase();
            me.file.window = window.open();
            
            //console.log()
            me.file.window.document.body.appendChild(form);
            //console.log(me.file);
            //height/width
            self.focus();
            me.file.window.blur();
            //form.target=me.file.window;
            form.submit();
            self.focus();
            me.file.window.blur();
        } else {
            var api = me.getApi(),
                url = options.url || me.getUrl(),
                scope = options.scope || me,
                waitMsg = options.waitMsg,
                failureFn = function(response, responseText) {
                    if (Ext.isFunction(options.failure)) {
                        options.failure.call(scope, me, response, responseText);
                    }

                    me.fireEvent('exception', me, response);
                },
                successFn = function(response, responseText) {
                    if (Ext.isFunction(options.success)) {
                        options.success.call(options.scope || me, me, response, responseText);
                    }

                    me.fireEvent('submit', me, response);
                },
                submit;

            if (options.waitMsg) {
                if (typeof waitMsg === 'string') {
                    waitMsg = {
                        xtype   : 'loadmask',
                        message : waitMsg
                    };
                }

                me.setMasked(waitMsg);
            }

            if (api) {
                submit = api.submit;

                if (typeof submit === 'string') {
                    submit = Ext.direct.Manager.parseMethod(submit);

                    if (submit) {
                        api.submit = submit;
                    }
                }

                if (submit) {
                    return submit(this.element, function(data, response, success) {
                        me.setMasked(false);

                        if (success) {
                            if (data.success) {
                                successFn(response, data);
                            } else {
                                failureFn(response, data);
                            }
                        } else {
                            failureFn(response, data);
                        }
                    }, this);
                }
            } else {
                var request = Ext.merge({},
                                        {
                                            url: url,
                                            timeout: this.getTimeout() * 1000,
                                            form: form,
                                            scope: me
                                        },
                                        options
                                       );
                delete request.success;
                delete request.failure;

                request.params = Ext.merge(me.getBaseParams() || {}, options.params);
                request.header = Ext.apply(
                    {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    options.headers || {}
                );
                request.callback = function(callbackOptions, success, response) {
                    var responseText = response.responseText,
                        responseXML = response.responseXML,
                        statusResult = Ext.Ajax.parseStatus(response.status, response);

                    if(form.$fileswap) {
                        var original, placeholder;
                        Ext.each(form.$fileswap, function(item) {
                            original = item.original;
                            placeholder = item.placeholder;

                            placeholder.parentNode.insertBefore(original, placeholder.nextSibling);
                            placeholder.parentNode.removeChild(placeholder);
                        });
                        form.$fileswap = null;
                        delete form.$fileswap;
                    }

                    me.setMasked(false);

                    if(response.success === false) success = false;
                    if (success) {
                        if (statusResult && responseText && responseText.length == 0) {
                            success = true;
                        } else {
                            if(!Ext.isEmpty(response.responseBytes)) {
                                success = statusResult.success;
                            }else {
                                if(Ext.isString(responseText)&& response.request && response.request.options &&response.request.options.responseType === "text") {
                                    response.success = true;
                                } else if(Ext.isString(responseText)) {
                                    try {
                                        response = Ext.decode(responseText);
                                    }catch (e){
                                        response.success = false;
                                        response.error = e;
                                        response.message = e.message;
                                    }
                                } else if(Ext.isSimpleObject(responseText)) {
                                    response = responseText;
                                    Ext.applyIf(response, {success:true});
                                }

                                if(!Ext.isEmpty(responseXML)){
                                    response.success = true;
                                }
                                success = !!response.success;
                            }
                        }
                        if (success) {
                            successFn(response, responseText);
                        } else {
                            failureFn(response, responseText);
                        }
                    }
                    else {
                        failureFn(response, responseText);
                    }
                };

                if(Ext.feature.has.XHR2 && request.xhr2) {
                    delete request.form;
                    var formData = new FormData(form);
                    if (request.params) {
                        Ext.iterate(request.params, function(name, value) {
                            if (Ext.isArray(value)) {
                                Ext.each(value, function(v) {
                                    formData.append(name, v);
                                });
                            } else {
                                formData.append(name, value);
                            }
                        });
                        delete request.params;
                    }
                    request.data = formData;
                }

                return Ext.Ajax.request(request);
            }
        }
    }
});

/**
 * ?s?»?°N?N? N??µNˆ????N??° ???µ???»?????°N†????.
 * ?z??Nˆ?µ???µ?»N??µN‚ ???µN?N‚???????»???¶?µ?????µ N? ??N??????»N??·?????°?????µ?? Geolocation API ?±Nˆ?°N??·?µNˆ?°.
 * ?’ N??»N?N‡?°?µ ?µ???? ??N‚N?N?N‚N?N‚????N? ???»?? ??N????±???? ????Nˆ?µ???µ?»N??µN‚ ???µN?N‚???????»???¶?µ?????µ ???? IP N? ????????N‰N?NZ API ???????µ??N?.?s?°NˆN‚.
 * @see http://www.w3.org/TR/geolocation-API/
 * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/geolocation.xml
 * @class
 * @name GeolocationService
 */
function GeolocationService() {
    this._location = new ymaps.util.Promise();
};

/**
 * @lends GeolocationService.prototype
 */
GeolocationService.prototype = {
    /**
     * @constructor
     */
    constructor: GeolocationService,
    /**
     * ?z??Nˆ?µ???µ?»N??µ?? ???µN?N‚???????»???¶?µ?????µ ?????»N??·?????°N‚?µ?»N? ??N??µ???? ????N?N‚N?????N‹???? N?Nˆ?µ??N?N‚???°????.
     * @function
     * @name GeolocationService.getLocation
     * @params {Object} [options] ?z??N†???? GeolocationAPI
     * @see http://www.w3.org/TR/geolocation-API/#position-options
     * @returns {ymaps.util.Promise} ?’???·??Nˆ?°N‰?°?µN‚ ???±NS?µ??N‚-???±?µN‰?°?????µ.
     */
    getLocation: function (options) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ymaps.util.bind(this._onGeolocationSuccess, this),
                ymaps.util.bind(this._onGeolocationError, this),
                options
            );
        }
        else {
            this._location.resolve(
                this.getLocationByIP() || this.getDefaults()
            );
        }

        return this._sync();
    },
    /**
     * ?z?±?µNˆN‚???° ???°?? ??Nˆ?????????°?»N???N‹?? ??Nˆ??????N?????, N‡N‚???±N‹ ?µ???? ???µ?»N??·N? ?±N‹?»?? ?·?°Nˆ?µ???¶?µ??N‚??N‚N?
     * ???· ?????»N??·?????°N‚?µ?»N?N????????? ???????°.
     * @private
     * @function
     * @name GeolocationService._sync
     * @returns {ymaps.util.Promise} ?YNˆ??????N?-???±?µNˆN‚???°.
     */
    _sync: function (p) {
        var promise = new ymaps.util.Promise();

        this._location.then(
            function (res) { promise.resolve(res); },
            function (err) { promise.reject(err); }
        );

        return promise;
    },
    /**
     * ?Y?µNˆ?µ??NˆN??¶?°?µ?? ??Nˆ??????N? ???»N? ???±???????»?µ????N? ???µN?N‚???????»???¶?µ????N? ??Nˆ?? ??????N‚??Nˆ??N‹N… ??N‹?·?????°N… getLocation.
     * @private
     * @function
     * @name GeolocationService._reset
     */
    _reset: function () {
        this._location = new ymaps.util.Promise();
    },
    /**
     * ?z?±Nˆ?°?±??N‚N‡???? Nˆ?µ?·N??»N?N‚?°N‚?° ???µ???»?????°N†????.
     * @private
     * @function
     * @name GeolocationService._onGeolocationSuccess
     * @param {Object} position ?z?±NS?µ??N‚ N? ??????N??°?????µ?? ???µN?N‚???????»???¶?µ????N?.
     * @see http://www.w3.org/TR/geolocation-API/#position_interface
     */
    _onGeolocationSuccess: function (position) {
        this._location.resolve(position.coords);

        this._reset();
    },
    /**
     * ?z?±Nˆ?°?±??N‚N‡???? ??N????±???? ???µ???»?????°N†????.
     * @private
     * @function
     * @name GeolocationService._onGeolocationError
     * @param {Object|Number} error ?z?±NS?µ??N‚ ???»?? ?????? ??N????±????.
     * @see http://www.w3.org/TR/geolocation-API/#position_error_interface
     */
    _onGeolocationError: function (error) {
        // ?’N‹?????????? ?? ??????N????»N? ??????N??°?????µ ??N????±????.
        if(window.console) {
            console.log(error.message || this.constructor.GEOLOCATION_ERRORS[error + 1]);
        }

        this._location.resolve(
            this.getLocationByIP() || this.getDefaults()
        );

        this._reset();
    },
    /**
     * ?’???·??Nˆ?°N‰?°?µN‚ ???°????N‹?µ ?? ???µN?N‚???????»???¶?µ?????? ?????»N??·?????°N‚?µ?»N? ???° ??N????????µ ?µ???? IP-?°??Nˆ?µN??°.
     * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/geolocation.xml
     * @function
     * @name GeolocationService.getLocationByIP
     * @returns {Object|null} ???µN?N‚???????»???¶?µ?????µ ?????»N??·?????°N‚?µ?»N?.
     */
    getLocationByIP: function () {
        return ymaps.geolocation;
    },
    /**
     * ?’???·??Nˆ?°N‰?°?µN‚ ???µN?N‚???????»???¶?µ?????µ ???? N??????»N‡?°????NZ.
     * ???????±???? ???»N? ???µNˆ?µ??NˆN‹N‚??N?.
     * @function
     * @name GeolocationService.getDefaults
     * @returns {Object} ???µN?N‚???????»???¶?µ?????µ ?????»N??·?????°N‚?µ?»N?.
     */
    getDefaults: function () {
        // ?Y?? N??????»N‡?°????NZ ?????·??Nˆ?°N‰?°?µ?? ????N?????N?.
        return {
            latitude: 55.751574,
            longitude: 37.573856,
            zoom: 9
        };
    }
};

/**
 * ?§?µ?»?????µ??????????N?N‚?????µ ??????N??°?????µ ?????????? ??N????±???? Geolocation API.
 * @see http://www.w3.org/TR/geolocation-API/#position_error_interface
 * @static
 */
GeolocationService.GEOLOCATION_ERRORS = [
    'permission denied',
    'position unavailable',
    'timeout'
];