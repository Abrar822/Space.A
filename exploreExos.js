// for count, in terms of scale of 20
let displayCount = 0; 
let savedScrollPos = 0;

// For generating the alert for the range
let numBtns = document.querySelectorAll('.numBtn');
numBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let msg = document.createElement('div');
        msg.classList.add('beingOnline');
        msg.innerText = 'Range more than 400 may lead to lagging!';
        body.appendChild(msg);
        msg.style.display = 'inline-block';
        setTimeout(() => {
            msg.style.display = 'none';
            msg.remove();
        }, 1000);
    })
})

// Fetching the exos data
let data = [];
let filteredData = [];
let activeData = [];
let exosDataLink = 'https://raw.githubusercontent.com/Abrar822/Space.A/refs/heads/main/CleanedExoplanetData.json';
async function fetchExosData() {
    loader.style.display = 'flex';
    let response = await fetch(exosDataLink);
    let exoData = await response.json();
    loader.style.display = 'none';
    data = exoData;
    console.log(data);
}
fetchExosData();

// For exploreExosBtn
let exploreExosContainer = document.querySelector('.explore-exos-container');
let exploreExosBtn = document.querySelectorAll('.exploreExosBtn');
exploreExosBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        // showing the few elements
        exoSearchBar.style.display = 'flex';
        exoButtons.style.display = 'flex';
        // hiding the other visible sections
        for(let section of sections) {
            if(getComputedStyle(section).display !== 'none' && !section.classList.contains('explore-exos-container')) {
                section.style.top = '1000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70);
            }
        }
        setTimeout(() => {
            exploreExosContainer.style.display = 'flex';
        }, 100);
        setTimeout(() => {
            exploreExosContainer.style.top = '70px';
            hiddenContainer.scrollTop = savedScrollPos;
        }, 300);
        // Calling the first 20
        showExosData();
    })
})

// Printing the exos data
let exosContent = document.querySelector('.exos-content')
let exoButtons = document.querySelector('.exoButtons');
let displayPrev = exoButtons.querySelector('.prev');
let range = exoButtons.querySelector('.range');
let displayNext = exoButtons.querySelector('.next');

// For input of prev and next btns used for pagination like concept
numBtns.forEach((btn) => {
    btn.addEventListener('input', () => {
        if(btn.value === '') {
            displayNext.style.opacity = '1';
            displayPrev.style.opacity = '1';
            displayNext.style.pointerEvents = 'auto';
            displayPrev.style.pointerEvents = 'auto';
        }
    })
})

// For displaying the exos data
function showExosData() {
    loader.style.display = 'flex';
    // After pressing the exploreExos directly when in main-container, neutralising the effect of it
    exoSearch.style.opacity = '1';
    exoButtons.style.opacity = '1';
    dropdownIcon.style.opacity = '1';
    exoButtons.style.pointerEvents = 'auto';
    exoSearch.style.pointerEvents = 'auto';
    dropdownIcon.style.pointerEvents = 'auto';
    exploreExosContainer.querySelector('.searchExos').style.border = '';
    // Now neutralised
    setTimeout(() => {
        activeData = (filteredData.length > 0) ? filteredData : data;
        let startRange = range.querySelector('.startRange').value;
        let endRange = range.querySelector('.endRange').value;
        let start, end;
        if(!endRange && !startRange) {
            start = displayCount * 20;
            end = (displayCount + 1) * 20;
        } else {
            start = startRange;
            end = endRange;
        }
        exosContent.innerHTML = ``;
        // The desired number of cards are generated and then the event listeners respective to them are generated and on click perform the action specified
        for(let i = start; i < end; i++) {
            if(i == activeData.length) break;
            let exosCard = document.createElement('div');
            generateCards(activeData[i], exosCard);
            // Adding event listener
            exosCard.addEventListener('click', () => {
                exoSearch.style.opacity = '0.4';
                exoButtons.style.opacity = '0.4';
                dropdownIcon.style.opacity = '0.4';
                exoButtons.style.pointerEvents = 'none';
                exoSearch.style.pointerEvents = 'none';
                dropdownIcon.style.pointerEvents = 'none';
                exploreExosContainer.querySelector('.searchExos').style.border = 'none';
                showDetails(activeData[i]);
            })
        }
        loader.style.display = 'none';
    }, 100);
    
}

// For noneEvent (the event where until the main-container is opened the other btns shall not work)
let noneEvent = document.querySelectorAll('.noneEvent');
function none(makeItNone) {
    noneEvent.forEach((element) => {
        if(makeItNone) {
            element.style.pointerEvents = 'none';
        } else {
            element.style.pointerEvents = 'auto';
        }
    });
}

// funtction to generate cards
function generateCards(planet, exosCard) {
    exosCard.classList.add('exos-card');
    exosContent.appendChild(exosCard);
    exosCard.innerHTML = `
        <img src="${planet['image']}">
        <h3>${planet['Planet Name']}</h3>
        <div class="exo-div">
            <p>Planet Host: ${planet['Planet Host']}</p>
            <p>Mass: ${planet['Mass']}</p>
            <p>Discovery Year: ${planet['Discovery Year']}</p>
        </div>
    `;
}

// function to show details for each planet
function showDetails(item) {
    savedScrollPos = hiddenContainer.scrollTop;
    // This is zero so that the new page must be shown from top
    hiddenContainer.scrollTop = '0px';
    displayNext.style.opacity = '0.4';
    displayPrev.style.opacity = '0.4';
    displayNext.style.pointerEvents = 'none';
    displayPrev.style.pointerEvents = 'none';
    none(true);
    exosContent.innerHTML = `
        <div class="main-container">
            <div class="image-container">
                <button class="back">Back</button>
                <img src="${item['image']}">
            </div>
            <div class="data-container">
                <h3>${item['Planet Name']}</h3>
                <p>Planet Host: ${item['Planet Host']}</p>
                <p>Orbital Period: ${item['Orbital Period Days']} days</p>
                <p>Mass: ${item['Mass']} Earth Masses</p>
                <p>Number of planets in the system: ${item['Num Planets']}</p>
                <p>Number of Stars in the system: ${item['Num Stars']}</p>
                <p>Gaia Magnitude: ${item['Gaia Magnitude']}</p>
                <p>Distance from Earth: ${item['Distance']} parsecs</p>
                <p>Discovery Year: ${item['Discovery Year']}</p>
                <p>Discovery Method: ${item['Discovery Method']}</p>
                <p>Eccentricity: ${item['Eccentricity']}</p>
                <p>Discovery Facility: ${item['Discovery Facility']}</p>
                <p>Orbit Semi-Major Axis: ${item['Orbit Semi-Major Axis']} AU</p>
                <p>Stellar Effective Temperature: ${item['Stellar Effective Temperature']} kelvin</p>
                <p>Stellar Mass: ${item['Stellar Mass']} Solar Masses</p>
                <p>Stellar Metallicity (Metal content relative to Sun): ${item['Stellar Metallicity']}</p>
                <p>Stellar Metallicity Ratio: ${item['Stellar Metallicity Ratio']}</p>
                <p>Stellar Radius: ${item['Stellar Radius']} Solar Radii</p>
                <p>Stellar Surface Gravity: ${item['Stellar Metallicity Ratio']}</p>
            </div>
        </div>
    `;
    exploreExosContainer.querySelector('.back').addEventListener('click', () => {
        none(false);
        exosContent.innerHTML = ``;
        exoSearch.style.opacity = '1';
        exoButtons.style.opacity = '1';
        exoButtons.style.pointerEvents = 'auto';
        exoSearch.style.pointerEvents = 'auto';
        displayNext.style.opacity = '1';
        displayPrev.style.opacity = '1';
        displayNext.style.pointerEvents = 'auto';
        displayPrev.style.pointerEvents = 'auto';
        exploreExosContainer.querySelector('.searchExos').style.border = '3px solid transparent';
        showExosData();
        setTimeout(() => {
            hiddenContainer.scrollTop = savedScrollPos;
        }, 100); 
    })
}

// enter button
let enter = document.querySelector('.enter');
enter.addEventListener('click', () => {
    if(range.querySelector('.startRange').value && range.querySelector('.endRange').value && range.querySelector('.startRange').value < range.querySelector('.endRange').value) {
        // opacity of prev and next button
        displayNext.style.opacity = '0.4';
        displayPrev.style.opacity = '0.4';
        displayNext.style.pointerEvents = 'none';
        displayPrev.style.pointerEvents = 'none';
        showExosData();
    }
})

// for clearing the range input fields
let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    range.querySelector('.startRange').value = '';
    range.querySelector('.endRange').value = '';
    // opacity of prev and next button used for pagination like concept
    displayNext.style.opacity = '1';
    displayPrev.style.opacity = '1';
    displayNext.style.pointerEvents = 'auto';
    displayPrev.style.pointerEvents = 'auto';
    showExosData();
})

// For the displayNext
displayNext.addEventListener('click', () => {
    if(displayCount < Math.ceil((activeData.length / 20)) && (range.querySelector('.startRange').value === '') && (range.querySelector('.endRange').value === '')) {
        ++displayCount;
        showExosData();
    }
})

// For the displayPrev
displayPrev.addEventListener('click', () => {
    if(displayCount > 0) {
        --displayCount;
        showExosData();
    }
})

// function for search and filter
function searchWithFilter(inputValue, variable) {
    if(inputValue === "") {
        // opacity of prev and next button used for pagination like concept
        displayNext.style.opacity = '1';
        displayPrev.style.opacity = '1';
        displayNext.style.pointerEvents = 'auto';
        displayPrev.style.pointerEvents = 'auto';
        // making empty
        filteredData = [];
        range.querySelector('.startRange').value = '';
        range.querySelector('.endRange').value = '';
        // calling
        displayCount = 0;
        showExosData();
        return;
    }
    // firstly, getting the filtered array, then creating the cards for it, and get the detailed data for each desired
    // For any field, getting the filteredData array
    filteredData = data.filter((d) => {
        return d[variable] !== undefined && d[variable] !== null && d[variable].toString().toLowerCase().startsWith(inputValue.toLowerCase());
    })
    if(filteredData.length === 0) {
        exosContent.innerHTML = `
            <div class="noMatchAlert">No Match Found !</div>
        `;
        return;
    }
    exosContent.innerHTML = ``;
    displayCount = 0;
    showExosData();
}
// For search and filter
let exoSearchBar = exploreExosContainer.querySelector('.searchBar');
let exoSearch = exploreExosContainer.querySelector('.search');
let filterList = document.querySelector('.filters');
let filterItems = filterList.querySelectorAll('li');
const key = {
    "Planet Name": "Planet Name",
    "Host Name": "Planet Host",
    "Number of planets in the system": "Num Planets",
    "Number of stars in the system": "Num Stars",
    "Mass": "Mass",
    "Orbital Period": "Orbital Period Days",
    "Distance from Earth": "Distance",
    "Discovery Year": "Discovery Year",
    "Discovery Method": "Discovery Method",
    "Discovery Facility": "Discovery Facility"
}
let currFilter = 'Planet Name';
filterList.firstElementChild.style.borderBottom = '2px solid #fff';
filterItems.forEach((item) => {
    item.addEventListener('click', () => {
        // For the borders of li
        for(let li of filterItems) {
            li.style.borderBottom = '2px solid transparent';
        }
        item.style.borderBottom = '2px solid #fff';
        // clicking the list give the new filter
        currFilter = key[item.innerText];
    })
})
exoSearch.addEventListener('input', () => {
    let inputValue = exoSearch.value.toLowerCase();
    // here, because of the currFilter the filter changes
    searchWithFilter(inputValue, currFilter);
})

// For displaying filter list
let dummy = document.querySelector('.dummy');
let dropdownIcon = dummy.querySelector('i');
dropdownIcon.addEventListener('click', () => {
    if(getComputedStyle(filterList).display === 'none') {
        filterList.style.display = 'flex';
        setTimeout(() => {
            filterList.style.height = 'auto';
        }, 50);

        // Decreasing the opacity
        exosContent.style.opacity = '0.1';
        exoButtons.style.opacity = '0.1';
        exosContent.style.pointerEvents = 'none';
        exoButtons.style.pointerEvents = 'none';
        dropdownIcon.style.transform = 'rotate(180deg)';

        
    } else {
        filterList.style.height = '0px';
        setTimeout(() => {
            filterList.style.display = 'none';
        }, 10)
        exosContent.style.opacity = '1';
        exoButtons.style.opacity = '1';
        exosContent.style.pointerEvents = 'auto';
        exoButtons.style.pointerEvents = 'auto';
        dropdownIcon.style.transform = 'rotate(0deg)';
    }
})
document.querySelector('body').addEventListener('click', (event) => {
    if(getComputedStyle(filterList).display === 'flex' && !event.target.closest('.navbar') && !event.target.closest('.filters') && !event.target.closest('.dummy')) {
        filterList.style.height = '0px';
        setTimeout(() => {
            filterList.style.display = 'none';
        }, 10)
        exosContent.style.opacity = '1';
        exoButtons.style.opacity = '1';
        exosContent.style.pointerEvents = 'auto';
        exoButtons.style.pointerEvents = 'auto';
        dropdownIcon.style.transform = 'rotate(0deg)';
    }
})

// Btn to scroll to top
let scrollUp = document.createElement('div');
scrollUp.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
body.appendChild(scrollUp);
scrollUp.classList.add('scroll-up');

let prevScrollVal, currScrollVal;
prevScrollVal = hiddenContainer.scrollTop;
hiddenContainer.addEventListener('scroll', () => {
    currScrollVal = hiddenContainer.scrollTop;
    if(getComputedStyle(exploreExosContainer).display === 'flex' && !exosContent.querySelector('.main-container') && currScrollVal <= prevScrollVal) {
        scrollUp.style.display = 'flex';
        setTimeout(() => {
            scrollUp.style.bottom = '0px';
        }, 50);
        setTimeout(() => {
            scrollUp.style.bottom = '-250px';
            setTimeout(() => {
                scrollUp.style.display = 'none';
            }, 100);
        }, 5000);
    }
    prevScrollVal = currScrollVal;
})

scrollUp.addEventListener('click', () => {
    hiddenContainer.scrollTop = '0px';
})
