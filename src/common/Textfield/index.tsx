import { TextField } from '@mui/material'
import { InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Textfield(props: any) {
    const { onchange, label, error, isIcon, open, onIconClick, ...rest } = props;
    return (
        <>
            <div className="form__item">
                <label className="form__label mb-1" htmlFor="login">
                    {label}
                </label>
                <TextField
                    className='textfield'
                    {...rest}
                    fullWidth
                    InputProps={isIcon && {
                        endAdornment: <InputAdornment position='end'>
                            {
                                <span onClick={() => onIconClick()} className="hide-show">
                                    {!open ? <VisibilityOff /> : <Visibility />}
                                </span>

                            }
                        </InputAdornment>
                    }}
                />
                {error && (
                    <div className='error'>{error}</div>
                )}
            </div>

        </>
    )
}

export default Textfield
