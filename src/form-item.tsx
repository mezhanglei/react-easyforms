import React, { useContext, CSSProperties } from 'react';
import { FormStoreContext, FormOptionsContext } from './form-context';
import { joinPath } from './utils/utils';
import { FormStore } from './form-store';
import { useFormError } from './use-form';
import { Item, ItemProps } from './components/item';
import { ItemCore, ItemCoreProps } from './item-core';
import { isEmpty } from './utils/type';

export type FormItemProps<T = ItemProps> = T & ItemCoreProps & {
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  component?: any;
}

export const FormItem = React.forwardRef((props: FormItemProps, ref: any) => {
  const store = useContext<FormStore>(FormStoreContext)
  const options = useContext<FormItemProps>(FormOptionsContext)
  const mergeProps = { ...options, ...props };
  const { children, ...fieldProps } = mergeProps;
  const {
    name,
    parent,
    index,
    trigger,
    validateTrigger,
    valueProp,
    valueGetter,
    valueSetter,
    errorClassName,
    onFieldsChange,
    onValuesChange,
    initialValue,
    rules,
    component = Item,
    ignore,
    ...rest
  } = fieldProps;

  const currentPath = (isEmpty(name) || ignore) ? undefined : joinPath(parent, name);
  const [error] = useFormError(store, currentPath);
  const required = error ? true : rest?.required;
  const FieldComponent = component;

  const childs = (
    <ItemCore
      ignore={ignore}
      name={name}
      parent={parent}
      index={index}
      trigger={trigger}
      validateTrigger={validateTrigger}
      valueProp={valueProp}
      valueGetter={valueGetter}
      valueSetter={valueSetter}
      rules={rules}
      initialValue={initialValue}
      errorClassName={errorClassName}
      onFieldsChange={onFieldsChange}
      onValuesChange={onValuesChange}
    >
      {children}
    </ItemCore>
  )

  return (
    FieldComponent ?
      <FieldComponent {...rest} required={required} ref={ref} error={error}>
        {childs}
      </FieldComponent>
      : childs
  );
});

FormItem.displayName = 'Form.Item';
