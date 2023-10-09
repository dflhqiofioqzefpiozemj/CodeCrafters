// Check if there's a local storage color option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        // Add Active Class On Element With Data-Color === Local Storage Item
        if (element.dataset.color === mainColor) {

            // Add Active Class
            element.classList.add("active");
        };
    });
};

// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Starage Is Not Empty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

    } else {

        backgroundOption = false;

    }

    // Rendom Active Class From All Spans
    document.querySelectorAll(".random-Backgrounds span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true') {

        document.querySelector(".random-Backgrounds .yes").classList.add("active");

    } else {

        document.querySelector(".random-Backgrounds .no").classList.add("active");

    }
}

// Toggle Spin Class Icon
document.querySelector(".toggle-setting .fa-gear").onclick = function () {

    // Toggle Class fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    // Toggle Class open on main setting box
    document.querySelector(".setting-Box").classList.toggle("open");
};

// Switch Colors 
const colorsli = document.querySelectorAll(".color-list li");

// Loop on All List Items
colorsli.forEach(li => {

    // Click on every list Items
    li.addEventListener("click", (e) => {
    
        // set Color On Root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

        // Set Color On Local Storage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleActive(e);

    });
});

// Switch Rondom Background 
const RondombackEl = document.querySelectorAll(".random-Backgrounds span");

// Loop on All Span
RondombackEl.forEach(span => {

    // Click on every Span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option",true);

        }else {

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option",false);
            
        }

    });
});


// Select landing page Element
let landingpage = document.querySelector(".landing-page");

// Get Array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Image Url
            landingpage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 1000);
    }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".Skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window Height
    let windowHeight = this.innerHeight;

    // window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skills-box .skills-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
}

// Select all gallery images
let galleryImages = document.querySelectorAll(".gallery img");

// Loop through each image
galleryImages.forEach(img => {
    // Add a click event listener to each image
    img.addEventListener("click", function () {
        // Create a popup overlay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        // Create a popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // Create an image element in the popup
        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        // Create a close button
        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.textContent = "X";

        // Append the close button to the popup box
        popupBox.appendChild(closeButton);

        // Append the image to the popup box
        popupBox.appendChild(popupImage);

        // Append the popup box to the overlay
        overlay.appendChild(popupBox);

        // Append the overlay to the body
        document.body.appendChild(overlay);

        // Close the popup when the close button is clicked
        closeButton.addEventListener("click", function () {
            overlay.remove();
        });

        // Close the popup when the overlay is clicked
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    });
});

// Close Popup
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {

        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All links
const alllinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: 'smooth'

            });
        });
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(alllinks);

// Handle Active State 
function handleActive(ev) {

    //Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    
    });
    
    // Add Active Class On Self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

bulletsSpan.forEach(span => {

    span.classList.remove("active");

});

if (bulletLocalItem === 'block') {

    bulletsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active");

} else {

    bulletsContainer.style.display = 'none';

    document.querySelector(".bullets-option .no").classList.add("active");

}

}

bulletsSpan.forEach(span => {

span.addEventListener("click", (e) => {

    if (span.dataset.display === 'show') {

    bulletsContainer.style.display = 'block';

    localStorage.setItem("bullets_option", 'block');

    } else {

    bulletsContainer.style.display = 'none';

    localStorage.setItem("bullets_option", 'none');

    }

    handleActive(e);

});

});

// Reset Button
document.querySelector(".reset-option").onclick = function () {

    //localStorage.clear();

    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    // Reload window
    window.location.reload();

}

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation

    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tlinks.classList.toggle("open");


};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener(".click", (e) => {

    if (e.target !== toggleBtn && e.target !== tlinks) {

        // Check If Menu Is Open
        if (tlinks.classList.contains("open")) {

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On links

            tlinks.classList.toggle("open");
        }
    }
});


// Stop Propagation On Menu 
tlinks.onclick = function (e) {
    e.stopPropagation();
}