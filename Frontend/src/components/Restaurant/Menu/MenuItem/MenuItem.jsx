import React, { Component } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import routeConstants from '../../../../Config/routeConstants'
import './MenuItem.styles.css'

import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../../../reduxConfig/Cart/CartActions';
// import {CART_ADD_ITEM,CART_REMOVE_ITEM} from '../../../reduxConfig/actionTypes'

// const [expanded, setExpanded] = React.useState(false);
const useStyles = theme => ({
    root: {
        maxWidth: 345,
        minHeight: "300px"
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

});
class MenuItem extends Component {
    state = {
        expanded: false,
        setExpanded: false
    }



    handleExpandClick = () => {
        // setExpanded(!expanded);
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes, menuItem } = this.props;
        // console.log(menuItem)
        const dish_dispatch = {

            dish_id: menuItem._id,
            dish_name: menuItem.dish_name,
            price: menuItem.price,
            count: 1

        }
        // console.log(menuItem)
        return (
            <div className="menuItem">
                <Card className={classes.root}>
                    <CardHeader
                        // action={
                        //     <IconButton aria-label="settings">
                        //         <MoreVertIcon />
                        //         {/* three dots on top right */}
                        //     </IconButton>
                        // }   
                        title={menuItem.dish_name}
                    // subheader={`${menuItem.price}$`}

                    />
                    <CardMedia
                        className={classes.media}
                        image={`${routeConstants.BACKEND_URL}${menuItem.image_url}`}
                        title={menuItem.dish_name}
                    />

                    <CardActions disableSpacing >
                        <IconButton aria-label="Add to Cart" onClick={() => { this.props.addToCart(dish_dispatch) }}>
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label="Remove from Cart" onClick={() => { this.props.removeFromCart(dish_dispatch) }}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton aria-label="Price">
                            {`${menuItem.price}$`}
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent >
                            <Typography variant="body1" color="textSecondary" component="p" styles={{ overflow: "scroll" }}>
                                Description:
                                {menuItem.description}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography paragraph>Ingredients:</Typography>
                            <Typography paragraph>
                                {menuItem.ingredients}
                            </Typography>

                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (dish) => dispatch(addToCart(dish)),
        removeFromCart: (dish) => dispatch(removeFromCart(dish))

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme: true })(MenuItem));