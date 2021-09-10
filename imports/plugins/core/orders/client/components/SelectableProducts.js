import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PropTypes from "prop-types";
import RenderMedia from './RenderMedia';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    media: {
        width: "40px"
    },
    text: {
        paddingLeft: theme.spacing(1)
    }
}));

function SelectableProducts(props) {
    const classes = useStyles();
    const { products, checked, setChecked } = props;

    const handleToggle = (value) => () => {
        const currentIndex = checked.findIndex((item)=>item._id==value._id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List dense>
            {(products).map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;

                return (
                    <div>
                        <ListItem key={`${value._id}`} button onClick={handleToggle(value)}>
                            <ListItemAvatar className={classes.media}>
                                <RenderMedia
                                    media={value.media}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={value.title} secondary={value.added && "Ya se agregó el artículo"} className={classes.text} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    disabled = {value.added}
                                    onChange={handleToggle(value)}
                                    checked={checked.findIndex((item)=>item._id==value._id) !== -1 || value.added}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                );
            })}
        </List>
    );
}

SelectableProducts.propTypes = {
    products: PropTypes.array,
    checked: PropTypes.array,
    setChecked: PropTypes.func
};

SelectableProducts.defaultProps = {
    products: [],
    checked: [],
    setChecked() { }
};

export default SelectableProducts;
