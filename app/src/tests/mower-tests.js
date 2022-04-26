module.exports = function({ Mower, testLib }) {
    const exports = {}


    exports.runAllMowerTests = async function() {

        createSuccess = await exports.create()
        getSuccess = await exports.get()
        updateSuccess = await exports.update()
        getBySuccess = await exports.getBy()
        getAllSuccess = await exports.getAll()


        if (!createSuccess) {
            console.log('CreateMower test failed.')
        }

        if (!getSuccess) {
            console.log('GetMower test failed.')
        }

        if (!updateSuccess) {
            console.log('UpdateMower test failed.')
        }

        if (!getBySuccess) {
            console.log('getByMower test failed.')
        }

        if (!getAllSuccess) {
            console.log('getAllMower test failed.')
        }

        if(createSuccess && getSuccess && updateSuccess && getBySuccess && getAllSuccess) {
            console.log('Mower tests passed!')
        }
    }


    exports.create = async function() {
        
        const mowerSerial = testLib.getRandomString(7)
        const successMower = new Mower(1, mowerSerial) // should succeed
        const failMower = new Mower(999) // should fail
        
        const test1 = await successMower.insert()
        const test2 = await failMower.insert()

        test1Success = (test1.isSuccess && test1.result.affectedRows == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('\'mower_serial\' cannot be null'))

        return test1Success && test2Success
    }


    exports.get = async function() {

        const successMower = new Mower()
        const failMower = new Mower()
        
        const test1 = await successMower.get(1)
        const test2 = await failMower.get(999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'MowerNotFound')

        return test1Success && test2Success
    }


    exports.update = async function() {

        const mower = new Mower()
        await mower.get(1)

        
        mower.is_online = false
        const newSerial = testLib.getRandomString(7)
        mower.mower_serial = newSerial
        
        const test1 = await mower.update() // should succeed
        
        const mower2 = new Mower()
        const test2 = await mower2.get(1)
        
        mower.is_online = 'fail' // not a boolean value
        const test3 = await mower.update() // should fail
        
        test1Success = (test1.isSuccess && !test2.result[0].is_online && mower2.mower_serial == newSerial)
        test2Success = (!test3.isSuccess && test3.errorCode == 'internalError' && test3.errorStack.includes('Incorrect integer value')) 

        return test1Success && test2Success
    }


    exports.getBy = async function() {

        const successMower = new Mower()
        const failMower = new Mower()
        
        const test1 = await successMower.getBy("user_id", 1) // should succeed
        const test2 = await failMower.getBy("user_id", 999) // should fail

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'MowerNotFound')

        return test1Success && test2Success
    }


    exports.getAll = async function() {

        const mower = new Mower()
        await mower.get(1)

        mowerId = mower.mower_id
        
        const test1 = await mower.getAll('Journeys') // should succeed
        const test2 = await mower.getAll('Users') // should fail

        console.log(test1)

        test1Success = (test1.isSuccess && test1.result[0].mower_id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('Unknown column'))

        return test1Success && test2Success
    }

    return exports
}