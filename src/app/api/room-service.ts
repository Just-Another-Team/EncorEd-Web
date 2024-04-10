import IFloor from "../../data/IFloor";
import IRoom from "../../data/IRoom";
import http from "./http-common";

class RoomService {
    private roomCommon: string = "/room";

    public add() {
        return http.post(`${this.roomCommon}/`)
    }

    public view() {
        return http.get<Array<IRoom>>(`${this.roomCommon}/view/all`)
    }
}

export default new RoomService()