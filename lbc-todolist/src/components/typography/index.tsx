import React, { JSX } from 'react';
import styles from './styles.module.scss';

type TypographyProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'strong' | 'italic' | 'blockquote' | 'lead';
  weight?: 'regular' | 'bold' | 'extrabold' | 'semibold';
  className?: string;
  noMargin?: boolean;
  children: React.ReactNode;
};

const tagMap: Record<TypographyProps['variant'], keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  small: 'small',
  strong: 'strong',
  italic: 'em',
  blockquote: 'blockquote',
  lead: 'p',
};

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  noMargin = false,
  className,
  children,
}) => {
  const Tag = tagMap[variant] || 'p';

  return (
    <Tag
      className={`${styles[variant]} ${styles[weight]} ${className || ''} ${noMargin ? styles.noMargin : ''}`.trim()}
    >
      {children}
    </Tag>
  );
};

export default Typography;
