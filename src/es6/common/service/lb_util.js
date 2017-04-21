'use strict';

/**
 * Created by wadeforever on 2016/12/5.
 */
/*global angular*/
(function () {
    angular.module('webApp').service('utilService', utilService);
    utilService.$inject = ['$q', '$interval'];
    function utilService ($q, $interval) {
        /**
         * 读取chart成功回调
         * @param chart
         * @returns {Promise}
         */
        this.chartReady = function (chart) {
            let deferred = $q.defer();
            let sec = 0;
            if (!angular.isDefined(chart)) {
                deferred.reject();
            } else {
                let itv = $interval(function () {
                    sec += 50;
                    if (angular.isDefined(chart.chart)) {
                        deferred.resolve(chart.chart);
                        $interval.cancel(itv);
                    } else if (sec >= 3000) {
                        deferred.reject();
                        $interval.cancel(itv);
                    }
                }, 50);
            }
            return deferred.promise;
        };
        /**
         * 对象属性准备完成
         * @param {{}}obj
         * @param {String}propName 读取的属性名
         * @returns {Promise}
         */
        this.propReady = function (obj, propName) {
            let deferred = $q.defer();
            let sec = 0;
            if (!angular.isDefined(obj)) {
                deferred.reject();
            } else {
                let itv = $interval(function () {
                    sec += 50;
                    if (angular.isDefined(obj[propName])) {
                        deferred.resolve(obj[propName]);
                        $interval.cancel(itv);
                    } else if (sec >= 3000) {
                        deferred.reject();
                        $interval.cancel(itv);
                    }
                }, 50);
            }
            return deferred.promise;
        };
        this.multip = function (arg1, arg2) {
            let m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split('.')[1].length;
            } catch (e) {
            }
            try {
                m += s2.split('.')[1].length;
            } catch (e) {
            }
            return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
        };
        this.imageReady = function (url) {
            let defer = $q.defer();
            let img = new Image();
            img.src = url;
            if (img.complete) {
                defer.resolve(1111);
            }
            img.onload = function () {
                defer.resolve(2222);
            };
            img.onerror = function () {
                defer.reject();
            };
            return defer.promise;
        };
    }
})();
