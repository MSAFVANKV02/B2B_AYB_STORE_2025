import { Checkbox } from '@mui/material'
import React from 'react'

type Props = {
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    id: string; // unique id for checkbox input
}

export default function MyCheckBox({onChange,checked,id}: Props) {
  return (
    <div>
         <Checkbox
              color="default"
              id={id}
              checked={checked}
              onChange={onChange}
              sx={{
                "&.Mui-checked": {
                  color: "#EC922B", // Custom color when checked
                },
              }}
            />
    </div>
  )
}