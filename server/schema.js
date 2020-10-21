const { gql } = require('apollo-server');

const typeDefs = gql`
    enum PatchSize { 
        SMALL
        LARGE
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }

    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

    type Query {
        launches(pageSize: Int, after: String): LaunchConnection!
        launch(id: ID!): Launch
        me: User
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String!): String
    }
`;

module.exports = typeDefs;