import React from "react";

const ErrorHandler = (props) => {
  if (props.formerrors && props.formerrors.passwordmatch) {
    return (
      <div>
        {props.formerrors.passwordmatch
          ? "Password value does not match confirm password value"
          : ""}
      </div>
    );
  } else if (props.apierrors) {
    return <div>{props.apierrors.message}</div>;
  } else if (props.success) {
    return <div>{props.success.message}</div>;
  } else if (props.formerrors && props.formerrors.cognito) {
    return <div>{props.formerrors.cognito.message}</div>;
  } else {
    return <div />;
  }
};

export default ErrorHandler;
