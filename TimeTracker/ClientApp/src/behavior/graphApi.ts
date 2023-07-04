import { from, map } from 'rxjs';

export const sendRequest = (query: string, variables?: unknown,) => {
  const path = 'http://localhost:5000/graphql';
  const body = JSON.stringify({ query, variables });
  const token = localStorage.getItem('auth-token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  };
  return from(
    fetch(path,
      {
        headers,
        method: 'POST',
        body,
      }).then(response => response.json())).pipe(
        map((response: { data: any; }) => response.data));
};