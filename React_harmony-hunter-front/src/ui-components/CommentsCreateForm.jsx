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
import { createComments } from "../graphql/mutations";
const client = generateClient();
export default function CommentsCreateForm(props) {
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
    MusicalId: "",
    IsSpoiler: false,
    Comment: "",
  };
  const [MusicalId, setMusicalId] = React.useState(initialValues.MusicalId);
  const [IsSpoiler, setIsSpoiler] = React.useState(initialValues.IsSpoiler);
  const [Comment, setComment] = React.useState(initialValues.Comment);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMusicalId(initialValues.MusicalId);
    setIsSpoiler(initialValues.IsSpoiler);
    setComment(initialValues.Comment);
    setErrors({});
  };
  const validations = {
    MusicalId: [],
    IsSpoiler: [],
    Comment: [],
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
          MusicalId,
          IsSpoiler,
          Comment,
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
            query: createComments.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "CommentsCreateForm")}
      {...rest}
    >
      <TextField
        label="Musical id"
        isRequired={false}
        isReadOnly={false}
        value={MusicalId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalId: value,
              IsSpoiler,
              Comment,
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
        label="Is spoiler"
        defaultChecked={false}
        isDisabled={false}
        isChecked={IsSpoiler}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              MusicalId,
              IsSpoiler: value,
              Comment,
            };
            const result = onChange(modelFields);
            value = result?.IsSpoiler ?? value;
          }
          if (errors.IsSpoiler?.hasError) {
            runValidationTasks("IsSpoiler", value);
          }
          setIsSpoiler(value);
        }}
        onBlur={() => runValidationTasks("IsSpoiler", IsSpoiler)}
        errorMessage={errors.IsSpoiler?.errorMessage}
        hasError={errors.IsSpoiler?.hasError}
        {...getOverrideProps(overrides, "IsSpoiler")}
      ></SwitchField>
      <TextField
        label="Comment"
        isRequired={false}
        isReadOnly={false}
        value={Comment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalId,
              IsSpoiler,
              Comment: value,
            };
            const result = onChange(modelFields);
            value = result?.Comment ?? value;
          }
          if (errors.Comment?.hasError) {
            runValidationTasks("Comment", value);
          }
          setComment(value);
        }}
        onBlur={() => runValidationTasks("Comment", Comment)}
        errorMessage={errors.Comment?.errorMessage}
        hasError={errors.Comment?.hasError}
        {...getOverrideProps(overrides, "Comment")}
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
