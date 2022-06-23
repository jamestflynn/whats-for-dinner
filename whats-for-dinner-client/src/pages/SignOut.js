import React from 'react';
import { ApolloConsumer } from '@apollo/client';
import { Navigate } from "react-router-dom"

function SignOut() {
  return (
    <ApolloConsumer>
      {client => {
        client.resetStore()
        return <Navigate to="/sign-in"/>
      }}
    </ApolloConsumer>
  )
}

export default SignOut
