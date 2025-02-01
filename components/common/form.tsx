'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/common/button';
import { InputProps } from '@/components/common/input';
import Loading from './loading';
import { cn } from '@/lib/utils';

interface FormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  submitText?: string;
  triggerOnMount?: boolean;
  customSubmitButton?: ReactNode;
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={classNames}>
        {children}
        {!customSubmitButton && (
          <Button
            variant="default"
            type="submit"
            className="w-full"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? <Loading /> : submitText}
          </Button>
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
        if (typeof child.props === 'object' && child.props !== null && 'name' in child.props && 'validation' in child.props) {
          schema[child.props.name as string] = child.props.validation as yup.AnySchema; // Add validation to schema
        } else if (typeof child.props === 'object' && child.props !== null && 'inputs' in child.props) {
          const validationForDynamicFields = getDynamicInputsValidation(
            child.props.inputs as InputProps[],
            'required' in child.props ? (child.props.required as boolean) : false
          );
          if ('name' in child.props) {
            schema[child.props.name as string] = validationForDynamicFields;
          }
        }

        // If the child has nested children, traverse them
        if (typeof child.props === 'object' && child.props !== null && 'children' in child.props) {
          traverse(child.props.children as ReactNode);
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
