import { useRef } from 'react';
import { Button, ButtonProps } from '../button';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { InputPropsBase } from '../input';

export type FileCategory = 'Image' | 'Video' | 'PDF';

export const allowedMimeTypes: Record<FileCategory, string[]> = {
  Image: ['image/jpeg', 'image/png', 'image/jpg'],
  Video: ['video/mp4', 'video/webm', 'video/ogg'],
  PDF: ['application/pdf'],
};


export interface FileInputProps
  extends InputPropsBase,
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'name' | 'accept'
  > {
  variant: ButtonProps['variant'];
  acceptTypes: FileCategory[];
}

export function FileInput({
  type,
  name,
  label,
  placeholder,
  variant,
  className,
  onChange,
  acceptTypes,
  ...rest
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileNameRef = useRef<HTMLParagraphElement | null>(null);

  const { getValues, register, setValue } = useFormContext();

  let defaultClassNames = 'relative';

  let classNames = cn(defaultClassNames, className);

  const showingName =
    label && label !== undefined
      ? label
      : placeholder && placeholder !== undefined
        ? placeholder
        : '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, multiple } = e.target;
    const fileNameSpan = fileNameRef.current;

    let inputInnerHTML = '';

    if (!files) {
      setValue(name, multiple ? [] : null); // Set empty array or null if no files
      inputInnerHTML = `<span>انتخاب فایل</span> <span>${showingName}</span>`;
    } else {
      const value = multiple ? Array.from(files) : files[0]; // Convert to array for multiple, or use the first file
      setValue(name, value, { shouldValidate: true });
      inputInnerHTML = `<span>${files.length}</span> <span>فایل</span> <span>${showingName}</span> <span>انتخاب شده</span>`;
    }

    if (fileNameSpan) fileNameSpan.innerHTML = inputInnerHTML;

    if (onChange && onChange instanceof Function) onChange(e);
    console.log('file change', getValues(name));
  };

  const acceptMimeTypes = acceptTypes
    .map((v) => allowedMimeTypes[v])
    .reduce((pre, cur) => (pre = [...pre, ...cur]))
    .join(',');

  return (
    <Button variant={variant} className={classNames}>
      <input
        className="absolute inset-0 opacity-0 cursor-pointer"
        ref={(e) => {
          register(name); // Register field
          fileInputRef.current = e; // Keep ref for file handling
        }}
        type={type}
        id={`file-input-${name}`}
        onChange={handleFileChange}
        accept={acceptMimeTypes}
        {...rest}
      />
      <label className="text-inherit" htmlFor={`file-input-${name}`}>
        <p ref={fileNameRef}>
          <span>انتخاب فایل</span> <span>{showingName}</span>
        </p>
      </label>
    </Button>
  );
}
