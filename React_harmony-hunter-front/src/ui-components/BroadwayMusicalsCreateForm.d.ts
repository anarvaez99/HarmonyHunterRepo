/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BroadwayMusicalsCreateFormInputValues = {
    MusicalName?: string;
    ReleaseYear?: number;
    ProductionType?: string;
    MusicAuthor?: string;
    WikiLink?: string;
    PosterLink?: string;
    SpotifyLink?: string;
    TrackList?: string;
    MusicDuration?: string;
    MusicalSummary?: string;
    MusicalTopics?: string;
    SearchType?: string;
};
export declare type BroadwayMusicalsCreateFormValidationValues = {
    MusicalName?: ValidationFunction<string>;
    ReleaseYear?: ValidationFunction<number>;
    ProductionType?: ValidationFunction<string>;
    MusicAuthor?: ValidationFunction<string>;
    WikiLink?: ValidationFunction<string>;
    PosterLink?: ValidationFunction<string>;
    SpotifyLink?: ValidationFunction<string>;
    TrackList?: ValidationFunction<string>;
    MusicDuration?: ValidationFunction<string>;
    MusicalSummary?: ValidationFunction<string>;
    MusicalTopics?: ValidationFunction<string>;
    SearchType?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BroadwayMusicalsCreateFormOverridesProps = {
    BroadwayMusicalsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    MusicalName?: PrimitiveOverrideProps<TextFieldProps>;
    ReleaseYear?: PrimitiveOverrideProps<TextFieldProps>;
    ProductionType?: PrimitiveOverrideProps<TextFieldProps>;
    MusicAuthor?: PrimitiveOverrideProps<TextFieldProps>;
    WikiLink?: PrimitiveOverrideProps<TextFieldProps>;
    PosterLink?: PrimitiveOverrideProps<TextFieldProps>;
    SpotifyLink?: PrimitiveOverrideProps<TextFieldProps>;
    TrackList?: PrimitiveOverrideProps<TextAreaFieldProps>;
    MusicDuration?: PrimitiveOverrideProps<TextFieldProps>;
    MusicalSummary?: PrimitiveOverrideProps<TextFieldProps>;
    MusicalTopics?: PrimitiveOverrideProps<TextAreaFieldProps>;
    SearchType?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BroadwayMusicalsCreateFormProps = React.PropsWithChildren<{
    overrides?: BroadwayMusicalsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BroadwayMusicalsCreateFormInputValues) => BroadwayMusicalsCreateFormInputValues;
    onSuccess?: (fields: BroadwayMusicalsCreateFormInputValues) => void;
    onError?: (fields: BroadwayMusicalsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BroadwayMusicalsCreateFormInputValues) => BroadwayMusicalsCreateFormInputValues;
    onValidate?: BroadwayMusicalsCreateFormValidationValues;
} & React.CSSProperties>;
export default function BroadwayMusicalsCreateForm(props: BroadwayMusicalsCreateFormProps): React.ReactElement;
