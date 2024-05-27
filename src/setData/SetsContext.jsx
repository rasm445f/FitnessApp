// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import graphqlClient from "../graphqlClient";
// import { gql } from "graphql-request";
// import { useAuth } from "../auth/AuthContext";

// const SetsContext = createContext();

// const setsQuery = gql`
//   query sets($exercise: String!, $username: String!) {
//     sets(exercise: $exercise, username: $username) {
//       documents {
//         _id
//         exercise
//         reps
//         weight
//       }
//     }
//   }
// `;

// export const SetsProvider = ({ exerciseName, children }) => {
//   const { username } = useAuth();

//   console.log("username from SetsProvider " + username);
//   console.log("exerciseName from SetsProvider " + exerciseName);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["sets", exerciseName, username],
//     queryFn: () =>
//       graphqlClient.request(setsQuery, { exercise: exerciseName, username }),
//     enabled: !!username, // Only run the query if username is available
//   });

//   console.log("this is the data from setsContext" + data);

//   return (
//     <SetsContext.Provider value={{ data, isLoading, error }}>
//       {children}
//     </SetsContext.Provider>
//   );
// };

// export const useSets = () => {
//   return useContext(SetsContext);
// };
