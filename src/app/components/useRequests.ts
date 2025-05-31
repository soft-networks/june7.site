import { create } from 'zustand';


type RequestsStore = {
  requests: Request[];
  requestCount: RequestCount;
  setRequests: (requests: Request[]) => void;
  setRequestCount: (count: RequestCount) => void;
}

const useRequests = create<RequestsStore>((set) => ({
  requests: [],
  requestCount: {
    pending: 0,
    completed: 0,
    rejected: 0,
    working: 0,
    total: 0
  },
  setRequests: (requests) => set({ requests }),
  setRequestCount: (count) => set({ requestCount: count })
}));

export default useRequests;
