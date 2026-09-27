const thisYear = new Date().getFullYear();
const thisMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
const hoursShift = 2; // różnica godzinowa w stosunku do UTC
const closestMonday = 21; // !!! USTAW datę najbliższego poniedziałku

const timeForAssignment = 50;
const courseIdKSM = {
    kl4A: {courseId: 877441073743},
    kl4B: {courseId: 877444185234},
    kl5A: {courseId: 877436444636},
    kl6A: {courseId: 877430509796},
    kl7A: {courseId: 877432829762},
    kl8A: {courseId: 877437721133},
    PROG: {courseId: 886145056974}
}
const courseIdDT = {
    SP1: {courseId: 876475594832},
    SP2: {courseId: 876477789643},
    SP3: {courseId: 876476781681},
    SP4: {courseId: 876479033080},
    SP5: {courseId: 876476885000},
    SP6: {courseId: 876477211258},
    SP7: {courseId: 876477941589},
    SP8: {courseId: 876476203481},
    LO1: {courseId: 876477874133},
    LO2: {courseId: 876477656961},
    LO3: {courseId: 876476203481},
    Roz23: {courseId: 876777644438},
    Roz4: {courseId: 876780630584},
    Hornets: {courseId: 876778444202}
}
const lessonStartsKSM = {
    1: "08:30",
    2: "09:15",
    3: "10:10",
    4: "10:55",
    5: "11:40",
    6: "12:25",
    7: "13:10",
    8: "13:55",
    9: "14:40",
    10: "15:25"
}
const lessonStartsDT = {
    1: "08:30",
    2: "09:20",
    3: "10:30",
    4: "11:20",
    5: "12:15",
    6: "13:30",
    7: "14:20",
    8: "15:15",
    9: "16:05",
}
const lessonsListKSM = [
    [0, 1, "kl4B", "Przydatne funkcje przeglądarki internetowej Chrome"],
    [0, 4, "kl5A", ""],
    [0, 6, "kl4A", "Rysujemy wymarzony dom - Kleki.com"],
    [0, 8, "kl4B", "Rysujemy wymarzony dom - Kleki.com"],
    [0, 9, "PROG", "Tworzymy Geometry Dash albo Minecraft Platformer - Scratch"],

    // [4, 1, "kl6A", "Porównanie cen produktów w sklepach internetowych - Arkusze Google"],
    // [4, 2, "kl8A", "Porównanie cen produktów w sklepach internetowych - Arkusze Google"],
    [4, 5, "kl5A", "Porównanie cen produktów w sklepach internetowych - Arkusze Google"],
    [4, 8, "kl4A", ""],
    // [4, 9, "kl7A", "Porównanie cen produktów w sklepach internetowych - Arkusze Google"],
]
const lessonsListDT = [
    // [1, 1, "SP6", "Porównanie cen produktów w sklepach internetowych - Arkusze Google"],
    [1, 2, "SP2", "Rysujemy wymarzony dom - Kleki.com"],
    // [1, 3, "SP4", "Grupowy plakat - dobre i złe strony internetu"],
    [1, 4, "SP1", "Rysujemy wymarzony dom - Kleki.com"],
    [1, 5, "LO1", "HTML - Klasy, id, CSS, poprawianie błędów w kodzie"],
    [1, 6, "SP8", "JS - Id, CSS, programowanie zmian na stronie"],
    // [2, 1, "Roz23", "Rozwiązywanie zadań z ostatnich matur"],
    // [2, 2, "Roz23"],
    // [2, 3, "Roz4", "(Docs) Sugerowanie zmian, role użytkownikw, bezpieczne udostępnianie"],
    // [2, 4, "Roz4", "(Sheets) Adresowanie, MIN, MAX, AVERAGE, VLOOKUP, XLOOKUP, JEŻELI"],
    // [2, 5, "LO2", "HTML - Klasy, id, CSS, poprawianie błędów w kodzie"],
    [2, 6, "Hornets", "AI - Pisanie dobrych promptów, weryfikacja odpowiedzi z wykorzystaniem źródeł "],
    [3, 1, "SP8", "HTML - Klasy, id, CSS, poprawianie błędów w kodzie"],
    [3, 2, "SP7", "Arkusze Google - adresowanie, formatowanie warunkowe"],
    [3, 3, "SP5", "Porównanie cen produktów w sklepach internetowych - Arkusze Google"],
    // [3, 4, "SP3", "Grupowy plakat - dobre i złe strony internetu"],
    [3, 5, "SP1", ""],
    [3, 8, "LO3", "JS - Id, CSS, programowanie zmian na stronie"],
]
const topicIdsKSM = {
   "PRACA Z KOMPUTEREM": {
      "kl4B": 877915611789,
      "kl4A": 877922423327,
      "kl5A": 877914122272,
      "kl6A": 877921788174,
      "kl7A": 884403278703,
      "kl8A": 884403419395
   }
};

function getTimeParts(time) {
    return time.split(":").map(Number);
}

function formatTime(totalMinutes) {
    const newHours = Math.floor(totalMinutes / 60) - hoursShift;
    const newMinutes = totalMinutes % 60;
    return [newHours, newMinutes]
        .map(value => value.toString().padStart(2, "0"))
        .join(":");
}

function getDueTime(lessonNumber, source) {
    const [hours, minutes] = getTimeParts(source[lessonNumber]);
    return getTimeParts(formatTime(hours * 60 + minutes + timeForAssignment))
        .reduce((time, value, index) => {
            time[index === 0 ? "hours" : "minutes"] = value;
            return time;
        }, {});
}

function shiftTimeByMinutes(startTime, minutesToShift = -10) {
    const [hours, minutes] = getTimeParts(startTime);
    return formatTime(hours * 60 + minutes + minutesToShift);
}


function getLessonData(daysToAdd, lessonNumber, klasa, title = "Temat...") {
    const [source, courseId, topicId] = [0, 4].includes(daysToAdd) ? [lessonStartsKSM, courseIdKSM, topicIdsKSM] : [lessonStartsDT, courseIdDT, null];
    const startTime = shiftTimeByMinutes(source[lessonNumber]);
    const day = closestMonday + daysToAdd;

    return {
        courseId: courseId[klasa].courseId,
        title,
        // topicId: topicId["PRACA Z KOMPUTEREM"][klasa],
        description: "OPIS...",
        state: "DRAFT",
        maxPoints: 100,
        scheduledTime: thisYear + "-" + thisMonth + "-" + day + "T" + startTime + ":00Z",
        dueDate: { year: thisYear, month: thisMonth, day: day },
        dueTime: getDueTime(lessonNumber, source),
    }
}

function getFullWeekData(lessonsList) {
    const fullWeekData = [];
    for (const [daysToAdd, lessonNumber, klasa, title = ""] of lessonsList) {
        fullWeekData.push(getLessonData(daysToAdd, lessonNumber, klasa, title));
    }
    return fullWeekData;
}

const fullWeekDataKSM = getFullWeekData(lessonsListKSM);
require("fs").writeFileSync("weekKSM.json", JSON.stringify(fullWeekDataKSM, null, 2));
// console.log("KSM:",fullWeekDataKSM);

const fullWeekDataDT = getFullWeekData(lessonsListDT);
require("fs").writeFileSync("weekDT.json", JSON.stringify(fullWeekDataDT, null, 2));
// console.log("DT:", fullWeekDataDT);