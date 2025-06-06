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
    return <div className="padded:s-2 fullWidth position:fixed fill:contrast color:white center:text"><span className="underline cursor:pointer h2" onClick={() => { setStage(0); open() }}>help me make this website!</span></div>
}
