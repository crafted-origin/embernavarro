import Alert from '@/components/shared/ui-elements/alert';
import Footer from '@/components/shared/layouts/footer';
import Meta from '@/components/shared/meta';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div>
        <main>
          <Alert preview={preview} />
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
