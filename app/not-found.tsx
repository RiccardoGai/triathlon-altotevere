import Container from './components/container.component';
import Section from './components/section.component';

export default function NotFoundPage() {
  return (
    <Section>
      <Container>
        <h2 className='font-bold leading-tighter tracking-tighter font-heading text-heading text-3xl h-[]'>
          404 - Page not found
        </h2>
      </Container>
    </Section>
  );
}
