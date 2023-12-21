import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { FormPropsInput } from "../../types/FormPropsInput";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { FixMeLater } from "../../types/FixMeLater";

type MultiCheckboxProp = {
    selectedItems: Array<string>;
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
} & FormPropsInput

const FormInputMultiCheckbox: React.FC<MultiCheckboxProp> = ({
    name,
    control,
    //rules,
    label,
    options,
    setValue,
    selectedItems,
    setSelectedItems
}) => {
    //const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

    // we are handling the selection manually here
    const handleSelect = (value: FixMeLater) => {
        const isPresent = selectedItems.indexOf(value);

        if (isPresent !== -1) {
            const remaining = selectedItems.filter((item: FixMeLater) => item !== value);
            setSelectedItems(remaining);
        }
        else {
            setSelectedItems((prevItems: FixMeLater) => [...prevItems, value]);
        }
    };

    // we are setting form value manually here
    useEffect(() => {
        setValue(name, selectedItems);
    }, [name, selectedItems, setValue]);

    return(
        <FormControl size="small" variant="outlined">
            <FormLabel component="legend">{label}</FormLabel>
            <div>
                {options?.map((option) => (
                    <FormControlLabel
                    control={
                        <Controller
                        name={name}
                        control={control}
                        render={({field}) => (
                            <Checkbox
                            checked={selectedItems.includes(option.value)}
                            onChange={() => handleSelect(option.value)}/>
                        )}
                        />
                    }
                    label={option.label}
                    key={option.value}/>
                ))}
            </div>
        </FormControl>
    )
}

export default FormInputMultiCheckbox;