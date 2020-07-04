import { Dimensions, Platform, StatusBar } from 'react-native';

export const myWidth = Dimensions.get('window').width;
export const myHeight = Dimensions.get('window').height;
import axios from "axios";

const isPlatformIOS = (Platform.OS === 'ios');
const handleSize = (num) => {
  if (num <= 0) return 0;
  if (num > 100) return 1;

  return num / 100;
};
const width = num => myWidth * handleSize(num);
const height = num => myHeight * handleSize(num);
const isiPhoneX = isPlatformIOS && myHeight > 800;
const totalSize = num => Math.sqrt((myHeight * myHeight) + (myWidth * myWidth)) * handleSize(num);

const standardWidth = 375.0;
const standardHeight = 667.0;

const widthScale = dimension => (dimension / standardWidth) * myWidth;

const heightScale = dimension => (dimension / standardHeight) * myHeight;

const widthPer = persentage => (persentage / 100) * myWidth;
const heightPer = persentage => (persentage / 100) * myHeight;


export function getTime(timeInMilliSeconds) {
  var seconds = timeInMilliSeconds / 1000;
  var minutes = seconds / 60;
  var hours = minutes / 60;

  var finalHour = Math.floor(hours % 12)
  var finalMinutes = Math.floor(minutes % 60)
  if (finalHour == 0) {
    finalHour = 12
  }

  if (finalMinutes == 0) {
    finalMinutes = 0 + "" + 0
  }

  if (finalHour.toString().length == 1) {
    finalHour = '0' + finalHour
  }

  if (finalMinutes.toString().length == 1) {
    finalMinutes = '0' + finalMinutes
  }

  let ss = ''
  if (hours < 12) {
    ss = "AM"

  } else {
    ss = "PM"
  }




  return finalHour + ":" + finalMinutes + " " + ss
}


export function getDaysInbetween(timestamp1, timestamp2) {
  var oneDay = 24 * 60 * 60;
  var currentTimestamp = new Date();
  var startTimestamp = currentTimestamp - (currentTimestamp % (oneDay * 1000));
  if (parseInt(timestamp1) * 1000 == startTimestamp && timestamp1 == timestamp2) {
    console.log("****-> " + currentTimestamp.getDate());
    return [];
  }
  else {
    // days = Math.floor((timestamp2 - timestamp1) / oneDay);
    let daysArray = []
    for (var i = timestamp1; i <= timestamp2; i = i + oneDay) {
      // currentTimestamp = new Date(i*1000);
      daysArray.push(i)

    }
    return daysArray;
  }
}



export function getDateMethod(timestamp) {

  var date = new Date(timestamp * 1000);

  if (date.getTimezoneOffset() < 0) {
    return date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  }
  else {
    return date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  }

}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export function getDate(timestamp) {
  var convertedTimeStamp = getDateMethod(timestamp)
  var date = new Date(convertedTimeStamp)
  return (monthNames[date.getMonth()]) + " " + date.getDate() + "," + date.getFullYear()
}


// export function getDate(timestamp) {

//   return moment.unix(timestamp - (moment().utcOffset() / 1000)).format('ll');
// }


const statusBarHeight = (() => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 20;
  }
  if (isiPhoneX) {
    return 40;
  }
  return 20;
})();

export function StatusBarHeight() {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 20;
  }
  if (isiPhoneX) {
    return -40;
  }
  return 20;
}

export function getCurrentTimeStamp() {
  const dateTime = Date.now();
  return dateTime
}
// export function StatusBarHeight() {
//   if (Platform.OS === 'android') {
//     return StatusBar.currentHeight || 20;
//   }
//   if (isiPhoneX) {
//     return 40;
//   }
//   return 20;
// });

// export function StatusBarHeight() {
//   if (Constants.platform.ios && Constants.platform.ios.model === 'iPhone X') {
//     return 40;
//   }
//   return 20;
// }
export const getUtcTimeFromLocatlTime = () => {
  let nowUtc = new Date();
  let millis = nowUtc.getTime() - (nowUtc.getTimezoneOffset() * 60000);
  return millis;
}

export const getLocalTimeStamp = () => {
  var now = new Date();
  let localHours = now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000 + now.getSeconds() * 1000;
  //var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()


  //var Startms = TimeFormat.toMs(time)
  if (localHours && localHours > 0) {
    return localHours;
  } else {
    return 0
  }

}

const shadow = (depth, color = 'rgba(0, 0, 0, 0.5)') => ({
  elevation: depth,
  shadowOffset: { width: depth, height: depth },
  shadowColor: color,
  shadowOpacity: 1,
  shadowRadius: depth,
});

const getHeader = (lang) => {
  return {
    "accept": "application/json",
    "app_language": lang,
    "Content-Type": "application/json"
  }
}
const stdCodeList = [{ "name": "Israel", "code": "+972", "iso": "IL" }, { "name": "Afghanistan", "code": "+93", "iso": "AF" }, { "name": "Albania", "code": "+355", "iso": "AL" }, { "name": "Algeria", "code": "+213", "iso": "DZ" }, { "name": "AmericanSamoa", "code": "+1 684", "iso": "AS" }, { "name": "Andorra", "code": "+376", "iso": "AD" }, { "name": "Angola", "code": "+244", "iso": "AO" }, { "name": "Anguilla", "code": "+1 264", "iso": "AI" }, { "name": "Antigua and Barbuda", "code": "+1268", "iso": "AG" }, { "name": "Argentina", "code": "+54", "iso": "AR" }, { "name": "Armenia", "code": "+374", "iso": "AM" }, { "name": "Aruba", "code": "+297", "iso": "AW" }, { "name": "Australia", "code": "+61", "iso": "AU" }, { "name": "Austria", "code": "+43", "iso": "AT" }, { "name": "Azerbaijan", "code": "+994", "iso": "AZ" }, { "name": "Bahamas", "code": "+1 242", "iso": "BS" }, { "name": "Bahrain", "code": "+973", "iso": "BH" }, { "name": "Bangladesh", "code": "+880", "iso": "BD" }, { "name": "Barbados", "code": "+1 246", "iso": "BB" }, { "name": "Belarus", "code": "+375", "iso": "BY" }, { "name": "Belgium", "code": "+32", "iso": "BE" }, { "name": "Belize", "code": "+501", "iso": "BZ" }, { "name": "Benin", "code": "+229", "iso": "BJ" }, { "name": "Bermuda", "code": "+1 441", "iso": "BM" }, { "name": "Bhutan", "code": "+975", "iso": "BT" }, { "name": "Bosnia and Herzegovina", "code": "+387", "iso": "BA" }, { "name": "Botswana", "code": "+267", "iso": "BW" }, { "name": "Brazil", "code": "+55", "iso": "BR" }, { "name": "British Indian Ocean Territory", "code": "+246", "iso": "IO" }, { "name": "Bulgaria", "code": "+359", "iso": "BG" }, { "name": "Burkina Faso", "code": "+226", "iso": "BF" }, { "name": "Burundi", "code": "+257", "iso": "BI" }, { "name": "Cambodia", "code": "+855", "iso": "KH" }, { "name": "Cameroon", "code": "+237", "iso": "CM" }, { "name": "Canada", "code": "+1", "iso": "CA" }, { "name": "Cape Verde", "code": "+238", "iso": "CV" }, { "name": "Cayman Islands", "code": "+ 345", "iso": "KY" }, { "name": "Central African Republic", "code": "+236", "iso": "CF" }, { "name": "Chad", "code": "+235", "iso": "TD" }, { "name": "Chile", "code": "+56", "iso": "CL" }, { "name": "China", "code": "+86", "iso": "CN" }, { "name": "Christmas Island", "code": "+61", "iso": "CX" }, { "name": "Colombia", "code": "+57", "iso": "CO" }, { "name": "Comoros", "code": "+269", "iso": "KM" }, { "name": "Congo", "code": "+242", "iso": "CG" }, { "name": "Cook Islands", "code": "+682", "iso": "CK" }, { "name": "Costa Rica", "code": "+506", "iso": "CR" }, { "name": "Croatia", "code": "+385", "iso": "HR" }, { "name": "Cuba", "code": "+53", "iso": "CU" }, { "name": "Cyprus", "code": "+537", "iso": "CY" }, { "name": "Czech Republic", "code": "+420", "iso": "CZ" }, { "name": "Denmark", "code": "+45", "iso": "DK" }, { "name": "Djibouti", "code": "+253", "iso": "DJ" }, { "name": "Dominica", "code": "+1 767", "iso": "DM" }, { "name": "Dominican Republic", "code": "+1 849", "iso": "DO" }, { "name": "Ecuador", "code": "+593", "iso": "EC" }, { "name": "Egypt", "code": "+20", "iso": "EG" }, { "name": "El Salvador", "code": "+503", "iso": "SV" }, { "name": "Equatorial Guinea", "code": "+240", "iso": "GQ" }, { "name": "Eritrea", "code": "+291", "iso": "ER" }, { "name": "Estonia", "code": "+372", "iso": "EE" }, { "name": "Ethiopia", "code": "+251", "iso": "ET" }, { "name": "Faroe Islands", "code": "+298", "iso": "FO" }, { "name": "Fiji", "code": "+679", "iso": "FJ" }, { "name": "Finland", "code": "+358", "iso": "FI" }, { "name": "France", "code": "+33", "iso": "FR" }, { "name": "French Guiana", "code": "+594", "iso": "GF" }, { "name": "French Polynesia", "code": "+689", "iso": "PF" }, { "name": "Gabon", "code": "+241", "iso": "GA" }, { "name": "Gambia", "code": "+220", "iso": "GM" }, { "name": "Georgia", "code": "+995", "iso": "GE" }, { "name": "Germany", "code": "+49", "iso": "DE" }, { "name": "Ghana", "code": "+233", "iso": "GH" }, { "name": "Gibraltar", "code": "+350", "iso": "GI" }, { "name": "Greece", "code": "+30", "iso": "GR" }, { "name": "Greenland", "code": "+299", "iso": "GL" }, { "name": "Grenada", "code": "+1 473", "iso": "GD" }, { "name": "Guadeloupe", "code": "+590", "iso": "GP" }, { "name": "Guam", "code": "+1 671", "iso": "GU" }, { "name": "Guatemala", "code": "+502", "iso": "GT" }, { "name": "Guinea", "code": "+224", "iso": "GN" }, { "name": "Guinea-Bissau", "code": "+245", "iso": "GW" }, { "name": "Guyana", "code": "+595", "iso": "GY" }, { "name": "Haiti", "code": "+509", "iso": "HT" }, { "name": "Honduras", "code": "+504", "iso": "HN" }, { "name": "Hungary", "code": "+36", "iso": "HU" }, { "name": "Iceland", "code": "+354", "iso": "IS" }, { "name": "India", "code": "+91", "iso": "IN" }, { "name": "Indonesia", "code": "+62", "iso": "ID" }, { "name": "Iraq", "code": "+964", "iso": "IQ" }, { "name": "Ireland", "code": "+353", "iso": "IE" }, { "name": "Israel", "code": "+972", "iso": "IL" }, { "name": "Italy", "code": "+39", "iso": "IT" }, { "name": "Jamaica", "code": "+1 876", "iso": "JM" }, { "name": "Japan", "code": "+81", "iso": "JP" }, { "name": "Jordan", "code": "+962", "iso": "JO" }, { "name": "Kazakhstan", "code": "+7 7", "iso": "KZ" }, { "name": "Kenya", "code": "+254", "iso": "KE" }, { "name": "Kiribati", "code": "+686", "iso": "KI" }, { "name": "Kuwait", "code": "+965", "iso": "KW" }, { "name": "Kyrgyzstan", "code": "+996", "iso": "KG" }, { "name": "Latvia", "code": "+371", "iso": "LV" }, { "name": "Lebanon", "code": "+961", "iso": "LB" }, { "name": "Lesotho", "code": "+266", "iso": "LS" }, { "name": "Liberia", "code": "+231", "iso": "LR" }, { "name": "Liechtenstein", "code": "+423", "iso": "LI" }, { "name": "Lithuania", "code": "+370", "iso": "LT" }, { "name": "Luxembourg", "code": "+352", "iso": "LU" }, { "name": "Madagascar", "code": "+261", "iso": "MG" }, { "name": "Malawi", "code": "+265", "iso": "MW" }, { "name": "Malaysia", "code": "+60", "iso": "MY" }, { "name": "Maldives", "code": "+960", "iso": "MV" }, { "name": "Mali", "code": "+223", "iso": "ML" }, { "name": "Malta", "code": "+356", "iso": "MT" }, { "name": "Marshall Islands", "code": "+692", "iso": "MH" }, { "name": "Martinique", "code": "+596", "iso": "MQ" }, { "name": "Mauritania", "code": "+222", "iso": "MR" }, { "name": "Mauritius", "code": "+230", "iso": "MU" }, { "name": "Mayotte", "code": "+262", "iso": "YT" }, { "name": "Mexico", "code": "+52", "iso": "MX" }, { "name": "Monaco", "code": "+377", "iso": "MC" }, { "name": "Mongolia", "code": "+976", "iso": "MN" }, { "name": "Montenegro", "code": "+382", "iso": "ME" }, { "name": "Montserrat", "code": "+1664", "iso": "MS" }, { "name": "Morocco", "code": "+212", "iso": "MA" }, { "name": "Myanmar", "code": "+95", "iso": "MM" }, { "name": "Namibia", "code": "+264", "iso": "NA" }, { "name": "Nauru", "code": "+674", "iso": "NR" }, { "name": "Nepal", "code": "+977", "iso": "NP" }, { "name": "Netherlands", "code": "+31", "iso": "NL" }, { "name": "Netherlands Antilles", "code": "+599", "iso": "AN" }, { "name": "New Caledonia", "code": "+687", "iso": "NC" }, { "name": "New Zealand", "code": "+64", "iso": "NZ" }, { "name": "Nicaragua", "code": "+505", "iso": "NI" }, { "name": "Niger", "code": "+227", "iso": "NE" }, { "name": "Nigeria", "code": "+234", "iso": "NG" }, { "name": "Niue", "code": "+683", "iso": "NU" }, { "name": "Norfolk Island", "code": "+672", "iso": "NF" }, { "name": "Northern Mariana Islands", "code": "+1 670", "iso": "MP" }, { "name": "Norway", "code": "+47", "iso": "NO" }, { "name": "Oman", "code": "+968", "iso": "OM" }, { "name": "Pakistan", "code": "+92", "iso": "PK" }, { "name": "Palau", "code": "+680", "iso": "PW" }, { "name": "Panama", "code": "+507", "iso": "PA" }, { "name": "Papua New Guinea", "code": "+675", "iso": "PG" }, { "name": "Paraguay", "code": "+595", "iso": "PY" }, { "name": "Peru", "code": "+51", "iso": "PE" }, { "name": "Philippines", "code": "+63", "iso": "PH" }, { "name": "Poland", "code": "+48", "iso": "PL" }, { "name": "Portugal", "code": "+351", "iso": "PT" }, { "name": "Puerto Rico", "code": "+1 939", "iso": "PR" }, { "name": "Qatar", "code": "+974", "iso": "QA" }, { "name": "Romania", "code": "+40", "iso": "RO" }, { "name": "Rwanda", "code": "+250", "iso": "RW" }, { "name": "Samoa", "code": "+685", "iso": "WS" }, { "name": "San Marino", "code": "+378", "iso": "SM" }, { "name": "Saudi Arabia", "code": "+966", "iso": "SA" }, { "name": "Senegal", "code": "+221", "iso": "SN" }, { "name": "Serbia", "code": "+381", "iso": "RS" }, { "name": "Seychelles", "code": "+248", "iso": "SC" }, { "name": "Sierra Leone", "code": "+232", "iso": "SL" }, { "name": "Singapore", "code": "+65", "iso": "SG" }, { "name": "Slovakia", "code": "+421", "iso": "SK" }, { "name": "Slovenia", "code": "+386", "iso": "SI" }, { "name": "Solomon Islands", "code": "+677", "iso": "SB" }, { "name": "South Africa", "code": "+27", "iso": "ZA" }, { "name": "South Georgia and the South Sandwich Islands", "code": "+500", "iso": "GS" }, { "name": "Spain", "code": "+34", "iso": "ES" }, { "name": "Sri Lanka", "code": "+94", "iso": "LK" }, { "name": "Sudan", "code": "+249", "iso": "SD" }, { "name": "Suriname", "code": "+597", "iso": "SR" }, { "name": "Swaziland", "code": "+268", "iso": "SZ" }, { "name": "Sweden", "code": "+46", "iso": "SE" }, { "name": "Switzerland", "code": "+41", "iso": "CH" }, { "name": "Tajikistan", "code": "+992", "iso": "TJ" }, { "name": "Thailand", "code": "+66", "iso": "TH" }, { "name": "Togo", "code": "+228", "iso": "TG" }, { "name": "Tokelau", "code": "+690", "iso": "TK" }, { "name": "Tonga", "code": "+676", "iso": "TO" }, { "name": "Trinidad and Tobago", "code": "+1 868", "iso": "TT" }, { "name": "Tunisia", "code": "+216", "iso": "TN" }, { "name": "Turkey", "code": "+90", "iso": "TR" }, { "name": "Turkmenistan", "code": "+993", "iso": "TM" }, { "name": "Turks and Caicos Islands", "code": "+1 649", "iso": "TC" }, { "name": "Tuvalu", "code": "+688", "iso": "TV" }, { "name": "Uganda", "code": "+256", "iso": "UG" }, { "name": "Ukraine", "code": "+380", "iso": "UA" }, { "name": "United Arab Emirates", "code": "+971", "iso": "AE" }, { "name": "United Kingdom", "code": "+44", "iso": "GB" }, { "name": "United States", "code": "+1", "iso": "US" }, { "name": "Uruguay", "code": "+598", "iso": "UY" }, { "name": "Uzbekistan", "code": "+998", "iso": "UZ" }, { "name": "Vanuatu", "code": "+678", "iso": "VU" }, { "name": "Wallis and Futuna", "code": "+681", "iso": "WF" }, { "name": "Yemen", "code": "+967", "iso": "YE" }, { "name": "Zambia", "code": "+260", "iso": "ZM" }, { "name": "Zimbabwe", "code": "+263", "iso": "ZW" }, { "name": "land Islands", "code": "", "iso": "AX" }, { "name": "Antarctica", "code": null, "iso": "AQ" }, { "name": "Bolivia, Plurinational State of", "code": "+591", "iso": "BO" }, { "name": "Brunei Darussalam", "code": "+673", "iso": "BN" }, { "name": "Cocos (Keeling) Islands", "code": "+61", "iso": "CC" }, { "name": "Congo, The Democratic Republic of the", "code": "+243", "iso": "CD" }, { "name": "Cote d'Ivoire", "code": "+225", "iso": "CI" }, { "name": "Falkland Islands (Malvinas)", "code": "+500", "iso": "FK" }, { "name": "Guernsey", "code": "+44", "iso": "GG" }, { "name": "Holy See (Vatican City State)", "code": "+379", "iso": "VA" }, { "name": "Hong Kong", "code": "+852", "iso": "HK" }, { "name": "Iran, Islamic Republic of", "code": "+98", "iso": "IR" }, { "name": "Isle of Man", "code": "+44", "iso": "IM" }, { "name": "Jersey", "code": "+44", "iso": "JE" }, { "name": "Korea, Democratic People's Republic of", "code": "+850", "iso": "KP" }, { "name": "Korea, Republic of", "code": "+82", "iso": "KR" }, { "name": "Lao People's Democratic Republic", "code": "+856", "iso": "LA" }, { "name": "Libyan Arab Jamahiriya", "code": "+218", "iso": "LY" }, { "name": "Macao", "code": "+853", "iso": "MO" }, { "name": "Macedonia, The Former Yugoslav Republic of", "code": "+389", "iso": "MK" }, { "name": "Micronesia, Federated States of", "code": "+691", "iso": "FM" }, { "name": "Moldova, Republic of", "code": "+373", "iso": "MD" }, { "name": "Mozambique", "code": "+258", "iso": "MZ" }, { "name": "Palestinian Territory, Occupied", "code": "+970", "iso": "PS" }, { "name": "Pitcairn", "code": "+872", "iso": "PN" }, { "name": "Réunion", "code": "+262", "iso": "RE" }, { "name": "Russia", "code": "+7", "iso": "RU" }, { "name": "Saint Barthélemy", "code": "+590", "iso": "BL" }, { "name": "Saint Helena, Ascension and Tristan Da Cunha", "code": "+290", "iso": "SH" }, { "name": "Saint Kitts and Nevis", "code": "+1 869", "iso": "KN" }, { "name": "Saint Lucia", "code": "+1 758", "iso": "LC" }, { "name": "Saint Martin", "code": "+590", "iso": "MF" }, { "name": "Saint Pierre and Miquelon", "code": "+508", "iso": "PM" }, { "name": "Saint Vincent and the Grenadines", "code": "+1 784", "iso": "VC" }, { "name": "Sao Tome and Principe", "code": "+239", "iso": "ST" }, { "name": "Somalia", "code": "+252", "iso": "SO" }, { "name": "Svalbard and Jan Mayen", "code": "+47", "iso": "SJ" }, { "name": "Syrian Arab Republic", "code": "+963", "iso": "SY" }, { "name": "Taiwan, Province of China", "code": "+886", "iso": "TW" }, { "name": "Tanzania, United Republic of", "code": "+255", "iso": "TZ" }, { "name": "Timor-Leste", "code": "+670", "iso": "TL" }, { "name": "Venezuela, Bolivarian Republic of", "code": "+58", "iso": "VE" }, { "name": "Viet Nam", "code": "+84", "iso": "VN" }, { "name": "Virgin Islands, British", "code": "+1 284", "iso": "VG" }, { "name": "Virgin Islands, U.S.", "code": "+1 340", "iso": "VI" }];
export {
  width, height, widthScale, heightScale, isiPhoneX, totalSize, isPlatformIOS, statusBarHeight, shadow, widthPer, heightPer, getHeader, stdCodeList
};


export const convertStrISOIntoTime = (timestamp) => {


  let today = new Date(timestamp);

  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  // if (isTimeNeeded) {

  //     today = dd + symbol_inbw + mm + symbol_inbw + yyyy + " " + h + ":" + m + ":" + s;
  // } else {

  today = mm + " " + dd + "," + yyyy + " ";
  // }


  return today;
};


// export const AxiosRequest=(data,success=()=>{},faliure=()=>{})=>{
  
// }

