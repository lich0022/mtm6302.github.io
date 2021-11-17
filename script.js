// DATA
//html refr
const $clocks = document.getElementById('clocks')
const $clockDisplay = document.getElementById('clocks-display')

//internal variables
const offsets = { //utc offset is hours
    ottawa: -4,
    tokyo: 9,
    london: 0,
    hawaii: -10
}

// CODE
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1)
}

function getLocalTime(city) {
    const offset = offsets[ctiy]
    let UTCTime = new Date()
    UTCTime = UTCTime.toUTCString().split(' ')
    console.log(UTCTime)

    let hours = parseInt(UTCTime.slice(0, 2)) + offset
    //console.log(hours)

    // 24 hours clock > over 24?? under 0??
    if (hours >= 24) {
        hours -= 24
    }   else if (hours < 0) {
        hours += 24
    }
    const localTime = hours + UTCTime.slice(2)
    return localTime
}

function createClock(city) 
{
    $clockDisplay.innerHTML = `
    <h2>Local Time in: ${capitalize(city)}</h2>
    <p id='time-display'>${getLocalTime(city)}</p>
    <button id='update'>Update</button>
    <button id='close'>Close</button>`

    document.getElementById('update').addEventListener('click', function () {
        document.getElementById('time-display').textContent = getLocalTime(city)
    })

    document.getElementById('close').addEventListener('click', function () {
        $clockDisplay.textContent = ''
    })

    localStorage.setItem('timezoneCity', city)
}

function initialize() {
    const storedCity = localStorage.getItem('timeZoneCity')

    if (storedCity) {
        createClock(storedCity)
    }   else {
        createClock($clocks.value)
    }
}

// RUN
$clocks.addEventListener('change', function () {
    //console.log($clocks.value)
    createClock($clocks.value)
})

//initialization
initialize()