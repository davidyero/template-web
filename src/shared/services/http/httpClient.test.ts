import { AxiosError, type AxiosAdapter } from 'axios';
import { loaderStore } from '@davidyero/ui-web/loader';
import { http } from './httpClient';

/** Adaptador que deja la petición colgada hasta que el test la resuelva. */
const pendingAdapter = () => {
  let resolve: (() => void) | null = null;
  const adapter: AxiosAdapter = (config) =>
    new Promise((ok) => {
      resolve = () => ok({ data: {}, status: 200, statusText: 'OK', headers: {}, config });
    });
  return { adapter, started: () => resolve !== null, finish: () => resolve?.() };
};

describe('httpClient', () => {
  afterEach(() => loaderStore.reset());

  it('levanta el loader global durante la petición y lo baja al terminar', async () => {
    const { adapter, started, finish } = pendingAdapter();
    const request = http.get('/algo', { adapter });
    await vi.waitFor(() => expect(started()).toBe(true));
    expect(loaderStore.getActive()).toBe(1);
    finish();
    await request;
    expect(loaderStore.getActive()).toBe(0);
  });

  it('una petición silenciosa no levanta el loader', async () => {
    const { adapter, started, finish } = pendingAdapter();
    const request = http.get('/polling', { adapter, silent: true });
    await vi.waitFor(() => expect(started()).toBe(true));
    expect(loaderStore.getActive()).toBe(0);
    finish();
    await request;
  });

  it('lo baja también cuando la petición falla', async () => {
    const adapter: AxiosAdapter = (config) =>
      Promise.reject(new AxiosError('caída', 'ERR_NETWORK', config));
    await expect(http.get('/falla', { adapter })).rejects.toMatchObject({ code: 'NETWORK_ERROR' });
    expect(loaderStore.getActive()).toBe(0);
  });
});
