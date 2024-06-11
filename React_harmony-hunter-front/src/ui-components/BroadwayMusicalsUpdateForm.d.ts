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
export declare type BroadwayMusicalsUpdateFormInputValues = {
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
export declare type BroadwayMusicalsUpdateFormValidationValues = {
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
export declare type BroadwayMusicalsUpdateFormOverridesProps = {
    BroadwayMusicalsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type BroadwayMusicalsUpdateFormProps = React.PropsWithChildren<{
    overrides?: BroadwayMusicalsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    broadwayMusicals?: any;
    onSubmit?: (fields: BroadwayMusicalsUpdateFormInputValues) => BroadwayMusicalsUpdateFormInputValues;
    onSuccess?: (fields: BroadwayMusicalsUpdateFormInputValues) => void;
    onError?: (fields: BroadwayMusicalsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BroadwayMusicalsUpdateFormInputValues) => BroadwayMusicalsUpdateFormInputValues;
    onValidate?: BroadwayMusicalsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BroadwayMusicalsUpdateForm(props: BroadwayMusicalsUpdateFormProps): React.ReactElement;
