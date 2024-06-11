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
export declare type MusicalInteractionUpdateFormInputValues = {
    UserName?: string;
    MusicalId?: string;
    LikedStatus?: boolean;
    WatchListStatus?: boolean;
    SongLiked?: string;
};
export declare type MusicalInteractionUpdateFormValidationValues = {
    UserName?: ValidationFunction<string>;
    MusicalId?: ValidationFunction<string>;
    LikedStatus?: ValidationFunction<boolean>;
    WatchListStatus?: ValidationFunction<boolean>;
    SongLiked?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MusicalInteractionUpdateFormOverridesProps = {
    MusicalInteractionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    UserName?: PrimitiveOverrideProps<TextFieldProps>;
    MusicalId?: PrimitiveOverrideProps<TextFieldProps>;
    LikedStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    WatchListStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    SongLiked?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MusicalInteractionUpdateFormProps = React.PropsWithChildren<{
    overrides?: MusicalInteractionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    musicalInteraction?: any;
    onSubmit?: (fields: MusicalInteractionUpdateFormInputValues) => MusicalInteractionUpdateFormInputValues;
    onSuccess?: (fields: MusicalInteractionUpdateFormInputValues) => void;
    onError?: (fields: MusicalInteractionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MusicalInteractionUpdateFormInputValues) => MusicalInteractionUpdateFormInputValues;
    onValidate?: MusicalInteractionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MusicalInteractionUpdateForm(props: MusicalInteractionUpdateFormProps): React.ReactElement;
