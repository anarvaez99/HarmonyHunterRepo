/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MusicalInteractionCreateFormInputValues = {
    UserName?: string;
    MusicalId?: string;
    LikedStatus?: boolean;
    WatchListStatus?: boolean;
    SongLiked?: string;
};
export declare type MusicalInteractionCreateFormValidationValues = {
    UserName?: ValidationFunction<string>;
    MusicalId?: ValidationFunction<string>;
    LikedStatus?: ValidationFunction<boolean>;
    WatchListStatus?: ValidationFunction<boolean>;
    SongLiked?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MusicalInteractionCreateFormOverridesProps = {
    MusicalInteractionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    UserName?: PrimitiveOverrideProps<TextFieldProps>;
    MusicalId?: PrimitiveOverrideProps<TextFieldProps>;
    LikedStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    WatchListStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    SongLiked?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MusicalInteractionCreateFormProps = React.PropsWithChildren<{
    overrides?: MusicalInteractionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MusicalInteractionCreateFormInputValues) => MusicalInteractionCreateFormInputValues;
    onSuccess?: (fields: MusicalInteractionCreateFormInputValues) => void;
    onError?: (fields: MusicalInteractionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MusicalInteractionCreateFormInputValues) => MusicalInteractionCreateFormInputValues;
    onValidate?: MusicalInteractionCreateFormValidationValues;
} & React.CSSProperties>;
export default function MusicalInteractionCreateForm(props: MusicalInteractionCreateFormProps): React.ReactElement;
