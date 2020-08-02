//יצירת משתנים ומערכים גלובאליים
//יצירת קנבס
var wordByLetterArray = ["טלוויזיה", "אבוקדו", "תינוק", "טוב", "שינה", "גשם", "טווס", "אוכל", "טלפון", "טרקטור"];
var wordToCategoryArray = [
    ["workTools", ["מסור", "פטיש"]],
    ["cloths", ["מכנס", "צעיף"]],
    ["vegetables", ["פלפל", "גזר"]],
    ["furniture", ["מיטה", "שידה"]]
];

var figurC;
var pixelLacations = [];//מערך למיקום הפיקסלים בציור
var PATH = [];//מערך למיקום הפיקסלים
var circleCenter = [];//מרכז המעגל
var distanceArr = [];//המרחקים בין מרכז המעגל לנקודות על המעגל
var MaxMinPoints = [];//נקודות הקיצון על המעגל
var clockHoursX = [];//X מיקום השעות
var clockHoursY = [];//Y מיקום השעות
var clockHoursXQuant = [];//X מיקום השעות
var clockHoursYQuant = [];//Y מיקום השעות
var new_hoursHandXY = [];
var new_MinutesHandXY = [];
var circleSVG;//ציור המעגל המובנה מראש
var mycircleSVG;
var newR;//רדיוס העיגול המובנה מראש 
var newRQuant;
var hourHandLength = 0;//אורך קו מחוג השעות
var minuteHandLength = 0;//אורך קו מחוג הדקות
var hourHandLengthQuant = 0;//אורך קו מחוג השעות
var minuteHandLengthQuant = 0;//אורך קו מחוג הדקות
var TotalTime = 0;
var TotalTimeInterval;
var chapterScore = [0, 0, 0, 0];
var wordCounterByLetter = 0;
var container = document.querySelector("#container1");
var rndHour=0;
var rndMinute=0;
var calcCounter = 0;

function TotalTimeFunc() {
    TotalTime++;
   
}



$(document).on("pageshow", "#ClockTestPage1", function () { // When entering pagetwo


    
        TotalTimeInterval = setInterval(TotalTimeFunc, 1000);
        var NumPosBtn = document.createElement("INPUT");
        NumPosBtn.setAttribute("type", "button");
        NumPosBtn.className = "btns";
        NumPosBtn.id = "NumPosNextbtn";
        NumPosBtn.onclick = function () { numPos() };
    document.getElementById("ClockTestPage1").appendChild(NumPosBtn);

    figurC = document.getElementById("myFigure");
    var h = figurC.clientHeight;
    var w = figurC.clientWidth;
    var pieAngle = Math.PI / 6;


    var newCenterX = w / 2;
    var newCenterY = h / 2;
    newR = newCenterX * 0.8;
    var degrees = [];
    console.log(newR);
    circleSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // set width and height
    circleSVG.setAttribute("width", w);
    circleSVG.setAttribute("height", h);
    circleSVG.id = "clocksvg";

    // create a circle
    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir1.setAttribute("cx", newCenterX);
    cir1.setAttribute("cy", newCenterY-70);
    cir1.setAttribute("r", newR);
    cir1.setAttribute("stroke", "black");
    cir1.setAttribute("fill", "none");
    cir1.id = "mySvgCircle";
 

    circleCenter = [newCenterX, newCenterY];//הכנסת נקודות האמצע החדשות למערך


    circleSVG.appendChild(cir1);

    // attach container to document
    document.getElementById("svg").appendChild(circleSVG);


    for (var i = 0; i < 12; i++) {

        degrees[i] = i * pieAngle - (Math.PI / 3);
        clockHoursX[i] = newCenterX + newR * (Math.cos(degrees[i]));
        clockHoursY[i] = newCenterY + newR * (Math.sin(degrees[i]));
        console.log(clockHoursX[i]+" numposX " +i);
    }




    //גבולות השעון

    var topSpot = [newCenterX, newCenterY - (newR * 1.1)-60];//מציאת הנקודה העליונה
    var leftSpot = [newCenterX - (newR * 1.1), newCenterY];//מציאת הנקודה השמאלית
    var bottomSpot = [newCenterX, newCenterY + (newR * 1.1)-60];//מציאת הנקודה העליונה
    var rightSpot = [newCenterX + (newR * 1.1), newCenterY];//מציאת הנקודה השמאלית

    MaxMinPoints = [topSpot, bottomSpot, rightSpot, leftSpot];

    //יצירת המספרים למיקום
    for (i = 1; i < 13; i++) {
        var num = document.createElement("DIV");
        num.id = "number" + i.toString();

        num.className = "numbers";
        if (i > 9) {
            num.className = "twoDigitNumbers";
        }
        num.innerText = i.toString();
        document.getElementById("container1").appendChild(num);
        //הוספת גרירה לאובייקט

        var toppos = (i * 62) + 145;
        $("#number" + i).css({ "top": toppos + "px" });
        $("#number" + i).css({ "right": "42px" });
    }


    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", dragNum, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", dragNum, false);



    document.getElementById("instructionsClock").innerText= "יש לגרור את המספרים למקומם המתאים לפי כיוון השעון";
        //כפתור שבודק את מיקום המספרים ביחס למיקום האופטימלי בשעון 

});


$(document).ready(function () {

    $(document).on("pageshow", "#QuestionnairePage1", function () {
        console.log("reload");
        location.reload();
    });

    $(document).on("pageshow", "#languageSkillsChapterPage1", function () {
        console.log("reload");
        location.reload();
    });
    
    

    $("#nextbtn4").click(function () {
        location.href = "clockTest.html";
       
        //TotalTimeInterval = setInterval(TotalTimeFunc, 1000);
        //var NumPosBtn = document.createElement("INPUT");
        //NumPosBtn.setAttribute("type", "button");
        //NumPosBtn.className = "btns";
        //NumPosBtn.id = "NumPosNextbtn";
        //NumPosBtn.onclick = function () { numPos() };
        //document.getElementById("ClockTestPage1").appendChild(NumPosBtn);

        //figurC = document.getElementById("myFigure");
        //var h = figurC.clientHeight;
        //var w = figurC.clientWidth;
        //var pieAngle = Math.PI / 6;


        //var newCenterX = w / 2;
        //var newCenterY = h / 2;
        //newR = newCenterX * 0.8;
        //var degrees = [];
        //console.log(newR);
        //circleSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        //// set width and height
        //circleSVG.setAttribute("width", w);
        //circleSVG.setAttribute("height", h);
        //circleSVG.id = "clocksvg";

        //// create a circle
        //const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        //cir1.setAttribute("cx", newCenterX);
        //cir1.setAttribute("cy", newCenterY);
        //cir1.setAttribute("r", newR);
        //cir1.setAttribute("stroke", "black");
        //cir1.setAttribute("fill", "none");
        //cir1.id = "mySvgCircle";

        //circleCenter = [newCenterX, newCenterY];//הכנסת נקודות האמצע החדשות למערך


        //circleSVG.appendChild(cir1);

        //// attach container to document
        //document.getElementById("svg").appendChild(circleSVG);


        //for (var i = 0; i < 12; i++) {

        //    degrees[i] = i * pieAngle - (Math.PI / 3);
        //    clockHoursX[i] = newCenterX + newR * (Math.cos(degrees[i]));
        //    clockHoursY[i] = newCenterY + newR * (Math.sin(degrees[i]));

        //}




        ////גבולות הבמה

        //var topSpot = [newCenterX, newCenterY - (newR * 1.1)];//מציאת הנקודה העליונה
        //var leftSpot = [newCenterX - (newR * 1.1), newCenterY];//מציאת הנקודה השמאלית
        //var bottomSpot = [newCenterX, newCenterY + (newR * 1.1)];//מציאת הנקודה העליונה
        //var rightSpot = [newCenterX + (newR * 1.1), newCenterY];//מציאת הנקודה השמאלית

        //MaxMinPoints = [topSpot, bottomSpot, rightSpot, leftSpot];

        ////יצירת המספרים למיקום
        //for (i = 1; i < 13; i++) {
        //    var num = document.createElement("DIV");
        //    num.id = "number" + i.toString();

        //    num.className = "numbers";
        //    if (i > 9) {
        //        num.className = "twoDigitNumbers";
        //    }
        //    num.innerText = i.toString();
        //    document.getElementById("container1").appendChild(num);
        //    //הוספת גרירה לאובייקט

        //    var toppos = (i * 62) + 120;
        //    $("#number" + i).css({ "top": toppos + "px" });
        //    $("#number" + i).css({ "right": "40px" });
        //}


        //container.addEventListener("touchstart", dragStart, false);
        //container.addEventListener("touchend", dragEnd, false);
        //container.addEventListener("touchmove", dragNum, false);

        //container.addEventListener("mousedown", dragStart, false);
        //container.addEventListener("mouseup", dragEnd, false);
        //container.addEventListener("mousemove", dragNum, false);


        //$("#Instructions").text("שלב שני- עלייך לגרור את המספרים המופיעים בצד ימין למקום המתאים בתוך השעון");
        //$("#PopupNextBtn").text("להמשך לחץ כאן");
        //$("#startmodal2").trigger("click");
        //$("#InstructionsLabel").text("יש לגרור את המספרים למקומם המתאים");
        ////כפתור שבודק את מיקום המספרים ביחס למיקום האופטימלי בשעון 


    });


    $("#startQuestionnaire").click(function () {
        location.href = "PersonalQuestionnaire.html";
    });

    //$("#quantitativeChapterLink").click(function () {
    //    location.href = "quantitativeChapter.html";
    //});


    console.log("ready!");
});
//חישוב המרחק בין שתי נקודות
function distance(p1, p2) {

   var dist = Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]),2);

    return Math.sqrt(dist);
}

//בדיקת מיקום המספרים
function numPos() {
    var currectCounter = 0;
    for (i = 1; i < 13; i++) {
       
        var bodyRect = document.getElementById("svg").getBoundingClientRect(),
            elemRect = document.getElementById("number" + i).getBoundingClientRect(),
            offsetTop = elemRect.top - bodyRect.top ,
            offsetleft = elemRect.left - bodyRect.left ;
        
        //האם המספר בתוך גבולות העיגול
        if (offsetleft >= MaxMinPoints[3][0] && offsetleft <= MaxMinPoints[2][0] && offsetTop <= MaxMinPoints[1][1] && offsetTop >= MaxMinPoints[0][1]) {// דרוש דיוק לבדיקה האם האובייקט נמצא בתוך השעון
            var curNumXY = [offsetleft, offsetTop];
            var targetXY = [clockHoursX[i - 1] , clockHoursY[i - 1]-100 ];
            //בדיקת מרחק בין מיקום המספר למיקום האופטימלי
            var curDis = distance(curNumXY, targetXY);
            //המרחק למיקום תקין
            var optimizeDis = newR * 0.3;
            console.log(clockHoursX[i - 1]  + " X target " +i);
            console.log(clockHoursY[i - 1] -100 + " y target " + i);
            console.log(offsetleft + " X num " + i);
            console.log(offsetTop + " y num " + i);
            //האם המרחק הקיים נמצא בטווח התיקן למיקום המספר
            if (curDis <= optimizeDis) {
                currectCounter++;
                var score = chapterScore[0];
                score++;
                chapterScore[0] = score;
            }
           
        }
        
    }

    if (currectCounter >= 2) {
        userSetTime();
        $("#NumPosNextbtn").remove();
        document.getElementById("instructionsClock").innerText ="יש לכוון את השעון לשעה 11 ועשרה"; 
        container.removeEventListener("touchstart", dragStart, false);
        container.removeEventListener("touchend", dragEnd, false);
        container.removeEventListener("touchmove", dragNum, false);
        var checkTimeBtn = document.createElement("INPUT");
        checkTimeBtn.setAttribute("type", "button");
        
        checkTimeBtn.className = "btns";
        checkTimeBtn.id = "checkTimeNextbtn";
        checkTimeBtn.onclick = function () { checkTime() };
        document.getElementById("ClockTestPage1").appendChild(checkTimeBtn);
        $(".numbers").css({ "border": "none", "background": "none" });
        $(".twoDigitNumbers").css({ "border": "none", "background": "none" });
    }
    else {
        $("#clocksvg").remove();
        for (i = 1; i < 13; i++) {
            $("#number" + i).remove();
        }
    }
    $("#checkNumsBtn").remove();
    console.log(currectCounter);
}
var drag = d3.behavior.drag()
    .on('drag', drag);

var new_drag = d3.behavior.drag()
    .on('drag', new_drag);

//פונקציה ליצירת מחוגים 
function userSetTime() {
   
    var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };
  

     hourHandLength = newR * 0.5;
     minuteHandLength = newR * 0.75;


    var handsW = d3.select('figure').node().clientWidth - margin.left - margin.right;
    var handsH = d3.select('figure').node().clientHeight - margin.top - margin.bottom;

    var minuteScale = secondScale = d3.scale.linear()
        .range([0, 354])
        .domain([0, 59]);

    var hourScale = d3.scale.linear()
        .range([0, 330])
        .domain([0, 11]);

   
   

    var handData = [
        {
            type: 'hour',
            value: 0,
            length: -hourHandLength,
            scale: hourScale
        },
        {
            type: 'minute',
            value: 0,
            length: -minuteHandLength,
            scale: minuteScale
        }

    ];


    var svg = d3.select('#clocksvg')
        .attr('width', handsW + margin.left + margin.right)
        .attr('height', handsH + margin.top + margin.bottom);
        

    var g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var face = g.append('g')
        .attr('transform', 'translate(' + (newR + 30) + ',' + (newR + 30) + ')');


    var hands = face.append('g');

    hands.selectAll('line')
        .data(handData)
        .enter().append('line')
        .attr({
            class: function (d) { return d.type + '-hand'; },
            x1: 0,
            y1: 0,
            x2: function (d) {
                console.log(d);
                return d.length * Math.cos(d.value);
            },
            y2: function (d) {
                return d.length * Math.sin(d.value);
            }
        })
        .call(drag);
  

    // small circle in middle to cover hands
    face.append('circle')
        .attr({
            cx: 0,
            cy: 0,
            r: 12,
            fill: 'white',
            'stroke': '#374140',
            'stroke-width': 1
        });

    console.log(circleCenter + "מרכז המעגל");

}
var hoursHandXY = [];
var MinutesHandXY = [];

//פונקציה להזזת המחוגים
function drag() {

    var rad = Math.atan2(d3.event.y, d3.event.x);

    d3.select(this)
        .attr({
            x2: function (d) {
                if (d.type == "hour") {
                    hoursHandXY[0] = hourHandLength * Math.cos(rad);
                    return hourHandLength * Math.cos(rad);
                  
                }
                else if (d.type == "minute") {
                    MinutesHandXY[0] = minuteHandLength * Math.cos(rad);
                    return minuteHandLength * Math.cos(rad);
                }
            },
            y2: function (d) {
                if (d.type == "hour") {
                    hoursHandXY[1] = hourHandLength * Math.sin(rad);
                    return hourHandLength * Math.sin(rad);
                }
                else if (d.type == "minute") {
                    MinutesHandXY[1] = minuteHandLength * Math.sin(rad);
                    return minuteHandLength * Math.sin(rad);
                }

            }
        });
    console.log("minX" + MinutesHandXY[0]);
    console.log("minY" + MinutesHandXY[1]);
    console.log("hourX" + hoursHandXY[0]);
    console.log("hourY" + hoursHandXY[1]);
}
//אחרי לחיצה על כפתור בדיקה השעה 
function checkTime() {
    //לשעה 11 ועשרה
    var currect = false;
    // הפחתת 200 בשל הפרשי נקודות הייחוס בין המעגל למחוגים הזזים
    var targetXYHours = [clockHoursX[10] - 350, clockHoursY[10] - 350];
    var targetXYMinutes = [clockHoursX[1] - 350, clockHoursY[1] - 350];
    //בדיקת מרחק בין מיקום המספר למיקום האופטימלי
    
    var HoursDistance = distance(hoursHandXY, targetXYHours);
    var minutesDistance = distance(MinutesHandXY, targetXYMinutes);

    //האם המרחק הקיים נמצא בטווח התיקן למיקום המספר
    if (minutesDistance <= newR * 0.4 && HoursDistance <= newR * 0.6) {
        var score = chapterScore[0];
        score++;
        chapterScore[0] = score;
        currect = true;
        console.log(currect);
        location.href = "chaptersNav.html";
    }
    
}
//גרירת המספרים

var activeItem = null;

var active = false;



function dragStart(e) {
    console.log(e.target);
    if (e.target !== e.currentTarget) {
        active = true;

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }

            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }

            if (e.type === "touchstart") {
              
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                console.log("doing something!");
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
            
        }
    }
}

function dragEnd(e) {
    var activeItemClass = activeItem.id.slice(1);
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }
    if (intersect(activeItem, 290, 640)) {
        console.log("כלי עבודה");
        if (activeItemClass == "workTools") {
            console.log("תשובה נכונה");
        }
        else {
            console.log("תשובה לא נכונה");
        }
        activeItem.remove();
        creatWordsToDrag();
    }
    else if (intersect(activeItem, 120, 640)) {
        console.log("בגדים");
        if (activeItemClass == "cloths") {
            console.log("תשובה נכונה");
        }
        else {
            console.log("תשובה לא נכונה");
        }
        activeItem.remove();
        creatWordsToDrag();
    }
    else if (intersect(activeItem, -40, 640)) {
        console.log("ירקות");
        if (activeItemClass == "vegetables") {
            console.log("תשובה נכונה");
        }
        else {
            console.log("תשובה לא נכונה");
        }
        activeItem.remove();
        creatWordsToDrag();
    }
    else if (intersect(activeItem, -200, 640)) {
        console.log("רהיטים");
        if (activeItemClass == "furniture") {
            console.log("תשובה נכונה");
        }
        else {
            console.log("תשובה לא נכונה");
        }
        activeItem.remove();
        creatWordsToDrag();
    }
    else {
        activeItem.initialX = "10%";
        activeItem.initialY = "45%";
    }
    if (category === wordToCategoryArray.length && wordCount == 1) {
        console.log("done");
    }

        

    active = false;
    activeItem = null;
}

function dragNum(e) {
    
    if (active) {
        if (e.type === "touchmove") {
            e.preventDefault();

            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
        
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}


//כישורים שפתיים
function wordsStart() {

    $("#letterRndStartBTN").remove();
    $("#languageSkillsCharacter").remove();
    creatWord();
}

var wordByLetterTime;

function creatWord() {
    var word = document.createElement("DIV");
    word.id = "word" + wordCounterByLetter.toString();
    word.className = "wordsByLetters";
    word.innerText = wordByLetterArray[wordCounterByLetter];
    document.getElementById("LetterRecognitionDiv").appendChild(word);
    word.onclick = function () { LetterRecognitionClick(this.id)};
    wordByLetterTime = setTimeout(timePassed, 7000);

    console.log(wordCounterByLetter);
    
}
function timePassed() {
   
    if (wordCounterByLetter == 9) {
        location.href = "#languageSkillsChapterPage2";
        clearTimeout(wordByLetterTime);
    }
    var myscore = chapterScore[3];
    var myWord = document.getElementById("word" + wordCounterByLetter.toString()).innerHTML;
    console.log(myWord);
    if (myWord[0] != "ט") {
        console.log("פגיעה");
        myscore++;
        chapterScore[3] = myscore;
        console.log(myscore+"ציון");
    }
    $("#word" + wordCounterByLetter.toString()).remove();
    console.log("עבר הזמן");
    wordCounterByLetter++;
    creatWord();
}

function LetterRecognitionClick(clickedID) {
    document.getElementById(clickedID).style.color = "#00796B";
    var score = chapterScore[3];
    var word = document.getElementById(clickedID).innerHTML;
    if (word[0] == "ט") {
        console.log("פגיעה");
        score++;
        chapterScore[3] = score;
        console.log(score + "ציון");
    }
    if (wordCounterByLetter == 9) {
        console.log("עבור עמוד");
        clearTimeout(wordByLetterTime);
        location.href = "#languageSkillsChapterPage2";

    }
    else {
        setTimeout(function () {
            $("#" + clickedID).remove();
            clearTimeout(wordByLetterTime);
            wordCounterByLetter++;
            creatWord();
        }, 200);
       
    }
    
}

var clickedPair = ["", ""];
var clickedID = ["", ""];

var clickedCount=0;
var pairTotalCounter=0;


    



function PairMatchingPage(event) {

    
    $("#" + event.id).css({ "background-color": "#00796B" });
    $("#" + event.id).css({ "color": "white" });
    //הID של האלמנט עליו לחצו
    var wordId = document.getElementById(event.id).id;

    //חיתוך המספר הראשן מתוך ה ID
    var matchWord = wordId.slice(1);

    //האם הלחיצה פחות מ 2
    if (clickedCount < 2) {
        //הכנסה של שם האובייקט למערך
        if (clickedCount == 0) {
 
            clickedPair[clickedCount] = matchWord;
            clickedID[clickedCount] = wordId;
            console.log("i am the first " + clickedCount);
            //העלאת הcounter ב 1
            clickedCount++;
           
        }
       
        if (clickedCount == 1) {
            console.log("first word " + clickedID[0]);
            console.log("second word " + wordId);
            if (clickedID[0] != wordId) {
                    clickedPair[clickedCount] = matchWord;
                    clickedID[clickedCount] = wordId;
                    console.log("i am the second part two" + clickedCount);
                    //העלאת הcounter ב 1
                    clickedCount++;
                    
                }

            }
        
        

       

    }
    console.log(clickedCount + "כמה זוגות נלחצו");
    //ברגע שנלחצו 2 אובייקטים
    if (clickedCount == 2) {
        pairTotalCounter++;
        console.log(clickedPair);
        //העלמת האובייקטים שנלחצו
        $("#" + clickedID[0]).remove();
        $("#" + clickedID[1]).remove();
        
        //האם הם זוג
        if (clickedPair[0] == clickedPair[1]) {
            console.log("זוג");
        }
        else {
            console.log("לא זוג");
        }
        //איפוס המשתנים ומערכים
        clickedCount = 0;
        clickedPair = ["", ""];
        clickedID = ["", ""];
    }

    if (pairTotalCounter == 5) {
        location.href = "#languageSkillsChapterPage4";
        creatWordsToDrag();
    }
}

var category = 0;
var wordCount = 0;

function creatWordsToDrag() {
    console.log("in");
  
   var CategoryWord = document.createElement("DIV");
   CategoryWord.id = wordCount.toString() + wordToCategoryArray[category][0];
   CategoryWord.className = "wordsByCategory";
   CategoryWord.innerText = wordToCategoryArray[category][1][wordCount];
   //CategoryWord.style.marginTop = "10%";
   //CategoryWord.style.marginRight = "10%";          
    document.getElementById("Categorycontainer").appendChild(CategoryWord);
    if (wordCount == 0) {
        category++;
    }
    else if (wordCount == 1) {
        category--;
    }
   
    if (category >= wordToCategoryArray.length) {
        category = wordToCategoryArray.length-1;
        wordCount++;
            }

        
    
    var categoryContainer = document.querySelector("#Categorycontainer");
    categoryContainer.addEventListener("touchstart", dragStart, false);
    categoryContainer.addEventListener("touchend", dragEnd, false);
    categoryContainer.addEventListener("touchmove", dragNum, false);

    categoryContainer.addEventListener("mousedown", dragStart, false);
    categoryContainer.addEventListener("mouseup", dragEnd, false);
    categoryContainer.addEventListener("mousemove", dragNum, false);
}


function intersect(obj1, obj2X , obj2Y) { //פונקציה שמקבלת שני אובייקטים ובודקת התנגשות ביניהם

    //var obj1W = obj1.nominalBounds; // מוצא את ערכי המיקום והגודל של האובייקט הראשון
    //var obj2W = obj2.nominalBounds; // מוצא את ערכי המיקום והגודל של האובייקט השני
    var obj1X = obj1.currentX,
        obj1Y = obj1.currentY;
        
    console.log(obj1X + "x1");
    console.log(obj1Y + "y1");
    console.log(obj2X + "X2");
    console.log(obj2Y + "Y2");
    if (obj1X > obj2X) { //בדיקת התנגשויות בין האובייקטים בכל אחד מערכי המיקום
        return false;
    }
    if (obj1Y < obj2Y) { //בדיקת התנגשויות בין האובייקטים בכל אחד מערכי המיקום
        return false;
    }
    if (obj1X < obj2X-100) { //בדיקת התנגשויות בין האובייקטים בכל אחד מערכי המיקום
        return false;
    }
    if (obj1Y > obj2Y+100) { //בדיקת התנגשויות בין האובייקטים בכל אחד מערכי המיקום
        return false;
    }
    return true; // אם כלום לא נכון, נוצרה התנגשות
}
var CALCdegrees = [];
//כישורים כמותיים

$(document).on("pageshow", "#quantitativeChapterPage1", function () {

    quantitativeChapter();
    
});

function quantitativeChapter() {
    
    figurC = document.getElementById("myFigureCalcChapter");
    var h = figurC.clientHeight;
    var w = figurC.clientWidth;
    var newpieAngle = (Math.PI / 6);


    var newCenterX1 = w / 2;
    var newCenterY1 = h / 2;
    newRQuant = newCenterX1 * 0.8;
    
    console.log(newRQuant);
    mycircleSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // set width and height
    mycircleSVG.setAttribute("width", w);
    mycircleSVG.setAttribute("height", h);
    mycircleSVG.id = "clocksvg1";

    // create a circle
    const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir1.setAttribute("cx", newCenterX1);
    cir1.setAttribute("cy", newCenterY1-40);
    cir1.setAttribute("r", newRQuant);
    cir1.setAttribute("stroke", "black");
    cir1.setAttribute("fill", "none");
    cir1.id = "mySvgCircle1";

    circleCenter = [newCenterX1, newCenterY1];//הכנסת נקודות האמצע החדשות למערך


    mycircleSVG.appendChild(cir1);

    // attach container to document
    document.getElementById("quantitativeChapterSvg").appendChild(mycircleSVG);
    
    for (var i = 0; i < 12; i++) {
        CALCdegrees[i] = -i * newpieAngle - (Math.PI / 2) - (Math.PI / 6);
        clockHoursXQuant[i] = newCenterX1 + (newRQuant * 0.87) * (Math.cos(CALCdegrees[i]))+35 ;
        clockHoursYQuant[i] = newCenterY1 + (newRQuant * 0.87) * (Math.sin(CALCdegrees[i]))+175 ;

        console.log(clockHoursXQuant[i]+" x");
        console.log(clockHoursYQuant[i]+" y");
        
        var CalcNum = document.createElement("DIV");
        CalcNum.id = "calcNum" + (i+1).toString();
        CalcNum.innerText = (i + 1).toString();
        document.getElementById("quantitativeChapterClockContainer").appendChild(CalcNum);
        CalcNum.style.position = "fixed";
        CalcNum.className = "numbersInClacPage";
        CalcNum.style.top = clockHoursYQuant[i]  +"px";
        CalcNum.style.right = clockHoursXQuant[i] + "px";
        CalcNum.style.fontSize = "25px";

    }
    creatHandsCalcChapter();
}


function creatHandsCalcChapter() {

    if (calcCounter == 0) {
        console.log("im in");
        document.getElementById("quantitativeChapterInstructions").innerText = "הזיזו את מחוגי השעון שעתיים קדימה מהשעה הנוכחית";
    }
    else if (calcCounter == 1) {
        document.getElementById("quantitativeChapterInstructions").innerText= "הזיזו את מחוגי השעון שלוש שעות אחורה מהשעה הנוכחית";
    }

    else if (calcCounter == 2) {
        document.getElementById("quantitativeChapterInstructions").innerText= "הזיזו את מחוגי השעון ארבעים דקות קדימה מהשעה הנוכחית";
    }

    else if (calcCounter == 3) {
        document.getElementById("quantitativeChapterInstructions").innerText= "הזיזו את מחוגי השעון חמש עשרה דקות אחורה מהשעה הנוכחית";
    }

    else if (calcCounter == 4) {
        document.getElementById("quantitativeChapterInstructions").innerText= "הזיזו את מחוגי השעון שעתיים ועשרים וחמש דקות קדימה מהשעה הנוכחית";
    }

    else if (calcCounter == 5) {
        document.getElementById("quantitativeChapterInstructions").innerText = "הזיזו את מחוגי השעון שלוש שעות וארבעים דקות אחורה מהשעה הנוכחית";
    }

    rndHour = getRndInteger(0, 5);
    rndMinute = getRndInteger(6, 11);

    var margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
    };


    hourHandLengthQuant = newRQuant * 0.55;
    minuteHandLengthQuant = newRQuant * 0.75;


    var handsW = d3.select('figure').node().clientWidth - margin.left - margin.right;
    var handsH = d3.select('figure').node().clientHeight - margin.top - margin.bottom;

    var minuteScale = secondScale = d3.scale.linear()
        .range([0, 354])
        .domain([0, 59]);

    var hourScale = d3.scale.linear()
        .range([0, 330])
        .domain([0, 11]);




    var handData = [
        {
            type: 'hour',
            value: 0,
            id: 'newHourHand',
            length: -hourHandLengthQuant,
            scale: hourScale
        },
        {
            type: 'minute',
            value: 0,
            id: 'newMinuteHand',
            length: -minuteHandLengthQuant,
            scale: minuteScale
        }

    ];


    var svg = d3.select('#clocksvg1')
        .attr('width', handsW + margin.left + margin.right)
        .attr('height', handsH + margin.top + margin.bottom);


    var g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var face = g.append('g')
        .attr('transform', 'translate(' + (newRQuant + 30) + ',' + (newRQuant + 30) + ')');


    var hands = face.append('g');


    hands.selectAll('line')
        .data(handData)
        .enter().append('line')
        .attr({
            class: function (d) { return d.type + '-hand'; },
            id: function (d) { return d.id; },
            x1: 3,
            y1: 10,
            x2: function (d) {

                if (d.type == "hour") {

                    new_hoursHandXY[0] = d.length * Math.cos(CALCdegrees[rndHour]);
                    console.log(new_hoursHandXY[0] + "X שעות מחוג");
                    return d.length * Math.cos(CALCdegrees[rndHour]);

                }
                else if (d.type == "minute") {
                    new_MinutesHandXY[0] = d.length * Math.cos(CALCdegrees[rndMinute]);
                    console.log(new_MinutesHandXY[0] + "X דקות מחוג");
                    return d.length * Math.cos(CALCdegrees[rndMinute]);
                }
                
            },
            y2: function (d) {
                if (d.type == "hour") {
                   
                    new_hoursHandXY[1] = d.length * Math.sin(CALCdegrees[rndHour]);
                    console.log(new_hoursHandXY[1] + "Y שעות מחוג");
                    return d.length * Math.sin(CALCdegrees[rndHour]);
                }
                else if (d.type == "minute") {
                    new_MinutesHandXY[1] = d.length * Math.sin(CALCdegrees[rndMinute]);
                    console.log(new_MinutesHandXY[1] + "Y דקות מחוג");
                    return d.length * Math.sin(CALCdegrees[rndMinute]);
                }
            }
        })
        .call(new_drag);


    // small circle in middle to cover hands
    face.append('circle')
        .attr({
            cx: 3,
            cy: 10,
            r: 12,
            id: "newInnerCircle",
            fill: 'white',
            'stroke': '#374140',
            'stroke-width': 1
        });

    

}

function checkCalcTime() {
    console.log(rndHour + "אקראי שעה");
    console.log(rndMinute + "אקראי דקה");
    var targetXYHoursQuant;
    var targetXYMinutesQuant;
    var correct = false;
    var newRndHour = rndHour;
    //שעתיים קדימה
    if (calcCounter === 0) {

        for (i = 0; i < 2; i++) {
            if (newRndHour > 0) {
                newRndHour--;
            }
            else if (newRndHour === 0) {
                newRndHour = 11;
            }

        }

    }

    //שלוש שעות אחורה
    else if (calcCounter === 1) {
        for (i = 0; i < 3; i++) {
            if (newRndHour > 0) {
                newRndHour++;
            }
            else if (newRndHour === 11) {
                newRndHour = 0;
            }

        }
    }

    //ארבעים דקות קדימה    
    else if (calcCounter === 2) {
        for (i = 0; i < 8; i++) {
            if (rndMinute > 0) {
                rndMinute--;
            }
            else if (rndMinute == 0) {
                rndMinute = 11;
            }

        }

    }
    //15 דקות אחורה
    else if (calcCounter === 3) {
        for (i = 0; i < 3; i++) {
            if (rndMinute < 11) {
                rndMinute++;
            }
            else if (rndMinute === 11) {
                rndMinute = 0;
            }

        }

    }
    //שעתיים ועשרים וחמש דקות קדימה 
    else if (calcCounter === 4) {
        for (i = 0; i < 5; i++) {
            if (rndMinute > 0) {
                rndMinute--;
            }
            else if (rndMinute === 0) {
                rndMinute = 11;
            }

        }
        for (i = 0; i < 2; i++) {
            if (newRndHour > 0) {
                newRndHour--;
            }
            else if (newRndHour === 0) {
                newRndHour = 11;
            }

        }

    }
    //שלוש שעות וארבעים דקות אחורה
    else if (calcCounter === 5) {
        for (i = 0; i < 8; i++) {
            if (rndMinute < 11) {
                rndMinute++;
            }
            else if (rndMinute === 11) {
                rndMinute = 0;
            }

        }
        for (i = 0; i < 3; i++) {
            if (newRndHour < 11) {
                newRndHour++;
            }
            else if (newRndHour === 11) {
                newRndHour = 0;
            }

        }

    }
    
    console.log(newRndHour + " אקראי שעה1");
    console.log(rndMinute + " 1אקראי דקה");
    targetXYHoursQuant = [-(clockHoursXQuant[newRndHour] - 365), -(clockHoursYQuant[newRndHour] - 515 )];
    console.log(-(clockHoursXQuant[newRndHour] - 465) + "ClockHoursX");
    console.log(-(clockHoursYQuant[newRndHour] - 615) + "ClockHoursy");

    console.log(targetXYHoursQuant + "מיקום רצוי שעות");
    targetXYMinutesQuant = [-(clockHoursXQuant[rndMinute] - 365), -(clockHoursYQuant[rndMinute] - 515) ];
    console.log(targetXYMinutesQuant + "מיקום רצוי דקות");
    
    //בדיקת מרחק בין מיקום המספר למיקום האופטימלי
    var HoursDistanceQuant = distance(new_hoursHandXY, targetXYHoursQuant);
    var minutesDistanceQuant = distance(new_MinutesHandXY, targetXYMinutesQuant);
    console.log(new_hoursHandXY + "נקודה מחוג שעות ");
    console.log(HoursDistanceQuant + "מרחק שעה ");
    console.log(minutesDistanceQuant + "מרחק דקות ");
    console.log(newRQuant + "רדיוס");
    

    //האם המרחק הקיים נמצא בטווח התיקן למיקום המספר
    if (minutesDistanceQuant <= newRQuant * 0.4 && HoursDistanceQuant <= newRQuant * 0.6) {
        console.log("הנני כאן");
        var score = chapterScore[1];
        score++;
        console.log(score + "Score");
        chapterScore[1] = score;
        correct = true;
        console.log(correct);
        
    }
    console.log(correct);
    $("#newHourHand").remove();
    $("#newMinuteHand").remove();
    $("#newInnerCircle").remove();
    if (calcCounter === 5) {
        location.href = "chaptersNav.html" + "#ChaptersNavPage2";

    }
    calcCounter++;
    creatHandsCalcChapter(); 

}



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



//פונקציה להזזת המחוגים
function new_drag() {

    var radQuant = Math.atan2(d3.event.y, d3.event.x);

    d3.select(this)
        .attr({
            x2: function (d) {
                if (d.type == "hour") {
                    new_hoursHandXY[0] = hourHandLengthQuant * Math.cos(radQuant);
                    return hourHandLengthQuant * Math.cos(radQuant);

                }
                else if (d.type == "minute") {
                    new_MinutesHandXY[0] = minuteHandLengthQuant * Math.cos(radQuant);
                    return minuteHandLengthQuant * Math.cos(radQuant);
                }
            },
            y2: function (d) {
                if (d.type == "hour") {
                    new_hoursHandXY[1] = hourHandLengthQuant * Math.sin(radQuant);
                    return hourHandLengthQuant * Math.sin(radQuant);
                }
                else if (d.type == "minute") {
                    new_MinutesHandXY[1] = minuteHandLengthQuant * Math.sin(radQuant);
                    return minuteHandLengthQuant * Math.sin(radQuant);
                }

            }
        });
    console.log("minX" + new_MinutesHandXY[0]);
    console.log("minY" + new_MinutesHandXY[1]);
    console.log("hourX" + new_hoursHandXY[0]);
    console.log("hourY" + new_hoursHandXY[1]);
}


//פרק זיכרון לטווח קצר
var clickedPairMemory = ["", ""];
var clickedIDMemory = ["", ""];
var clickedCountMemory = 0;
var pairTotalCounterMemory = 0;


function pathMemoryFunc(clicked) {

    var memoryScore = chapterScore[2];


    $("#" + clicked.id).css({"background-color": "#FFC107", "color":"#454545"});
    //הID של האלמנט עליו לחצו
    var wordIdMemory = document.getElementById(clicked.id).id;
    //חיתוך המספר הראשן מתוך ה ID
    var matchWordMemory = wordIdMemory.slice(0, 1);

    //האם הלחיצה פחות מ 2
    if (clickedCountMemory < 2) {
        //הכנסה של שם האובייקט למערך
        if (clickedCountMemory == 1) {
            if (clickedPairMemory[0] != matchWordMemory) {
                clickedPairMemory[clickedCountMemory] = matchWordMemory;
                clickedIDMemory[clickedCountMemory] = wordIdMemory;
                //העלאת הcounter ב 1
                clickedCountMemory++;
            }

        }
        else if (clickedCountMemory == 0) {
            clickedPairMemory[clickedCountMemory] = matchWordMemory;
            clickedIDMemory[clickedCountMemory] = wordIdMemory;
            //העלאת הcounter ב 1
            clickedCountMemory++;
        }




    }
    //ברגע שנלחצו 2 אובייקטים
    if (clickedCountMemory == 2) { 
        
        var x1 = $("#" + clickedIDMemory[0]).offset().left;
        var y1 = $("#" + clickedIDMemory[0]).offset().top;
        var x2 = $("#" + clickedIDMemory[1]).offset().left;
        var y2 = $("#" + clickedIDMemory[1]).offset().top;

        $("#" + clickedIDMemory[0]).css({ "background-color": "#009688", "color": "white"});
        $("#" + clickedIDMemory[1]).css({ "background-color": "#009688", "color": "white"});
        //$("#" + clickedIDMemory[0]).css({ "background-color": "grey" });
        //$("#" + clickedIDMemory[1]).css({ "background-color": "grey" });


        //העלמת האובייקטים שנלחצו
        const myline = document.createElementNS("http://www.w3.org/2000/svg", "line");
        myline.setAttribute("x1", x1);
        myline.setAttribute("y1", y1);
        myline.setAttribute("x2", x2);
        myline.setAttribute("y2", y2);
        myline.setAttribute("stroke", "black");

        myline.id = "mySvgLine" + pairTotalCounterMemory.toString();
        document.getElementById("MemoryLinesCan").appendChild(myline);
        //האם הם זוג
        if (pairTotalCounterMemory == 0) {
            if (clickedPairMemory[0] == "a" || clickedPairMemory[0] == "1") {
                if (clickedPairMemory[1] == "a" || clickedPairMemory[1] == "1") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("א");
            $("#MemorySpan2").text("2");
           
        }
        else if (pairTotalCounterMemory == 1) {
            if (clickedPairMemory[0] == "a" || clickedPairMemory[0] == "2") {
                if (clickedPairMemory[1] == "a" || clickedPairMemory[1] == "2") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("2");
            $("#MemorySpan2").text("ב");
        }
        else if (pairTotalCounterMemory == 2) {
            if (clickedPairMemory[0] == "b" || clickedPairMemory[0] == "2") {
                if (clickedPairMemory[1] == "b" || clickedPairMemory[1] == "2") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("ב");
            $("#MemorySpan2").text("3");
        }
        else if (pairTotalCounterMemory == 3) {
            if (clickedPairMemory[0] == "b" || clickedPairMemory[0] == "3") {
                if (clickedPairMemory[1] == "b" || clickedPairMemory[1] == "3") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("3");
            $("#MemorySpan2").text("ג");
        }
        else if (pairTotalCounterMemory == 4) {
            if (clickedPairMemory[0] == "c" || clickedPairMemory[0] == "3") {
                if (clickedPairMemory[1] == "c" || clickedPairMemory[1] == "3") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("ג");
            $("#MemorySpan2").text("4");
        }
        else if (pairTotalCounterMemory == 5) {
            if (clickedPairMemory[0] == "c" || clickedPairMemory[0] == "4") {
                if (clickedPairMemory[1] == "c" || clickedPairMemory[1] == "4") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("4");
            $("#MemorySpan2").text("ד");
        }
        else if (pairTotalCounterMemory == 6) {
            if (clickedPairMemory[0] == "d" || clickedPairMemory[0] == "4") {
                if (clickedPairMemory[1] == "d" || clickedPairMemory[1] == "4") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("ד");
            $("#MemorySpan2").text("5");
        }
        else if (pairTotalCounterMemory == 7) {
            if (clickedPairMemory[0] == "d" || clickedPairMemory[0] == "5") {
                if (clickedPairMemory[1] == "d" || clickedPairMemory[1] == "5") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            $("#MemorySpan1").text("5");
            $("#MemorySpan2").text("ה");
        }
        else if (pairTotalCounterMemory == 8) {
            if (clickedPairMemory[0] == "e" || clickedPairMemory[0] == "5") {
                if (clickedPairMemory[1] == "e" || clickedPairMemory[1] == "5") {
                    console.log("yay");
                    chapterScore++;
                }
            }
            console.log("finished");
            chapterScore[2] = memoryScore;
            location.href = "chaptersNav.html" +"#ChaptersNavPage3";
        }
        console.log("ספירה" + pairTotalCounterMemory);
        //איפוס המשתנים ומערכים
        clickedCountMemory = 0;
        clickedPairMemory = ["", ""];
        clickedIDMemory = ["", ""];
        pairTotalCounterMemory++;
    }

    
}