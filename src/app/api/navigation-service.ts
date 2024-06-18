import IGraphData from "../../data/IGraphData";
import { IKioskLog } from "../../data/IKioskLog";
import { PathInputType } from "../../data/IPathData";
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

    initializeGraph(data: IGraphData) {
        return http.post(`${this.navigationCommon}/initialize`, data)
    }

    generatePath(data: PathInputType) {
        return http.post(`${this.navigationCommon}/generate`, data)
    }
}

export default new NavigationService