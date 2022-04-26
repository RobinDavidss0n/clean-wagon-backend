module.exports = function({ Coordinate }) {
    const exports = {}


    exports.runAllCoordinateTests = async function() {

        createSuccess = await exports.create()
        getSuccess = await exports.get()
        updateSuccess = await exports.update()
        getBySuccess = await exports.getBy()

        if (!createSuccess) {
            console.log('CreateCoordinate test failed.')
        }

        if (!getSuccess) {
            console.log('GetCoordinate test failed.')
        }

        if (!updateSuccess) {
            console.log('UpdateCoordinate test failed.')
        }

        if (!getBySuccess) {
            console.log('getByCoordinate test failed.')
        }

        if(createSuccess && getSuccess && updateSuccess && getBySuccess) {
            console.log('\n\nCoordinate tests passed!\n\n')
        }
    }


    exports.create = async function() {
        
        const successCoordinate = new Coordinate(1, 69, 69) // should succeed
        const failCoordinate = new Coordinate(999, 69 , 69) // should fail
        
        const test1 = await successCoordinate.insert()
        const test2 = await failCoordinate.insert()

        test1Success = (test1.isSuccess && test1.result.affectedRows == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('foreign key constraint'))

        return test1Success && test2Success
    }


    exports.get = async function() {

        const successCoordinate = new Coordinate()
        const failCoordinate = new Coordinate()
        
        const test1 = await successCoordinate.get(1)
        const test2 = await failCoordinate.get(999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'CoordinateNotFound')

        return test1Success && test2Success
    }


    exports.update = async function() {

        const coordinate = new Coordinate()
        await coordinate.get(1)

        const timeStamp = 1650961403000

        coordinate.time = new Date(timeStamp)

        const test1 = await coordinate.update()

        const coordinate2 = new Coordinate()
        const test2 = await coordinate2.get(1)

        coordinate.time = 'fail' // not a datetime value
        const test3 = await coordinate.update()
        
        test1Success = (test1.isSuccess && test2.result[0].time.getTime() == timeStamp && coordinate2.time.getTime() == timeStamp)
        test2Success = (!test3.isSuccess && test3.errorCode == 'internalError' && test3.errorStack.includes('Incorrect datetime value')) 


        return test1Success && test2Success
    }


    exports.getBy = async function() {

        const successCoordinate = new Coordinate()
        const failCoordinate = new Coordinate()
        
        const test1 = await successCoordinate.getBy("journey_id", 1)
        const test2 = await failCoordinate.getBy("journey_id", 999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'CoordinateNotFound')

        return test1Success && test2Success
    }


    return exports
}