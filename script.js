// dark and light mode stuff
// i watched a lot of videos to learn how to store stuff in local storage and how to make stuff like toggling dark and light modes and used google to translate a lot of my java pseudocode into javascript code.
let isLightMode = false;

function loadTheme() {
    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("lightmode");
        isLightMode = true;
    }
}

function toggleTheme() {
    if (isLightMode) {
        document.body.classList.remove("lightmode");
        localStorage.setItem("theme", "dark");
        isLightMode = false;
    } else {
        document.body.classList.add("lightmode");
        localStorage.setItem("theme", "light");
        isLightMode = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadTheme();

    document.getElementById("themetoggle").addEventListener("click", function () {
        toggleTheme();
    });
});

//volunteering page code

var currentSignupUrl = "";
var initialDetailsHTML = "";

function initVolunteeringPage() {
    var buttons = document.querySelectorAll(".viewdetails");
    var i;

    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            var card = this.closest(".volunteercard");
           var details = document.getElementById("opportunityDetails");
                if (details) {
                    initialDetailsHTML = details.innerHTML;
                }


                if (!card || !details) {
                    return;
                }

            currentSignupUrl = card.dataset.url || "";

            // I learned some stuff for innerHTML from this: https://www.youtube.com/watch?v=DSScGM_OtME    

            details.innerHTML =
                "<button class='detailsclose' id='detailsCloseBtn' type='button'>×</button>" +
                "<div class='detailscontent'>" +
                "<div class='detailtext'>" +
                "<h2>" + (card.dataset.title || "") + "</h2>" +
                "<p>" + (card.dataset.summary || "") + "</p>" +
                "<p>What you'll do: " + (card.dataset.what || "") + "</p>" +
                "<p>When: " + (card.dataset.when || "") + "</p>" +
                "<p>Estimated Time: " + (card.dataset.time || "") + "</p>" +
                "<p>Location: " + (card.dataset.location || "") + "</p>" +
                "</div>" +
                "<img src='" + (card.dataset.image || "") + "' class='detailimage'>" +
                "</div>" +
                "<div class='signuprow'>" +
                "<button class='signup' id='signupBtn' type='button'>Sign Up</button>" +
                "</div>";


            var signupBtn = document.getElementById("signupBtn");
            signupBtn.addEventListener("click", function () {
                if (currentSignupUrl) {
                    window.open(currentSignupUrl, "_blank");
                }
            });

            var closeBtn = document.getElementById("detailsCloseBtn");
            closeBtn.addEventListener("click", function () {
            details.innerHTML = initialDetailsHTML;
            currentSignupUrl = "";
            window.scrollTo({ top: 0, behavior: "smooth" });
});


            details.scrollIntoView({ behavior: "smooth" });
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVolunteeringPage);
} else {
    initVolunteeringPage();
}

// resources page code

function trimText(s) {
    return s.replace(/^\s+|\s+$/g, "");
}

function removeActiveFromAll(buttons) {
    var i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
}

function filterCardsByCategory(category) {
    var cards = document.getElementsByClassName("resourceitem");
    var i;
    for (i = 0; i < cards.length; i++) {
        var cardCategory = cards[i].getAttribute("data-category");
        if (cardCategory === category) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function scrollToCategoryHeader(category) {
    var headers = document.querySelectorAll(".resourcesRight .resourceType.resourceitem");
    var i;

    for (i = 0; i < headers.length; i++) {
        if (headers[i].getAttribute("data-category") === category) {
            headers[i].scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
    }
}

function initResourceFilter() {
    var buttons = document.getElementsByClassName("categorybtn");
    var i;

    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            removeActiveFromAll(buttons);
            this.classList.add("active");

            var category = trimText(this.textContent);
            filterCardsByCategory(category);
            scrollToCategoryHeader(category);
        };
    }

    var active = document.querySelector(".categorybtn.active");
    if (active) {
        var category = trimText(active.textContent);
        filterCardsByCategory(category);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initResourceFilter);
} else {
    initResourceFilter();
}



