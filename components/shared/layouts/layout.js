import Alert from '@/components/shared/ui-elements/alert';
import Meta from '@/components/shared/meta';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div>
        <main style={{ position: 'relative' }}>
          <Alert preview={preview} />
          {children}
        </main>
      </div>
    </>
  );
}
