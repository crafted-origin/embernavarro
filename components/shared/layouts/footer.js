import RichTextBlock from '@/components/shared/ui-elements/rich-text-block';

export default function Footer(props) {
  return (
    <footer>
      <RichTextBlock
        data={props.data.json}
        descriptionClassName="footerDescription"
      />
    </footer>
  );
}
