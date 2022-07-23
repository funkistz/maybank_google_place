import React, { useState, useMemo, useId, useRef, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography, InputBase, InputAdornment, Grid, Autocomplete, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { setPlaces } from '../redux/actions/placesActions';
import { useSelector, useDispatch } from 'react-redux';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import useLocalStorage from '../hooks/useLocalStorage';

const autocompleteService = { current: null };

export default function GooglePlaceAutoComplete({ setCenter }) {

    const id = useId();
    const places = useSelector((state) => state.allPlaces.places)
    const dispatch = useDispatch();
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
        },
        debounce: 300,
    });

    useEffect(() => {
        // assign data to redux 
        dispatch(setPlaces(data))
    }, [data])

    const handleInput = (event, newInputValue) => {
        // Update the keyword of the input element
        setValue(newInputValue);
    };

    const handleChange = (event, newValue) => {

        if (!newValue) return
        getGeocode({ address: newValue.description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            setCenter({ lat, lng })
        });
    }

    return (
        <Autocomplete
            id={'place_autocomplete_' + id}
            sx={{ width: '100', px: 2, py: 1 }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={places}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            isOptionEqualToValue={(option, value) => option.description.includes(value)}
            onChange={handleChange}
            onInputChange={handleInput}
            renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params;
                return <InputBase
                    {...params.InputProps} {...rest}
                    sx={{ paddingRight: '0px !important' }}
                    placeholder="Search Google Maps"
                    endAdornment={<InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>}
                />
            }}
            renderOption={(props, option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Box
                                    component={LocationOnIcon}
                                    sx={{ color: 'text.secondary', mr: 2 }}
                                />
                            </Grid>
                            <Grid item xs>
                                {parts.map((part, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            fontWeight: part.highlight ? 700 : 400,
                                        }}
                                    >
                                        {part.text}
                                    </span>
                                ))}

                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}