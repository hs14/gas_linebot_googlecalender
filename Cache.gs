// キャッシュ
// let cache = CacheService.getScriptCache();
let cache = CacheService.getUserCache();

// -----------------------------
//  キャッシュにモードを設定する
// -----------------------------
function setMode(mode) {
  cache.put('mode', mode);
}

// -----------------------------
//  キャッシュからモードを取得する
// -----------------------------
function getMode() {
  return cache.get('mode');
}

// -----------------------------
//  キャッシュに日付を設定する
// -----------------------------
function setDate(year, month, day) {
  cache.put('year', year);
  cache.put('month', month);
  cache.put('day', day);
}

// -----------------------------
//  キャッシュから年を取得する
// -----------------------------
function getYear() {
  return cache.get('year');
}

// -----------------------------
//  キャッシュから月を取得する
// -----------------------------
function getMonth() {
  return cache.get('month');
}

// -----------------------------
//  キャッシュから日を取得する
// -----------------------------
function getDay() {
  return cache.get('day');
}

// -----------------------------
//  キャッシュに開始時刻を設定する
// -----------------------------
function setStartTime(time) {
  cache.put('startTime', time);
}

// -----------------------------
//  キャッシュから開始時刻を取得する
// -----------------------------
function getStartTime(time) {
  return cache.get('startTime');
}

// -----------------------------
//  キャッシュに終了時刻を設定する
// -----------------------------
function setEndTime(time) {
  cache.put('endTime', time);
}

// -----------------------------
//  キャッシュから終了時刻を取得する
// -----------------------------
function getEndTime(time) {
  return cache.get('endTime');
}

// -----------------------------
//  キャッシュに件名を設定する
// -----------------------------
function setTitle(title) {
  cache.put('title', title);
}

// -----------------------------
//  キャッシュから件名を取得する
// -----------------------------
function getTitle() {
  return cache.get('title');
}

// -----------------------------
//  キャッシュに予定の数を設定する
// -----------------------------
function setEventsNum(num) {
  cache.put('eventsNum', num);
}

// -----------------------------
//  キャッシュから予定の数を取得する
// -----------------------------
function getEventsNum() {
  return cache.get('eventsNum');
}

// -----------------------------
//  キャッシュに選択した予定No.を設定する
// -----------------------------
function setEventNo(num) {
  cache.put('eventNo', num);
}

// -----------------------------
//  キャッシュから選択した予定No.を取得する
// -----------------------------
function getEventNo() {
  return cache.get('eventNo');
}

