import { gql } from 'apollo-boost';


const addBookMutation = gql`
    mutation AddDish(
        $dish_name: String! ,
        $ingredients:  String! ,
        $image_url:  String! ,
        $price:String!,
        $description: String!,
        $category_id:String!,
        $restaurant_id: String!
        )
        {
            addDish(dish_name:$dish_name ,
                ingredients:$ingredients ,
                image_url:$image_url,
                price:$price,
                description:$description,
                category_id:$category_id,
                restaurant_id:$restaurant_id)
                {
                    _id
                    dish_name
                    dish_id
                }
        }
`;

const updateRestaurantProfile = gql`
mutation updateRestaurantProfile(
    $_id:  String!,
    $restaurant_location:String!,
    $restaurant_description: String!,
    $restaurant_address:String!,
    $address_city: String!,
    $address_state:String!,
    $address_postal_code: String!,
    $address_latitude: String!,
    $address_longitude:String!,
    $primary_phone:String!,
    $secondary_phone: String!,
    $open_time:String!,
    $close_time: String!
    )
    {
        updateRestaurantProfile(
            _id:$_id,
            restaurant_location:$restaurant_location,
            restaurant_description:$restaurant_description,
            restaurant_address:$restaurant_address,
            address_city:$address_city,
            address_state:$address_state,
            address_postal_code:$address_postal_code,
            address_latitude:$address_latitude,
            address_longitude:$address_longitude,
            primary_phone:$primary_phone,
            secondary_phone:$secondary_phone,
            open_time:$open_time,
            close_time:$close_time 
            )
            {
                _id
                restaurant_location
                restaurant_description
                restaurant_address
                address_city
                address_state
                address_postal_code
                address_latitude
                address_longitude
                primary_phone
                secondary_phone
                open_time
                close_time
            }
    }
`

const restaurantSearch = gql`
query restaurantSearch($search_string: String!){
    restaurantSearch(search_string: $search_string) {
                 _id
                restaurant_location
                restaurant_description
                restaurant_address
                address_city
                address_state
                address_postal_code
                address_latitude
                address_longitude
                primary_phone
                secondary_phone
                open_time
                close_time
    }
}
`;

const restaurantCreateOrder = gql`
mutation restaurantCreateOrder(
    $delivery_address: String!,
    $address_city: String!,
    $address_postal_code: String!,
    $address_latitude: String!,
    $address_longitude: String!,
    $primary_phone:String!,
    $payment_card_digits: String!,
    $cart_items: String!,
    $customer_id: String!,
    $restaurant_id:String!,
    $order_type: String!,
    $order_status: String!,
    $order_total_price:String!,
)
{
    restaurantCreateOrder(   
            delivery_address:$delivery_address,
            address_city:$address_city,
            address_postal_code:$address_postal_code,
            address_latitude:$address_latitude,
            address_longitude:$address_longitude,
            primary_phone:$primary_phone,
            payment_card_digits:$payment_card_digits,
            cart_items:$cart_items,
            customer_id:$customer_id,
            restaurant_id:$restaurant_id,
            order_type:$order_type,
            order_status:$order_status,
            order_total_price:$order_total_price,
    )
    {
        order_id
        customer_id
        restaurant_id
    }
}
`;



const restaurantOrderList = gql`
query restaurantSearch($restaurant_id: String!){
    restaurantSearch(restaurant_id: $restaurant_id) {
        delivery_address,
        address_city,
        address_postal_code,
        address_latitude,
        address_longitude,
        primary_phone,
        payment_card_digits,
        cart_items,
        customer_id,
        restaurant_id,
        order_type,
        order_status,
        order_total_price,
    }
}
`;


const restaurantUpdateOrder = gql`
mutation restaurantCreateOrder(
    $order_id: String!,
    $order_status_id: String!,
)
{
    restaurantCreateOrder(   
        order_id:$order_id,
        order_status_id:$order_status_id,
    )
    {
        order_id
        order_status_id
        
    }
}
`;


export { addBookMutation, restaurantCreateOrder, restaurantSearch, updateRestaurantProfile, restaurantOrderList, restaurantUpdateOrder }