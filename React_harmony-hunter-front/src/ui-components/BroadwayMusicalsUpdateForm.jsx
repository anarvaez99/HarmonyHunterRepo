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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getBroadwayMusicals } from "../graphql/queries";
import { updateBroadwayMusicals } from "../graphql/mutations";
const client = generateClient();
export default function BroadwayMusicalsUpdateForm(props) {
  const {
    id: idProp,
    broadwayMusicals: broadwayMusicalsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    MusicalName: "",
    ReleaseYear: "",
    ProductionType: "",
    MusicAuthor: "",
    WikiLink: "",
    PosterLink: "",
    SpotifyLink: "",
    TrackList: "",
    MusicDuration: "",
    MusicalSummary: "",
    MusicalTopics: "",
    SearchType: "",
  };
  const [MusicalName, setMusicalName] = React.useState(
    initialValues.MusicalName
  );
  const [ReleaseYear, setReleaseYear] = React.useState(
    initialValues.ReleaseYear
  );
  const [ProductionType, setProductionType] = React.useState(
    initialValues.ProductionType
  );
  const [MusicAuthor, setMusicAuthor] = React.useState(
    initialValues.MusicAuthor
  );
  const [WikiLink, setWikiLink] = React.useState(initialValues.WikiLink);
  const [PosterLink, setPosterLink] = React.useState(initialValues.PosterLink);
  const [SpotifyLink, setSpotifyLink] = React.useState(
    initialValues.SpotifyLink
  );
  const [TrackList, setTrackList] = React.useState(initialValues.TrackList);
  const [MusicDuration, setMusicDuration] = React.useState(
    initialValues.MusicDuration
  );
  const [MusicalSummary, setMusicalSummary] = React.useState(
    initialValues.MusicalSummary
  );
  const [MusicalTopics, setMusicalTopics] = React.useState(
    initialValues.MusicalTopics
  );
  const [SearchType, setSearchType] = React.useState(initialValues.SearchType);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = broadwayMusicalsRecord
      ? { ...initialValues, ...broadwayMusicalsRecord }
      : initialValues;
    setMusicalName(cleanValues.MusicalName);
    setReleaseYear(cleanValues.ReleaseYear);
    setProductionType(cleanValues.ProductionType);
    setMusicAuthor(cleanValues.MusicAuthor);
    setWikiLink(cleanValues.WikiLink);
    setPosterLink(cleanValues.PosterLink);
    setSpotifyLink(cleanValues.SpotifyLink);
    setTrackList(
      typeof cleanValues.TrackList === "string" ||
        cleanValues.TrackList === null
        ? cleanValues.TrackList
        : JSON.stringify(cleanValues.TrackList)
    );
    setMusicDuration(cleanValues.MusicDuration);
    setMusicalSummary(cleanValues.MusicalSummary);
    setMusicalTopics(
      typeof cleanValues.MusicalTopics === "string" ||
        cleanValues.MusicalTopics === null
        ? cleanValues.MusicalTopics
        : JSON.stringify(cleanValues.MusicalTopics)
    );
    setSearchType(cleanValues.SearchType);
    setErrors({});
  };
  const [broadwayMusicalsRecord, setBroadwayMusicalsRecord] = React.useState(
    broadwayMusicalsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBroadwayMusicals.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBroadwayMusicals
        : broadwayMusicalsModelProp;
      setBroadwayMusicalsRecord(record);
    };
    queryData();
  }, [idProp, broadwayMusicalsModelProp]);
  React.useEffect(resetStateValues, [broadwayMusicalsRecord]);
  const validations = {
    MusicalName: [],
    ReleaseYear: [],
    ProductionType: [],
    MusicAuthor: [],
    WikiLink: [{ type: "URL" }],
    PosterLink: [{ type: "URL" }],
    SpotifyLink: [{ type: "URL" }],
    TrackList: [{ type: "JSON" }],
    MusicDuration: [],
    MusicalSummary: [],
    MusicalTopics: [{ type: "JSON" }],
    SearchType: [],
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
          MusicalName: MusicalName ?? null,
          ReleaseYear: ReleaseYear ?? null,
          ProductionType: ProductionType ?? null,
          MusicAuthor: MusicAuthor ?? null,
          WikiLink: WikiLink ?? null,
          PosterLink: PosterLink ?? null,
          SpotifyLink: SpotifyLink ?? null,
          TrackList: TrackList ?? null,
          MusicDuration: MusicDuration ?? null,
          MusicalSummary: MusicalSummary ?? null,
          MusicalTopics: MusicalTopics ?? null,
          SearchType: SearchType ?? null,
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
            query: updateBroadwayMusicals.replaceAll("__typename", ""),
            variables: {
              input: {
                id: broadwayMusicalsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BroadwayMusicalsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Musical name"
        isRequired={false}
        isReadOnly={false}
        value={MusicalName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName: value,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.MusicalName ?? value;
          }
          if (errors.MusicalName?.hasError) {
            runValidationTasks("MusicalName", value);
          }
          setMusicalName(value);
        }}
        onBlur={() => runValidationTasks("MusicalName", MusicalName)}
        errorMessage={errors.MusicalName?.errorMessage}
        hasError={errors.MusicalName?.hasError}
        {...getOverrideProps(overrides, "MusicalName")}
      ></TextField>
      <TextField
        label="Release year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ReleaseYear}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear: value,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.ReleaseYear ?? value;
          }
          if (errors.ReleaseYear?.hasError) {
            runValidationTasks("ReleaseYear", value);
          }
          setReleaseYear(value);
        }}
        onBlur={() => runValidationTasks("ReleaseYear", ReleaseYear)}
        errorMessage={errors.ReleaseYear?.errorMessage}
        hasError={errors.ReleaseYear?.hasError}
        {...getOverrideProps(overrides, "ReleaseYear")}
      ></TextField>
      <TextField
        label="Production type"
        isRequired={false}
        isReadOnly={false}
        value={ProductionType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType: value,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.ProductionType ?? value;
          }
          if (errors.ProductionType?.hasError) {
            runValidationTasks("ProductionType", value);
          }
          setProductionType(value);
        }}
        onBlur={() => runValidationTasks("ProductionType", ProductionType)}
        errorMessage={errors.ProductionType?.errorMessage}
        hasError={errors.ProductionType?.hasError}
        {...getOverrideProps(overrides, "ProductionType")}
      ></TextField>
      <TextField
        label="Music author"
        isRequired={false}
        isReadOnly={false}
        value={MusicAuthor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor: value,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.MusicAuthor ?? value;
          }
          if (errors.MusicAuthor?.hasError) {
            runValidationTasks("MusicAuthor", value);
          }
          setMusicAuthor(value);
        }}
        onBlur={() => runValidationTasks("MusicAuthor", MusicAuthor)}
        errorMessage={errors.MusicAuthor?.errorMessage}
        hasError={errors.MusicAuthor?.hasError}
        {...getOverrideProps(overrides, "MusicAuthor")}
      ></TextField>
      <TextField
        label="Wiki link"
        isRequired={false}
        isReadOnly={false}
        value={WikiLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink: value,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.WikiLink ?? value;
          }
          if (errors.WikiLink?.hasError) {
            runValidationTasks("WikiLink", value);
          }
          setWikiLink(value);
        }}
        onBlur={() => runValidationTasks("WikiLink", WikiLink)}
        errorMessage={errors.WikiLink?.errorMessage}
        hasError={errors.WikiLink?.hasError}
        {...getOverrideProps(overrides, "WikiLink")}
      ></TextField>
      <TextField
        label="Poster link"
        isRequired={false}
        isReadOnly={false}
        value={PosterLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink: value,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.PosterLink ?? value;
          }
          if (errors.PosterLink?.hasError) {
            runValidationTasks("PosterLink", value);
          }
          setPosterLink(value);
        }}
        onBlur={() => runValidationTasks("PosterLink", PosterLink)}
        errorMessage={errors.PosterLink?.errorMessage}
        hasError={errors.PosterLink?.hasError}
        {...getOverrideProps(overrides, "PosterLink")}
      ></TextField>
      <TextField
        label="Spotify link"
        isRequired={false}
        isReadOnly={false}
        value={SpotifyLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink: value,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.SpotifyLink ?? value;
          }
          if (errors.SpotifyLink?.hasError) {
            runValidationTasks("SpotifyLink", value);
          }
          setSpotifyLink(value);
        }}
        onBlur={() => runValidationTasks("SpotifyLink", SpotifyLink)}
        errorMessage={errors.SpotifyLink?.errorMessage}
        hasError={errors.SpotifyLink?.hasError}
        {...getOverrideProps(overrides, "SpotifyLink")}
      ></TextField>
      <TextAreaField
        label="Track list"
        isRequired={false}
        isReadOnly={false}
        value={TrackList}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList: value,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.TrackList ?? value;
          }
          if (errors.TrackList?.hasError) {
            runValidationTasks("TrackList", value);
          }
          setTrackList(value);
        }}
        onBlur={() => runValidationTasks("TrackList", TrackList)}
        errorMessage={errors.TrackList?.errorMessage}
        hasError={errors.TrackList?.hasError}
        {...getOverrideProps(overrides, "TrackList")}
      ></TextAreaField>
      <TextField
        label="Music duration"
        isRequired={false}
        isReadOnly={false}
        value={MusicDuration}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration: value,
              MusicalSummary,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.MusicDuration ?? value;
          }
          if (errors.MusicDuration?.hasError) {
            runValidationTasks("MusicDuration", value);
          }
          setMusicDuration(value);
        }}
        onBlur={() => runValidationTasks("MusicDuration", MusicDuration)}
        errorMessage={errors.MusicDuration?.errorMessage}
        hasError={errors.MusicDuration?.hasError}
        {...getOverrideProps(overrides, "MusicDuration")}
      ></TextField>
      <TextField
        label="Musical summary"
        isRequired={false}
        isReadOnly={false}
        value={MusicalSummary}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary: value,
              MusicalTopics,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.MusicalSummary ?? value;
          }
          if (errors.MusicalSummary?.hasError) {
            runValidationTasks("MusicalSummary", value);
          }
          setMusicalSummary(value);
        }}
        onBlur={() => runValidationTasks("MusicalSummary", MusicalSummary)}
        errorMessage={errors.MusicalSummary?.errorMessage}
        hasError={errors.MusicalSummary?.hasError}
        {...getOverrideProps(overrides, "MusicalSummary")}
      ></TextField>
      <TextAreaField
        label="Musical topics"
        isRequired={false}
        isReadOnly={false}
        value={MusicalTopics}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics: value,
              SearchType,
            };
            const result = onChange(modelFields);
            value = result?.MusicalTopics ?? value;
          }
          if (errors.MusicalTopics?.hasError) {
            runValidationTasks("MusicalTopics", value);
          }
          setMusicalTopics(value);
        }}
        onBlur={() => runValidationTasks("MusicalTopics", MusicalTopics)}
        errorMessage={errors.MusicalTopics?.errorMessage}
        hasError={errors.MusicalTopics?.hasError}
        {...getOverrideProps(overrides, "MusicalTopics")}
      ></TextAreaField>
      <TextField
        label="Search type"
        isRequired={false}
        isReadOnly={false}
        value={SearchType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              MusicalName,
              ReleaseYear,
              ProductionType,
              MusicAuthor,
              WikiLink,
              PosterLink,
              SpotifyLink,
              TrackList,
              MusicDuration,
              MusicalSummary,
              MusicalTopics,
              SearchType: value,
            };
            const result = onChange(modelFields);
            value = result?.SearchType ?? value;
          }
          if (errors.SearchType?.hasError) {
            runValidationTasks("SearchType", value);
          }
          setSearchType(value);
        }}
        onBlur={() => runValidationTasks("SearchType", SearchType)}
        errorMessage={errors.SearchType?.errorMessage}
        hasError={errors.SearchType?.hasError}
        {...getOverrideProps(overrides, "SearchType")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || broadwayMusicalsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || broadwayMusicalsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
