import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(pageSize: 3) {
      launches {
        id
      }
    }
  }
`;

export default function LaunchesList() {
  const { data, loading, error } = useQuery(GET_LAUNCHES);

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (!data?.launches?.launches?.length) {
    return null;
  }

  return (
    <ul>
      {data.launches.launches.map(launch => (
        <li key={`launch-${launch.id}`}>{launch.id}</li>
      ))}
    </ul>
  );
}
