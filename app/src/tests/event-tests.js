module.exports = function({ Event }) {
    const exports = {}


    exports.runAllEventTests = async function() {

        createSuccess = await exports.create()
        getSuccess = await exports.get()
        updateSuccess = await exports.update()
        getBySuccess = await exports.getBy()


        if (!createSuccess) {
            console.log('CreateEvent test failed.')
        }

        if (!getSuccess) {
            console.log('GetEvent test failed.')
        }

        if (!updateSuccess) {
            console.log('UpdateEvent test failed.')
        }

        if (!getBySuccess) {
            console.log('getByEvent test failed.')
        }


        if(createSuccess && getSuccess && updateSuccess && getBySuccess) {
            console.log('Event tests passed!')
        }
    }


    exports.create = async function() {
        
        const successEvent = new Event(1) // should succeed
        const failEvent = new Event(999) // should fail
        
        const test1 = await successEvent.insert()
        const test2 = await failEvent.insert()

        test1Success = (test1.isSuccess && test1.result.affectedRows == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('foreign key constraint'))

        return test1Success && test2Success
    }


    exports.get = async function() {

        const successEvent = new Event()
        const failEvent = new Event()
        
        const test1 = await successEvent.get(1)
        const test2 = await failEvent.get(999)

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'EventNotFound')

        return test1Success && test2Success
    }


    exports.update = async function() {

        const event = new Event()
        await event.get(1)

        const newType = 'Obstacle'
        const newDesc = 'Basketball'
        event.event_type = newType
        event.object_desc = newDesc
        
        const test1 = await event.update() // should succeed
        
        const event2 = new Event()
        const test2 = await event2.get(1)
        
        event.coordinate_id = 9999 // invalid FK
        const test3 = await event.update() // should fail
        
        test1Success = (test1.isSuccess && test2.result[0].event_type == newType && event2.object_desc == newDesc)
        test2Success = (!test3.isSuccess && test3.errorCode == 'internalError' && test3.errorStack.includes('foreign key constraint')) 

        return test1Success && test2Success
    }


    exports.getBy = async function() {

        const successEvent = new Event()
        const failEvent = new Event()
        
        const test1 = await successEvent.getBy("coordinate_id", 1) // should succeed
        const test2 = await failEvent.getBy("user_id", 999) // should fail

        test1Success = (test1.isSuccess && test1.result[0].id == 1)
        test2Success = (!test2.isSuccess && test2.errorCode == 'internalError' && test2.errorStack.includes('Unknown column \'user_id\''))

        return test1Success && test2Success
    }


    return exports
}