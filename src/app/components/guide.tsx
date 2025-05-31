import { useEffect, useState } from "react";
import { buttonCSS, buttonCSSSecondary } from "../cssConstants";
import useModalIsOpen from "./useModalIsOpen";
import { RequestMaker } from "./requestMaker";
import { syncRequestCount, syncRequests } from "../lib/requests";
import RequestList from "./requestList";
import useModalStage from "./useModalStage";
import Explainer from "./explainer";
import useRequests from "./useRequests";

export default function Guide() {
    const { isOpen } = useModalIsOpen();
    const { stage } = useModalStage();
    const { setRequests, setRequestCount } = useRequests();

    useEffect(() => {
        syncRequests((requests) => setRequests(requests));
        syncRequestCount((requestCount) => setRequestCount(requestCount));
    }, []);

    return <>
        {!isOpen && <GuideOpener />}
        {isOpen && stage === 0 && <Explainer />}
        {isOpen && stage === 1 && <RequestMaker />}
        {isOpen && stage === 2 && <RequestList />}
    </>
}


const GuideOpener = () => {
    const { open } = useModalIsOpen();
    const { requestCount } = useRequests();
    const { setStage } = useModalStage();
    return <div className="padded:s-2 fullWidth position:fixed fill:black color:white center:text">help build this website today by <span className="underline cursor:pointer" onClick={() => { setStage(1); open() }}>submitting a request</span></div>
}
