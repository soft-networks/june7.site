interface ModalStageProps {
    incrementStage: (direction: number) => void;
}

interface Request {
    from: string;
    request: string;
    timestamp: number;
    status: "pending" | "completed" | "rejected" | "working";
    id: string;
    phoneNumber?: string;
}

interface RequestCount { 
    pending: number;
    completed: number;
    rejected: number;
    working: number;
    total: number;
}