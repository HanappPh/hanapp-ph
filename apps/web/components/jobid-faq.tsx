import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@hanapp-ph/commons';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function JobIdFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <Accordion type="single" collapsible>
        {faqs.map(faq => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>
              <span className="text-base sm:text-base lg:text-xl font-bold">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <span className="text-sm sm:text-base lg:text-lg">
                {faq.answer}
              </span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
