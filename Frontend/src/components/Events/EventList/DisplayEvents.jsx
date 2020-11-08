import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import EventCard from './EventCard/EventCard'
import './EventList.styles.css'
import { connect } from 'react-redux'
import { setEventsList, setPaginatedEventsList } from '../../../reduxConfig/Common/CommonActions'
import ReactPaginate from 'react-paginate';

class DisplayEvents extends Component {
    state = {
        resData: [],

        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0,
        displayList: []
    }

    componentDidMount = () => {
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_ALL_EVENTS}`
        ).then((res) => {
            // console.log(res)
            // this.setState({ resData: [...res.data] })
            this.props.setEventsList({
                eventsList: [...res.data]
            })

        }).then(() => {
            this.receivedData();
        }).catch((err) => {
            console.log(err);
        })
    }



    receivedData = () => {
        // console.log("hitting pagination")
        const slice = this.props.eventsList.slice(this.state.offset, this.state.offset + this.state.perPage);
        let dList = slice.map(
            (res) => {

                return {
                    res: res,
                    props: this.props
                }
            }
        )
        // console.log(dList)
        this.props.setPaginatedEventsList({ paginatedEvents: [...dList] });
        this.setState({
            pageCount: Math.ceil(this.props.eventsList.length / this.state.perPage)
        });

    }
    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData();
        });

    };


    render() {
        console.log(this.props.paginatedEvents)
        // let resList = []
        // if (this.props.eventsList.length > 0) {
        //     resList = this.props.eventsList.map((res, key) => {
        //         let obj = {
        //             res: res,
        //             props: this.props
        //         }
        //         return <EventCard key={key} props={obj} />

        //     })

        // }
        return (
            <div className="eventList">
                <h4> Current Events </h4>
                {/* {resList} */}
                {/* {this.props.paginatedEvents} */}
                <div className="list-group ">
                    {this.props.paginatedEvents.map((res, key) => {
                        return <EventCard key={key} props={res} />
                    })}

                </div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>);
    }
}

// export default DisplayEvents;

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id,
        paginatedEvents: state.paginatedEvents,
        eventsList: state.eventsList,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEventsList: (eventsList) => dispatch(setEventsList(eventsList)),
        setPaginatedEventsList: (paginatedEvents) => dispatch(setPaginatedEventsList(paginatedEvents))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);