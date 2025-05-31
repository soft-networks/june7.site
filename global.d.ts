interface ModalStageProps {
    incrementStage: (direction: number) => void;
}

interface Request {
    from: string;
    request: string;
    timestamp: number;
    status: "pending" | "completed" | "rejected";
    id: string;
}

interface RequestCount { 
    pending: number;
    completed: number;
    rejected: number;
    total: number;
}