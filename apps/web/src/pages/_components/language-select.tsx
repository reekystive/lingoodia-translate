import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FC, SyntheticEvent } from 'react';
import { Language, languages } from './language.ts';

export const LanguageSelect: FC<{
  value: Language | null;
  onChange?: (event: SyntheticEvent, value: Language | null) => void;
  label?: string;
}> = ({ value, onChange, label }) => {
  return (
    <Autocomplete
      className="w-[300px] max-w-full"
      options={languages}
      autoHighlight
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <span className="mr-2">{option.emoji}</span>
          <span>{option.label}</span>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          size="small"
        />
      )}
    />
  );
};
