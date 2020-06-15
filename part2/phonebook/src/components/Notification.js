import React from 'react'

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  };

  return (
    <div className="successNotification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  };

  return (
    <div className="errorNotification">
      {message}
    </div>
  )
}



export { SuccessNotification, ErrorNotification };