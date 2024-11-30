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
    question: "How do you choose winers?",
    answer:
      "Imagine 1 point = 1 ticket. Our system randomly chooses valid tickets.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="container md:w-[700px] pb-12 md:pt-12 md:pb-24"
    >
      <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
        Frequently Asked Questions
      </h2>
      <Separator className="bg-primary" />

      <h3 className=" mx-auto text-lg text-center text-muted-foreground my-8">
        If you didn&apos;t find your answer, feel free to contact us.
      </h3>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left font-bold">
              {question}
            </AccordionTrigger>

            <AccordionContent className="italic">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
