import PageContent from "@/components/page-content";

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'hi'}];
}

export default function Home() {
  return (
    <PageContent />
  );
}
