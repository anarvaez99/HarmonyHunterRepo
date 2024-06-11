/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TopicLogsCreateFormInputValues = {
    SearchType?: string;
    SearchTopic?: string;
};
export declare type TopicLogsCreateFormValidationValues = {
    SearchType?: ValidationFunction<string>;
    SearchTopic?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TopicLogsCreateFormOverridesProps = {
    TopicLogsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SearchType?: PrimitiveOverrideProps<TextFieldProps>;
    SearchTopic?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TopicLogsCreateFormProps = React.PropsWithChildren<{
    overrides?: TopicLogsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TopicLogsCreateFormInputValues) => TopicLogsCreateFormInputValues;
    onSuccess?: (fields: TopicLogsCreateFormInputValues) => void;
    onError?: (fields: TopicLogsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TopicLogsCreateFormInputValues) => TopicLogsCreateFormInputValues;
    onValidate?: TopicLogsCreateFormValidationValues;
} & React.CSSProperties>;
export default function TopicLogsCreateForm(props: TopicLogsCreateFormProps): React.ReactElement;
