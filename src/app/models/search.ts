export interface Search{
    InvoiceNumber: string;
    CustomerNumber: string;
    FromDate: Date | string;
    ToDate: Date | string;
}

export interface InvoiceEvent
{
    Id: string;
    invoiceNum: string;
    customerNum: string;
    createDate: Date | string;
    updateDate: Date | string;
    sLayerEvents: SLayerEvent[];
    nonSLayerDFSEvents: NonSLayerDFSEvent[];
    ociAcks: InvoiceOciAck[];
    ociAckSentFlag: boolean;
    /**This flag will be set to true when the EXCEPTION event comes from BPEL for this invoice */
    exceptionFlag: boolean;
}

export interface SLayerEvent
{
    system: string;
    state: string;
    description: string;
    invoiceCreationTimeStamp: Date | string;
    stateChangeTimeStamp: Date | string;
    payload: string;
}

export interface NonSLayerDFSEvent
{
    system: string;
    state: string;
    description: string;
    stateChangeTimeStamp: Date | string;
    payload: string;
}

export interface InvoiceOciAck
{
    messageId: string;
    acceptOrReject: string;
    notes: string;
    eventType: string;
    ociAckTimeStamp: Date | string;
}


export interface ColumnNames{
    name: string;
    display: string;
}


export interface SlayerCountObject{
    ValidationCount: number;
    Deliveredcount: number;
    validationFailedCount: number;
    nonAckCount: number;
    ackCount: number;
    dfsAccepted: number;
    dfsRejected: number;
}


export enum SlayerState{
    VALIDATION_PASSED,
    DELIVERED,
    VALIDATION_FAILED
}

export enum NonSlayerState{
    ACK,
    'NON-ACK',
}

export enum DfSAcceptorReject{
    'DFS - Rejected',
    'DFS - Accepted'
}