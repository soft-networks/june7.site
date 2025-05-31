import { useEffect } from "react";
import { useState } from "react";
import { syncRequests } from "../lib/requests";
import { buttonCSSSecondary } from "../cssConstants";
import useModalStage from "./useModalStage";
import useModalIsOpen from "./useModalIsOpen";

const RequestList: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const { setStage } = useModalStage();
    const { close } = useModalIsOpen();
    useEffect(() => {
        syncRequests((requests) => setRequests(requests));
    }, []);
    return <div className="position:absolute:topcenter textWidth stack fill:white padded border:black" style={{ maxHeight: "100%", overflowY: "auto" }}>
        {requests.map((request) => <RequestCard key={request.id} request={request} />)}
        <div className="stack:horizontal">
            <div className={buttonCSSSecondary + " fullWidth"} onClick={() => setStage(1)}>make request</div>
            <div className={buttonCSSSecondary + " fullWidth"} onClick={close}>explore site</div>
        </div>
    </div>
}

const RequestCard: React.FC<{ request: Request }> = ({ request }) => {
    return <div className="stack:noGap fullWidth">
        <div className="stack:horizontal:s-1">
            <div className="padded:s-2 border:gray border:noBottom">{request.from}</div>
            <div className="padded:s-2 border:gray border:noBottom"><TimeRenderer timestamp={request.timestamp} /></div>
            <div className="padded:s-2 border:gray border:noBottom"><StatusRenderer status={request.status} /></div>
        </div>
        <div className="padded:s-1 fill:contrast-light border:gray ">{request.request}</div>
    </div>
}

const StatusRenderer = ({ status }: { status: Request["status"] }) => {
    return <span style={{width: "12px", height: "12px", fontSize: "12px"}}>
        {status === "pending" && "⏳"}
        {status === "completed" && "✅"}
        {status === "rejected" && "❌"}
    </span>
}
const TimeRenderer = ({ timestamp }: { timestamp: Request["timestamp"] }) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}
export default RequestList;