import { EventEmitter } from "events";

const emitter = new EventEmitter();
export default {
    emitter: emitter,
    OPEN_MODAL: "OPEN_MODAL",
    UPDATE_ROWS: "UPDATE_ROWS"
}
