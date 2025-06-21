import { FormControlLabel, Radio } from '@mui/material';


// Inspired by blueprintjs
function StyledRadio(props:any) {
  return (
    <Radio
      disableRipple
      color="default"
      size="small"
      sx={{
        '&.Mui-checked': {
          color: 'rgb(19, 115, 230)',
        },
      }}
      {...props}
    />
  );
}

export const ToolbarRadio = ({ value, label }: any) => {
  return (
    <FormControlLabel value={value} control={<StyledRadio />} label={label}
    sx={{
      '& .MuiFormControlLabel-label': {
        fontSize: "14px", // 👈 font size applied here
      },
    }}
    />
  );
};
