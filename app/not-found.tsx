import Container from './components/container.component';
import Section from './components/section.component';

export default function NotFoundPage() {
  return (
    <Section>
      <Container>
        <h2 className='font-bold leading-tighter tracking-tighter text-center text-3xl mt-20'>
          404 - Page not found
        </h2>
      </Container>
    </Section>
  );
}
