/**
 * Date format, used in general settings and when app is initialized
**/
export const dateFormat = [
  {value:'d/M/yy', label:'d/M/yy (ie. 6/7/23 )'},
  {value:'dd/MM/yyyy h:mm:ss', label:'dd/MM/yyyy h:mm:ss (ie. 06/07/2023, 9:03 AM)'},
  {value:'d MMM, y h:mm:ss a', label:'dd/MM/yyyy h:mm:ss (ie. 06 Jul, 2023 9:03:01 AM)'},
  {value:'M/d/yy', label:'M/d/yy (ie. 7/6/23)'},
  {value:'M/d/yy, h:mm a', label:'M/d/yy, h:mm a (ie. 7/6/23, 9:03 AM)'},
  {value:'MMM d, y, h:mm:ss a', label:'MMM d, y, h:mm:ss a (ie. Jul 06, 2023, 9:03:01 AM)'},
  {value:'yy/M/d', label:'yy/M/d (ie. 23/7/6 )'},
  {value:'yyyy/M/d, h:mm:ss a', label:'yyyy/M/d (ie. 2023/7/6, 9:03:01 AM )'},
  {value:'yyyy/MM/dd h:mm:ss', label:'yyyy/MM/dd h:mm:ss (ie. 2023/07/06, 9:03 AM)'},
];

/**
 * Logs, used in general settings
**/
export const serverlog = [
  {value:0, label: 'TRACE'},
  {value:10, label: 'DEBUG'},
  {value:20, label: 'INFO'},
  {value:30, label: 'WARNING'},
  {value:40, label: 'ERROR'},
  {value:50, label: 'FATAL'}
];

/**
 * Proxy type, used in general settings
**/
export const proxytype = [
  {value:'HTTP',label:'HTTP'},
  {value:'HTTP',label:'HTTPS'},
  {value:'HTTP',label:'SOCKS4'},
  {value:'HTTP',label:'SOCKS5'}
];

/**
 * Color picker preset colors
**/
export const colorpicker = ['#D41A29', '#00A5ff', '#D000A4', '#FF9000', '#F32E6E', '#D35F00', '#7ad54d'];

