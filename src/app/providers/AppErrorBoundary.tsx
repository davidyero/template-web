import { Component, type ErrorInfo, type ReactNode } from 'react';
import { CrashScreen } from './CrashScreen';

interface State {
  crashed: boolean;
}

/** Último recurso: un fallo de render nunca deja la pantalla en blanco. */
export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { crashed: false };

  static getDerivedStateFromError(): State {
    return { crashed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error de render', error, info.componentStack);
  }

  render(): ReactNode {
    return this.state.crashed ? <CrashScreen /> : this.props.children;
  }
}
