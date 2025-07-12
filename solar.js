// For solar-system-container
let solarSystemLink = 'https://raw.githubusercontent.com/Abrar822/Space.A/refs/heads/main/solarSystem.json';
let savedScroll;
let solarData = []
let solarSystemContainer = document.querySelector('.solar-system-container');
async function fetchSolarData() {
    let response = await fetch(solarSystemLink);
    solarData = await response.json();
}
async function loadSolarOnPage() {
    loader.style.display = 'flex';
    await fetchSolarData();
    loader.style.display = 'none';
    for(let planetData of solarData) {

        // Creating the planet box div
        let divPlanetBox = document.createElement('div');
        divPlanetBox.classList.add('planet-box');
        solarSystemContainer.appendChild(divPlanetBox);
        // For planet image
        let planetImage = document.createElement('img');
        planetImage.src = planetData.image;
        divPlanetBox.appendChild(planetImage);
        // For planet name (h3)
        let planetName = document.createElement('h3');
        planetName.innerText = planetData.name;
        divPlanetBox.appendChild(planetName);

        // Creating the planet content div
        let divPlanetContent = document.createElement('div');
        divPlanetContent.classList.add('planet-content');
        divPlanetBox.appendChild(divPlanetContent);

        // For brief data of planet
        // For moons
        let noMoons = document.createElement('p');
        divPlanetContent.appendChild(noMoons);
        noMoons.innerText = "Moons: " + planetData.moons;
        // For radius of the planet
        let radius = document.createElement('p');
        divPlanetContent.appendChild(radius);
        radius.innerText = "Radius: " + planetData.radius_km + " kms";
        // For gravity
        let gravity = document.createElement('p');
        divPlanetContent.appendChild(gravity);
        gravity.innerText = "Gravity: " + planetData.gravity_m_s2 + " Kms/s";
        gravity.innerHTML += `<sup>2</sup>`;

        // IMP::: while the content is dynamic then not to use addEventListeners and forEach but inside the same loop use the below one concept
        // loading dynamically planet detail page
        divPlanetBox.addEventListener('click', () => {
            savedScroll = hiddenContainer.scrollTop;
            hiddenContainer.scrollTop = '0px';
            solarSystemContainer.innerHTML = `
                <div class="data-container">
                    <div class='planet-image'>
                        <img src="${planetData.image}">
                    </div>
                    <div class = "planet-data">
                        <button class="back">Back</button>
                        <h2>${planetData.name}</h2>
                        <p>Gravity: ${planetData.gravity_m_s2} m/s<sup>2</sup></p>
                        <p>Mass: ${planetData.mass_1024_kg} * 10<sup>24</sup> Kg</p>
                        <p>Density: ${planetData.density_kg_m3} Kg/m<sup>3</sup></p>
                        <p>Confirmed Moons: ${planetData.moons}</p>
                        <p>Radius of ${planetData.name}: ${planetData.radius_km} kms</p>
                        <p>Orbital Period: ${planetData.orbital_period_days} days</p>
                        <p>Rotation-Period (Sidereal Day): ${planetData.rotation_period_hrs} hrs</p>
                        <p>Day-Length (Solar Day): ${planetData.length_of_day_hrs} hrs</p>
                        <p>Distance from the Sun: ${planetData.distance_from_sun_million_km} million kms</p>
                        <p>Perihelion: ${planetData.perihelion_106_km} * 10<sup>6</sup> Kms</p>
                        <p>Aphelion: ${planetData.aphelion_106_km} * 10<sup>6</sup> Kms</p>
                        <p>Escape Velocity: ${planetData.escape_velocity_km_s} km/s</p>
                        <p>Orbital velocity: ${planetData.orbital_velocity_km_s} km/s</p>
                        <p>Discovery: ${planetData.discovery}</p>
                        <p>Orbital Inclination: ${planetData.orbital_inclination_degress} deg</p>
                        <p>Orbital Eccentricity: ${planetData.orbital_eccentricity}</p>
                        <p>Obliquity to orbits: ${planetData.obliquity_to_orbit_degrees} deg</p>
                        <p>Mean Temperature: ${planetData.average_temperature_c} degC</p>
                        <p>Type: ${planetData.type}</p>
                        <p>Atmosphere: ${planetData.atmosphere}</p>
                        <p>Fact: ${planetData.fun_fact}</p>
                    </div>
                </div>
            `;
                document.querySelector('.back').addEventListener('click', () => {
                    solarSystemContainer.innerHTML = ``;
                    loadSolarOnPage();
                    setTimeout(() => {
                        hiddenContainer.scrollTop = savedScroll;
                    }, 100);
                })
        })
    }
}
loadSolarOnPage();
// For solar-system btn
let solarBtn = document.querySelectorAll('.solarBtn');
solarBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        // For exploreExos section scrolling
        if(getComputedStyle(exploreExosContainer).display === 'flex') {
            savedScrollPos = hiddenContainer.scrollTop;
        }
        for(let section of sections) {
            if(getComputedStyle(section).display !== 'none' && !section.classList.contains('solar-system-container')) {
                section.style.top = '1000px';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 70);
                // specific to explore-exos
                if(section.classList.contains('explore-exos-container')) {
                    exoSearchBar.style.display = 'flex';
                    exoButtons.style.display = 'flex';
                }
            }
        }
        setTimeout(() => {
            solarSystemContainer.style.display = 'flex';
        }, 100)
        setTimeout(() => {
            solarSystemContainer.style.top = '80px';
        }, 300)
    })
})
