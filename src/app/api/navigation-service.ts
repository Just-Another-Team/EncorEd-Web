import { IKioskLog } from "../../data/IKioskLog";
import { AccessTokenType } from "../../types/AccessTokenType";
import http from "./http-common";

class NavigationService {
    private navigationCommon: string = "/navigation";

    addLog(log: IKioskLog) {
        return http.post(`${this.navigationCommon}/add/log`, log)
    }

    getAccessToken() {
        return http.get<AccessTokenType>(`${this.navigationCommon}/token`)
    }

    initializeGraph() {

    }

    generatePath() {

    }
}

export default new NavigationService