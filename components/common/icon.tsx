import { cn } from '@/lib/utils';

type IconSize = 'xs' | 'sm' | 'md' | 'lg';

type IconFlip = 'default' | 'horizontal' | 'vertical';

export interface IconProps extends React.StyleHTMLAttributes<HTMLStyleElement> {
  children: string;
  size?: IconSize;
  solid?: boolean;
  flip?: IconFlip;
}

const Icon = ({ solid, ...props }: IconProps) => {
  const name = props.children;
  props.children = '';

  return (
    <i
      {...props}
      className={cn(props.className,
        `bx bx${solid ? 's' : ''}-${name} ${props.size && `bx-${props.size}`} ${props.flip && props.flip !== 'default' ? `bx-flip-${props.flip}` : ""}`
      )}
    ></i>
  );
};

export { Icon };
