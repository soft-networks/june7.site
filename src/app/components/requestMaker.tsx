import { useEffect, useState } from "react";
import { buttonCSS, buttonCSSSecondary } from "../cssConstants"
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
    return <div className="textWidth stack border:black fill:white padded position:absolute:topcenter">
        <h4>make a request to shape this website</h4>
        {!needsIdea && <p>your request can be anything: a feature you'd like added (or removed), a bug you're experiencing that you'd like to see fixed, or even a problem in your life that you'd like the website to help solve.</p>}
        {needsIdea && <p>here's an idea to help inspire your request: <br/>{ideas[ideaIndex]}</p>}
        <RequestForm />
        <div className="stack:horizontal:s-1 fullWidth">
            <div className={buttonCSSSecondary + " fullWidth"} onClick={setNextIdea}>{needsIdea ? "new idea please" : "i need an idea"}</div>
            <div className={buttonCSSSecondary + " fullWidth"} onClick={() => { setStage(2);  }}>see requests</div>
            <div className={buttonCSSSecondary + " fullWidth"} onClick={close}>explore site</div>
        </div>
    </div>
}


const RequestForm = () => {
    const [request, setRequest] = useState("");
    const [from, setFrom] = useState("");
    const { incrementStage } = useModalStage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addRequest({
            from,
            request,
            status: "pending",
            timestamp: Date.now()
        } as Request);
        // Reset form (optional)
        setRequest("");
        setFrom("");
        incrementStage(1);
    };

    return (
        <form className="stack:s-1 fullHeight flex-1" onSubmit={handleSubmit}>
            <div className="stack:s-2 flex-1">
                <label htmlFor="request" className="align:start">my request is...</label>
                <textarea
                    id="request"
                    className="fullWidth border:gray padded:s-1"
                    style={{ resize: "none" , minHeight: 250}}
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
            <button
                type="submit"
                className={buttonCSS}
            >
                submit!
            </button>
        </form>
    );
};


