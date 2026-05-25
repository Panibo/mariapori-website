type JsonLdProps = {
  data: unknown;
};

const stringifyJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
  />
);

export default JsonLd;
