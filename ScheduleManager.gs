// -----------------------------
//  今日の予定を取得する
// -----------------------------

function getTodaySchedule(userId) {

  // 予定格納用のリスト
  let plans = [];

  // 予定を取得
  let todayEvents = user_calender_map[userId].getEventsForDay(new Date());

  // イベント情報を整形
  todayEvents.forEach(function(value){
    let title   = value.getTitle();
    let start   = Utilities.formatDate(value.getStartTime(), 'JST', 'HH:mm');
    let end     = Utilities.formatDate(value.getEndTime(), 'JST', 'HH:mm');
    let strInfo = '[' + user_name_map[userId] + '] ' + start + '-' + end + ' ' + title
    plans.push(strInfo)
  });

  // 配列を文字列に変換する。要素数が0の場合は専用の文字列に変換。
  if (plans.length == 0) {
    return '[' + user_name_map[userId] + '] ' + '今日は予定がないようです (゜Д゜)';
  } else {
    return plans.join('\n');
  }

}

// -----------------------------
//  指定の日付の予定を取得する
// -----------------------------

function getDaySchedule(userId, strDate, isForDelete=Boolean('')) {

  // 予定格納用のリスト
  let plans = [];

  // 予定を取得
  let date = strToDate(strDate);
  let events = user_calender_map[userId].getEventsForDay(date);

  // キャッシュに登録する
  setEventsNum(events.length);
  let month = date.getMonth() + 1;
  setDate(date.getFullYear(), month, date.getDate());

  // イベント情報を整形
  events.forEach(function(value, index){
    let title   = value.getTitle();
    let start   = Utilities.formatDate(value.getStartTime(), 'JST', 'HH:mm');
    let end     = Utilities.formatDate(value.getEndTime(), 'JST', 'HH:mm');
    
    let strInfo;
    if (isForDelete) {
      i = index + 1;
      strInfo = 'No.' + i + ' [' + start + '-' + end + '] ' + title;
    } else {
      strInfo = '[' + start + '-' + end + '] ' + title
    }
    plans.push(strInfo)
  });

  // 配列を文字列に変換する。要素数が0の場合は専用の文字列に変換。
  let formedDate = date.getFullYear() + '/' + month + '/' + date.getDate();
  if (plans.length == 0) {  
    return formedDate + 'は予定がないようです (゜Д゜)';
  } else {
    return formedDate + 'の予定は...\n' +plans.join('\n');
  }

}


// -----------------------------
//  指定の日付の指定番目の予定を取得する
//  削除モードの場合は削除する
// -----------------------------

function getDayEventSchedule(userId, strDate, num, isForDelete=Boolean('')) {

  // 予定を取得
  let date = strToDate(strDate);
  let events = user_calender_map[userId].getEventsForDay(date);

  // イベント情報を整形
  let event = events[num - 1];
  let title = event.getTitle();
  let start = Utilities.formatDate(event.getStartTime(), 'JST', 'HH:mm');
  let end   = Utilities.formatDate(event.getEndTime(), 'JST', 'HH:mm');

  // 削除モードの場合は削除する
  if (isForDelete) {
    event.deleteEvent();
  }

  return 'No.' + num + ' [' + start + '-' + end + '] ' + title;

}


// -----------------------------
//  指定の日付後までの予定を取得する
// -----------------------------

function getDaysSchedule(userId, dayNum) {

  // 予定格納用のリスト
  let plans = [];

  // 予定を取得
  let startDate  = new Date()
  let endDate    = new Date(Date.parse(startDate) + (dayNum * 60 * 60 * 24 * 1000));
  let events = user_calender_map[userId].getEvents(startDate, endDate);

  // イベント情報を整形
  events.forEach(function(value){
    let title   = value.getTitle();
    let date    = Utilities.formatDate(value.getStartTime(), 'JST', 'MM/dd');
    let start   = Utilities.formatDate(value.getStartTime(), 'JST', 'HH:mm');
    let end     = Utilities.formatDate(value.getEndTime(), 'JST', 'HH:mm');
    let strInfo = '[' + user_name_map[userId] + '] ' + date + ' ' + start + '-' + end + ' ' + title;
    //let strInfo = '[' + date + ' ' + start + '-' + end + '] ' + title
    plans.push(strInfo)
  });

  // 配列を文字列に変換する。要素数が0の場合は専用の文字列に変換。
  if (plans.length == 0) {
    return '[' + user_name_map[userId] + '] ' + 'しばらく予定がないようです (゜Д゜)';
  } else {
    return plans.join('\n');
  }

}


// -----------------------------
//  キャッシュのデータで予定を登録する
// -----------------------------

function registerSchedule(userId) {

  let title     = getTitle()
  let date      = getYear() + '/' + getMonth() + '/' + getDay() + ' ';
  let startDate = new Date(date + getStartTime());
  let endDate   = new Date(date + getEndTime());

  // 日付の前後が正しくない場合は、エラー
  if (startDate > endDate) {
    return '開始時刻より終了時刻が早いです';
  }

  // 登録
  user_calender_map[userId].createEvent(title, startDate, endDate);
  return '登録しました';

}

// -----------------------------
//  キャッシュのデータで予定を削除する
// -----------------------------

function deleteSchedule(userId) {

  let date = getYear() + '/' + getMonth() + '/' + getDay() + ' ';
  getDayEventSchedule(userId, date, getEventNo(), Boolean('true'));

  return '削除しました';

}
