import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EventsService from "../utils/events";

function Modal(props) {
    const [ openModal, setOpenModal ] = useState(false);
    const { modalData } = props;

    useEffect(() => {
        EventsService.emitter.addListener(EventsService.OPEN_MODAL, (data, modalVisible) => {
            // use redux to store the selected row... instead of storing it state of Dashboard to pass it onto the sibling component Modal or otherwise using emitter to pick up data directly. because if, instead of, opening modal we decide to open a new page instead, this behavior will break;

            setOpenModal(modalVisible);
        });
    }, [])

    const closeModal = () => {
        EventsService.emitter.emit(EventsService.OPEN_MODAL, null, false);
    }

    console.log({ modalData });
    return (
        <>
            {
                openModal ? (
                    <div className="modal-container">
                        <div className="modal">
                            <button className="close-button" onClick={() => closeModal()}>x</button>
                            <div>{JSON.stringify(modalData)}</div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        modalData: state.modalData
    }
}

export default connect(mapStateToProps, null)(Modal);
