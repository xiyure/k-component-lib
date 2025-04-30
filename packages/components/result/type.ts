export interface ResultProps {
  status?: ResultStatus;
  title?: string;
  content?: string;
}

export type ResultStatus = '' |'success' | 'warning' | 'info' | 'error' | '403' | '404' | '500';
