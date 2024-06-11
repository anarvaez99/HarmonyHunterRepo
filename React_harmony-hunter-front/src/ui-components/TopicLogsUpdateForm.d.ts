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
export declare type TopicLogsUpdateFormInputValues = {
    SearchType?: string;
    SearchTopic?: string;
};
export declare type TopicLogsUpdateFormValidationValues = {
    SearchType?: ValidationFunction<string>;
    SearchTopic?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TopicLogsUpdateFormOverridesProps = {
    TopicLogsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SearchType?: PrimitiveOverrideProps<TextFieldProps>;
    SearchTopic?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TopicLogsUpdateFormProps = React.PropsWithChildren<{
    overrides?: TopicLogsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    topicLogs?: any;
    onSubmit?: (fields: TopicLogsUpdateFormInputValues) => TopicLogsUpdateFormInputValues;
    onSuccess?: (fields: TopicLogsUpdateFormInputValues) => void;
    onError?: (fields: TopicLogsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TopicLogsUpdateFormInputValues) => TopicLogsUpdateFormInputValues;
    onValidate?: TopicLogsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TopicLogsUpdateForm(props: TopicLogsUpdateFormProps): React.ReactElement;
