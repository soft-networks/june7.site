import { useEffect, useState } from "react";
import { buttonCSS, buttonCSSSecondary, modalCSS } from "../cssConstants"
import useModalIsOpen from "./useModalIsOpen";
import { syncIdeas } from "../lib/ideas";
import useModalStage from "./useModalStage";
import { addRequest } from "../lib/requests";
export const RequestMaker = () => {
    const { close } = useModalIsOpen();
    const [ideas, setIdeas] = useState<string[]>([]);
    const [needsIdea, setNeedsIdea] = useState(false);
    const [ideaIndex, setIdeaIndex] = useState(0);
    const { incrementStage } = useModalStage();
    const { setStage } = useModalStage();
    useEffect(() => {
        syncIdeas((ideas) => setIdeas(ideas));
    }, []);
    const setNextIdea = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * ideas.length);
        } while (newIndex === ideaIndex && ideas.length > 1);

        setIdeaIndex(newIndex);
        if (needsIdea == false) {
            setNeedsIdea(true);
        }
    }
    return <div className={modalCSS}>
        <div className="stack:s-1">
            <div className="h4">make a request to shape this website</div>
            {!needsIdea && <p>your request can be anything: a feature you'd like added (or removed), a bug you're experiencing that you'd like to see fixed, or even a problem in your life that you'd like the website to help solve. <span className="underline" onClick={() => setNeedsIdea(true)}>click here if you need an idea</span></p>}
            {needsIdea && <p className="padded fill:contrast-light">a prompt: {ideas[ideaIndex]} <br/><span className="underline" onClick={setNextIdea}>click here for a new one</span></p>}
        </div>
        <RequestForm />
        <div className="stack:horizontal:s-1 fullWidth">
            <div className={buttonCSSSecondary + " fullWidth"} onClick={() => { setStage(2); }}>see requests</div>
            <div className={buttonCSSSecondary + " fullWidth"} onClick={close}>explore site</div>
        </div>
    </div>
}

const RequestForm = () => {
    const [request, setRequest] = useState("");
    const [from, setFrom] = useState("");
    const { incrementStage } = useModalStage();
    const [phoneNumber, setPhoneNumber] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addRequest({
            from,
            request,
            status: "pending",
            timestamp: Date.now(),
            phoneNumber: phoneNumber
        } as Request);
        // Reset form (optional)
        setRequest("");
        setFrom("");
        incrementStage(1);
    };

    return (
        <form className="stack fullHeight flex-1" onSubmit={handleSubmit}>
            <div className="stack:s-2">
                <label htmlFor="request" className="align:start">my request is...</label>
                <textarea
                    id="request"
                    className="fullWidth border:gray padded:s-1"
                    style={{ resize: "none", minHeight: 250 }}
                    value={request}
                    onChange={e => setRequest(e.target.value)}
                    required
                />
            </div>
            <div className="stack:s-2">
                <label htmlFor="from" className="align:start">from...</label>
                <input
                    id="from"
                    className="fullWidth border:gray padded:s-1"
                    type="text"
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    required
                />
            </div>
            <div className="stack:s-2">
                <label htmlFor="phoneNumber" className="align:start">(optional) receive a text when it's done...</label>
                <input
                    id="phoneNumber"
                    className="fullWidth border:gray padded:s-1"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="123-456-7890"
                />
            </div>
            <button
                type="submit"
                className={buttonCSS}
            >
                submit request!
            </button>
        </form>
    );
};


