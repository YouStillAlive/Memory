"use strict";

$(document).ready(function () {
    let countCards = 12;
    let countRows = 2;

    let playground = [];
    let hiddenPlayground = [];
    let curCard = 0;
    let previousID;

    $(function startConfig() {
        setCardsConfiguration();
        randomise();
        showPlayground();
        //setShadowEffectAll("5px 0px 10px gray");
    });

    function setShadowEffectAll(effect) {
        for (let i = 0; i < $("img").length; i++) {
            //if ($("img").get(i).src.slice($("img").get(i).src.length - 9) !== "shirt.png") {
            $("img").get(i).style.boxShadow = effect;
            //}
            //document.querySelectorAll("img")[i].style.boxShadow = effect;
        }
    }

    function setCardsConfiguration() {
        if (countCards % 2 != 0 || countCards <= 0 || countRows > countCards || countRows <= 0)
            return;
        let id = 0;
        for (let i = 0; i < countRows; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < countCards / countRows; j++) {
                let th = document.createElement("th");
                let img = document.createElement("img");
                img.id = id++;
                th.appendChild(img);
                tr.appendChild(th);
            }
            $("table").get()[0].appendChild(tr);
        }
    }

    $("#start").click(function () {
        if ($(this).html() === "START") {
            $("img").css({ "opacity": "1" });
            hidePlayground();
            $(this).html("FINISH");
        }
        else if ($(this).html() === "FINISH") {
            showPlayground();
            $(this).html("RESET");
        }
        else if ($(this).html() === "RESET") {
            $("img").css({ "opacity": "1" });
            randomise();
            showPlayground();
            $(this).html("START");
        }
    });

    $("table").click(function (event) {
        if (event.target.hasAttribute('src') && event.target.src.slice(event.target.src.length - 9) === "shirt.png") {
            curCard++;
            if (curCard === 1) {
                event.target.src = "images/" + playground[event.target.id];
                hiddenPlayground[event.target.id] = playground[event.target.id];
                previousID = event.target.id;
            }
            if (curCard === 2) {
                event.target.src = "images/" + playground[event.target.id];
                hiddenPlayground[event.target.id] = playground[event.target.id];
                setTimeout(function () {
                    if (checkVictory()) {
                        $("#start").html("RESET");
                        $("img").css({ "opacity": "0.6" });
                        $(".victory").css({ display: "block" });
                    }
                    else if (playground[event.target.id] !== playground[previousID]) {
                        event.target.src = "images/shirt.png";
                        $("img").get(previousID).src = "images/shirt.png";
                        hiddenPlayground[event.target.id] = "shirt.png";
                        hiddenPlayground[previousID] = "shirt.png";
                    }
                    curCard = 0;

                }, 1333);
            }
        }
    });


    function checkVictory() {
        return JSON.stringify(playground) === JSON.stringify(hiddenPlayground);
    }

    function randomise() {
        let cardsNumbers = [];
        hiddenPlayground = [];
        playground = [];

        let arrImg = [
            "K_Clubs.png", "K_Diamonds.png", "Q_Clubs.png", "Q_Diamonds.png",
            "2_Clubs.png", "2_Diamonds.png", "3_Clubs.png", "3_Diamonds.png",
            "4_Clubs.png", "4_Diamonds.png", "5_Clubs.png", "5_Diamonds.png",
            "6_Clubs.png", "6_Diamonds.png", "7_Clubs.png", "7_Diamonds.png",
            "8_Clubs.png", "8_Diamonds.png", "9_Clubs.png", "9_Diamonds.png",
            "10_Clubs.png", "10_Diamonds.png", "A_Clubs.png", "A_Diamonds.png",
            "J_Clubs.png", "J_Diamonds.png", "JOKER_Black.png", "JOKER_Red.png"];
        let curImg, curNum;

        for (let i = 0; i < countCards; i++) {
            cardsNumbers.push(i);
            hiddenPlayground.push("shirt.png");
            playground.push("");
        }

        for (let i = 0; i < countCards / 2; i++) {
            curNum = Math.floor(Math.random() * cardsNumbers.length);
            playground[cardsNumbers[curNum]] = arrImg[curImg = Math.floor(Math.random() * arrImg.length)];;
            cardsNumbers.splice(curNum, 1);
            curNum = Math.floor(Math.random() * cardsNumbers.length);
            playground[cardsNumbers[curNum]] = arrImg[curImg];;
            cardsNumbers.splice(curNum, 1);
            arrImg.splice(curImg, 1);
        }
    }

    function showPlayground() {
        for (let i = 0; i < $("img").length; i++) {
            $("img").get()[i].src = "images/" + playground[i];
        }
    }
    function hidePlayground() {
        for (let i = 0; i < $("img").length; i++) {
            setTimeout(() => $("img").get()[i].src = "images/" + hiddenPlayground[i], 500);
        }
    }

    $("span").click(function () {
        $(".victory").css({ display: "none" });
    });
});
