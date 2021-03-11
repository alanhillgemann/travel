const showTripResults = (tripData) => {
    // Get weather closest to arrival date
    let closestArrivalDateWeather = tripData.weather[tripData.weather.length-1]
    for (let i = 0; i < tripData.weather.length; i++) {
        if (tripData.weather[i].dateTime === tripData.arrivalDate) {
            closestArrivalDateWeather = tripData.weather[i]
        }
    }
    // Update results on page
    document.getElementById('results__holder').innerHTML = `
    <figure id="destination__image">
        <img src="${tripData.imageSource}" alt="Photo of ${tripData.destination}">
        <figcaption class="white top-left">${tripData.destination}</figcaption>
    </figure>
    <div id="weather__data">
        <ul>
            <li>Closest date: ${closestArrivalDateWeather.dateTime}</li>
            <li>Forecast: ${closestArrivalDateWeather.description}</li>
            <li>Maximum: ${closestArrivalDateWeather.maxTemp} <span>&#8457;</span></li>
            <li>Minimum: ${closestArrivalDateWeather.minTemp} <span>&#8457;</span></li>
        </ul>
    </div>
    <div id="weather__icon">
        <img src="${closestArrivalDateWeather.iconSource}" alt="Icon of ${closestArrivalDateWeather.description}">
    </div>`
}

const showError = (errorMessage) => {
    document.getElementById('form').insertAdjacentHTML(
    'afterbegin', `<div id="error" role="alert">
    <p>${errorMessage}</p></div>`
    )
}

const postTrip = async (tripData) => {
    try {
        const req = await fetch('http://localhost:8081/trip', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tripData)
        })
        switch (req.status) {
            case 200:
                const res = await req.json()
                res.status = 200
                return res
            case 404:
                return {'status': 404}
            default:
                return {'status': 500}
        }
    } catch(err) {
        console.error(err)
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const errorMessage = document.getElementById('error')
    const submitButton = document.getElementById('submit')

    // Clear previous results
    // document.getElementById('results__holder').innerHTML = ''

    // Clear previous error
    if (errorMessage) errorMessage.remove()

    // Set minimum arrival date to today
    const todaysDate = new Date().toISOString().split('T')[0]
    document.getElementById('arrival__date').setAttribute('min', todaysDate)

    // Validate form data
    if (document.getElementById('form').reportValidity()) {
        // Disable submit button
        setTimeout(() => {
            submitButton.disabled = true
        }, 0)
        // Submit trip details
        let tripData = {
            'destination': document.getElementById('destination').value,
            'arrivalDate': document.getElementById('arrival__date').value,
        }
        try {
            const postTripData = await Client.postTrip(tripData)
            switch (postTripData.status) {
                case 200:
                    Client.showTripResults(postTripData)
                    break
                case 404:
                    Client.showError(`Sorry we can't find that destination.`)
                    break
                default:
                    Client.showError('Something went wrong. Try again later.')
            }
        } catch(err) {
            console.error(err)
            Client.showError('Something went wrong. Try again later.')
        } finally {
            // Re-enable submit button
            submitButton.disabled = false
        }
    }
}

export {
    handleSubmit,
    showTripResults,
    showError,
    postTrip
}