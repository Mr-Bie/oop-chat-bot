'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { AnySchema } from 'yup';
import { Icon } from './icon';

export interface InputPropsBase {
  name: string;
  label: string;
  icon?: string;
  validation?: AnySchema;
  errormessage?: string;
  noErrorMessage?: boolean;
  disabled?: boolean;
  onChange?: (...props: unknown[]) => void;
}

export type InputProps = DefaultInputProps;

interface DefaultInputProps
  extends InputPropsBase,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'> { }


export const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    type,
    name,
    className,
    label,
    icon,
    noErrorMessage,
    errormessage,
    disabled = false,
    ...rest
  } = props;
  const [computedType, setComputedType] = useState(type);
  const [computedIcon, setComputedIcon] = useState(icon);

  const {
    register,
    formState: { errors },
  } = useFormContext(); // Get form context

  const defaultClassNames =
    'w-full px-3 pt-3.5 pb-2 border border-foreground rounded-[.85rem] focus:outline-none focus:ring-2 focus:ring-secondary text-right text-sm';
  const classNames = `${disabled ? "cursor-not-allowed" : ""} ${cn(defaultClassNames, className)}`;

  const computedProps = {
    className: classNames, readOnly: disabled, ...rest
  }

  let inputJSX;
  switch (computedType) {
    default:
      inputJSX = (
        <input
          {...(computedProps as DefaultInputProps)}
          {...register(name)}
          type={computedType}
        />
      );
  }

  const handleOnIconMouseDownHandler = () => {
    if (type === "password" && icon) {
      setComputedIcon("show");
      setComputedType("text");
    }
  }

  const handleOnIconMouseUpHandler = () => {
    setComputedIcon(icon);
    setComputedType(type);
  }

  return (
    <div className="w-full">
      <div className='w-full min-h-fit relative'>
        <label
          className="bg-background px-1.5 absolute right-4 -translate-y-1/3 block mb-1 text-xs text-gray-400"

        >
          {label}
        </label>

        {inputJSX}

        {
          computedIcon && <Icon
            className='bg-background px-0.5 absolute left-2 top-0 translate-y-1/3 text-xl'
            onMouseDown={handleOnIconMouseDownHandler}
            onMouseUp={handleOnIconMouseUpHandler}
          >
            {computedIcon}
          </Icon>
        }
      </div>

      {(!disabled && !noErrorMessage) && (
        <div className="text-destructive pt-1.5 text-sm font-normal">
          {errormessage ||
            (errors[name] instanceof Array && errors[name][0].message) ||
            (errors[name] && <p>{errors[name].message as string}</p>)}
        </div>
      )}
    </div>
  );
};
