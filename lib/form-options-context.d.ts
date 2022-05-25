import React, { CSSProperties } from 'react';
import { ColProps } from 'react-flexbox-grid';
export interface FormRoot {
    onFieldsChange?: (obj: {
        path: string;
        value: any;
    }) => void;
    onValuesChange?: (obj: {
        path?: string;
        value: any;
    }) => void;
}
export declare type Layout = 'horizontal' | 'vertical' | 'inline' | string;
export interface FromColProps extends ColProps {
    span?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
}
export interface FormOptions extends FormRoot {
    col?: FromColProps;
    colon?: boolean;
    layout?: Layout;
    labelStyle?: CSSProperties;
    compact?: boolean;
    required?: boolean;
    gutter?: number;
}
export declare const FormOptionsContext: React.Context<FormOptions>;
