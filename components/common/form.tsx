'use client';

import React, { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Loading from './loading';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';
import { InputProps } from './input';

interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  submitText?: string;
  triggerOnMount?: unknown;
  customSubmitButton?: ReactElement<ButtonProps> & { children?: Element[] };
  children: ReactNode;
  defaultValues?: FieldValues;
  className?: string;
}

function Form({
  onSubmit,
  submitText = 'تایید',
  triggerOnMount,
  children,
  customSubmitButton,
  defaultValues,
  className,
}: FormProps<FieldValues>) {
  // Collect validation schemas from each Input child
  const validationSchema = useMemo(() => {
    return extractValidationSchemaFromFields(children);
  }, []);

  // Create Yup schema dynamically
  const schema = yup.object().shape(validationSchema);

  const methods = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    trigger,
  } = methods;

  useEffect(() => {
    if (triggerOnMount) trigger();
  }, [trigger]);

  const defaultClassNames = 'space-y-4';
  const classNames = cn(defaultClassNames, className);

  const defaultSubmitButtonClassNames = "w-full font-light";
  const submitButtonClassNames = cn(defaultSubmitButtonClassNames, customSubmitButton ? customSubmitButton.props.className : "")
  const defaultSubmitButtonProps = {
    className: submitButtonClassNames,
    variant: "default",
    type: "submit",
    size: "icon",
    disabled: !isValid || isSubmitting || customSubmitButton?.props.disabled,
    children: isSubmitting ? <Loading /> : customSubmitButton ?
      (customSubmitButton.props.children instanceof Array ? customSubmitButton.props.children.map((v) => React.cloneElement(v, { key: `fcb-${v.i}-${Math.random().toString()}` })) : customSubmitButton.props.children)
      : submitText
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={classNames}>
        {children}
        {customSubmitButton ?
          React.cloneElement(customSubmitButton, { ...customSubmitButton.props, ...defaultSubmitButtonProps as ButtonProps })
          :
          (
            <Button
              {...defaultSubmitButtonProps as ButtonProps}
            />
          )}
      </form>
    </FormProvider>
  );
}

const extractValidationSchemaFromFields = (
  children: ReactNode
): Record<string, yup.AnySchema> => {
  const schema: Record<string, yup.AnySchema> = {};

  const traverse = (nodes: ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (React.isValidElement(child)) {
        // If the child is an `Input` with validation
        if (child.props.name && child.props.validation) {
          schema[child.props.name] = child.props.validation; // Add validation to schema
        } else if (child.props.inputs) {
          const validationForDynamicFields = getDynamicInputsValidation(
            child.props.inputs,
            child.props.required
          );
          schema[child.props.name] = validationForDynamicFields;
        }

        // If the child has nested children, traverse them
        if (child.props.children) {
          traverse(child.props.children);
        }
      }
    });
  };

  traverse(children);
  console.log('schema ', schema);
  return schema;
};

const getDynamicInputsValidation = (
  inputs: InputProps[],
  required: boolean
) => {
  const validationObjects: {
    [key: string]: yup.AnySchema;
  } = {};

  for (const input of inputs) {
    if (input?.validation) validationObjects[input.name] = input?.validation;
  }

  const validation = yup.array().of(yup.object(validationObjects));
  return required ? validation.min(1) : validation;
};

export default Form;
