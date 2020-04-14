export interface ProcessRequest {
  ProcessInvoice: ProcessInvoice;
}

export interface ProcessInvoice {
  '-releaseID': string;
  ApplicationArea: ApplicationArea;
  DataArea: DataArea;
}

export interface DataArea {
  Invoice: Invoice;
}

export interface Invoice {
  InvoiceHeader: InvoiceHeader;
}

export interface InvoiceHeader {
  DocumentDateTime: string;
  DocumentReference: DocumentReference[];
  UserArea: UserArea2;
}

export interface UserArea2 {
  PaymentTerm: PaymentTerm;
  DFS_Section: DFSSection;
}

export interface DFSSection {
  Paycode: string;
  CompanyNumber: string;
  TransactionReferenceID: string;
}

export interface PaymentTerm {
  Term: Term;
}

export interface Term {
  Description: string;
  Amount: Amount;
}

export interface Amount {
  '-currencyID': string;
  '#text': string;
}

export interface DocumentReference {
  '-type': string;
  DocumentID?: DocumentID;
  Note?: string;
}

export interface DocumentID {
  ID: string;
}

export interface ApplicationArea {
  Sender: Sender;
  CreationDateTime: string;
  UserArea: UserArea;
}

export interface UserArea {
  SourceID: string;
  ID: string;
  Note: Note;
}

export interface Note {
  '-type': string;
  '#text': string;
}

export interface Sender {
  TaskID: string;
}

export interface ProcessResponse {
  responseCode: string;
  timestamp: string;
  paymentMethodBrandResponseCode: string;
}