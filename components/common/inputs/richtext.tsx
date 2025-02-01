import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import { InputPropsBase } from '../input';
import { ReactQuillProps } from 'react-quill';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules: ReactQuillProps['modules'] = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'check', // Include the checkbox list format
  'align',
];

export interface RichTextEditorProps
  extends InputPropsBase,
    Omit<ReactQuillProps, 'onChange' | 'name' | 'value'> {}

export default function RichTextEditor({
  name,
  onChange,
  className,
  defaultValue,
  ...rest
}: RichTextEditorProps) {
  const { trigger, setValue, watch } = useFormContext();

  const value = watch(name);

  const defaultClassNames = 'min-h-64 border-solid border-black border-2';
  let classNames = cn(defaultClassNames, className);

  const richTextEditorChangeHandler = (value: string) => {
    setValue(name, value);
    trigger(name);

    if (onChange && onChange instanceof Function) onChange(value);
  };

  useEffect(() => {
    // Set the initial value in the form state
    if (defaultValue !== undefined) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div>
      <ReactQuill
        {...rest}
        theme="snow"
        onChange={richTextEditorChangeHandler}
        modules={modules}
        formats={formats}
        className={classNames}
        value={value || ''}
      />
    </div>
  );
}
