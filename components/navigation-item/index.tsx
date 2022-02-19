import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'


/* Prop Types */
export interface Props {
  /**
   * The fuctions to dispatch the action
   */
  dispatch: () => void
  /**
   * The icon to display
   */
  icon: React.ReactElement
  /**
   * The label to display
   */
  label: string
 
}

/* Render component */
export const NavigationItem: React.FC<Props> = ({ dispatch, icon, label}: Props) =>
  <ListItem disablePadding>
    <ListItemButton onClick={dispatch}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItemButton>
  </ListItem>

export default NavigationItem
