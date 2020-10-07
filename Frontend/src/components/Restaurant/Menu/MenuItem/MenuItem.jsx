import React, { Component } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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

            dish_id: menuItem.dish_id,
            dish_name: menuItem.dish_name,
            price: menuItem.price,
            count: 1

        }
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
                        image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563 "
                        title={menuItem.dish_name}
                    />

                    <CardActions disableSpacing >
                        <IconButton aria-label="Add to Cart" onClick={() => { console.log("addtocart"); this.props.addToCart(dish_dispatch) }}>
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label="Remove from Cart" onClick={() => { console.log("removecart"); this.props.removeFromCart(dish_dispatch) }}>
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
const mapStateToProps = () => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        // emailHandler: (email_id) => dispatch(emailHandler(email_id)),
        // passwordHandler: (password) => dispatch(passwordHandler(password)),
        // authFlagHandler: (authFlag) => dispatch(authFlagHandler(authFlag)),
        // login: (loggedIn) => dispatch(login(loggedIn))
        addToCart: (dish) => dispatch(addToCart(dish)),
        removeFromCart: (dish) => dispatch(removeFromCart(dish))

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme: true })(MenuItem));