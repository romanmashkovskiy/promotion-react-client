import React from 'react';
import { getIn } from 'formik';
import { FieldArray } from 'formik';
import ImagePreview from './ImagePreview';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const quantityLimitOfFilesToDownload = 10;
const sizeLimitOfFilesToDownload = 15 * 1024 * 1024;

const useStyles = makeStyles(() => ({
    formControl: {
        marginBottom: 20,
        width: '100%'
    },
    button: {
      width: '100%'
    },
    error: {
        color: 'red'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginBottom: 20
    },
    gridList: {
        width: 200,
        height: 200,
    },
}));

const InputFile = ({ name, nameDeleted, values, handleBlur, touched, errors, setFieldValue }) => {
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const isTouched = getIn(touched, name);

    const classes = useStyles();

    const onChange = event => {
        const file = event.target.files[0];

        if (
            file &&
            !values[name].find(f => f.name === file.name) &&
            file.size < sizeLimitOfFilesToDownload &&
            values[name].length < quantityLimitOfFilesToDownload
        ) {
            setFieldValue(name, value.concat(file));
        }
    };

    return (
        <FieldArray
            name={name}
            render={arrayHelpers => (
                <>
                    <div className={classes.root}>
                        <GridList cellHeight={150} className={classes.gridList} cols={1}>
                            {value.map((item, index) => (
                                <GridListTile key={index} cols={1}>
                                    <ImagePreview
                                        key={index}
                                        backgroundImage={item}
                                        deleteImage={() => {
                                            if (item.s3Key) {
                                                setFieldValue(nameDeleted, values[nameDeleted].concat(item));
                                            }
                                            arrayHelpers.remove(index);
                                        }}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <FormControl className={classes.formControl}>
                        <input
                            type='file'
                            onChange={onChange}
                            accept='image/*'
                            onBlur={handleBlur}
                            style={{ display: 'none' }}
                            id={name}
                            multiple
                        />
                        <label htmlFor={name}>
                            <Button variant='contained' component='span' className={classes.button}>
                                Upload Pictures
                            </Button>
                        </label>
                        {isTouched && error && (
                            <FormHelperText className={classes.error}>
                                {error}
                            </FormHelperText>
                        )}
                    </FormControl>
                </>
            )}
        />
    );
};

export default InputFile;