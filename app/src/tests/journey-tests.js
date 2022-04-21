module.exports = function({ Journey }) {
    const exports = {}


    exports.runAllJourneyTests = async function() {

        createSuccess = await exports.create()
        getSuccess = await exports.get()
        updateSuccess = await exports.update()
        getBySuccess = await exports.getBy()
        getAllSuccess = await exports.getAll()


        if (!createSuccess) {
            console.log('CreateJourney test failed.')
        }

        if (!getSuccess) {
            console.log('GetJourney test failed.')
        }

        if (!updateSuccess) {
            console.log('UpdateJourney test failed.')
        }

        if (!getBySuccess) {
            console.log('getByJourney test failed.')
        }

        if (!getAllSuccess) {
            console.log('getAllJourney test failed.')
        }

        if(createSuccess && getSuccess && updateSuccess && getBySuccess && getAllSuccess) {
            console.log('Journey tests passed!')
        }
    }


    exports.create = async function() {
        
        const successJourney = new Journey(1) // should succeed
        const failJourney = new Journey(999) // should fail
        
        const test1 = await successJourney.insert()
        const test2 = await failJourney.insert()

        test1Success = (test1.isSuccess && test1.result.affectedRows == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('foreign key constraint'))

        return test1Success && test2Success
    }


    exports.get = async function() {

        const successJourney = new Journey()
        const failJourney = new Journey()
        
        const test1 = await successJourney.get(1)
        const test2 = await failJourney.get(999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'JourneyNotFound')

        return test1Success && test2Success
    }


    exports.update = async function() {

        const journey = new Journey()
        await journey.get(1)

        journey.end_time = new Date()

        const test1 = await journey.update()

        const journey2 = new Journey()
        const test2 = await journey2.get(1)

        journey.start_time = 'fail' // not a datetime value
        const test3 = await journey.update()

        test1Success = (test1.isSuccess && test2.result[0].end_time != null && journey2.end_time != null)
        test2Success = (!test3.isSuccess && test3.errorCode == 'internalError' && test3.errorStack.includes('Incorrect datetime value')) 

        return test1Success && test2Success
    }


    exports.getBy = async function() {

        const successJourney = new Journey()
        const failJourney = new Journey()
        
        const test1 = await successJourney.getBy("mower_id", 1)
        const test2 = await failJourney.getBy("mower_id", 999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'JourneyNotFound')

        return test1Success && test2Success
    }


    exports.getAll = async function() {

        const journey = new Journey()
        await journey.get(1)
        
        const test1 = await journey.getAll('Coordinates')
        const test2 = await journey.getAll('Mowers')

        test1Success = (test1.isSuccess && test1.result[0].x == 1337)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('Unknown column'))

        return test1Success && test2Success
    }

    return exports
}