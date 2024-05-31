import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';

export function Gender({ getGenderValue }) {
    const [value, setValue] = useState('male');
    useEffect(() => {
        getGenderValue(value)

    }, [value])

    const handleChange = (event) => {
        setValue(event.target.value);

    };
    const theme = useTheme();
    const { primary, secondary } = theme.palette;
    return (
        <FormControl
            required={true}
            sx={{
                display: 'flex',
                flexDirection: "row",
                alignItems: "center",
                gap: 1
            }}>
            <FormLabel sx={{ color: primary.main }}>Gender</FormLabel>
            <RadioGroup
                defaultValue="male"
                name="radio-buttons-group"
                onChange={handleChange}
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <FormControlLabel value="male" control={<Radio size='small' />} label="Male" />
                <FormControlLabel value="female" control={<Radio size='small' />} label="Female" />
                <FormControlLabel value="other" control={<Radio size='small' />} label="Other" />
            </RadioGroup>
        </FormControl >
    );
}
