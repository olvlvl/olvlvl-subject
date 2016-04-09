"use strict";

const expect = require('chai').expect
const Subject = require('../index').Subject

describe('#subject', () => {

    const Event1 = Subject.createEvent(function (value) {

        this.value = value

    })

    function MySubject()
    {

    }

    Object.assign(MySubject.prototype, Subject.prototype)

    const instance = new MySubject()

    it ("should create an event constructor", () => {

        expect(Event1).to.be.a('function')

    })

    it ("should instantiate an event", () => {

        let value = Math.random()
        let ev = new Event1(value)

        expect(ev).to.be.instanceOf(Event1)
        expect(ev.value).to.equal(value)

    })

    it ("should be notified", () => {

        let value = Math.random()
        let witness

        instance.observe(Event1, (ev) => {

            expect(ev).to.be.instanceOf(Event1)
            expect(ev.value).to.equal(value)

            witness = value

        })

        instance.notify(new Event1(value))

        expect(witness).to.equal(value)

    })

    it ("should not attach twice", () => {

        let callback = function (ev) {}

        instance.observe(Event1, callback)

        expect(function () {

            instance.observe(Event1, callback)

        }).to.throw(Error)

    })

    it ("should attach and detach", () => {

        let callback = function (ev) {}

        instance.observe(Event1, callback)
        instance.unobserve(callback)
        instance.observe(Event1, callback)

    })

})
