export interface ResultProps {
  status?: '' | 'success' | 'warning' | 'info' | 'error' | '403' | '404' | '500';
  title?: string;
  content?: string;
}
