import Link from '@/components/shared/ui-elements/link';

export default function Alert({ preview }) {
  return (
    <>
      <div>
        {preview && (
          <>
            This is page is a preview.{' '}
            <Link href="/api/pages/exit-preview">Click here</Link> to exit
            preview mode.
          </>
        )}
      </div>
    </>
  );
}
