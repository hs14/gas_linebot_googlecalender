//
// 注意
// 本ファイルのスクリプトは、最新仕様に合っていないため、使用できない。
//

// -----------------------------
//  タスク一覧を取得する
// -----------------------------
function getTasks() {

  // タスク格納用のリスト
  // タスクリストとタスクの数は一致させ、順序を対応付ける
  let taskListArray = [];
  let taskArray = [];

  // タスクリストを取得
  let taskLists = Tasks.Tasklists.list();

  // タスクリスト内のタスクを取得
  for (let i = 0; i < taskLists.items.length; i++) {
    let taskList = taskLists.items[i];
    let tasks = Tasks.Tasks.list(taskList.id);

    if (tasks.items) {
      for (let j = 0; j < tasks.items.length; j++) {
        taskListArray.push(taskList);
        taskArray.push(tasks.items[j]);
      }
    }
  }
  
  return [taskListArray, taskArray];

}


// -----------------------------
//  タスクリストとタスクを返却用に整形する
// -----------------------------
function makeTasksStr(taskListArray, taskArray, onlyPastTask=Boolean('')) {

  // 整形文字列
  taskStrArray = [];

  // [期日] タスクリスト名 | タスク の形に整形
  for (let i = 0; i < taskArray.length; i++) {
    let due = arrangeDueStr(taskArray[i].due);
    let taskListName = taskListArray[i].title;
    let taskName = taskArray[i].title;

    // 過去のタスクに限定する場合は、期日をチェック
    if (onlyPastTask) {
      if (isFutureDate(due)) {
        continue;
      }
    }

    // 文字列を整形して配列に入れる
    taskStrArray.push(`[${due}] ${taskListName} | ${taskName}`);
  }

  // 配列を文字列に変換する。要素数が0の場合は専用の文字列に変換。
  if (taskStrArray.length == 0) {
    return 'タスクがありません。';
  } else {
    return taskStrArray.join('\n');
  }

}

// -----------------------------
//  日付の文字列を整形
//
//   タスクは日付情報しか取得できないので、日付部分を抜き出す
//   例) 2021-02-06T00:00:00.000Z
//         ↓
//       2021-02-06
// -----------------------------
function arrangeDueStr(due) {
  if (due) {
    return due.slice(0, 10);
  } else {
    return "";
  }
}

// -----------------------------
//  期日が今日以前かどうかチェックする
// -----------------------------
function isFutureDate(due) {

  // 引数の日付(ハイフン区切り)を日付型に変更
  let dueSplited = due.split('-');
  let targetDay = new Date(dueSplited[0], dueSplited[1]-1, dueSplited[2]);

  // 今日の日付を取得
  let today = new Date();

  if (targetDay > today) {
    return Boolean('true');
  } else {
    return Boolean('');
  }

}

// -----------------------------
//  今日までのタスク一覧を送信する
// -----------------------------
function sendTodayTasks() {

  let [taskListArray, taskArray] = getTasks();

  let message = ''
  message = message + '未完了ToDoをお知らせするよ！\n';
  message = message + makeTasksStr(taskListArray, taskArray, onlyPastTask=Boolean('true'));

  userIds.forEach(function(value){
    push(value, message)
  });

}


// -----------------------------
//  タスク一覧を送信する
// -----------------------------
function sendAllTasks() {

  let [taskListArray, taskArray] = getTasks();

  let message = ''
  message = message + '未完了ToDoをお知らせするよ！\n';
  message = message + makeTasksStr(taskListArray, taskArray);

  userIds.forEach(function(value){
    push(value, message)
  });
}
