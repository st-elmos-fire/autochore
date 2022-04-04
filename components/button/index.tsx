import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';

/* Import Types */
interface Props extends React.ComponentProps<'button'> {
  /**
   * The if you want to include an icon, this specifies the side of the button the icon should appear on.
   */
  alignIcon?: 'left' | 'right' | 'center';
  /**
   * If the icon should be on it's own with no next, set this property to `true`.
   **/
  iconOnly?: boolean;
  /**
   * The id to appy to the button for unique identification in tests.
   */
  testID?: string;
  /**
   * The event action to fire when the button is clicked.
   */
  onClick?: () => void;
  /**
   * Optional button type.
   */
  variant?: 'primary' | 'secondary' | 'text';
  /**
   * Shows a loading indicator instead of text.
   */
  loading?: boolean;
  /**
   * The loading indicator to be read out for accessability.
   * @default "Loading"
   */
  loadingIndicator?: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Render component */
export const Button: React.FC<Props> = ({
  alignIcon,
  iconOnly,
  testID,
  onClick,
  loading,
  loadingIndicator,
  children,
  className,
  disabled,
  variant = 'primary',
  ...props
}: Props) => {
  const optionalProps = {
    ...(testID && { 'data-testid': testID })
  };
  return (
    <button
      onClick={onClick}
      className={cx(
        styles['button'],
        alignIcon && styles[`icon-${alignIcon}`],
        iconOnly && styles[`icon-only`],
        className,
        {
          [styles[`button-${variant}` || '']]: variant,
          [styles['loading']]: loading
        }
      )}
      tabIndex={disabled ? -1 : 0}
      {...optionalProps}
      disabled={disabled || loading}
      {...props}
    >
      {!loading && <>{children}</>}
      {loading && (
        <>
          <FaSpinner />
          <span>{loadingIndicator}...</span>
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
  loadingIndicator: 'Loading'
};

Button.displayName = 'Button';

export default Button;
