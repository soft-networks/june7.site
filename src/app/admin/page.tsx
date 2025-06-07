'use client';

import { useEffect, useState, useCallback } from 'react';
import { syncRequests, updateRequestStatus as updateRequestStatusFirebase, deleteRequest as deleteRequestFirebase } from '../lib/requests';
import useRequests from '../components/useRequests';
import { buttonCSS } from '../cssConstants';


export default function AdminPage() {
    let [requests, setRequests] = useState<Request[]>([]);
    let [copiedPhoneNumber, setCopiedPhoneNumber] = useState<string | null>(null);

    const copyPhoneNumber = (phoneNumber: string) => {
        navigator.clipboard.writeText(phoneNumber);
        setCopiedPhoneNumber(phoneNumber);
        setTimeout(() => {
            setCopiedPhoneNumber(null);
        }, 1000);
    }

    useEffect(() => {
        syncRequests((requestList) => {
            setRequests(requestList);
        });
    }, []);

    const updateRequestStatus = async (requestId: string, newStatus: Request['status']) => {
        await updateRequestStatusFirebase(requestId, newStatus);
    };

    const deleteRequest = async (requestId: string) => {
        await deleteRequestFirebase(requestId);
    };

    return (
        <div className="padded stack">
            <h1 className="h1">Request Queue</h1>
            <div className="stack:s-2" style={{ "var(--s0)": "14px" } as React.CSSProperties}>
                {requests.map((request) => (
                    <div key={request.id} className="padded:s-2 stack:s-2 fill:contrast-light border:gray">
                        <p>{request.request}</p>
                        <div>{request.id} | {request.from} | {request.timestamp} </div>
                        <div className="stack:horizontal:s-2">
                            <div
                                onClick={() => updateRequestStatus(request.id, 'pending')}
                                className={`${buttonCSS} ${request.status === 'pending' ? 'fill:contrast color:white' : ''}`}
                            >
                                Pending
                            </div>
                            <div
                                onClick={() => updateRequestStatus(request.id, 'working')}
                                className={`${buttonCSS} ${request.status === 'working' ? 'fill:contrast color:white' : ''}`}
                            >
                                Working
                            </div>
                            <div
                                onClick={() => updateRequestStatus(request.id, 'completed')}
                                className={`${buttonCSS} ${request.status === 'completed' ? 'fill:contrast color:white' : ''}`}
                            >
                                Completed
                            </div>
                            {request.phoneNumber && <div
                                onClick={() => copyPhoneNumber(request.phoneNumber as string)}
                                className={`${buttonCSS} ${request.status === 'rejected' ? 'fill:contrast color:white' : ''}`}
                            >
                                {copiedPhoneNumber === request.phoneNumber ? "copied" : "copy phone"}
                            </div>}
                            <div
                                onClick={() => deleteRequest(request.id)}
                                className={`${buttonCSS}`}
                            >
                                Delete
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
