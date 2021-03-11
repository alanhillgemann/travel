import {handleSubmit} from "./js/app"
import {showTripResults} from "./js/app"
import {showError} from "./js/app"
import {postTrip} from "./js/app"

import './images/default.jpeg'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

window.addEventListener('load', () => {
    document.getElementById('submit').addEventListener('click', Client.handleSubmit)
    document.getElementById('arrival__date').addEventListener('blur', Client.validateDate)
})

export {
    handleSubmit,
    showTripResults,
    showError,
    postTrip
}
