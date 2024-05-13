import IFloor from "../../data/IFloor";
import IRoom from "../../data/IRoom";
import http from "./http-common";

class RoomService {
    private roomCommon: string = "/room";

    public add(room: IRoom) {
        return http.post<string>(`${this.roomCommon}/add`, room)
    }

    public delete(roomId: string) {
        return http.delete<string>(`${this.roomCommon}/delete/${roomId}`)
    }

    public update(room: IRoom) {
        return http.patch<string>(`${this.roomCommon}/update/${room.ROOM_ID!}`, room)
    }

    public view() {
        return http.get<Array<IRoom>>(`${this.roomCommon}/view/all`)
    }
}

export default new RoomService()