/*
 * Javascript Humane Dates
 * Copyright (c) 2008 Dean Landolt (deanlandolt.com)
 * Re-write by Zach Leatherman (zachleat.com)
 * Refactor by Chris Pearce (github.com/Chrisui)
 *
 * Adopted from the John Resig's pretty.js
 * at http://ejohn.org/blog/javascript-pretty-date
 * and henrah's proposed modification
 * at http://ejohn.org/blog/javascript-pretty-date/#comment-297458
 *
 * Licensed under the MIT license.
 */

;(function(root){

        var lang = {
                        ago: ux.locale.Manager.get('ago'),
                        from: ux.locale.Manager.get('from'),
                        now: ux.locale.Manager.get('now'),
                        minute: ux.locale.Manager.get('minute'),
                        minutes: ux.locale.Manager.get('minutes'),
                        hour: ux.locale.Manager.get('hour'),
                        hours: ux.locale.Manager.get('hours'),
                        day: ux.locale.Manager.get('day'),
                        days: ux.locale.Manager.get('days'),
                        week: ux.locale.Manager.get('week'),
                        weeks: ux.locale.Manager.get('weeks'),
                        month: ux.locale.Manager.get('month'),
                        months: ux.locale.Manager.get('months'),
                        year: ux.locale.Manager.get('year'),
                        years: ux.locale.Manager.get('years')
                },
                formats = [
                        [60, lang.now],
                        [3600, lang.minute, lang.minutes, 60], // 60 minutes, 1 minute
                        [86400, lang.hour, lang.hours, 3600], // 24 hours, 1 hour
                        [604800, lang.day, lang.days, 86400], // 7 days, 1 day
                        [2628000, lang.week, lang.weeks, 604800], // ~1 month, 1 week
                        [31536000, lang.month, lang.months, 2628000], // 1 year, ~1 month
                        [Infinity, lang.year, lang.years, 31536000] // Infinity, 1 year
                ];

        function normalize(val, single)
        {
                var margin = 0.1;
                if(val >= single && val <= single * (1+margin)) {
                        return single;
                }
                return val;
        }

        root.humaneDate = function(date, compareTo){

                if(!date) {
                        return;
                }

                var isString = typeof date == 'string',
                        date = isString ?
                                                new Date(('' + date).replace(/-/g,"/").replace(/T|(?:\.\d+)?Z/g," ")) :
                                                date,
                        compareTo = compareTo || new Date,
                        seconds = (compareTo - date +
                                                        (compareTo.getTimezoneOffset() -
                                                                // if we received a GMT time from a string, doesn't include time zone bias
                                                                // if we got a date object, the time zone is built in, we need to remove it.
                                                                (isString ? 0 : date.getTimezoneOffset())
                                                        ) * 60000
                                                ) / 1000,
                        token;

                if(seconds < 0) {
                        seconds = Math.abs(seconds);
                        token = lang.from ? ' ' + lang.from : '';
                } else {
                        token = lang.ago ? ' ' + lang.ago : '';
                }

                /*
                 * 0 seconds && < 60 seconds        Now
                 * 60 seconds                       1 Minute
                 * > 60 seconds && < 60 minutes     X Minutes
                 * 60 minutes                       1 Hour
                 * > 60 minutes && < 24 hours       X Hours
                 * 24 hours                         1 Day
                 * > 24 hours && < 7 days           X Days
                 * 7 days                           1 Week
                 * > 7 days && < ~ 1 Month          X Weeks
                 * ~ 1 Month                        1 Month
                 * > ~ 1 Month && < 1 Year          X Months
                 * 1 Year                           1 Year
                 * > 1 Year                         X Years
                 *
                 * Single units are +10%. 1 Year shows first at 1 Year + 10%
                 */

                for(var i = 0, format = formats[0]; formats[i]; format = formats[++i]) {
                        if(seconds < format[0]) {
                                if(i === 0) {
                                        // Now
                                        return format[1];
                                }

                                var val = Math.ceil(normalize(seconds, format[3]) / (format[3]));
                                return val +
                                                ' ' +
                                                (val != 1 ? format[2] : format[1]) +
                                                (i > 0 ? token : '');
                        }
                }
        };

        if(typeof jQuery != 'undefined') {
                jQuery.fn.humaneDates = function(options)
                {
                        var settings = jQuery.extend({
                                'lowercase': false
                        }, options);

                        return this.each(function()
                        {
                                var $t = jQuery(this),
                                        date = $t.attr('datetime') || $t.attr('title');

                                date = humaneDate(date);

                                if(date && settings['lowercase']) {
                                        date = date.toLowerCase();
                                }

                                if(date && $t.html() != date) {
                                        // don't modify the dom if we don't have to
                                        $t.html(date);
                                }
                        });
                };
        }
})(this);