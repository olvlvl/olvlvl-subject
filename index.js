"use strict";

const OBSERVERS_PROPERTY = Symbol("Subject observers")
const NAME_PROPERTY = Symbol("Subject event name")

/**
 * Asserts that an event name is valid.
 *
 * @param name
 *
 * @throws Error if `name` is not a string.
 */
function assertNameIsValid(name)
{
    if ('symbol' !== typeof name)
    {
        throw new Error("Event name is not a symbol")
    }
}

/**
 * Retrieve event name from an event constructor.
 *
 * @param {function} constructor
 *
 * @returns {string}
 *
 * @throws Error if `constructor` is not an event constructor.
 */
function retrieveNameFromConstructor(constructor)
{
    if ('function' !== typeof constructor  || !(NAME_PROPERTY in constructor))
    {
        throw new Error(`Expecting an event instance, got: ${constructor}`)
    }

    const name = constructor[NAME_PROPERTY]

    assertNameIsValid(name)

    return name
}

/**
 * Retrieve event name from ab event instance.
 *
 * @param {object} event
 *
 * @returns {string}
 *
 * @throws Error if `event` is not an event instance.
 */
function retrieveNameFromInstance(event)
{
    if ('object' !== typeof event || !(NAME_PROPERTY in event.__proto__.constructor))
    {
        throw new Error("Expected an Event instance")
    }

    const name = event.__proto__.constructor[NAME_PROPERTY]

    assertNameIsValid(name)

    return name
}

/**
 * Creates an event constructor given a name and a constructor.
 *
 * @param {function} constructor
 *
 * @returns {function}
 */
function createEvent(constructor)
{
    constructor[NAME_PROPERTY] = Symbol("Event symbol")

    return constructor
}

/**
 * Return the observers array.
 *
 * @protected
 *
 * @param {Subject} subject
 * @param {string|null} name Event name, or `null` to get all observers.
 *
 * @return {Array}
 */
function getObservers(subject, name) {

    if (!(OBSERVERS_PROPERTY in subject))
    {
        subject[OBSERVERS_PROPERTY] = []
    }

    const observers = subject[OBSERVERS_PROPERTY]

    if (!name)
    {
        return observers
    }

    if (!(name in observers))
    {
        observers[name] = []
    }

    return observers[name]
}

/**
 * @constructor
 */
function Subject()
{

}

Subject.prototype = {

    /**
     * Attach an observer.
     *
     * @param {function} constructor Event constructor.
     * @param {function} callback
     *
     * @return {Subject}
     */
    observe: function (constructor, callback) {

        const symbol = retrieveNameFromConstructor(constructor)
        const observers = getObservers(this, symbol)

        if (observers.indexOf(callback) !== -1)
        {
            throw new Error("Observer already attached", constructor)
        }

        observers.push(callback)

        return this
    },

    /**
     * Detach an observer.
     *
     * @param {function} callback
     *
     * @return {Subject}
     */
    unobserve: function (callback) {

        const observers = getObservers(this, null)

        for (let type of Object.getOwnPropertySymbols(observers))
        {
            let typeObservers = observers[type]
            let k = typeObservers.indexOf(callback)

            if (k === -1)
            {
                continue
            }

            typeObservers.splice(k, 1)
        }

        return this
    },

    /**
     * Notify observers of a change.
     *
     * @param {object} event
     *
     * @return {Subject}
     */
    notify: function (event) {

        const name = retrieveNameFromInstance(event)
        const observers = getObservers(this, name)

        for (let observer of observers)
        {
            try
            {
                observer.call(null, event)
            }
            catch (e)
            {
                console.error(e)
            }
        }

        return this
    }
}

Object.defineProperty(Subject, 'createEvent', { value: createEvent })

var module

if (module)
{
    module.exports = Subject
}
