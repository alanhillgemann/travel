import {handleSubmit} from '../src/client/js/app'
import {showTripResults} from '../src/client/js/app'
import {showError} from '../src/client/js/app'
import {postTrip} from '../src/client/js/app'

describe('handleSubmit', () => {
    test('Is defined', () => {
        expect(handleSubmit).toBeDefined()
    })
    test('Is a function', () => {
        expect(typeof handleSubmit).toBe('function')
    })
})

describe('postTrip', () => {
    test('Is defined', () => {
        expect(postTrip).toBeDefined()
    })
    test('Is a function', () => {
        expect(typeof postTrip).toBe('function')
    })
})

describe('showError', () => {
    test('Is defined', () => {
        expect(showError).toBeDefined()
    })
    test('Is a function', () => {
        expect(typeof showError).toBe('function')
    })
})

describe('showTripResults', () => {
    test('Is defined', () => {
        expect(showTripResults).toBeDefined()
    })
    test('Is a function', () => {
        expect(typeof showTripResults).toBe('function')
    })
})
