import Vue from 'vue'
import moment from 'moment'
import sessionStore from './sessionStore'
import env from './env'

Vue.filter('dateConverter', function (value, formatString) {
  formatString = formatString || env.constants.dateFormat;
  return moment(value).format(formatString);
});

Vue.filter('sizeUnitConverter', function (bytes) {
  if (!bytes)
    return "0B";

  var s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
});
