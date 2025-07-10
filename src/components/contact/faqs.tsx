import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion"

export default function Faqs() {
  return (
    <div className="mt-16 w-full  md:px-0">
      <div className="md:flex md:gap-16 items-start w-full">
        {/* Left: Heading */}
        <div className="md:w-1/2 w-full mb-8 md:mb-0 flex items-center justify-center">
          <h2 className="text-3xl text-foreground font-bold text-center md:text-left">
            Frequently <br /> Asked Questions
            <span className="block text-lg font-normal text-muted-foreground mt-2">
              For the Sudanese Paediatric Medical Community
            </span>
          </h2>
        </div>
        {/* Right: Accordion */}
        <div className="md:w-1/2 w-full">
          <Accordion type="single" collapsible defaultValue="faq-1" className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>Who can join the Sudanese Paediatric Doctors community?</AccordionTrigger>
              <AccordionContent>
                Membership is open to all paediatricians, paediatric residents, and medical students of Sudanese origin, both in Sudan and abroad. We welcome all who are passionate about advancing paediatric care for Sudanese children.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How do I participate in community events or webinars?</AccordionTrigger>
              <AccordionContent>
                You can find upcoming events and webinars on our Events page. Registration details are provided for each event. Members also receive email notifications and reminders for all major activities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Can I contribute articles or research to the website?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We encourage members to share their knowledge, research, and experiences. Please visit the "Contribute" section or contact our editorial team to submit your work.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger>How can I connect with other Sudanese paediatricians?</AccordionTrigger>
              <AccordionContent>
                Our platform offers a member directory, discussion forums, and regular networking events. You can also join our WhatsApp and Telegram groups for real-time conversations with colleagues.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}