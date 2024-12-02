import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this event free?",
    answer: "Yes. Everything is free, but don't forget to register.",
    value: "item-1",
  },
  {
    question: "Why workshops have limits?",
    answer: "Mainly because of our classroom limitation.",
    value: "item-2",
  },
  {
    question: "Do I need to bring a laptop?",
    answer: "Only if you signed up for workshops too.",
    value: "item-3",
  },
  {
    question: "What is QR code game?",
    answer:
      "During workshops and lectures you will find hidden QR codes. Scan them in app to collect points.",
    value: "item-4",
  },
  {
    question: "How do you choose winners?",
    answer:
      "Imagine one point equals one ticket. Our system randomly chooses a ticket from users present at the event.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="container md:w-[900px] mb-16"
      role="region"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase"
      >
        Frequently Asked Questions
      </h2>
      <Separator className="bg-primary" />

      <h3
        className="mx-auto text-lg text-center text-muted-foreground mt-8 mb-4"
        aria-describedby="faq-description"
      >
        If you didn&apos;t find your answer, feel free to contact us.
      </h3>

      <Accordion
        type="single"
        collapsible
        className="AccordionRoot"
        role="tablist"
        aria-label="Frequently Asked Questions"
      >
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value} role="presentation">
            <AccordionTrigger
              className="text-left font-bold"
              id={`faq-trigger-${value}`}
              aria-controls={`faq-content-${value}`}
              role="tab"
            >
              {question}
            </AccordionTrigger>
            <AccordionContent
              id={`faq-content-${value}`}
              aria-labelledby={`faq-trigger-${value}`}
              role="region"
            >
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
