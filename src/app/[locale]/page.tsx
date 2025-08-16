import PageContent from "@/components/page-content";

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}];
}

export default function Home() {
  return (
    <PageContent />
  );
}
