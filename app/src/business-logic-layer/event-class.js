
module.exports = function ({ DbBuddy, QueryManager, statusCodes }) {

    const exports = class extends DbBuddy {

        // Database attributes

        coordinate_id
        event_type
        image_id
        object_desc

        constructor(coordinate_id = null, event_type = null, image_id = null, object_desc = null) {

            super("Event")
            this.coordinate_id = coordinate_id
            this.event_type = event_type
            this.image_id = image_id
            this.object_desc = object_desc
            super.createQueryInfo()
            super.updateQueryValues()

        }

        /**
         * Validates the members of the Events class instance
         * @returns {Array<string>}
         */
        validate() {

            let errors = []

            if (this.image_id === undefined || this.image_id === '') { errors.push({ errorCode: statusCodes.BadRequest, errorMessage: 'No image in request.' }) }
            if (this.coordinate_id === undefined || this.coordinate_id === '') { errors.push({ errorCode: statusCodes.BadRequest, errorMessage: 'No coordinate_id in request.' }) }
            if (this.event_type === undefined || this.event_type === '') { errors.push({ errorCode: statusCodes.BadRequest, errorMessage: 'No event_type in request.' }) }

            return errors;
        }

        /**
         * Get all events for a specific user by user_id
         * @param {Integer} user_id 
         * @returns {Promise<ResponseContainer>}
         */
        async getEventsByUserId(user_id, limit) {

            const params = [user_id, limit];

            const query = `
                SELECT c.id as coordinate_id, j.id as journey_id, event_type, image_id, object_desc
                FROM Events AS e
                INNER JOIN Coordinates as c
                ON e.coordinate_id=c.id 
                INNER JOIN Journeys as j
                ON c.journey_id=j.id
                INNER JOIN Mowers as m
                ON j.mower_id=m.id
                INNER JOIN Users as u
                ON m.user_id=u.id
                WHERE u.id = ?
                ORDER BY e.id DESC
                LIMIT ?;
            `
            const responseContainer = await QueryManager.runQuery(query, params, 'Events')

            return responseContainer
        }
        async getEventsByMowerId(mowerId, limit) {

            const params = [mowerId, limit];

            const query = `
                SELECT c.id as coordinate_id, j.id as journey_id, event_type, image_id, object_desc
                FROM Events AS e
                INNER JOIN Coordinates as c
                ON e.coordinate_id=c.id 
                INNER JOIN Journeys as j
                ON c.journey_id=j.id
                INNER JOIN Mowers as m
                ON j.mower_id=m.id
                WHERE m.id = ?
                ORDER BY e.id DESC
                LIMIT ?;
            `
            const responseContainer = await QueryManager.runQuery(query, params, 'Events')

            return responseContainer
        }

    }

    return exports

}