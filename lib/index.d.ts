import { LinkSession, LinkTransport } from 'anchor-link';
import { SigningRequest } from 'eosio-signing-request';
export interface BrowserTransportOptions {
    /** CSS class prefix, defaults to `anchor-link` */
    classPrefix?: string;
    /** Whether to inject CSS styles in the page header, defaults to true. */
    injectStyles?: boolean;
}
export default class BrowserTransport implements LinkTransport {
    readonly options: BrowserTransportOptions;
    constructor(options?: BrowserTransportOptions);
    private classPrefix;
    private injectStyles;
    private activeRequest?;
    private activeCancel?;
    private containerEl;
    private requestEl;
    private styleEl?;
    private countdownTimer?;
    private closeTimer?;
    private setupElements;
    private createEl;
    private hide;
    private show;
    private displayRequest;
    onRequest(request: SigningRequest, cancel: (reason: string | Error) => void): void;
    onSessionRequest(session: LinkSession, request: SigningRequest, cancel: (reason: string | Error) => void): void;
    private clearTimers;
    onSuccess(request: SigningRequest): void;
    onFailure(request: SigningRequest, error: Error): void;
}
