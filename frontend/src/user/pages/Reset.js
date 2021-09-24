import React from 'react'
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_EMAIL } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHistory } from "react-router";
const Reset = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
const history=useHistory()
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/reset",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      history.push('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Reset password</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Reset
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Reset;
