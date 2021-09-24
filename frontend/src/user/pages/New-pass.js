import { useParams } from "react-router";
import React from 'react'
import Card from '../../shared/components/UIElements/Card';
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHistory } from "react-router";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
const Newpass = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const params = useParams();
  const history=useHistory()
  const [formState, inputHandler, setFormData] = useForm(
    {
      password: {
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
        "http://localhost:5000/api/users/new-password",
        "POST",
        JSON.stringify({
          password: formState.inputs.password.value,
          token:params.token,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      history.push("/auth");
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
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Reset Password
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Newpass;
