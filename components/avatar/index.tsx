import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props {
  /**
   * The name of the person if no name is provided then it will display a default
   * avatar to indicate that this has not been assigned to a person.
   */
  name?: string;
  /**
   * The background colour of the avatar if no image is provided defaults to
   * the primary colour.
   */
  colour?: string;
  /**
   * The image to display, if no image is provided then it will use the initials
   * of the name provided. If no name is provided then it will display a default
   * avatar to indicate that this has not been assigned to a person.
   */
  imagePath?: string;
}

const nameToInitials = (name: string) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => part[0]).join('');
  return initials;
};

/* Render component */
export const Avatar: React.FC<Props> = ({ name, colour, imagePath }: Props) => {
  const initials = name ? nameToInitials(name) : '?';
  const viewBox = name ? '0 0 50 50' : '0 0 30 30';
  return (
    <div className={styles.avatar}>
      {imagePath ? (
        <img className={styles.image} src={imagePath} alt={name} />
      ) : (
        <div className={styles.initials} style={{ backgroundColor: colour }}>
          <svg viewBox={viewBox}>
            <text y="53%" x="51%">
              {initials}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Avatar;
