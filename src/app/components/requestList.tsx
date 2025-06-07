import { useEffect } from "react";
import { useState } from "react";
import { syncRequests, updateRequestStatus, updateRequestVotes } from "../lib/requests";
import { buttonCSSSecondary, modalCSS } from "../cssConstants";
import useModalStage from "./useModalStage";
import useModalIsOpen from "./useModalIsOpen";
import useRequests from "./useRequests";
import { request } from "http";

const RequestList: React.FC = () => {
    const { requests } = useRequests();
    const { setStage } = useModalStage();
    const { close } = useModalIsOpen();
    const { requestCount } = useRequests();
    return <div className={modalCSS}>
        <div className="stack:horizontal">
            <div className={buttonCSSSecondary + " fullWidth"} onClick={() => setStage(1)}>make request</div>
            <div className={buttonCSSSecondary + " fullWidth"} onClick={close}>explore site</div>
        </div>
        <div className="stack:s-3">
            <div className="h4">{requests.length} requests</div>
            <div>{Math.round(requestCount.completed / requests.length * 100)}% fulfilled</div>
        </div>
        {requests
            .filter(request => request.status !== "completed")
            .sort((a, b) => b.votes - a.votes)
            .map((request, index) => <RequestCard key={index} request={request} />)}
        <CompletedRequests requests={requests} />
    </div>
}

const RequestCard: React.FC<{ request: Request }> = ({ request }) => {
    
    const setVotes = (votes: number) => {
        updateRequestVotes(request.id, votes)
    }

    return <div className="stack:noGap fullWidth">
        <div className="stack:horizontal:s-2">
            <div className="padded:s-4 border:gray border:noBottom">{request.from}</div>
            <div className="padded:s-4 border:gray border:noBottom"><TimeRenderer timestamp={request.timestamp} /></div>
            <div className="padded:s-4 border:gray border:noBottom"><StatusRenderer status={request.status} /></div>
            <div className="padded:s-4 border:gray border:noBottom stack:horizontal:s-2">
                <span>{request.votes} votes</span>
                <span 
                    className="padded:s-4 borderRadius:small"
                    onClick={() => setVotes(request.votes + 1)}
                >👍</span>
            </div>
        </div>
        <div className="padded:s-1 fill:contrast-light border:gray ">{request.request}</div>
    </div>
}

const CompletedRequests: React.FC<{ requests: Request[] }> = ({ requests }) => {
    return <div className="stack:s-1">
        <div className="h4">completed requests</div>
        {requests.filter(request => request.status === "completed").map((request, index) => <RequestCard key={index} request={request} />)}
    </div>
}

const StatusRenderer = ({ status }: { status: Request["status"] }) => {
    return <span style={{ width: "12px", height: "12px", fontSize: "12px" }}>
        {status === "pending" && "⏳"}
        {status === "completed" && "✅"}
        {status === "rejected" && "❌"}
        {status === "working" && "🚧"}
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