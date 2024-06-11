/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createMusicalInteraction } from "../graphql/mutations";
const client = generateClient();
export default function MusicalInteractionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    UserName: "",
    MusicalId: "",
    LikedStatus: false,
    WatchListStatus: false,
    SongLiked: "",
  };
  const [UserName, setUserName] = React.useState(initialValues.UserName);
  const [MusicalId, setMusicalId] = React.useState(initialValues.MusicalId);
  const [LikedStatus, setLikedStatus] = React.useState(
    initialValues.LikedStatus
  );
  const [WatchListStatus, setWatchListStatus] = React.useState(
    initialValues.WatchListStatus
  );
  const [SongLiked, setSongLiked] = React.useState(initialValues.SongLiked);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserName(initialValues.UserName);
    setMusicalId(initialValues.MusicalId);
    setLikedStatus(initialValues.LikedStatus);
    setWatchListStatus(initialValues.WatchListStatus);
    setSongLiked(initialValues.SongLiked);
    setErrors({});
  };
  const validations = {
    UserName: [],
    MusicalId: [],
    LikedStatus: [],
    WatchListStatus: [],
    SongLiked: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          UserName,
          MusicalId,
          LikedStatus,
          WatchListStatus,
          SongLiked,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createMusicalInteraction.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "MusicalInteractionCreateForm")}
      {...rest}
    >
      <TextField
        label="User name"
        isRequired={false}
        isReadOnly={false}
        value={UserName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserName: value,
              MusicalId,
              LikedStatus,
              WatchListStatus,
              SongLiked,
            };
            const result = onChange(modelFields);
            value = result?.UserName ?? value;
          }
          if (errors.UserName?.hasError) {
            runValidationTasks("UserName", value);
          }
          setUserName(value);
        }}
        onBlur={() => runValidationTasks("UserName", UserName)}
        errorMessage={errors.UserName?.errorMessage}
        hasError={errors.UserName?.hasError}
        {...getOverrideProps(overrides, "UserName")}
      ></TextField>
      <TextField
        label="Musical id"
        isRequired={false}
        isReadOnly={false}
        value={MusicalId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserName,
              MusicalId: value,
              LikedStatus,
              WatchListStatus,
              SongLiked,
            };
            const result = onChange(modelFields);
            value = result?.MusicalId ?? value;
          }
          if (errors.MusicalId?.hasError) {
            runValidationTasks("MusicalId", value);
          }
          setMusicalId(value);
        }}
        onBlur={() => runValidationTasks("MusicalId", MusicalId)}
        errorMessage={errors.MusicalId?.errorMessage}
        hasError={errors.MusicalId?.hasError}
        {...getOverrideProps(overrides, "MusicalId")}
      ></TextField>
      <SwitchField
        label="Liked status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={LikedStatus}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              UserName,
              MusicalId,
              LikedStatus: value,
              WatchListStatus,
              SongLiked,
            };
            const result = onChange(modelFields);
            value = result?.LikedStatus ?? value;
          }
          if (errors.LikedStatus?.hasError) {
            runValidationTasks("LikedStatus", value);
          }
          setLikedStatus(value);
        }}
        onBlur={() => runValidationTasks("LikedStatus", LikedStatus)}
        errorMessage={errors.LikedStatus?.errorMessage}
        hasError={errors.LikedStatus?.hasError}
        {...getOverrideProps(overrides, "LikedStatus")}
      ></SwitchField>
      <SwitchField
        label="Watch list status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={WatchListStatus}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              UserName,
              MusicalId,
              LikedStatus,
              WatchListStatus: value,
              SongLiked,
            };
            const result = onChange(modelFields);
            value = result?.WatchListStatus ?? value;
          }
          if (errors.WatchListStatus?.hasError) {
            runValidationTasks("WatchListStatus", value);
          }
          setWatchListStatus(value);
        }}
        onBlur={() => runValidationTasks("WatchListStatus", WatchListStatus)}
        errorMessage={errors.WatchListStatus?.errorMessage}
        hasError={errors.WatchListStatus?.hasError}
        {...getOverrideProps(overrides, "WatchListStatus")}
      ></SwitchField>
      <TextField
        label="Song liked"
        isRequired={false}
        isReadOnly={false}
        value={SongLiked}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserName,
              MusicalId,
              LikedStatus,
              WatchListStatus,
              SongLiked: value,
            };
            const result = onChange(modelFields);
            value = result?.SongLiked ?? value;
          }
          if (errors.SongLiked?.hasError) {
            runValidationTasks("SongLiked", value);
          }
          setSongLiked(value);
        }}
        onBlur={() => runValidationTasks("SongLiked", SongLiked)}
        errorMessage={errors.SongLiked?.errorMessage}
        hasError={errors.SongLiked?.hasError}
        {...getOverrideProps(overrides, "SongLiked")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
