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
export declare type CommentsUpdateFormInputValues = {
    MusicalId?: string;
    IsSpoiler?: boolean;
    Comment?: string;
};
export declare type CommentsUpdateFormValidationValues = {
    MusicalId?: ValidationFunction<string>;
    IsSpoiler?: ValidationFunction<boolean>;
    Comment?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentsUpdateFormOverridesProps = {
    CommentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    MusicalId?: PrimitiveOverrideProps<TextFieldProps>;
    IsSpoiler?: PrimitiveOverrideProps<SwitchFieldProps>;
    Comment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentsUpdateFormProps = React.PropsWithChildren<{
    overrides?: CommentsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    comments?: any;
    onSubmit?: (fields: CommentsUpdateFormInputValues) => CommentsUpdateFormInputValues;
    onSuccess?: (fields: CommentsUpdateFormInputValues) => void;
    onError?: (fields: CommentsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentsUpdateFormInputValues) => CommentsUpdateFormInputValues;
    onValidate?: CommentsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CommentsUpdateForm(props: CommentsUpdateFormProps): React.ReactElement;
